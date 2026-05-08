'use client';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import { Clock, BookOpen, Target, Flame, ArrowUpRight, TrendingUp } from 'lucide-react';

const learningActivityData = [
  { name: 'Mon', hours: 1.5 },
  { name: 'Tue', hours: 2.0 },
  { name: 'Wed', hours: 3.2 },
  { name: 'Thu', hours: 1.8 },
  { name: 'Fri', hours: 4.5 },
  { name: 'Sat', hours: 5.0 },
  { name: 'Sun', hours: 2.5 },
];

const categoryData = [
  { name: 'DevOps', value: 45 },
  { name: 'Frontend', value: 30 },
  { name: 'Backend', value: 80 },
  { name: 'Design', value: 20 },
  { name: 'Data', value: 55 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Time Spent" 
          value="42h 15m" 
          trend="+12%" 
          positive={true}
          icon={<Clock className="w-6 h-6 text-blue-600" />} 
        />
        <StatCard 
          title="Courses Completed" 
          value="12" 
          trend="+2" 
          positive={true}
          icon={<BookOpen className="w-6 h-6 text-indigo-600" />} 
        />
        <StatCard 
          title="Average Score" 
          value="94%" 
          trend="+1.5%" 
          positive={true}
          icon={<Target className="w-6 h-6 text-green-600" />} 
        />
        <StatCard 
          title="Current Streak" 
          value="8 Days" 
          trend="Top 10%" 
          positive={true}
          icon={<Flame className="w-6 h-6 text-orange-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900">Learning Activity</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Hours spent learning over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+18% vs last week</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={learningActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#2563EB" 
                  strokeWidth={4} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563EB' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#2563EB' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-8">
            <h2 className="text-lg font-bold font-heading text-slate-900">Top Categories</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Time distribution by topic</p>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#2563EB' : '#93C5FD'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, positive, icon }: { title: string, value: string, trend: string, positive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-md ${positive ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'}`}>
          {positive && <ArrowUpRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 font-medium text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold font-heading text-slate-900">{value}</p>
      </div>
    </div>
  );
}
