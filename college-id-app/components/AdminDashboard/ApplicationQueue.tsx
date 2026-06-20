'use client';

import { Application, certificateTypes } from '@/lib/mockData';
import { useState } from 'react';
import { useApplicationContext } from '@/lib/ApplicationContext';
import ApplicationCard from './ApplicationCard';

interface ApplicationQueueProps {
  applications: Application[];
}

export default function ApplicationQueue({ applications }: ApplicationQueueProps) {
  const { updateApplicationStatus } = useApplicationContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    updateApplicationStatus(appId, newStatus);
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-xl">
        <p className="text-lg font-medium text-foreground">No applications found</p>
        <p className="text-muted-foreground mt-2">All applications have been processed or no matches were found</p>
      </div>
    );
  }

  // Sort by priority: pending first, then by date
  const sortedApplications = [...applications].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedApplications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          isExpanded={expandedId === app.id}
          onToggleExpand={() => setExpandedId(expandedId === app.id ? null : app.id)}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
