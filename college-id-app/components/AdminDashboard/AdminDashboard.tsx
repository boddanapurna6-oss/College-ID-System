'use client';

import { useState } from 'react';
import { useApplicationContext } from '@/lib/ApplicationContext';
import AdminStats from './AdminStats';
import ApplicationQueue from './ApplicationQueue';
import AdminSearch from './AdminSearch';

export default function AdminDashboard() {
  const { getAllApplications } = useApplicationContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'ready_for_pickup' | 'rejected'>('all');

  const allApplications = getAllApplications();

  const filteredApplications = allApplications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Manage ID card and certificate applications</p>
      </div>

      {/* Stats */}
      <AdminStats applications={allApplications} />

      {/* Search and Filter */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminSearch value={searchTerm} onChange={setSearchTerm} />

          {/* Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="ready_for_pickup">Ready for Pickup</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} of {allApplications.length} applications
        </p>
      </div>

      {/* Application Queue */}
      <ApplicationQueue applications={filteredApplications} />
    </div>
  );
}
