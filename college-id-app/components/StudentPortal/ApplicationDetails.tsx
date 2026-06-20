'use client';

import { Application, certificateTypes } from '@/lib/mockData';
import { useState } from 'react';
import IDPreview from './IDPreview';
import CertificatePreview from './CertificatePreview';

interface ApplicationDetailsProps {
  app: Application;
}

export default function ApplicationDetails({ app }: ApplicationDetailsProps) {
  const [showIDPreview, setShowIDPreview] = useState(false);
  const [showCertPreview, setShowCertPreview] = useState(false);

  return (
    <div className="mt-4 pt-4 border-t border-border space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Application ID</p>
          <p className="font-mono text-foreground">{app.id}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Processing</p>
          <p className="font-medium text-foreground capitalize">{app.processingType}</p>
        </div>
        {app.processedDate && (
          <div>
            <p className="text-muted-foreground">Processed Date</p>
            <p className="text-foreground">{new Date(app.processedDate).toLocaleDateString()}</p>
          </div>
        )}
        <div>
          <p className="text-muted-foreground">Amount</p>
          <p className="font-medium text-primary">₹{app.amount}</p>
        </div>
      </div>

      {/* Previews */}
      <div className="flex gap-2 pt-2">
        {(app.type === 'id_card' || app.type === 'both') && (
          <button
            onClick={() => setShowIDPreview(!showIDPreview)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            {showIDPreview ? 'Hide ID Preview' : 'View ID Card'}
          </button>
        )}
        {(app.type === 'certificate' || app.type === 'both') && (
          <button
            onClick={() => setShowCertPreview(!showCertPreview)}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            {showCertPreview ? 'Hide Certificate' : 'View Certificate'}
          </button>
        )}
      </div>

      {/* ID Preview */}
      {showIDPreview && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <IDPreview app={app} />
        </div>
      )}

      {/* Certificate Preview */}
      {showCertPreview && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <CertificatePreview app={app} studentName={app.studentName} />
        </div>
      )}
    </div>
  );
}
