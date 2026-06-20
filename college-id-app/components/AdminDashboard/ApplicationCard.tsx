'use client';

import { Application, certificateTypes } from '@/lib/mockData';

interface ApplicationCardProps {
  app: Application;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStatusChange: (appId: string, status: Application['status']) => void;
}

export default function ApplicationCard({
  app,
  isExpanded,
  onToggleExpand,
  onStatusChange,
}: ApplicationCardProps) {
  const getStatusBadgeColor = (status: Application['status']) => {
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

  const certType =
    app.certificateType && certificateTypes[app.certificateType as keyof typeof certificateTypes];

  return (
    <div
      className={`bg-card border transition-all cursor-pointer ${
        isExpanded ? 'border-primary/50 shadow-lg' : 'border-border'
      } rounded-xl overflow-hidden`}
    >
      {/* Header */}
      <div onClick={onToggleExpand} className="p-6 hover:bg-muted/50 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-foreground truncate">{app.studentName}</h3>
              <span className={`px-2 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${getStatusBadgeColor(app.status)}`}>
                {getStatusLabel(app.status)}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
              <span>{app.rollNumber}</span>
              <span>•</span>
              <span className="capitalize">{app.type.replace('_', ' ')}</span>
              {certType && (
                <>
                  <span>•</span>
                  <span>{certType}</span>
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">₹{app.amount}</p>
            <p className="text-xs text-muted-foreground">{app.processingType}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border px-6 py-4 bg-muted/30 space-y-4">
          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Application ID</p>
              <p className="font-mono text-sm text-foreground">{app.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Submitted</p>
              <p className="text-sm text-foreground">
                {new Date(app.submittedDate).toLocaleDateString()}
              </p>
            </div>
            {app.processedDate && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Processed</p>
                <p className="text-sm text-foreground">
                  {new Date(app.processedDate).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Processing</p>
              <p className="text-sm text-foreground capitalize">{app.processingType}</p>
            </div>
          </div>

          {/* Status Change Buttons */}
          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-3">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {['pending', 'approved', 'ready_for_pickup', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(app.id, status as Application['status'])}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    app.status === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {getStatusLabel(status as Application['status']).split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
