'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Application, StudentProfile, mockApplications, mockStudents } from './mockData';

interface ApplicationContextType {
  currentStudent: StudentProfile | null;
  setCurrentStudent: (student: StudentProfile) => void;
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  getStudentApplications: (studentId: string) => Application[];
  getAllApplications: () => Application[];
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    const savedStudent = localStorage.getItem('currentStudent');
    const savedApplications = localStorage.getItem('applications');

    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    } else {
      setApplications(mockApplications);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
    }
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app: Application) => {
    setApplications([...applications, app]);
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications(
      applications.map((app) =>
        app.id === appId
          ? { ...app, status, processedDate: new Date().toISOString() }
          : app
      )
    );
  };

  const getStudentApplications = (studentId: string) => {
    return applications.filter((app) => app.studentId === studentId);
  };

  const getAllApplications = () => {
    return applications;
  };

  return (
    <ApplicationContext.Provider
      value={{
        currentStudent,
        setCurrentStudent,
        applications,
        addApplication,
        updateApplicationStatus,
        getStudentApplications,
        getAllApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext must be used within ApplicationProvider');
  }
  return context;
}

export const mockStudentsForSelect = mockStudents;
