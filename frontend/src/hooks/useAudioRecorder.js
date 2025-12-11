// Custom hook for recording audio from microphone
// Uses Web Audio API and MediaRecorder
// Returns: isRecording, audioBlob, duration, startRecording, stopRecording, error
// Handles microphone permissions and errors
// Records in chunks for streaming to backend later
// Audio format: WAV or WebM depending on browser support

import { useState, useRef, useCallback } from 'react';

export default function useAudioRecorder() {
  // State for recording status, audio blob, duration, errors
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  
  // Refs for MediaRecorder, audio stream, chunks, timer
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  
  // Start recording function
  // 1. Request microphone permission
  // 2. Create MediaRecorder with audio stream
  // 3. Set up ondataavailable to collect chunks
  // 4. Set up onstop to create final blob
  // 5. Start recording with timeslice (1000ms for 1 second chunks)
  // 6. Start duration timer
  const startRecording = useCallback(async () => {
    try {
      // Reset state
      setError(null);
      setAudioBlob(null);
      chunksRef.current = [];
      setDuration(0);
      
      // Request microphone access
      
      // Create MediaRecorder
      
      // Handle data available event
      
      // Handle stop event
      
      // Start recording with 1 second chunks
      
      // Start duration timer
      
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError(err.message);
    }
  }, []);
  
  // Stop recording function
  // Stops the MediaRecorder and timer
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  }, [isRecording]);
  
  return {
    isRecording,
    audioBlob,
    duration,
    error,
    startRecording,
    stopRecording,
  };
}