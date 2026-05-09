import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ArrowUpRight, BookOpen, Clock, Flame, PlayCircle, Target } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      <Sidebar activeRoute="/" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-white relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 bg-slate-50">
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900">Welcome back, Pedro! 👋</h1>
            <p className="text-slate-500 mt-2 text-lg">Here&apos;s what&apos;s happening with your learning journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Courses in Progress" 
              value="4" 
              icon={<BookOpen className="w-6 h-6 text-blue-600" />} 
            />
            <StatCard 
              title="Hours Learned" 
              value="42.5h" 
              icon={<Clock className="w-6 h-6 text-indigo-600" />} 
            />
            <StatCard 
              title="Avg. Quiz Score" 
              value="94%" 
              icon={<Target className="w-6 h-6 text-green-600" />} 
            />
            <StatCard 
              title="Current Streak" 
              value="8 Days" 
              icon={<Flame className="w-6 h-6 text-orange-500" />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-slate-900">Continue Learning</h2>
                <Link href="/courses" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                  View all <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseCard 
                  title="Docker Basics"
                  path="DevOps Roadmap"
                  progress={65}
                  timeRemaining="1h 15m left"
                  image="https://picsum.photos/seed/docker/400/200"
                />
                <CourseCard 
                  title="Advanced React Patterns"
                  path="Frontend Architect"
                  progress={32}
                  timeRemaining="8h 20m left"
                  image="https://picsum.photos/seed/react/400/200"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900">Upcoming Live Sessions</h2>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="space-y-6">
                  <LiveSession 
                    title="System Design Interview Prep"
                    instructor="Sarah Mitchell"
                    time="Today, 2:00 PM PST"
                  />
                  <hr className="border-slate-100" />
                  <LiveSession 
                    title="Next.js App Router Masterclass"
                    instructor="David Chen"
                    time="Tomorrow, 10:00 AM PST"
                  />
                  <hr className="border-slate-100" />
                  <LiveSession 
                    title="Kubernetes Troubleshooting"
                    instructor="Sarah Mitchell"
                    time="Fri, 1:00 PM PST"
                  />
                </div>
                <button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-bold transition-colors border border-slate-200">
                  See Full Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold font-heading text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function CourseCard({ title, path, progress, timeRemaining, image }: { title: string, path: string, progress: number, timeRemaining: string, image: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="h-32 relative overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] uppercase tracking-wider font-bold">
            {path}
          </span>
          <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
            <PlayCircle className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-slate-900 text-base mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-500">{progress}% Complete</span>
            <span className="text-slate-500">{timeRemaining}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full w-0 transition-all duration-1000 ease-in-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveSession({ title, instructor, time }: { title: string, instructor: string, time: string }) {
  return (
    <div className="flex items-start gap-4 cursor-pointer group">
      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
        <PlayCircle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{title}</h4>
        <div className="flex flex-col mt-1 space-y-1">
          <span className="text-xs font-medium text-slate-500">{instructor}</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{time}</span>
        </div>
      </div>
    </div>
  );
}
