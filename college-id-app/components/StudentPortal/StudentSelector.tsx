'use client';

import { mockStudentsForSelect } from '@/lib/ApplicationContext';

interface StudentSelectorProps {
  onSelectStudent: (studentId: string) => void;
}

export default function StudentSelector({ onSelectStudent }: StudentSelectorProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Select Your Profile</h2>
          <p className="text-lg text-muted-foreground">
            Choose your student profile to access the ID and certificate services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockStudentsForSelect.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelectStudent(student.id)}
              className="group p-6 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary transition-all duration-300 text-left"
            >
              <div className="flex gap-4">
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover group-hover:ring-2 ring-primary transition-all"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  <p className="text-sm text-muted-foreground">{student.department}</p>
                  <p className="text-xs text-muted-foreground mt-1">Class of {student.enrollmentYear}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-center text-sm text-foreground">
            <span className="font-semibold">Demo Environment:</span> Select any student profile to explore the application portal and apply for ID cards and certificates instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
