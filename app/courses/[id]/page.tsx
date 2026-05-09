'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ArrowLeft, PlayCircle, Star, Clock, BookOpen, CheckCircle2, ChevronDown, Award, FileText, Download, Share2, Play, X } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Sidebar activeRoute="/courses" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-slate-50 relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto relative">
          {/* Cinematic Hero */}
          <div className="relative w-full lg:min-h-[80vh] min-h-[700px] flex flex-col pb-16 pt-8 lg:pt-12 px-8 lg:px-12 bg-slate-950">
          <div className="absolute inset-0 z-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://picsum.photos/seed/docker/1920/1080" className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Background" />
             {/* Gradient overlay for immersive cinematic feel */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col mt-auto">
            <Link href="/courses" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 sm:mb-12 font-medium text-sm w-fit bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end justify-between">
              <div className="flex-grow max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-[10px] uppercase tracking-wider font-bold backdrop-blur-md">
                    DevOps
                  </span>
                  <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-slate-200 rounded-lg text-[10px] uppercase tracking-wider font-bold backdrop-blur-md">
                    Beginner
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold ml-2 drop-shadow-md">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8</span>
                    <span className="text-slate-300 font-medium ml-1">(1,240 reviews)</span>
                  </div>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-xl">
                  Docker Basics: <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Containerize Your App
                  </span>
                </h1>
                
                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl drop-shadow-md font-medium">
                  Learn the fundamentals of Docker. Understand images, containers, volumes, and networks to build portable development and production environments.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
                  <button className="bg-white text-slate-900 hover:bg-slate-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all flex justify-center gap-3 items-center text-base sm:text-lg hover:scale-105 active:scale-95 duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-900" />
                    Resume Learning
                  </button>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="bg-slate-900/50 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold transition-all flex justify-center gap-3 items-center text-base sm:text-lg hover:border-slate-500"
                  >
                    <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
                    Watch Trailer
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-sm font-medium text-slate-300 border-t border-white/10 pt-6 sm:pt-8 mt-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                       AR
                     </div>
                     <span>By <strong className="text-white text-base drop-shadow-md">Alex Rivera</strong></span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>3h 15m total</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>12 lessons</span>
                  </div>
                </div>
              </div>

              {/* Progress Float Glass Card */}
              <div className="w-full lg:w-[380px] flex-shrink-0 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl relative mt-8 lg:mt-0 lg:mb-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[32px] pointer-events-none"></div>
                  <div className="flex justify-between items-end mb-4 relative z-10">
                     <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">Your Progress</h3>
                     <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-heading drop-shadow-sm">65%</span>
                  </div>
                  <p className="text-slate-300 text-sm font-medium mb-8 relative z-10">You're making great time. Next up: <strong>Multi-stage Builds</strong>.</p>
                  
                  <div className="w-full bg-slate-950/80 rounded-full h-3 overflow-hidden shadow-inner mb-8 relative z-10 border border-white/5">
                     <div className="bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.8)] relative" style={{width: '65%'}}>
                       <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                   <button className="bg-white/5 hover:bg-white/10 text-white rounded-2xl py-3 sm:py-3.5 font-medium transition-colors flex justify-center gap-2 items-center text-sm border border-white/10 backdrop-blur-md">
                     <Share2 className="w-4 h-4 text-slate-300" /> Share
                   </button>
                   <button className="bg-white/5 hover:bg-white/10 text-white rounded-2xl py-3 sm:py-3.5 font-medium transition-colors flex justify-center gap-2 items-center text-sm border border-white/10 backdrop-blur-md">
                     <Download className="w-4 h-4 text-slate-300" /> Save
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Fullscreen Modal */}
        {isPlaying && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
            >
               <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
               <video 
                 src="https://www.w3schools.com/html/mov_bbb.mp4" 
                 controls autoPlay 
                 className="w-full h-full object-cover" 
               />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="max-w-4xl mx-auto w-full px-8 lg:px-12 py-12 flex flex-col mb-20 items-center">
            {/* Tabs */}
            <div className="flex justify-center gap-8 border-b border-slate-200 mb-10 w-full max-w-2xl">
              <button 
                onClick={() => setActiveTab('about')}
                className={`pb-4 font-bold text-lg transition-colors border-b-2 flex-1 text-center ${activeTab === 'about' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`pb-4 font-bold text-lg transition-colors border-b-2 flex-1 text-center flex items-center justify-center gap-2 ${activeTab === 'syllabus' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
              >
                Syllabus
                <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-xs text-slate-600">12</span>
              </button>
            </div>

            {/* Tab Panels */}
            {activeTab === 'about' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">What you&apos;ll learn</h3>
                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {[
                      'Understand the core concepts of containerization',
                      'Build custom Docker images using Dockerfiles',
                      'Manage data persistence with Docker Volumes',
                      'Orchestrate multi-container applications with Docker Compose',
                      'Deploy containers to staging and production',
                      'Optimize images for size and security'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="max-w-2xl mx-auto text-center mt-12">
                   <h3 className="text-xl font-bold text-slate-900 mb-4">Course Description</h3>
                   <div className="prose prose-slate mx-auto">
                     <p>
                       Docker has become the industry standard for containerization, completely changing how we build, ship, and run applications. In this comprehensive course, you'll go from absolute beginner to independently managing scalable containerized environments.
                     </p>
                     <p>
                       We start with the fundamental architecture of Docker, contrasting it with traditional virtual machines. Then, you'll get hands-on experience building custom images, pushing to registries, and utilizing Docker Compose for complex setups.
                     </p>
                   </div>
                </section>

                <section className="max-w-2xl mx-auto mt-12">
                   <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Requirements</h3>
                   <ul className="list-disc list-inside text-slate-600 space-y-2 marker:text-slate-300 max-w-md mx-auto text-center font-medium">
                     <li className="list-none bg-slate-50 p-3 rounded-lg border border-slate-100 mb-2">Basic understanding of terminal/command line</li>
                     <li className="list-none bg-slate-50 p-3 rounded-lg border border-slate-100 mb-2">Familiarity with web application architecture</li>
                     <li className="list-none bg-slate-50 p-3 rounded-lg border border-slate-100">No prior DevOps experience required</li>
                   </ul>
                </section>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-3xl mx-auto">
                {/* Module 1 */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 pb-4 bg-slate-50 border-b border-slate-100 flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Module 1</span>
                      <h3 className="text-lg font-bold text-slate-900">Foundations of Containerization</h3>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500 font-medium">
                        <span>4 Lessons</span>
                        <span>•</span>
                        <span>45 min</span>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 mt-1" />
                  </div>
                  <div className="px-2 py-3 bg-white">
                    {[
                      { title: 'Welcome to the Course', duration: '5:20', type: 'video', completed: true },
                      { title: 'VMs vs Containers', duration: '12:45', type: 'video', completed: true },
                      { title: 'Docker Architecture Overview', duration: '15:10', type: 'video', completed: true },
                      { title: 'Quiz: Container Basics', duration: '3 Qs', type: 'quiz', completed: true },
                    ].map((lesson, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           {lesson.completed ? (
                             <CheckCircle2 className="w-5 h-5 text-green-500" />
                           ) : (
                             lesson.type === 'video' ? <PlayCircle className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" /> : <FileText className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
                           )}
                           <span className={`font-medium ${lesson.completed ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-900'}`}>{lesson.title}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-400">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 2 */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 pb-4 bg-slate-50 border-b border-slate-100 flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Module 2</span>
                      <h3 className="text-lg font-bold text-slate-900">Working with Images</h3>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500 font-medium">
                        <span>5 Lessons</span>
                        <span>•</span>
                        <span>1h 10m</span>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 mt-1" />
                  </div>
                  <div className="px-2 py-3 bg-white">
                    {[
                      { title: 'Pulling and Running Images', duration: '14:20', type: 'video', completed: true },
                      { title: 'Building your first Dockerfile', duration: '18:45', type: 'video', completed: true },
                      { title: 'Optimizing Layers', duration: '22:15', type: 'video', completed: true },
                      { title: 'Current Lesson: Multi-stage Builds', duration: '15:30', type: 'video', completed: false, active: true },
                      { title: 'Publishing to DockerHub', duration: '10:10', type: 'video', completed: false },
                    ].map((lesson, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl transition-colors group cursor-pointer ${lesson.active ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-4">
                           {lesson.completed ? (
                             <CheckCircle2 className="w-5 h-5 text-green-500" />
                           ) : (
                             lesson.active 
                              ? <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center"><div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /></div>
                              : (lesson.type === 'video' ? <PlayCircle className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" /> : <FileText className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />)
                           )}
                           <span className={`font-medium ${lesson.active ? 'text-blue-700 font-bold' : lesson.completed ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-900'}`}>{lesson.title}</span>
                        </div>
                        <span className={`text-sm font-medium ${lesson.active ? 'text-blue-600' : 'text-slate-400'}`}>{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 3 */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm opacity-70">
                  <div className="p-6 pb-4 bg-slate-50 flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Module 3</span>
                      <h3 className="text-lg font-bold text-slate-900">Docker Compose & Volumes</h3>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500 font-medium">
                        <span>3 Lessons</span>
                        <span>•</span>
                        <span>1h 20m</span>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 mt-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
