// Main App component for EchoNotes
// Sets up React Router with routes
// Routes: / (Landing), /dashboard (Dashboard), /new-lecture (AudioRecorder page)
// Will add AuthProvider and ProtectedRoute later
// Uses BrowserRouter for routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Temporary page for new lecture (will create proper page later)
import AudioRecorder from './components/lecture/AudioRecorder';
import Navbar from './components/layout/Navbar';

// Temporary New Lecture Page
function NewLecturePage() {
  const handleRecordingComplete = (audioBlob) => {
    console.log('Recording completed!', audioBlob);
    alert('Recording saved! Will upload to Firebase soon.');
  };
  
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-textDark mb-8 font-dyslexic">
          Record New Lecture
        </h1>
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-lecture" element={<NewLecturePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}