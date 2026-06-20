'use client';

import { useState } from 'react';
import { ApplicationProvider } from '@/lib/ApplicationContext';
import StudentPortal from '@/components/StudentPortal/StudentPortal';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  return (
    <ApplicationProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation Header */}
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">ID</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">College Hub</h1>
                  <p className="text-sm text-muted-foreground">ID & Certificate Issuance</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveTab('student')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'student'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Student Portal
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'admin'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Admin Dashboard
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'student' && <StudentPortal />}
          {activeTab === 'admin' && <AdminDashboard />}
        </main>
      </div>
    </ApplicationProvider>
  );
}
