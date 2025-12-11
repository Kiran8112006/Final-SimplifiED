// Dashboard page - main hub after login
// Shows welcome message with user name
// Quick action cards: Start New Lecture, Upload Audio, View History
// Recent lectures list (empty state if no lectures)
// Stats cards: Total lectures, Total hours recorded, This week count
// Uses grid layout, responsive design

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';

export default function Dashboard() {
  // Mock data for now (will connect to Firebase later)
  const userName = 'Student';
  const recentLectures = [];
  const stats = {
    totalLectures: 0,
    totalHours: 0,
    thisWeek: 0,
  };
  
  return (
    <div className="min-h-screen bg-secondary font-dyslexic">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-xl text-textDark/70">
            Ready to make learning easier today?
          </p>
        </div>
        
        {/* Stats cards */}
        {/* 3 cards in grid: Total Lectures, Total Hours, This Week */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-3xl font-bold text-primary">{stats.totalLectures}</div>
            <div className="text-textDark/70">Total Lectures</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-3xl font-bold text-primary">{stats.totalHours}h</div>
            <div className="text-textDark/70">Hours Recorded</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-3xl font-bold text-primary">{stats.thisWeek}</div>
            <div className="text-textDark/70">This Week</div>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Start New Lecture card */}
          <Link to="/new-lecture" className="group">
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">🎙️</div>
              <h3 className="text-2xl font-bold mb-2">Start New Lecture</h3>
              <p className="text-white/90">Record a new lecture with real-time transcription</p>
            </div>
          </Link>
          
          {/* Upload Audio card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="text-5xl mb-4">📤</div>
            <h3 className="text-2xl font-bold text-textDark mb-2">Upload Audio</h3>
            <p className="text-textDark/70">Upload an existing audio file to transcribe</p>
          </div>
        </div>
        
        {/* Recent lectures section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-textDark mb-6">Recent Lectures</h2>
          
          {/* Empty state if no lectures */}
          {recentLectures.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl text-textDark/70 mb-4">No lectures yet</p>
              <Link to="/new-lecture">
                <Button variant="primary">Record Your First Lecture</Button>
              </Link>
            </div>
          ) : (
            // Lecture list will go here
            <div className="space-y-4">
              {/* Map through lectures */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}