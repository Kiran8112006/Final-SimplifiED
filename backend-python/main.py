VITE_API_URL=https://simplified-backend-xxx.onrender.com/api"""
FastAPI backend with Groq API integration for SimplifiED
Processes lecture transcriptions using Groq LLM - Fast & Free
"""

from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from groq import Groq
from datetime import datetime
import os
from dotenv import load_dotenv
import requests
import time

# Load environment variables
load_dotenv()

# Initialize Groq API
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set. Please add it to your .env file.")
groq_client = Groq(api_key=GROQ_API_KEY)
GROQ_MODEL = "llama-3.3-70b-versatile"  # Using Llama 3.3 - latest & most capable

# Initialize FastAPI
app = FastAPI(title="SimplifiED Backend")

# Configure CORS
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "https://final-simplified-ed.vercel.app",  # Vercel production
    os.getenv("FRONTEND_URL", "http://localhost:5173")  # Add production frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin SDK
try:
    # Try loading from file first (local development)
    if os.path.exists("serviceAccountKey.json"):
        cred = credentials.Certificate("serviceAccountKey.json")
    else:
        # Load from environment variables (Render/production)
        firebase_config = {
            "type": "service_account",
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID", ""),
            "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.getenv("FIREBASE_CLIENT_ID", ""),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": ""
        }
        cred = credentials.Certificate(firebase_config)
    
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print(f"Firebase initialization error: {e}")
    raise

# Pydantic models
class LectureCreate(BaseModel):
    userId: str
    transcription: str

class LectureUpdate(BaseModel):
    transcription: str = None
    simpleText: str = None
    detailedSteps: str = None
    mindMap: str = None
    summary: str = None

@app.get("/")
async def root():
    return {"message": "SimplifiED Backend with Groq", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "groq_model": GROQ_MODEL}

@app.get("/api/debug/lectures")
async def debug_all_lectures():
    """Debug endpoint - show all lectures in Firestore"""
    try:
        all_docs = db.collection("lectures").stream()
        lectures = []
        for doc in all_docs:
            lectures.append({"id": doc.id, **doc.to_dict()})
        return {"total": len(lectures), "lectures": lectures}
    except Exception as e:
        return {"error": str(e)}

def generate_with_groq(prompt: str, system: str = None) -> str:
    """Generate text using Groq API"""
    try:
        system_message = system or "You are a helpful assistant."
        
        print(f"  Calling Groq API with {len(prompt)} characters...")
        
        message = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            max_tokens=2048,
            temperature=0.7,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        )
        
        response_text = message.choices[0].message.content
        print(f"  ✓ Groq response received: {len(response_text)} characters")
        return response_text
    except Exception as e:
        print(f"  ✗✗✗ Groq API Error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise Exception(f"Groq processing failed: {str(e)}")

@app.post("/api/lectures")
async def create_lecture(lecture: LectureCreate):
    """Create a new lecture with transcription"""
    try:
        print(f"\n💾 Creating lecture for user: {lecture.userId}")
        print(f"   Transcription length: {len(lecture.transcription)} characters")
        
        lecture_data = {
            "userId": lecture.userId,
            "transcription": lecture.transcription,
            "simpleText": "",
            "detailedSteps": "",
            "mindMap": "",
            "summary": "",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        }
        
        doc_ref = db.collection("lectures").document()
        doc_ref.set(lecture_data)
        
        print(f"✓ Lecture created with ID: {doc_ref.id}")
        return {"id": doc_ref.id, **lecture_data}
    except Exception as e:
        print(f"❌ Error creating lecture: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/lectures/{lecture_id}")
async def get_lecture(lecture_id: str):
    """Get a specific lecture"""
    try:
        doc = db.collection("lectures").document(lecture_id).get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Lecture not found")
        
        data = doc.to_dict()
        return {"id": doc.id, **data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/lectures/user/{user_id}/latest")
async def get_latest_lecture(user_id: str):
    """Get the latest lecture for a user"""
    try:
        print(f"\n📂 Fetching latest lecture for user: {user_id}")
        
        # Firestore .where() + .order_by() requires composite index
        # Workaround: Filter and sort in Python instead
        all_docs = db.collection("lectures").stream()
        user_lectures = []
        
        for doc in all_docs:
            data = doc.to_dict()
            if data.get("userId") == user_id:
                user_lectures.append({"id": doc.id, "data": data})
        
        if not user_lectures:
            print(f"⚠️ No lectures found for user: {user_id}")
            raise HTTPException(status_code=404, detail="No lectures found")
        
        # Sort by createdAt descending and get the latest
        user_lectures.sort(
            key=lambda x: x["data"].get("createdAt", ""),
            reverse=True
        )
        
        latest = user_lectures[0]
        print(f"✓ Found {len(user_lectures)} lecture(s), returning latest: {latest['id']}")
        return {"id": latest["id"], **latest["data"]}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error fetching latest lecture: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/lectures/{lecture_id}/process")
async def process_lecture(lecture_id: str):
    """Process lecture transcription through Gemini to generate all outputs"""
    try:
        print(f"\n=== Starting processing for lecture {lecture_id} ===")
        
        # Get the lecture
        doc = db.collection("lectures").document(lecture_id).get()
        if not doc.exists:
            print(f"ERROR: Lecture {lecture_id} not found")
            raise HTTPException(status_code=404, detail="Lecture not found")
        
        data = doc.to_dict()
        transcription = data.get("transcription", "")
        
        if not transcription:
            print(f"ERROR: No transcription in lecture {lecture_id}")
            raise HTTPException(status_code=400, detail="No transcription to process")
        
        print(f"Processing {len(transcription)} characters of transcription...")
        
        # Generate each output sequentially (simpler and more reliable)
        try:
            print("Generating breakdown text...")
            breakdown_text = generate_with_groq(
                f"Break down this text by splitting EVERY word into syllables using hyphens. Keep punctuation and flow.\n\nText: {transcription}\n\nSyllable breakdown:",
                "You are an expert in breaking words into syllables."
            )
            print(f"✓ Breakdown complete ({len(breakdown_text)} chars)")
        except Exception as e:
            print(f"✗ Breakdown failed: {e}")
            breakdown_text = "Error generating breakdown"
        
        try:
            print("Generating detailed steps...")
            detailed_steps = generate_with_groq(
                f"Break down this lecture into numbered steps (1, 2, 3, etc). Each step should be clear and actionable.\n\nLecture: {transcription}\n\nSteps:",
                "You are an expert educator."
            )
            print(f"✓ Steps complete ({len(detailed_steps)} chars)")
        except Exception as e:
            print(f"✗ Steps failed: {e}")
            detailed_steps = "Error generating steps"
        
        try:
            print("Generating mind map...")
            mind_map = generate_with_groq(
                f"Create a brief mind map of the key points. Use max 5-7 points.\n\nContent: {transcription}\n\nMind map:",
                "You are an expert in creating concise mind maps."
            )
            print(f"✓ Mind map complete ({len(mind_map)} chars)")
        except Exception as e:
            print(f"✗ Mind map failed: {e}")
            mind_map = "Error generating mind map"
        
        try:
            print("Generating summary...")
            summary = generate_with_groq(
                f"Provide a 3-4 sentence summary of this content.\n\nContent: {transcription}\n\nSummary:",
                "You are an expert summarizer."
            )
            print(f"✓ Summary complete ({len(summary)} chars)")
        except Exception as e:
            print(f"✗ Summary failed: {e}")
            summary = "Error generating summary"
        
        print("Updating Firestore...")
        
        # Update Firestore
        update_data = {
            "simpleText": breakdown_text,
            "detailedSteps": detailed_steps,
            "mindMap": mind_map,
            "summary": summary,
            "updatedAt": datetime.now()
        }
        
        db.collection("lectures").document(lecture_id).update(update_data)
        print(f"✓ Firestore updated successfully")
        print(f"=== Processing complete for {lecture_id} ===\n")
        
        return {
            "id": lecture_id,
            "simpleText": breakdown_text,
            "detailedSteps": detailed_steps,
            "mindMap": mind_map,
            "summary": summary
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"\n✗✗✗ ERROR in process_lecture: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.patch("/api/lectures/{lecture_id}")
async def update_lecture(lecture_id: str, updates: LectureUpdate):
    """Update lecture fields"""
    try:
        update_data = {k: v for k, v in updates.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.now()
        
        db.collection("lectures").document(lecture_id).update(update_data)
        
        doc = db.collection("lectures").document(lecture_id).get()
        data = doc.to_dict()
        return {"id": doc.id, **data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/lectures/{lecture_id}")
async def delete_lecture(lecture_id: str):
    """Delete a lecture"""
    try:
        db.collection("lectures").document(lecture_id).delete()
        return {"message": "Lecture deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/lectures/user/{user_id}")
async def get_user_lectures(user_id: str):
    """Get all lectures for a user"""
    try:
        print(f"\n📂 Fetching all lectures for user: {user_id}")
        
        # Filter and sort in Python to avoid Firestore composite index requirement
        all_docs = db.collection("lectures").stream()
        user_lectures = []
        
        for doc in all_docs:
            data = doc.to_dict()
            if data.get("userId") == user_id:
                user_lectures.append({"id": doc.id, **data})
        
        # Sort by createdAt descending
        user_lectures.sort(
            key=lambda x: x.get("createdAt", ""),
            reverse=True
        )
        
        print(f"✓ Found {len(user_lectures)} lecture(s) for user {user_id}")
        return user_lectures
    except Exception as e:
        print(f"❌ Error fetching user lectures: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/transcribe-audio")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Transcribe audio file using AssemblyAI
    Requires ASSEMBLYAI_API_KEY in environment variables
    """
    try:
        # Get API key from environment
        api_key = os.getenv("ASSEMBLYAI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=500, 
                detail="AssemblyAI API key not configured. Please add ASSEMBLYAI_API_KEY to .env file."
            )
        
        # Read file content
        file_content = await file.read()
        
        # Upload audio to AssemblyAI
        headers = {"authorization": api_key}
        upload_response = requests.post(
            "https://api.assemblyai.com/v2/upload",
            headers=headers,
            data=file_content
        )
        
        if upload_response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to upload audio file")
        
        audio_url = upload_response.json()["upload_url"]
        
        # Request transcription
        transcript_request = {
            "audio_url": audio_url,
            "language_code": "en"
        }
        
        transcript_response = requests.post(
            "https://api.assemblyai.com/v2/transcript",
            headers=headers,
            json=transcript_request
        )
        
        if transcript_response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to request transcription")
        
        transcript_id = transcript_response.json()["id"]
        
        # Poll for transcription completion
        polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
        max_attempts = 120  # 10 minutes max
        attempt = 0
        
        while attempt < max_attempts:
            polling_response = requests.get(polling_endpoint, headers=headers)
            transcription_result = polling_response.json()
            
            if transcription_result["status"] == "completed":
                transcription_text = transcription_result.get("text", "")
                if not transcription_text:
                    raise HTTPException(
                        status_code=400,
                        detail="No speech detected in the audio file. Please try a different file with clear speech or use manual input."
                    )
                return {
                    "transcription": transcription_text,
                    "confidence": transcription_result.get("confidence", 0),
                    "words": len(transcription_text.split())
                }
            elif transcription_result["status"] == "error":
                raise HTTPException(
                    status_code=500, 
                    detail=f"Transcription failed: {transcription_result.get('error', 'Unknown error')}"
                )
            
            # Wait before polling again
            time.sleep(5)
            attempt += 1
        
        raise HTTPException(status_code=408, detail="Transcription timeout. Please try again.")
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Transcription error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
