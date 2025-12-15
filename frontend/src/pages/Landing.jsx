// Landing page for EchoNotes with animated orb background
// Sections: Hero with Orb, Features, How It Works, CTA
// Hero has animated 3D orb background using WebGL
// Orb reacts to mouse hover for interactive feel
// All text dyslexia-friendly, large and clear

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import Silk from '../components/common/Silk';
import { Mic, Bot, BookOpen, Accessibility, Sparkles, Download, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, useInView } from 'framer-motion';

export default function Landing() {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Silk Background - Covers entire page */}
      {isDark ? (
        <>
          {/* Dark Theme - Multiple Silk Layers */}
          <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-black via-blue-950 to-slate-950 pointer-events-none z-0"></div>
          
          {/* Primary Silk layer - Bright Blue */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-60 z-0">
            <Silk
              speed={8}
              scale={1.5}
              color="#3B82F6"
              noiseIntensity={0.7}
              rotation={0.3}
            />
          </div>
          
          {/* Secondary Silk layer - Deep Blue for depth */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-50 z-0">
            <Silk
              speed={10}
              scale={1.2}
              color="#1E40AF"
              noiseIntensity={0.6}
              rotation={-0.2}
            />
          </div>
          
          {/* Tertiary Silk layer - Black accent for contrast */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-35 z-0">
            <Silk
              speed={7}
              scale={0.9}
              color="#0F172A"
              noiseIntensity={0.5}
              rotation={0.15}
            />
          </div>
        </>
      ) : (
        <>
          {/* Light Theme - Soft Silk Layers */}
          <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 pointer-events-none z-0"></div>
          
          {/* Primary Silk layer - Soft Blue */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0">
            <Silk
              speed={8}
              scale={1.5}
              color="#93C5FD"
              noiseIntensity={0.5}
              rotation={0.3}
            />
          </div>
          
          {/* Secondary Silk layer - Soft Purple */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-25 z-0">
            <Silk
              speed={10}
              scale={1.2}
              color="#C4B5FD"
              noiseIntensity={0.4}
              rotation={-0.2}
            />
          </div>
          
          {/* Tertiary Silk layer - Light accent */}
          <div className="fixed inset-0 w-full h-full pointer-events-none opacity-20 z-0">
            <Silk
              speed={7}
              scale={0.9}
              color="#A5F3FC"
              noiseIntensity={0.3}
              rotation={0.15}
            />
          </div>
        </>
      )}

      {/* Content wrapper - positioned above background */}
      <div className={`relative z-10 min-h-screen`}>
        <Navbar />
        
        {/* Hero Section */}
        {/* Full viewport, content centered and on top */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-20 text-center overflow-hidden">
          {/* Content - relative positioned to appear on top of background */}
          <div className="relative z-10 max-w-4xl w-full">
          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 md:mb-12 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Make Every Lecture <span className={isDark ? 'text-blue-300' : 'text-blue-600'}>Easy to Understand</span> — Instantly.
          </h1>
          
          {/* Primary Description */}
          <p className={`text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed drop-shadow-lg font-medium ${
            isDark ? 'text-blue-100' : 'text-gray-700'
          }`} style={isDark ? {textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'} : {}}>
            SimplifiED helps students with dyslexia and reading challenges by turning complex lectures into clear, simple, and accessible notes in real time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 md:gap-4 justify-center items-center flex-wrap">
            {currentUser ? (
              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className={`w-full px-10 py-4 rounded-full font-semibold text-base sm:text-lg md:text-xl transition-all shadow-lg hover:shadow-2xl ${
                  isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}>
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/signup" className="w-full sm:w-auto">
                <button className={`w-full px-10 py-4 rounded-full font-semibold text-base sm:text-lg md:text-xl transition-all shadow-lg hover:shadow-2xl ${
                  isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}>
                  Try SimplifiED Now
                </button>
              </Link>
            )}
            <a href="#features" className="w-full sm:w-auto">
              <button className={`w-full px-10 py-4 rounded-full font-semibold text-base sm:text-lg md:text-xl transition-all shadow-md hover:shadow-lg border-2 backdrop-blur-sm ${
                isDark 
                  ? 'bg-transparent text-white hover:bg-white/10 border-white/30' 
                  : 'bg-white/50 text-gray-900 hover:bg-white/70 border-gray-300'
              }`}>
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 px-6 sm:px-8 md:px-12 transition-colors duration-300" ref={featuresRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Designed for Everyone
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md ${
              isDark ? 'text-gray-100' : 'text-gray-700'
            }`}>
              With features built specifically for students with dyslexia and reading challenges
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Feature Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center">
                  <Mic className="w-14 h-14 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Real-time Recording
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  Record lectures directly in your browser with crystal-clear audio capture and automatic transcription as you listen.
                </p>
              </div>
            </motion.div>
            
            {/* Feature Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-pink-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center">
                  <Bot className="w-14 h-14 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  AI Simplification
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  Complex academic language is automatically simplified into clear, easy-to-read text that everyone can understand.
                </p>
              </div>
            </motion.div>
            
            {/* Feature Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  🔗
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Fully Accessible
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  OpenDyslexic font, adjustable spacing, color themes, and WCAG compliance—built for accessibility from the ground up.
                </p>
              </div>
            </motion.div>
            
            {/* Feature Card 4 - Dyslexia Friendly */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center">
                  <BookOpen className="w-14 h-14 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Dyslexia Friendly
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  Specially designed with OpenDyslexic font, adjustable line spacing, high contrast modes, and customizable text size for optimal reading comfort.
                </p>
              </div>
            </motion.div>
            
            {/* Feature Card 5 - Smart Summaries */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-transparent to-rose-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center">
                  <Sparkles className="w-14 h-14 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Smart Summaries
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  AI extracts key points and creates chapter breakdowns automatically. Get instant review notes with the most important concepts highlighted.
                </p>
              </div>
            </motion.div>
            
            {/* Feature Card 6 - Export & Save */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-2xl border-2 overflow-hidden ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30' 
                  : 'bg-white/70 hover:bg-white/90 border-gray-200 hover:border-gray-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glare effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-5 flex justify-center">
                  <Download className="w-14 h-14 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Export & Save
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  Save notes in multiple formats—PDF, Word, or plain text. Cloud sync keeps everything accessible offline and easy to share with classmates.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24 md:py-32 px-6 sm:px-8 md:px-12 text-center overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className={`backdrop-blur-md rounded-3xl shadow-2xl border-2 p-12 md:p-16 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:border-white/30' 
                : 'bg-white/70 border-white/40 hover:border-white/50'
            }`}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight drop-shadow-lg ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ready to Transform Your Learning?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-lg md:text-xl mb-10 md:mb-12 leading-relaxed ${
                isDark ? 'text-gray-100' : 'text-gray-700'
              }`}
            >
              Join thousands of students who are already experiencing better understanding and retention with SimplifiED. Start your journey today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center items-center"
            >
              <Link to="/lecture" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-10 py-4 rounded-full font-semibold text-base sm:text-lg md:text-xl transition-all shadow-lg bg-white hover:bg-gray-100 text-gray-900"
                >
                  Start Your First Lecture
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="relative py-24 md:py-32 px-6 sm:px-8 md:px-12 overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Meet Our Team
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Building SimplifiED with passion, expertise, and dedication to revolutionize learning
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 - Hemsagar */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`group rounded-2xl backdrop-blur-md border-2 p-8 text-center transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 hover:border-blue-400/60 hover:bg-gradient-to-br hover:from-blue-900/60 hover:to-purple-900/60 shadow-lg hover:shadow-blue-500/30'
                  : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-blue-300/40 hover:border-blue-400/70 hover:bg-gradient-to-br hover:from-blue-100/80 hover:to-purple-100/80'
              }`}
            >
              {/* Avatar Circle */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                HB
              </motion.div>

              {/* Name */}
              <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hemsagar B C
              </h3>

              {/* Role */}
              <p className={`text-sm font-semibold mb-4 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Backend Developer
              </p>

              {/* LinkedIn Button */}
              <motion.a
                href="https://www.linkedin.com/in/hemsagar-b-c-b2610a318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isDark
                    ? 'bg-blue-600/60 hover:bg-blue-500 text-white'
                    : 'bg-blue-500/60 hover:bg-blue-600 text-white'
                }`}
              >
                <Linkedin size={16} />
                LinkedIn
              </motion.a>
            </motion.div>

            {/* Team Member 2 - Pushkar */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`group rounded-2xl backdrop-blur-md border-2 p-8 text-center transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 hover:border-purple-400/60 hover:bg-gradient-to-br hover:from-purple-900/60 hover:to-pink-900/60 shadow-lg hover:shadow-purple-500/30'
                  : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-300/40 hover:border-purple-400/70 hover:bg-gradient-to-br hover:from-purple-100/80 hover:to-pink-100/80'
              }`}
            >
              {/* Avatar Circle */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                PR
              </motion.div>

              {/* Name */}
              <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Pushkar R Deshpande
              </h3>

              {/* Role */}
              <p className={`text-sm font-semibold mb-4 ${
                isDark ? 'text-purple-300' : 'text-purple-700'
              }`}>
                Frontend Developer
              </p>

              {/* LinkedIn Button */}
              <motion.a
                href="https://www.linkedin.com/in/pushkar-r-deshpande-510177334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isDark
                    ? 'bg-purple-600/60 hover:bg-purple-500 text-white'
                    : 'bg-purple-500/60 hover:bg-purple-600 text-white'
                }`}
              >
                <Linkedin size={16} />
                LinkedIn
              </motion.a>
            </motion.div>

            {/* Team Member 3 - Anurag */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`group rounded-2xl backdrop-blur-md border-2 p-8 text-center transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-900/60 hover:to-blue-900/60 shadow-lg hover:shadow-cyan-500/30'
                  : 'bg-gradient-to-br from-cyan-100/50 to-blue-100/50 border-cyan-300/40 hover:border-cyan-400/70 hover:bg-gradient-to-br hover:from-cyan-100/80 hover:to-blue-100/80'
              }`}
            >
              {/* Avatar Circle */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                AR
              </motion.div>

              {/* Name */}
              <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Anurag V Rao
              </h3>

              {/* Role */}
              <p className={`text-sm font-semibold mb-4 ${
                isDark ? 'text-cyan-300' : 'text-cyan-700'
              }`}>
                Backend Developer
              </p>

              {/* Email Button (No LinkedIn) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isDark
                    ? 'bg-cyan-600/60 hover:bg-cyan-500 text-white'
                    : 'bg-cyan-500/60 hover:bg-cyan-600 text-white'
                }`}
              >
                <Sparkles size={16} />
                Coming Soon
              </motion.button>
            </motion.div>

            {/* Team Member 4 - Kiran */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`group rounded-2xl backdrop-blur-md border-2 p-8 text-center transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30 hover:border-indigo-400/60 hover:bg-gradient-to-br hover:from-indigo-900/60 hover:to-blue-900/60 shadow-lg hover:shadow-indigo-500/30'
                  : 'bg-gradient-to-br from-indigo-100/50 to-blue-100/50 border-indigo-300/40 hover:border-indigo-400/70 hover:bg-gradient-to-br hover:from-indigo-100/80 hover:to-blue-100/80'
              }`}
            >
              {/* Avatar Circle */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                VS
              </motion.div>

              {/* Name */}
              <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                V S Kiran
              </h3>

              {/* Role */}
              <p className={`text-sm font-semibold mb-4 ${
                isDark ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                Frontend Developer
              </p>

              {/* LinkedIn Button */}
              <motion.a
                href="https://www.linkedin.com/in/vs-kiran-16b178394?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isDark
                    ? 'bg-indigo-600/60 hover:bg-indigo-500 text-white'
                    : 'bg-indigo-500/60 hover:bg-indigo-600 text-white'
                }`}
              >
                <Linkedin size={16} />
                LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-950' : 'bg-gray-900'} text-white py-12 md:py-16 px-6 sm:px-8 md:px-12 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black mb-4">SimplifiED</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Making education accessible for everyone, one lecture at a time.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-800'} pt-8 text-center text-gray-400 text-sm`}>
            <p>Made with ❤️ by Code Lunatics • SimplifiED © 2024. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}