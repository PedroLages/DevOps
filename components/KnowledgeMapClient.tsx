'use client';

import React, { useState, useMemo } from 'react';
import { Treemap, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Brain, Search, Filter, AlertTriangle, ArrowRight, X, ChevronRight, Activity, Percent, Clock } from 'lucide-react';

const FSRS_DATA = [
  {
    name: 'Computer Science',
    children: [
      { name: 'Data Structures', size: 120, mastery: 'solid', score: 95, completion: 100, topicId: 'cs1', reviewAction: 'Retake Quiz' },
      { name: 'Algorithms', size: 150, mastery: 'fading', score: 72, completion: 80, topicId: 'cs2', reviewAction: 'Review Flashcards' },
      { name: 'Operating Systems', size: 80, mastery: 'weak', score: 45, completion: 100, topicId: 'cs3', reviewAction: 'Review 15 flashcards' },
      { name: 'Computer Architecture', size: 90, mastery: 'solid', score: 88, completion: 100, topicId: 'cs4', reviewAction: 'Retake Quiz' },
      { name: 'Networking', size: 110, mastery: 'fading', score: 68, completion: 90, topicId: 'cs5', reviewAction: 'Review 20 flashcards' },
      { name: 'Databases', size: 130, mastery: 'solid', score: 92, completion: 100, topicId: 'cs6', reviewAction: 'Retake Quiz' },
    ]
  },
  {
    name: 'System Design',
    children: [
      { name: 'Scalability', size: 140, mastery: 'solid', score: 96, completion: 100, topicId: 'sd1', reviewAction: 'Retake Quiz' },
      { name: 'Microservices', size: 110, mastery: 'weak', score: 55, completion: 100, topicId: 'sd2', reviewAction: 'Review 28 flashcards' },
      { name: 'Message Queues', size: 70, mastery: 'solid', score: 89, completion: 100, topicId: 'sd3', reviewAction: 'Retake Quiz' },
      { name: 'Caching', size: 85, mastery: 'fading', score: 74, completion: 100, topicId: 'sd4', reviewAction: 'Review 10 flashcards' },
    ]
  },
  {
    name: 'DevOps & Cloud',
    children: [
      { name: 'Docker', size: 95, mastery: 'solid', score: 91, completion: 100, topicId: 'do1', reviewAction: 'Retake Quiz' },
      { name: 'Kubernetes', size: 160, mastery: 'weak', score: 42, completion: 60, topicId: 'do2', reviewAction: 'Review 45 flashcards' },
      { name: 'CI/CD Pipelines', size: 100, mastery: 'solid', score: 88, completion: 100, topicId: 'do3', reviewAction: 'Retake Quiz' },
      { name: 'Infrastructure as Code', size: 120, mastery: 'fading', score: 65, completion: 100, topicId: 'do4', reviewAction: 'Review 22 flashcards' },
    ]
  },
  {
    name: 'Frontend',
    children: [
      { name: 'React Patterns', size: 130, mastery: 'solid', score: 94, completion: 100, topicId: 'fe1', reviewAction: 'Retake Quiz' },
      { name: 'State Management', size: 110, mastery: 'solid', score: 90, completion: 100, topicId: 'fe2', reviewAction: 'Retake Quiz' },
      { name: 'CSS Grid & Flexbox', size: 80, mastery: 'fading', score: 76, completion: 100, topicId: 'fe3', reviewAction: 'Review Flashcards' },
      { name: 'Performance Optimization', size: 100, mastery: 'weak', score: 58, completion: 100, topicId: 'fe4', reviewAction: 'Review 18 flashcards' },
    ]
  }
];

const COLORS = {
  solid: { bg: '#dcfce7', border: '#22c55e', text: '#166534' }, // green
  fading: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' }, // amber
  weak: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' }, // red
  default: { bg: '#f1f5f9', border: '#cbd5e1', text: '#334155' } // slate for categories
};

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, value, mastery, onClick } = props;

  if (depth === 1) { // Category wrapper
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="transparent"
          stroke="#e2e8f0"
          strokeWidth={4}
        />
        {/* We can't easily draw a label here cleanly without overlapping children, 
            so we'll leave the category label out of the custom content SVG or draw it small. */}
      </g>
    );
  }

  if (depth === 2) { // Topic cell
    const theme = mastery ? (COLORS as any)[mastery] : COLORS.default;
    
    // Skip rendering if too small
    if (width < 30 || height < 30) {
       return (
        <g onClick={() => onClick(props)}>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={theme.bg}
            stroke="#ffffff"
            strokeWidth={2}
            style={{ cursor: 'pointer' }}
          />
        </g>
       );
    }

    return (
      <g onClick={() => onClick(props)}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={theme.bg}
          stroke="#ffffff"
          strokeWidth={2}
          style={{ cursor: 'pointer', transition: 'all 0.2s' }}
          className="hover:opacity-80"
        />
        {width > 60 && height > 40 && (
          <text
            x={x + 8}
            y={y + 20}
            fontSize={12}
            fontWeight={600}
            fill={theme.text}
            width={width - 16}
          >
            {name.length > Math.floor(width / 7) ? name.substring(0, Math.floor(width / 7)) + '...' : name}
          </text>
        )}
      </g>
    );
  }

  return null;
};

