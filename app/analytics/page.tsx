import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <>
      <Sidebar activeRoute="/analytics" />
      <main className="flex-grow flex flex-col h-[100dvh] bg-white relative min-w-0">
        <Header />
        
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 bg-slate-50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900">Analytics</h1>
              <p className="text-slate-500 mt-2 text-lg">Track your learning progress and engagement</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 shadow-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
          </div>

          <AnalyticsDashboard />
        </div>
      </main>
    </>
  );
}
