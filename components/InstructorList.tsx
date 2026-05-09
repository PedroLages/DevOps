'use client';

import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Star, Users, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Instructor = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  rating: number;
  students: number;
  coursesAuthored: number;
  tags: string[];
};

const INSTRUCTORS: Instructor[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Lead Cloud Architect',
    avatar: 'https://picsum.photos/seed/sarah/150/150',
    location: 'San Francisco, CA',
    rating: 4.9,
    students: 12400,
    coursesAuthored: 8,
    tags: ['AWS', 'Kubernetes', 'DevOps'],
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Senior Frontend Engineer',
    avatar: 'https://picsum.photos/seed/david/150/150',
    location: 'Toronto, ON',
    rating: 4.8,
    students: 8300,
    coursesAuthored: 5,
    tags: ['React', 'Next.js', 'CSS'],
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Data Science Director',
    avatar: 'https://picsum.photos/seed/elena/150/150',
    location: 'London, UK',
    rating: 4.9,
    students: 15200,
    coursesAuthored: 12,
    tags: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    role: 'Cybersecurity Expert',
    avatar: 'https://picsum.photos/seed/marcus/150/150',
    location: 'Austin, TX',
    rating: 4.7,
    students: 6100,
    coursesAuthored: 4,
    tags: ['Security', 'Network', 'Compliance'],
  },
  {
    id: '5',
    name: 'Emily Wong',
    role: 'UX Research Lead',
    avatar: 'https://picsum.photos/seed/emily/150/150',
    location: 'Seattle, WA',
    rating: 4.6,
    students: 4200,
    coursesAuthored: 3,
    tags: ['UX Design', 'Research', 'Figma'],
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Backend Systems Engineer',
    avatar: 'https://picsum.photos/seed/james/150/150',
    location: 'Berlin, DE',
    rating: 4.8,
    students: 9500,
    coursesAuthored: 7,
    tags: ['Node.js', 'Go', 'Microservices'],
  }
];

export default function InstructorList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstructors = INSTRUCTORS.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inst.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
         <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name, role or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-colors"
            />
         </div>
         <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm bg-white shadow-sm">
                Filters
            </button>
            <button className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm text-sm">
                <Plus className="w-4 h-4" />
                Invite
            </button>
         </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredInstructors.map(instructor => (
           <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col group">
       <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
             <Image 
                src={instructor.avatar} 
                alt={instructor.name} 
                width={64} 
                height={64} 
                className="rounded-full object-cover ring-4 ring-slate-50 group-hover:ring-blue-50 transition-colors"
                referrerPolicy="no-referrer"
             />
             <div>
               <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">{instructor.name}</h3>
               <p className="text-sm font-medium text-blue-600">{instructor.role}</p>
             </div>
          </div>
          <button className="text-slate-400 hover:bg-slate-100 hover:text-slate-600 p-2 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
       </div>
       
       <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
             <MapPin className="w-4 h-4" />
             {instructor.location}
          </div>
          <div className="flex justify-between items-center text-sm font-medium mt-4">
             <div className="flex flex-col items-center gap-1 border-r border-slate-100 pr-4">
                <span className="flex items-center gap-1 text-slate-900 font-bold text-base">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {instructor.rating}
                </span>
                <span className="text-xs text-slate-500">Rating</span>
             </div>
             <div className="flex flex-col items-center gap-1 border-r border-slate-100 px-4">
                <span className="flex items-center gap-1 text-slate-900 font-bold text-base">
                  {instructor.students.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">Students</span>
             </div>
             <div className="flex flex-col items-center gap-1 pl-4">
                <span className="flex items-center gap-1 text-slate-900 font-bold text-base">
                  {instructor.coursesAuthored}
                </span>
                <span className="text-xs text-slate-500">Courses</span>
             </div>
          </div>
       </div>

       <div className="mb-6 flex flex-wrap gap-2">
         {instructor.tags.map(tag => (
           <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-200">
             {tag}
           </span>
         ))}
       </div>

       <hr className="border-slate-100 mb-4" />

       <div className="flex items-center gap-3">
         <Link href={`/team/${instructor.id}`} className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold text-sm py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm focus:ring-2 focus:ring-slate-100 focus:outline-none flex items-center justify-center">
            View Profile
         </Link>
         <button className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-100 focus:outline-none">
            <Mail className="w-5 h-5" />
         </button>
       </div>
    </div>
  );
}
