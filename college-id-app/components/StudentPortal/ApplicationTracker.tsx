'use client';

import { Application, certificateTypes } from '@/lib/mockData';
import { useState } from 'react';
import ApplicationDetails from './ApplicationDetails';

interface ApplicationTrackerProps {
  applications: Application[];
  studentId: string;
  detailed?: boolean;
}

export default function ApplicationTracker({
  applications,
  studentId,
  detailed = false,
}: ApplicationTrackerProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'approved':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'ready_for_pickup':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return '⏳ Pending';
      case 'approved':
        return '✓ Approved';
      case 'ready_for_pickup':
        return '📦 Ready for Pickup';
      case 'rejected':
        return '✗ Rejected';
      default:
        return status;
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-xl">
        <p className="text-muted-foreground text-lg">No applications yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Start by creating a new application for an ID card or certificate
        </p>
      </div>
    );
  }

  if (detailed) {
    return (
      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground capitalize">
                  {app.type.replace('_', ' ')} {app.certificateType && `- ${certificateTypes[app.certificateType as keyof typeof certificateTypes]}`}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Applied: {new Date(app.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(app.status)}`}>
                {getStatusLabel(app.status)}
              </div>
            </div>
            {selectedApp === app.id && <ApplicationDetails app={app} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-lg text-foreground mb-4">Recent Applications</h3>
      <div className="space-y-3">
        {applications.slice(0, 3).map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground capitalize">
                {app.type.replace('_', ' ')}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(app.submittedDate).toLocaleDateString()}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(app.status)}`}>
              {getStatusLabel(app.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
