import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ArrowLeft, Star, MapPin, Mail, BookOpen, Clock, Users, PlayCircle, Quote, Globe, Twitter, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type InstructorData = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  students: number;
  coursesAuthored: number;
  tags: string[];
  bio: string;
  education: string;
  quote: string;
  links: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  courses: {
    id: string;
    title: string;
    duration: string;
    rating: number;
    students: number;
    image: string;
  }[];
};

const INSTRUCTORS_DATA: Record<string, InstructorData> = {
  '1': {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Lead Cloud Architect',
    avatar: 'https://picsum.photos/seed/sarah/300/300',
    location: 'San Francisco, CA',
    rating: 4.9,
    students: 12400,
    coursesAuthored: 8,
    tags: ['AWS', 'Kubernetes', 'DevOps', 'Terraform'],
    bio: 'Sarah is a Lead Cloud Architect with over 15 years of experience in designing and implementing highly scalable and distributed systems. She is passionate about mentoring the next generation of engineers and loves to break down complex architectural concepts into easy-to-understand patterns.',
    education: 'M.S. in Computer Science, Stanford University',
    quote: "The cloud is about how you do computing, not where you do computing. Great architecture is invisible.",
    links: {
      website: '#',
      twitter: '#',
      github: '#',
      linkedin: '#'
    },
    courses: [
      { id: 'c1', title: 'AWS Solutions Architect Associate', duration: '22h', rating: 4.8, students: 5400, image: 'https://picsum.photos/seed/aws/400/200' },
      { id: 'c2', title: 'Kubernetes Mastery', duration: '14h 30m', rating: 4.9, students: 8200, image: 'https://picsum.photos/seed/k8s/400/200' },
      { id: 'c3', title: 'DevOps CI/CD Pipelines', duration: '8h 15m', rating: 4.7, students: 3100, image: 'https://picsum.photos/seed/cicd/400/200' },
    ]
  },
  '2': {
    id: '2',
    name: 'David Chen',
    role: 'Senior Frontend Engineer',
    avatar: 'https://picsum.photos/seed/david/300/300',
    location: 'Toronto, ON',
    rating: 4.8,
    students: 8300,
    coursesAuthored: 5,
    tags: ['React', 'Next.js', 'CSS', 'Figma'],
    bio: 'David is a passionate UI/UX developer specializing in performant React applications. He has helped numerous Fortune 500 companies rewrite their legacy codebases to modern Next.js tech stacks.',
    education: 'B.S. in Software Engineering, University of Waterloo',
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    links: {
      website: '#',
      github: '#',
      linkedin: '#'
    },
    courses: [
      { id: 'c4', title: 'Advanced React Patterns', duration: '12h', rating: 4.8, students: 4300, image: 'https://picsum.photos/seed/react/400/200' },
      { id: 'c5', title: 'Next.js 15 Fullstack', duration: '18h 45m', rating: 4.9, students: 3900, image: 'https://picsum.photos/seed/nextjs/400/200' },
    ]
  }
};

const DEFAULT_INSTRUCTOR = INSTRUCTORS_DATA['1'];

export default async function InstructorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const instructor = INSTRUCTORS_DATA[id as keyof typeof INSTRUCTORS_DATA] || DEFAULT_INSTRUCTOR;

  return (
    <>
      <Sidebar activeRoute="/team" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-slate-50 relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-white border-b border-slate-200 pt-8 pb-12 px-8 lg:px-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 z-0 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              <Link href="/team" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 font-bold text-sm w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Team
              </Link>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                <div className="flex-shrink-0 relative">
                  <Image 
                    src={instructor.avatar} 
                    alt={instructor.name} 
                    width={180} 
                    height={180} 
                    className="rounded-3xl object-cover ring-8 ring-slate-50 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center">
                    <span className="flex items-center gap-1 font-bold text-slate-900 px-2 py-1 bg-amber-50 rounded-xl">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {instructor.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left mt-4 md:mt-0">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                    <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">{instructor.name}</h1>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                    <span className="text-xl font-medium text-blue-600 tracking-tight">{instructor.role}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden md:block"></span>
                    <span className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                      <MapPin className="w-4 h-4" />
                      {instructor.location}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-base leading-relaxed max-w-3xl mb-6">
                    {instructor.bio}
                  </p>

                  {instructor.quote && (
                    <blockquote className="mt-4 mb-8 border-l-4 border-blue-600 pl-5 py-2 bg-blue-50/50 rounded-r-xl italic text-slate-700 font-medium max-w-3xl relative">
                      <Quote className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-6 h-6 text-blue-200 fill-blue-50 opacity-0" />
                      &quot;{instructor.quote}&quot;
                    </blockquote>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-8">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                      <Mail className="w-5 h-5" />
                      Contact Instructor
                    </button>
                    
                    <div className="flex gap-4 border-l border-slate-200 pl-6">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900">{instructor.students.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Students</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900">{instructor.coursesAuthored}</span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Courses</span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-4xl text-left">
                    {/* Education */}
                    {instructor.education && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 justify-center md:justify-start">
                          <BookOpen className="w-4 h-4" /> Education
                        </h4>
                        <p className="text-sm text-slate-700 font-medium">{instructor.education}</p>
                      </div>
                    )}

                    {/* Specialties */}
                    {instructor.tags && instructor.tags.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 justify-center md:justify-start">
                          <Star className="w-4 h-4" /> Specialties
                        </h4>
                        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                          {instructor.tags.map((tag) => (
                            <span key={tag} className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {instructor.links && Object.keys(instructor.links).length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 justify-center md:justify-start">
                          <Globe className="w-4 h-4" /> Connect
                        </h4>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          {instructor.links.website && (
                            <Link href={instructor.links.website} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                              <Globe className="w-4 h-4" />
                            </Link>
                          )}
                          {instructor.links.twitter && (
                            <Link href={instructor.links.twitter} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 transition-colors">
                              <Twitter className="w-4 h-4" />
                            </Link>
                          )}
                          {instructor.links.github && (
                            <Link href={instructor.links.github} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-colors">
                              <Github className="w-4 h-4" />
                            </Link>
                          )}
                          {instructor.links.linkedin && (
                            <Link href={instructor.links.linkedin} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto px-8 lg:px-12 py-12">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Courses by {instructor.name.split(' ')[0]}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructor.courses.map(course => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col">
                  <div className="h-40 relative overflow-hidden bg-slate-100">
                    <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 flex gap-2">
                       <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                       </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-slate-400" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-400" /> {course.students.toLocaleString()}
                        </span>
                      </div>
                      
                      <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <PlayCircle className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
               <div className="relative z-10 max-w-xl">
                 <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">Want to collaborate?</h3>
                 <p className="text-slate-600 leading-relaxed">
                   {instructor.name.split(' ')[0]} regularly hosts private workshops and 1-on-1 mentoring sessions for advanced topics. Reach out to schedule a session for your team.
                 </p>
               </div>
               <button className="relative z-10 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors flex-shrink-0 shadow-md">
                 Request Workshop
               </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
