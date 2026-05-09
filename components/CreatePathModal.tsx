'use client';

import React, { useState, ReactNode } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Layers, Search } from 'lucide-react';
import Image from 'next/image';

const MOCK_COURSES = [
  { id: '1', title: 'Introduction to CI/CD', category: 'DevOps', duration: '2h', image: 'https://picsum.photos/seed/cicd/100/100' },
  { id: '2', title: 'Docker Basics', category: 'DevOps', duration: '3h 15m', image: 'https://picsum.photos/seed/docker/100/100' },
  { id: '3', title: 'Kubernetes Orchestration', category: 'DevOps', duration: '5h', image: 'https://picsum.photos/seed/k8s/100/100' },
  { id: '4', title: 'Advanced React Patterns', category: 'Frontend', duration: '12h', image: 'https://picsum.photos/seed/react/100/100' },
  { id: '5', title: 'System Design Interview', category: 'Backend', duration: '8h 20m', image: 'https://picsum.photos/seed/sysdesign/100/100' },
];

export default function CreatePathModal({ trigger }: { trigger: React.ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
    setStep(1);
    setTitle('');
    setDescription('');
    setSelectedCourses([]);
  };

  const handleClose = () => setIsOpen(false);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const filteredCourses = MOCK_COURSES.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose}></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">Create Learning Path</h2>
                  <p className="text-xs text-slate-500 font-medium">Step {step} of 3</p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1 flex-shrink-0">
              <div 
                className="bg-blue-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">Define your path</h3>
                    <p className="text-slate-500">Give your learning journey a clear title and description to guide learners.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-1.5">Path Title</label>
                      <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Fullstack Developer Bootcamp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-1.5">Description (Optional)</label>
                      <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Briefly describe what learners will achieve by completing this path..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400 resize-none font-medium text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                  <div className="text-center flex-shrink-0">
                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">Add Courses</h3>
                    <p className="text-slate-500">Select the initial courses to feature in this learning path.</p>
                  </div>

                  <div className="relative mb-2 flex-shrink-0">
                     <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Search className="h-4 w-4 text-slate-400" />
                     </span>
                     <input
                       type="text"
                       placeholder="Search available courses..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="block w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-colors"
                     />
                  </div>
                  
                  <div className="space-y-3 overflow-y-auto pr-2 pb-2 flex-grow min-h-[200px]">
                    {filteredCourses.map(course => {
                      const isSelected = selectedCourses.includes(course.id);
                      return (
                        <div 
                          key={course.id}
                          onClick={() => toggleCourse(course.id)}
                          className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                              : 'border-slate-200 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden relative">
                             <Image src={course.image} alt={course.title} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-grow">
                            <h4 className={`font-bold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{course.title}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">{course.category}</span>
                              <span className="text-xs font-medium text-slate-500">{course.duration}</span>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                        </div>
                      )
                    })}
                    
                    {filteredCourses.length === 0 && (
                       <div className="text-center py-8">
                          <p className="text-slate-500 font-medium">No courses found matching your search.</p>
                       </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-8 pt-4">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
                      <Check className="w-10 h-10 stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">Ready to publish!</h3>
                    <p className="text-slate-500">Your learning path is ready. Review the details below.</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-1">{title || 'Untitled Path'}</h4>
                    <p className="text-sm text-slate-600 mb-4">{description || 'No description provided.'}</p>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <div className="flex -space-x-2">
                        {selectedCourses.slice(0,3).map((id, idx) => {
                          const c = MOCK_COURSES.find(c => c.id === id);
                          return c ? (
                            <div key={id} className="w-6 h-6 rounded-full border-2 border-slate-50 bg-slate-200 overflow-hidden relative z-[3-idx]">
                              <Image src={c.image} alt={c.title} fill className="object-cover" referrerPolicy="no-referrer" />
                            </div>
                          ) : null;
                        })}
                      </div>
                      <span>{selectedCourses.length} courses selected</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <button 
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !title.trim()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" /> Finish & Publish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
