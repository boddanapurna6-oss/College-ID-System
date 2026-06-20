'use client';

import { Application } from '@/lib/mockData';

interface AdminStatsProps {
  applications: Application[];
}

export default function AdminStats({ applications }: AdminStatsProps) {
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    ready: applications.filter((a) => a.status === 'ready_for_pickup').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
    revenue: applications.reduce((sum, a) => sum + a.amount, 0),
  };

  const statCards = [
    {
      label: 'Total Applications',
      value: stats.total,
      color: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
    },
    {
      label: 'Pending Review',
      value: stats.pending,
      color: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-900',
    },
    {
      label: 'Approved',
      value: stats.approved,
      color: 'from-purple-50 to-purple-100 border-purple-200 text-purple-900',
    },
    {
      label: 'Ready for Pickup',
      value: stats.ready,
      color: 'from-green-50 to-green-100 border-green-200 text-green-800',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      color: 'from-red-50 to-red-100 border-red-200 text-red-900',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats.revenue}`,
      color: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} border rounded-xl p-6 text-center`}
        >
          <p className="text-sm font-medium opacity-80 mb-1">{stat.label}</p>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
