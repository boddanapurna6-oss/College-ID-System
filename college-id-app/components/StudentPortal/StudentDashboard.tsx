'use client';

import { useState } from 'react';
import { StudentProfile } from '@/lib/mockData';
import { useApplicationContext } from '@/lib/ApplicationContext';
import ApplicationForm from './ApplicationForm';
import ApplicationTracker from './ApplicationTracker';
import StudentProfileCard from './StudentProfile';

export default function StudentDashboard({ student }: { student: StudentProfile }) {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'new_application' | 'tracker'>('dashboard');
  const { getStudentApplications } = useApplicationContext();
  const studentApps = getStudentApplications(student.id);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-foreground">{studentApps.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending</h3>
          <p className="text-3xl font-bold text-accent">
            {studentApps.filter((a) => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Ready for Pickup</h3>
          <p className="text-3xl font-bold text-primary">
            {studentApps.filter((a) => a.status === 'ready_for_pickup').length}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'dashboard'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Profile & Status
        </button>
        <button
          onClick={() => setActiveSection('new_application')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'new_application'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          New Application
        </button>
        <button
          onClick={() => setActiveSection('tracker')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'tracker'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Track Applications
        </button>
      </div>

      {/* Content Sections */}
      <div>
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StudentProfileCard student={student} />
            </div>
            <div className="lg:col-span-2">
              <ApplicationTracker applications={studentApps} studentId={student.id} />
            </div>
          </div>
        )}

        {activeSection === 'new_application' && (
          <ApplicationForm student={student} onSuccess={() => setActiveSection('tracker')} />
        )}

        {activeSection === 'tracker' && (
          <ApplicationTracker applications={studentApps} studentId={student.id} detailed />
        )}
      </div>
    </div>
  );
}
