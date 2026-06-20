'use client';

import { Application } from '@/lib/mockData';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface IDPreviewProps {
  app: Application;
}

export default function IDPreview({ app }: IDPreviewProps) {
  const idRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPDF = async () => {
    if (!idRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(idRef.current, {
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
      pdf.save(`${app.studentName}-ID-${app.id}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">College ID Card</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-3 py-1 text-sm bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
          >
            {isFlipped ? 'Front' : 'Back'}
          </button>
          <button
            onClick={exportAsPDF}
            disabled={isExporting}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* ID Card */}
      <div className="perspective flex justify-center">
        <div
          ref={idRef}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s',
          }}
          className="w-96 h-56 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl p-6 text-card shadow-2xl"
        >
          {!isFlipped ? (
            // Front
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-card/80">COLLEGE ID</p>
                  <p className="text-sm font-bold text-card mt-1">Student</p>
                </div>
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">ID</span>
                </div>
              </div>

              <div className="flex gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.studentName}`}
                  alt={app.studentName}
                  className="w-20 h-24 rounded border-2 border-card/50"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-card">{app.studentName}</p>
                  <p className="text-xs text-card/90 mt-1">{app.rollNumber}</p>
                  <p className="text-xs text-card/80 mt-3">Valid ID for Campus Access</p>
                </div>
              </div>
            </div>
          ) : (
            // Back
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-xs font-semibold text-card/80">IMPORTANT</p>
                <p className="text-xs text-card/90 mt-2 leading-relaxed">
                  This ID is the property of the college. If lost, report immediately to the student services office.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-card/80">Issued:</span>
                  <span className="text-card font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-card/80">Valid Till:</span>
                  <span className="text-card font-semibold">
                    {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
