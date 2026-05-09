import { Circle, LayoutGrid, BookOpen, Layers, BarChart2, Users, Book, Archive, MessageSquare, Settings, Map } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({ activeRoute = '/paths' }: { activeRoute?: string }) {
  return (
    <aside className="w-20 flex-shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col items-center py-6 gap-8 z-20 hidden md:flex h-full">
      {/* Logo */}
      <Link href="/" className="mb-4 text-blue-600 hover:opacity-80 transition-opacity">
        <Circle size={32} strokeWidth={4} />
      </Link>
      
      {/* Nav Icons */}
      <nav className="flex flex-col gap-6 flex-grow">
        <NavItem href="/" icon={<LayoutGrid size={24} />} active={activeRoute === '/'} label="Dashboard" />
        <NavItem href="/courses" icon={<BookOpen size={24} />} active={activeRoute === '/courses'} label="Courses" />
        <NavItem href="/paths" icon={<Layers size={24} />} active={activeRoute === '/paths'} label="Learning Paths" />
        <NavItem href="/analytics" icon={<BarChart2 size={24} />} active={activeRoute === '/analytics'} label="Analytics" />
        <NavItem href="/knowledge-map" icon={<Map size={24} />} active={activeRoute === '/knowledge-map'} label="Knowledge Map" />
        <NavItem href="/team" icon={<Users size={24} />} active={activeRoute === '/team'} label="Team" />
        <NavItem href="/library" icon={<Book size={24} />} active={activeRoute === '/library'} label="Library" />
        <NavItem href="/archive" icon={<Archive size={24} />} active={activeRoute === '/archive'} label="Archive" />
      </nav>
      
      {/* Bottom Nav Icons */}
      <div className="flex flex-col gap-4">
        <NavItem href="/messages" icon={<MessageSquare size={24} />} active={activeRoute === '/messages'} label="Messages" />
        <NavItem href="/settings" icon={<Settings size={24} />} active={activeRoute === '/settings'} label="Settings" />
      </div>
    </aside>
  );
}

function NavItem({ icon, active, href, label }: { icon: React.ReactNode; active?: boolean; href: string; label: string }) {
  return (
    <Link
      href={href}
      title={label}
      className={`p-3 cursor-pointer rounded-xl transition-all block relative group ${
        active
          ? 'bg-white shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] text-blue-600'
          : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
      }`}
    >
      {icon}
      {/* Tooltip on hover */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    </Link>
  );
}

