import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import LearningPathCard from '@/components/LearningPathCard';
import CreatePathModal from '@/components/CreatePathModal';
import { Search, Plus, Download } from 'lucide-react';

export default function PathsPage() {
  return (
    <>
      <Sidebar activeRoute="/paths" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-white relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 bg-white">
          {/* Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900">Learning Paths</h1>
              <p className="text-slate-500 mt-2 text-lg">Organize courses into structured learning journeys</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64 hidden sm:block">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search paths..."
                  className="block w-full bg-slate-50 border-transparent rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white border focus:border-blue-600 transition-colors"
                />
              </div>
              <CreatePathModal trigger={
                <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Create Path
                </button>
              } />
              <button className="border border-slate-200 text-blue-600 px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors bg-white">
                <Download className="w-5 h-5" />
                Import Course
              </button>
            </div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            <LearningPathCard />
            
            {/* Empty Slots */}
            <CreatePathModal trigger={<EmptySlot />} />
            <CreatePathModal trigger={<EmptySlot className="hidden md:flex" />} />
            <CreatePathModal trigger={<EmptySlot className="hidden xl:flex" />} />
          </div>
        </div>
      </main>
    </>
  );
}

function EmptySlot({ className = '', onClick }: { className?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-slate-50 border border-dashed border-slate-200 rounded-[20px] h-[400px] flex flex-col items-center justify-center text-slate-300 hover:bg-slate-100 hover:text-slate-400 hover:border-slate-300 transition-colors cursor-pointer ${className}`}>
      <Plus className="w-10 h-10 mb-2 stroke-[1.5]" />
      <span className="text-sm font-medium">Empty Slot</span>
    </div>
  );
}
