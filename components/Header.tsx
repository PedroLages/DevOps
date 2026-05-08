import { Search, CheckCircle2, Settings, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white z-10 flex-shrink-0">
      <div className="flex-grow max-w-xl">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search... ⌘ K"
            className="block w-full bg-slate-50 border border-transparent rounded-lg pl-10 pr-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-2 text-green-500 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="p-2 text-slate-500 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
          <Settings className="w-5 h-5" />
        </div>
        <div className="relative p-2 text-slate-500 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity ml-2">
          <Image
            src="https://picsum.photos/seed/pedro/100/100"
            alt="Pedro Lages"
            width={32}
            height={32}
            className="rounded-full object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm font-semibold text-slate-900 hidden sm:block">Pedro Lages</span>
          <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
