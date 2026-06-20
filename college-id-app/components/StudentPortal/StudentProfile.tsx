'use client';

import { StudentProfile } from '@/lib/mockData';

interface StudentProfileCardProps {
  student: StudentProfile;
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  const age = new Date().getFullYear() - new Date(student.dob).getFullYear();

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 space-y-6">
      <div className="text-center">
        <img
          src={student.photoUrl}
          alt={student.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-primary/30"
        />
        <h3 className="text-2xl font-bold text-foreground">{student.name}</h3>
        <p className="text-primary font-medium">{student.rollNumber}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground">Department</span>
          <span className="font-medium text-foreground">{student.department}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground">Roll Number</span>
          <span className="font-medium text-foreground">{student.rollNumber}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground">Enrollment Year</span>
          <span className="font-medium text-foreground">{student.enrollmentYear}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          <span className="text-muted-foreground">Date of Birth</span>
          <span className="font-medium text-foreground">{new Date(student.dob).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Age</span>
          <span className="font-medium text-foreground">{age} years</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Email: {student.email}
        </p>
      </div>
    </div>
  );
}
