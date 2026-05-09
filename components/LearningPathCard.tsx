'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, ArrowRight, X, Edit2, Trash2, Plus, GripVertical, Save, XCircle, CheckCircle2, Circle, FastForward, Play } from 'lucide-react';
import Image from 'next/image';

type Course = {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  skipped?: boolean;
  description?: string;
};

export default function LearningPathCard() {
  const router = useRouter();
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', title: 'Introduction to CI/CD', duration: '2h', completed: true, description: 'Learn the fundamentals of Continuous Integration and Continuous Deployment.' },
    { id: '2', title: 'Docker Basics', duration: '3h 15m', completed: false, description: 'Containerize your applications with Docker.' },
    { id: '3', title: 'Kubernetes Orchestration', duration: '5h', completed: false, description: 'Manage containerized applications at scale using Kubernetes.' },
    { id: '4', title: 'Infrastructure as Code', duration: '4h 30m', completed: false, description: 'Automate infrastructure provisioning with tools like Terraform.' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [durationError, setDurationError] = useState(false);
  
  const [draggedCourseId, setDraggedCourseId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setEditTitle(course.title);
    setEditDuration(course.duration);
    setEditDescription(course.description || '');
    setDurationError(false);
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditTitle('');
    setEditDuration('');
    setEditDescription('');
    setDurationError(false);
  };

  const formatDuration = (input: string): string | null => {
    const regex = /^(?:(\d+)\s*(?:h|hr|hrs|hour|hours))?\s*(?:and\s*)?\s*(?:(\d+)\s*(?:m|min|mins|minute|minutes))?$/i;
    const match = input.trim().match(regex);
    
    if (!match) return null;
    if (!match[1] && !match[2]) return null;
    
    const h = match[1] ? parseInt(match[1], 10) : 0;
    const m = match[2] ? parseInt(match[2], 10) : 0;
    
    if (h === 0 && m === 0) return null;
    
    const finalH = h + Math.floor(m / 60);
    const finalM = m % 60;
    
    const parts = [];
    if (finalH > 0) parts.push(`${finalH}h`);
    if (finalM > 0) parts.push(`${finalM}m`);
    
    return parts.join(' ');
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;

    const formattedDuration = formatDuration(editDuration);
    if (!formattedDuration) {
      setDurationError(true);
      return;
    }
    setDurationError(false);
    
    if (editingId === 'new') {
      setCourses([...courses, { id: Date.now().toString(), title: editTitle, duration: formattedDuration, completed: false, description: editDescription }]);
    } else {
      setCourses(courses.map(c => c.id === editingId ? { ...c, title: editTitle, duration: formattedDuration, description: editDescription } : c));
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDurationError(false);
  };

  const markCompleted = (courseId: string, completed: boolean) => {
    setCourses(courses.map(c => c.id === courseId ? { ...c, completed, skipped: false } : c));
    if (completed) {
      setCompletionMessage('Course completed! 🎉');
      setTimeout(() => setCompletionMessage(null), 3000);
    }
  };

  const markSkipped = (courseId: string, skipped: boolean) => {
    setCourses(courses.map(c => c.id === courseId ? { ...c, skipped, completed: false } : c));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedCourseId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedCourseId || draggedCourseId === id) return;
    
    const draggedIdx = courses.findIndex(c => c.id === draggedCourseId);
    const dropIdx = courses.findIndex(c => c.id === id);
    
    const newCourses = [...courses];
    const [draggedItem] = newCourses.splice(draggedIdx, 1);
    newCourses.splice(dropIdx, 0, draggedItem);
    setCourses(newCourses);
  };

  const handleDragEnd = () => {
    setDraggedCourseId(null);
  };

  // We consider both completed and skipped as progress
  const progressCount = courses.filter(c => c.completed || c.skipped).length;
  const progressPercentage = courses.length ? Math.round((progressCount / courses.length) * 100) : 0;
  const dashArray = 263.89; // 2 * pi * 42
  const dashOffset = dashArray - (dashArray * progressPercentage) / 100;

  return (
    <>
      <article 
        onClick={() => !isPlaying && router.push('/path/devops-roadmap')}
        className={`bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 group flex flex-col h-[420px] ${!isPlaying ? 'hover:-translate-y-1.5 cursor-pointer' : ''}`}
      >
        {/* Card Header / Banner */}
        <div className="h-[140px] bg-slate-900 relative flex-shrink-0">
          {isPlaying ? (
            <video 
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-cover" 
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 transition-colors duration-500 group-hover:from-indigo-600 group-hover:to-purple-700 relative p-4 flex items-center justify-center">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}
                className="bg-white/20 p-4 rounded-full cursor-pointer hover:bg-white/40 hover:scale-110 text-white backdrop-blur-sm transition-all shadow-lg"
                title="Play Intro Video"
              >
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>
          )}
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsManageModalOpen(true); }}
            className={`absolute top-4 right-4 p-2 rounded-full cursor-pointer text-white backdrop-blur-sm transition-colors ${isPlaying ? 'bg-black/40 hover:bg-black/60' : 'bg-white/20 hover:bg-white/40'}`}
            title="Manage Courses"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        {/* Card Content */}
        <div className="p-6 pt-[52px] relative flex-grow flex flex-col bg-white">
          {/* Circular Progress */}
          <div className="absolute left-6 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 flex items-center justify-center w-[76px] h-[76px] -top-10 transition-transform duration-300 group-hover:scale-110">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* SVG Progress Ring */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-slate-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-blue-600 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-800 tracking-tight transition-transform duration-300 group-hover:scale-110">{progressPercentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-2 flex-grow flex flex-col">
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-widest transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-blue-700">DevOps Roadmap</h3>
            <p className="text-sm text-slate-500 font-medium leading-[1.6] line-clamp-2">
              Master the tools and practices for modern infrastructure, CI/CD pipelines, and cloud-native deployments.
            </p>

            {/* Enhanced Progress Indicator */}
            <div className="mt-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
                <span>Modules</span>
                <span className="text-blue-600">{progressCount} of {courses.length} completed</span>
              </div>
              <div className="flex gap-1.5 h-1.5 w-full">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className={`flex-1 rounded-full bg-slate-100 overflow-hidden relative`}
                  >
                     <div 
                      className={`absolute inset-0 rounded-full transition-all duration-500 origin-left ${course.completed ? 'bg-blue-600 scale-x-100' : course.skipped ? 'bg-amber-400 scale-x-100' : 'bg-blue-600 scale-x-0'}`} 
                     />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-5">
            <div className="h-px bg-slate-100 w-full mb-4 transition-colors duration-300 group-hover:bg-slate-200"></div>
            <div className="flex items-center justify-between">
              {/* Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <Avatar src="https://picsum.photos/seed/user1/100/100" />
                <Avatar src="https://picsum.photos/seed/user2/100/100" />
                <Avatar src="https://picsum.photos/seed/user3/100/100" />
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-slate-100 border-[2px] border-white text-[10px] font-bold text-slate-600 z-10 relative">
                  +1
                </div>
              </div>
              
              {/* Continue Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); /* Continue logic */ router.push('/path/devops-roadmap'); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm group-hover:shadow-md group-hover:px-6 duration-300"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Course Management Modal Overlay */}
      {isManageModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[80vh] relative">
            
            {/* Completion Success Banner */}
            {completionMessage && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-in slide-in-from-top-4 fade-in duration-300 z-20 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 fill-white text-green-600" />
                {completionMessage}
              </div>
            )}

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">Manage Courses</h2>
                <p className="text-sm text-slate-500 mt-1">DevOps Roadmap</p>
              </div>
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-grow overflow-y-auto p-6 bg-slate-50/30">
              <div className="space-y-3">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    draggable={editingId !== course.id}
                    onDragStart={(e) => handleDragStart(e, course.id)}
                    onDragOver={(e) => handleDragOver(e, course.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border rounded-xl p-4 shadow-sm transition-all group/row flex items-start gap-4 
                      ${course.completed ? 'border-green-200 bg-green-50' : ''} 
                      ${course.skipped ? 'border-amber-200 bg-amber-50/50 grayscale-[0.2]' : ''}
                      ${!course.completed && !course.skipped ? 'border-slate-200 hover:border-slate-300' : ''}
                      ${draggedCourseId === course.id ? 'opacity-40 scale-[0.98]' : 'opacity-100'} 
                      ${editingId === course.id ? 'ring-2 ring-blue-100' : ''}`}
                  >
                    <div className="mt-1 text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    {editingId === course.id ? (
                      // Edit Mode
                      <div className="flex-grow space-y-3">
                        <div>
                          <input 
                            type="text" 
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className="w-full text-sm font-semibold border-b border-slate-200 pb-1 focus:outline-none focus:border-blue-600 text-slate-900 bg-transparent placeholder-slate-400"
                            placeholder="Course title"
                            autoFocus
                          />
                        </div>
                        <div>
                           <textarea
                             value={editDescription}
                             onChange={e => setEditDescription(e.target.value)}
                             className="w-full text-xs font-medium border border-slate-200 rounded-md p-2 focus:outline-none focus:border-blue-600 text-slate-600 bg-transparent placeholder-slate-400 resize-none h-16"
                             placeholder="Course description (optional)"
                           />
                        </div>
                        <div className="flex items-center gap-2 relative">
                          <input 
                            type="text" 
                            value={editDuration}
                            onChange={e => { setEditDuration(e.target.value); setDurationError(false); }}
                            className={`w-36 text-xs font-medium border-b pb-1 focus:outline-none bg-transparent placeholder-slate-400 ${durationError ? 'border-red-500 text-red-600 focus:border-red-600' : 'border-slate-200 text-slate-600 focus:border-blue-600'}`}
                            placeholder="Duration (e.g. 2h, 30m)"
                          />
                          {durationError && (
                            <span className="absolute -bottom-4 left-0 text-[9px] text-red-500 font-bold tracking-wide">Invalid format</span>
                          )}
                          <div className="flex flex-1 justify-end gap-2">
                            <button onClick={handleCancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors title='Cancel'">
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button onClick={handleSave} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors title='Save'">
                              <Save className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex-grow flex items-center gap-3">
                           {course.completed && (
                             <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                           )}
                           {course.skipped && (
                             <FastForward className="w-4 h-4 text-amber-500 flex-shrink-0" />
                           )}
                           {(!course.completed && !course.skipped) && (
                             <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                           )}
                           <div>
                             <h4 className={`text-sm font-semibold ${course.completed || course.skipped ? 'text-slate-700' : 'text-slate-900'}`}>{course.title}</h4>
                             <p className="text-xs font-medium text-slate-500 mt-1">{course.duration}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                           <button 
                             onClick={() => markSkipped(course.id, !course.skipped)}
                             className={`p-2 rounded-lg transition-colors ${course.skipped ? 'text-amber-600 bg-amber-100 hover:bg-amber-200' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                             title={course.skipped ? 'Unskip course' : 'Skip course'}
                           >
                             <FastForward className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => markCompleted(course.id, !course.completed)}
                             className={`p-2 rounded-lg transition-colors ${course.completed ? 'text-green-600 bg-green-100 hover:bg-green-200' : 'text-slate-400 hover:text-green-600 hover:bg-green-50'}`}
                             title={course.completed ? 'Mark incomplete' : 'Mark completed'}
                           >
                             <CheckCircle2 className="w-4 h-4" />
                           </button>
                          <button onClick={() => handleEdit(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {/* Add New Skeleton / Form */}
                {editingId === 'new' ? (
                  <div className="bg-white border-2 border-blue-100 rounded-xl p-4 shadow-sm flex items-start gap-4">
                    <div className="mt-1 text-slate-200">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="flex-grow space-y-3">
                      <div>
                        <input 
                          type="text" 
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          className="w-full text-sm font-semibold border-b border-slate-200 pb-1 focus:outline-none focus:border-blue-600 text-slate-900 bg-transparent placeholder-slate-400"
                          placeholder="New course title"
                          autoFocus
                        />
                      </div>
                      <div>
                         <textarea
                           value={editDescription}
                           onChange={e => setEditDescription(e.target.value)}
                           className="w-full text-xs font-medium border border-slate-200 rounded-md p-2 focus:outline-none focus:border-blue-600 text-slate-600 bg-transparent placeholder-slate-400 resize-none h-16"
                           placeholder="Course description (optional)"
                         />
                      </div>
                      <div className="flex items-center gap-2 relative">
                        <input 
                          type="text" 
                          value={editDuration}
                          onChange={e => { setEditDuration(e.target.value); setDurationError(false); }}
                          className={`w-36 text-xs font-medium border-b pb-1 focus:outline-none bg-transparent placeholder-slate-400 ${durationError ? 'border-red-500 text-red-600 focus:border-red-600' : 'border-slate-200 text-slate-600 focus:border-blue-600'}`}
                          placeholder="Duration (e.g. 1h 30m)"
                        />
                        {durationError && (
                          <span className="absolute -bottom-4 left-0 text-[9px] text-red-500 font-bold tracking-wide">Invalid format</span>
                        )}
                        <div className="flex flex-1 justify-end gap-2">
                          <button onClick={handleCancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors title='Cancel'">
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button onClick={handleSave} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
                            <Save className="w-3.5 h-3.5" />
                            Save Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleAddNew}
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-medium hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Course
                  </button>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end">
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Avatar({ src }: { src: string }) {
  return (
    <Image
      className="inline-block h-[34px] w-[34px] rounded-full ring-[2px] ring-white object-cover shadow-sm z-0 relative transition-transform duration-300 hover:scale-110 hover:z-20 cursor-pointer"
      src={src}
      alt="User"
      width={34}
      height={34}
      referrerPolicy="no-referrer"
    />
  );
}