export default function KnowledgeMapClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);

  const categories = useMemo(() => ['All', ...FSRS_DATA.map(d => d.name)], []);
  
  const displayData = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return FSRS_DATA;
    }
    return FSRS_DATA.filter(d => d.name === selectedCategory);
  }, [selectedCategory]);

  const urgentTopics = useMemo(() => {
    const allTopics = FSRS_DATA.flatMap(c => c.children.map(t => ({ ...t, category: c.name })));
    return allTopics
      .filter(t => t.mastery === 'weak' || t.mastery === 'fading')
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  }, []);

  const handleCellClick = (data: any) => {
    if (data.depth === 2) {
      setSelectedTopic(data);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
      
      {/* Main Visualization Area */}
      <div className="flex-grow flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-6 border-b border-slate-100 flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Brain className="w-6 h-6 text-indigo-600" />
              Knowledge Map
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">A bird&apos;s-eye view of your entire knowledge landscape</p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  (selectedCategory === cat) || (!selectedCategory && cat === 'All')
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treemap Container */}
        <div className="flex-grow p-4 relative min-h-[400px]">
           {/* Desktop Treemap */}
           <div className="hidden md:block w-full h-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <Treemap
                 width={400}
                 height={200}
                 data={displayData}
                 dataKey="size"
                 aspectRatio={16/9}
                 stroke="#fff"
                 content={<CustomizedContent onClick={handleCellClick} />}
               />
             </ResponsiveContainer>
             
             {/* Legend */}
             <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-100 border border-green-500"></div>
                  <span className="text-xs font-bold text-slate-600">Solid (&gt;85%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-500"></div>
                  <span className="text-xs font-bold text-slate-600">Fading (60-85%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-100 border border-red-500"></div>
                  <span className="text-xs font-bold text-slate-600">Weak (&lt;60%)</span>
                </div>
             </div>
           </div>

           {/* Mobile Accordion Fallback */}
           <div className="md:hidden overflow-y-auto h-full space-y-4">
              {displayData.map((category, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">{category.name}</h3>
                  <div className="space-y-2">
                    {category.children.sort((a,b) => a.score - b.score).map((topic, tIdx) => {
                      const theme = topic.mastery === 'weak' ? 'bg-red-50 text-red-700 border-red-200' : 
                                    topic.mastery === 'fading' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-green-50 text-green-700 border-green-200';
                      return (
                        <div 
                          key={tIdx} 
                          onClick={() => setSelectedTopic({ ...topic, category: category.name })}
                          className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${theme}`}
                        >
                          <div>
                            <div className="font-bold text-sm mb-0.5">{topic.name}</div>
                            <div className="text-xs font-medium opacity-80">{topic.score}% Score • {topic.size} Lessons</div>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Detail Popover Panel (Overlay) */}
        {selectedTopic && (
          <div className="absolute inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-slate-200 shadow-2xl animate-in slide-in-from-right duration-300 z-10 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedTopic.category || 'Topic Detail'}</span>
              <button 
                onClick={() => setSelectedTopic(null)}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
               >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">{selectedTopic.name}</h2>
              
              <div className="flex items-center gap-2 mb-8">
                {selectedTopic.mastery === 'weak' && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md">Urgent Attention</span>}
                {selectedTopic.mastery === 'fading' && <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-md">Needs Review</span>}
                {selectedTopic.mastery === 'solid' && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-md">Solid Mastery</span>}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                       <Activity className="w-4 h-4" />
                     </div>
                     <span className="font-bold text-slate-700 text-sm">FSRS Score</span>
                   </div>
                   <span className="font-bold text-lg text-slate-900">{selectedTopic.score}%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                       <Percent className="w-4 h-4" />
                     </div>
                     <span className="font-bold text-slate-700 text-sm">Completion</span>
                   </div>
                   <span className="font-bold text-lg text-slate-900">{selectedTopic.completion}%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                       <Clock className="w-4 h-4" />
                     </div>
                     <span className="font-bold text-slate-700 text-sm">Last Reviewed</span>
                   </div>
                   <span className="font-bold text-sm text-slate-900">
                     {selectedTopic.mastery === 'weak' ? '12 days ago' : selectedTopic.mastery === 'fading' ? '5 days ago' : '2 days ago'}
                   </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Recommended Action</span>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
                  {selectedTopic.reviewAction} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Focus Areas Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6 h-full min-h-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
             <h2 className="font-heading text-lg font-bold text-slate-900">Focus Areas</h2>
             <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          
          <p className="text-sm text-slate-600 mb-6">These core topics are decaying fastest in your memory model. Review them soon.</p>

          <div className="space-y-4 flex-grow">
            {urgentTopics.map((topic, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                onClick={() => setSelectedTopic(topic)}
              >
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-slate-100">{topic.category}</span>
                   <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                     topic.mastery === 'weak' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                   }`}>
                     {topic.mastery === 'weak' ? 'Critical' : 'Fading'}
                   </span>
                 </div>
                 <h3 className="font-bold text-slate-900 text-sm mb-1">{topic.name}</h3>
                 <p className="text-xs text-slate-500 font-medium mb-3">Score: {topic.score}% • Needs action</p>
                 <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:text-blue-700">
                   {topic.reviewAction} <ArrowRight className="w-3 h-3" />
                 </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 font-bold text-sm shadow-sm transition-colors">
            Start Smart Review Session
          </button>
        </div>
      </div>

    </div>
  );
}
