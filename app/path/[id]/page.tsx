'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ArrowLeft, CheckCircle2, Circle, Clock, PlayCircle, Trophy, BookOpen, Layers, Target, Check, Award, Video, Lock } from 'lucide-react';
import Link from 'next/link';

// Mock data (since we're generating a static path page for demonstration)
const initialModules = [
  { id: '1', title: 'Introduction to CI/CD', duration: '2h', lessons: 8, completed: true, description: 'Learn the fundamentals of Continuous Integration and Continuous Deployment. We will cover the history, benefits, and core concepts behind automated pipelines.' },
  { id: '2', title: 'Docker Basics', duration: '3h 15m', lessons: 12, completed: false, description: 'Containerize your applications with Docker. Understand images, containers, volumes, and networks to build portable environments.' },
  { id: '3', title: 'Kubernetes Orchestration', duration: '5h', lessons: 18, completed: false, description: 'Manage containerized applications at scale using Kubernetes. Dive into pods, deployments, services, and ingress controllers.' },
  { id: '4', title: 'Infrastructure as Code', duration: '4h 30m', lessons: 10, completed: false, description: 'Automate infrastructure provisioning with tools like Terraform. Learn to define your cloud environments as version-controlled code.' },
];

export default function PathDetails() {
  const [modules, setModules] = useState(initialModules);
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / modules.length) * 100);

  const toggleModuleCompletion = (id: string) => {
    setModules(modules.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  return (
    <>
      <Sidebar activeRoute="/paths" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-slate-50 relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-800 text-white pt-8 pb-20 px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <Link href="/paths" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-8 font-medium text-sm w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Learning Paths
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      Advanced
                    </span>
                    <span className="flex items-center gap-1.5 text-indigo-100 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      14h 45m
                    </span>
                  </div>
                  <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight mb-4">DevOps Roadmap</h1>
                  <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                    Master the tools and practices for modern infrastructure, CI/CD pipelines, and cloud-native deployments. This journey starts with CI/CD fundamentals and goes all the way through advanced Kubernetes orchestration.
                  </p>

                  {/* Hero Progress Bar */}
                  <div className="mb-8 w-full">
                    <div className="flex justify-between items-center text-sm font-medium text-indigo-200 mb-2">
                      <span>Overall Progress</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-indigo-900/40 rounded-full h-2.5">
                      <div className="bg-blue-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg">
                      <PlayCircle className="w-5 h-5" />
                      {completedCount === 0 ? 'Start Learning' : 'Continue Learning'}
                    </button>
                    <div className="flex -space-x-3 overflow-hidden ml-4">
                      <Avatar src="https://picsum.photos/seed/user1/100/100" />
                      <Avatar src="https://picsum.photos/seed/user2/100/100" />
                      <Avatar src="https://picsum.photos/seed/user3/100/100" />
                      <Avatar src="https://picsum.photos/seed/user4/100/100" />
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/20 border-2 border-indigo-600 text-xs font-bold text-white z-10 relative backdrop-blur-sm">
                        +8k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto px-8 lg:px-12 -mt-10 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative">
              
              {/* Main Content (Left) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Syllabus Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading text-2xl font-bold text-slate-900">Syllabus</h2>
                    <span className="text-slate-500 font-medium text-sm">{modules.length} Modules</span>
                  </div>
                  
                  <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
                    {modules.map((module, index) => {
                      const isNext = !module.completed && index === modules.findIndex(m => !m.completed);
                      const isLocked = !module.completed && !isNext;
                      
                      return (
                        <div key={module.id} className={`relative pl-8 group ${isLocked ? 'opacity-50 grayscale' : ''}`} title={module.description}>
                          {/* Timeline Node */}
                          <div className={`absolute -left-[17px] top-1/2 -mt-4 rounded-full border-4 border-white w-8 h-8 flex items-center justify-center z-10 transition-colors duration-300 ${
                            module.completed 
                              ? 'bg-emerald-500' 
                              : isNext ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-200'
                          }`}>
                            {module.completed && <Check className="w-4 h-4 text-white" />}
                            {isNext && <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>}
                            {isLocked && <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>}
                          </div>

                          <div className={`bg-white border rounded-2xl p-6 transition-all duration-300 ${
                            isNext ? 'border-blue-400 shadow-xl ring-4 ring-blue-100/50 cursor-pointer hover:shadow-2xl scale-[1.02] transform' : (isLocked ? 'border-slate-100 bg-slate-50/50 pointer-events-none' : 'border-slate-100 cursor-pointer hover:shadow-md')
                          }`}>
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Module {index + 1}</span>
                                  {module.completed && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                      Completed
                                    </span>
                                  )}
                                  {isNext && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                      Up Next
                                    </span>
                                  )}
                                  {isLocked && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                      Locked
                                    </span>
                                  )}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${module.completed ? 'text-slate-800' : (isLocked ? 'text-slate-500' : 'text-slate-900')}`}>
                                  {module.title}
                                </h3>
                                
                                {/* Expanded description display */}
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {module.description}
                                  </p>
                                  
                                  <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                        <Clock className="w-4 h-4" />
                                      </div>
                                      {module.duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                        <Video className="w-4 h-4" />
                                      </div>
                                      {module.lessons} total lessons
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0 mt-4 md:mt-0 pt-1 flex flex-col gap-2">
                                {isNext ? (
                                  <>
                                    <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
                                      <PlayCircle className="w-4 h-4" />
                                      Start Module
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(module.id); }}
                                      className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-200 flex items-center justify-center gap-2"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                      Mark Completed
                                    </button>
                                  </>
                                ) : module.completed ? (
                                  <>
                                    <button className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-[160px]">
                                      Review
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(module.id); }}
                                      className="w-full md:w-auto text-slate-400 hover:text-slate-600 px-5 py-2 text-xs font-medium transition-all"
                                    >
                                      Undo Completion
                                    </button>
                                  </>
                                ) : (
                                  <button className="w-full md:w-auto bg-slate-50 text-slate-400 px-5 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed border border-slate-200 flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" /> Locked
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
                
              </div>
              
              {/* Sidebar Content (Right) */}
              <div className="space-y-6">
                
                {/* Progress Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-6">
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-6">Your Progress</h3>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle className="text-slate-100" strokeWidth="8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50"/>
                        <circle className="text-blue-600 transition-all duration-1000 ease-out" strokeWidth="8" strokeDasharray={263.89} strokeDashoffset={263.89 - (263.89 * progressPercentage) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">{progressPercentage}%</span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Complete</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Modules Completed</span>
                      <span className="font-bold text-slate-900">{completedCount} / {modules.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Estimated Time Left</span>
                      <span className="font-bold text-slate-900">12h 45m</span>
                    </div>
                  </div>
                  
                  <hr className="my-6 border-slate-100" />
                  
                  {/* What you'll learn */}
                  <div className="">
                    <h3 className="font-heading text-sm font-bold text-slate-900 mb-3">Skills you&apos;ll gain</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-md">CI/CD</span>
                      <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-md">Docker</span>
                      <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-md">Kubernetes</span>
                      <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-md">Terraform</span>
                      <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-md">AWS</span>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />

                  {/* Reward */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-sm border border-slate-700 p-5 text-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <Trophy className="w-24 h-24" />
                    </div>
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-sm">
                        <Award className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-bold mb-1">Earn a Certificate</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-3">
                          Complete all modules to earn your DevOps Mastery certificate.
                        </p>
                        <button className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1">
                          View details
                          <ArrowLeft className="w-3 h-3 rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Avatar({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="inline-block h-[40px] w-[40px] rounded-full ring-2 ring-indigo-600 object-cover z-0 relative transition-transform duration-300 hover:scale-110 hover:z-20"
      src={src}
      alt="User"
    />
  );
}
