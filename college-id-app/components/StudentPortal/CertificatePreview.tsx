'use client';

import { Application, certificateTypes } from '@/lib/mockData';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificatePreviewProps {
  app: Application;
  studentName: string;
}

export default function CertificatePreview({ app, studentName }: CertificatePreviewProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPDF = async () => {
    if (!certRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight) * 100;

      const x = (pdfWidth - (canvasWidth * ratio) / 100) / 2;
      const y = (pdfHeight - (canvasHeight * ratio) / 100) / 2;

      pdf.addImage(imgData, 'PNG', x, y, (canvasWidth * ratio) / 100, (canvasHeight * ratio) / 100);
      pdf.save(`${studentName}-Certificate-${app.id}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  const certType =
    app.certificateType && certificateTypes[app.certificateType as keyof typeof certificateTypes];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">Digital Certificate</h4>
        <button
          onClick={exportAsPDF}
          disabled={isExporting}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isExporting ? 'Exporting...' : 'Download PDF'}
        </button>
      </div>

      {/* Certificate */}
      <div ref={certRef} className="w-full bg-white border-8 border-primary/20 rounded-lg p-12 text-center">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary/30 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-accent/30 rounded-full"></div>

        {/* Certificate content */}
        <div className="space-y-6 relative">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">CERTIFICATE OF ACHIEVEMENT</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </div>

          {/* Main text */}
          <div className="space-y-4 text-foreground">
            <p className="text-sm text-muted-foreground">This is to certify that</p>
            <p className="text-3xl font-bold">{studentName}</p>
            <p className="text-sm text-muted-foreground">has successfully completed</p>
            <p className="text-2xl font-semibold text-primary">{certType}</p>
          </div>

          {/* Details */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Issue Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Certificate ID: {app.id}</p>
          </div>

          {/* Signature area */}
          <div className="flex justify-around pt-8 border-t-2 border-primary/30">
            <div className="text-center">
              <div className="w-24 h-12 border-b border-foreground/30 mb-1"></div>
              <p className="text-xs font-medium">Director</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-12 border-b border-foreground/30 mb-1"></div>
              <p className="text-xs font-medium">Registrar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
