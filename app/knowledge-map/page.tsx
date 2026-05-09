import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KnowledgeMapClient from '@/components/KnowledgeMapClient';

export default function KnowledgeMapPage() {
  return (
    <>
      <Sidebar activeRoute="/knowledge-map" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-slate-50 relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-hidden flex flex-col pt-6 px-4 md:px-8 pb-4">
          <KnowledgeMapClient />
        </div>
      </main>
    </>
  );
}
