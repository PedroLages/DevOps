import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import InstructorList from '@/components/InstructorList';

export default function TeamPage() {
  return (
    <>
      <Sidebar activeRoute="/team" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-white relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 bg-slate-50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900">Instructors & Team</h1>
              <p className="text-slate-500 mt-2 text-lg">Manage your learning team and external instructors</p>
            </div>
          </div>

          <InstructorList />
        </div>
      </main>
    </>
  );
}
