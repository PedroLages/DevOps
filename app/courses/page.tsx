import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Search, Filter, PlayCircle, Star, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

const COURSES = [
  {
    id: 'docker-basics',
    title: 'Docker Basics',
    description: 'Containerize your applications with Docker. Understand images, containers, volumes, and networks.',
    instructor: 'Alex Rivera',
    rating: 4.8,
    reviews: 1240,
    duration: '3h 15m',
    lessons: 12,
    level: 'Beginner',
    category: 'DevOps',
    image: 'https://picsum.photos/seed/docker/600/300',
    progress: 65,
  },
  {
    id: 'advanced-react',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts including higher-order components, render props, and custom hooks.',
    instructor: 'Sarah Mitchell',
    rating: 4.9,
    reviews: 3421,
    duration: '8h 20m',
    lessons: 42,
    level: 'Advanced',
    category: 'Frontend',
    image: 'https://picsum.photos/seed/react/600/300',
    progress: 32,
  },
  {
    id: 'kubernetes-mastery',
    title: 'Kubernetes Mastery',
    description: 'Deploy, scale, and manage containerized applications with Kubernetes in production.',
    instructor: 'Alex Rivera',
    rating: 4.7,
    reviews: 890,
    duration: '12h 45m',
    lessons: 56,
    level: 'Intermediate',
    category: 'DevOps',
    image: 'https://picsum.photos/seed/k8s/600/300',
    progress: 0,
  },
  {
    id: 'system-design',
    title: 'System Design Interview Prep',
    description: 'Learn how to design scalable and distributed systems for top tier tech interviews.',
    instructor: 'David Chen',
    rating: 4.9,
    reviews: 5210,
    duration: '15h 30m',
    lessons: 60,
    level: 'Advanced',
    category: 'Architecture',
    image: 'https://picsum.photos/seed/sys/600/300',
    progress: 0,
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js App Router',
    description: 'Build full-stack applications with the new Next.js App Router, Server Actions, and React Server Components.',
    instructor: 'Sarah Mitchell',
    rating: 4.8,
    reviews: 2150,
    duration: '6h 10m',
    lessons: 28,
    level: 'Intermediate',
    category: 'Frontend',
    image: 'https://picsum.photos/seed/nextjs/600/300',
    progress: 0,
  },
  {
    id: 'intro-to-rust',
    title: 'Introduction to Rust',
    description: 'Learn the fundamentals of Rust programming language, focusing on memory safety and concurrency.',
    instructor: 'Elena Rostova',
    rating: 4.7,
    reviews: 1840,
    duration: '9h 15m',
    lessons: 35,
    level: 'Beginner',
    category: 'Backend',
    image: 'https://picsum.photos/seed/rust/600/300',
    progress: 0,
  }
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Architecture', 'Mobile', 'Data Science'];

export default function CoursesPage() {
  return (
    <>
      <Sidebar activeRoute="/courses" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-white relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 bg-slate-50">
          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900">Course Catalog</h1>
              <p className="text-slate-500 mt-2 text-lg">Explore our comprehensive library of tech courses</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search courses, topics, instructors..."
                  className="block w-full bg-white border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors shadow-sm"
                />
              </div>
              <button className="bg-white border border-slate-200 text-slate-700 p-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm" title="Filters">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CATEGORIES.map((category, index) => (
              <button 
                key={category}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  index === 0 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {COURSES.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="h-48 relative overflow-hidden bg-slate-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 text-[10px] uppercase tracking-wider font-bold">
                      {course.category}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-900/70 backdrop-blur-md rounded-lg text-white text-[10px] uppercase tracking-wider font-bold">
                      {course.level}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircle className="w-8 h-8 fill-current text-blue-600" />
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center text-xs font-bold text-white mb-1.5">
                        <span>{course.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full w-0 transition-all duration-1000 ease-in-out" 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 mb-3 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-medium ml-1">({course.reviews})</span>
                  </div>
                  
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                         {course.instructor.charAt(0)}
                       </div>
                       <span className="text-xs font-medium text-slate-700">{course.instructor}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.lessons}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
