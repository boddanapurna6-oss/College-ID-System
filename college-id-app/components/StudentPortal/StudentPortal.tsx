'use client';

import { useState } from 'react';
import { useApplicationContext, mockStudentsForSelect } from '@/lib/ApplicationContext';
import StudentSelector from './StudentSelector';
import StudentDashboard from './StudentDashboard';

export default function StudentPortal() {
  const { currentStudent, setCurrentStudent } = useApplicationContext();
  const [showSelector, setShowSelector] = useState(!currentStudent);

  const handleStudentSelect = (studentId: string) => {
    const student = mockStudentsForSelect.find((s) => s.id === studentId);
    if (student) {
      setCurrentStudent(student);
      setShowSelector(false);
    }
  };

  if (showSelector || !currentStudent) {
    return <StudentSelector onSelectStudent={handleStudentSelect} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, {currentStudent.name}</h2>
          <p className="text-muted-foreground mt-1">{currentStudent.rollNumber} • {currentStudent.department}</p>
        </div>
        <button
          onClick={() => {
            setShowSelector(true);
          }}
          className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
        >
          Switch Student
        </button>
      </div>
      <StudentDashboard student={currentStudent} />
    </div>
  );
}
