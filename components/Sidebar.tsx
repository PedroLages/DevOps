import { Circle, LayoutGrid, BookOpen, Layers, BarChart2, Users, Book, Archive, MessageSquare, Settings } from 'lucide-react';
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
        <NavItem href="/" icon={<LayoutGrid size={24} />} active={activeRoute === '/'} />
        <NavItem href="/courses" icon={<BookOpen size={24} />} active={activeRoute === '/courses'} />
        <NavItem href="/" icon={<Layers size={24} />} active={activeRoute === '/paths'} />
        <NavItem href="/analytics" icon={<BarChart2 size={24} />} active={activeRoute === '/analytics'} />
        <NavItem href="/team" icon={<Users size={24} />} active={activeRoute === '/team'} />
        <NavItem href="/library" icon={<Book size={24} />} active={activeRoute === '/library'} />
        <NavItem href="/archive" icon={<Archive size={24} />} active={activeRoute === '/archive'} />
      </nav>
      
      {/* Bottom Nav Icons */}
      <div className="flex flex-col gap-4">
        <NavItem href="/messages" icon={<MessageSquare size={24} />} active={activeRoute === '/messages'} />
        <NavItem href="/settings" icon={<Settings size={24} />} active={activeRoute === '/settings'} />
      </div>
    </aside>
  );
}

function NavItem({ icon, active, href }: { icon: React.ReactNode; active?: boolean; href: string }) {
  return (
    <Link
      href={href}
      className={`p-3 cursor-pointer rounded-xl transition-all block ${
        active
          ? 'bg-white shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] text-blue-600'
          : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
      }`}
    >
      {icon}
    </Link>
  );
}

