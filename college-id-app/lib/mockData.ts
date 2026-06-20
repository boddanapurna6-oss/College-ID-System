export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  enrollmentYear: number;
  photoUrl: string;
  dob: string;
}

export interface Application {
  id: string;
  studentId: string;
  type: 'id_card' | 'certificate' | 'both';
  certificateType?: 'completion' | 'excellence' | 'participation';
  status: 'pending' | 'approved' | 'rejected' | 'ready_for_pickup';
  processingType: 'standard' | 'expedited';
  submittedDate: string;
  processedDate?: string;
  amount: number;
  studentName: string;
  rollNumber: string;
}

export const mockStudents: StudentProfile[] = [
  {
    id: 'STU001',
    name: 'Arjun Kumar',
    rollNumber: 'CSE-2022-001',
    email: 'arjun.kumar@college.edu',
    department: 'Computer Science',
    enrollmentYear: 2022,
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    dob: '2003-05-15',
  },
  {
    id: 'STU002',
    name: 'Priya Sharma',
    rollNumber: 'ECE-2022-045',
    email: 'priya.sharma@college.edu',
    department: 'Electronics',
    enrollmentYear: 2022,
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    dob: '2003-08-22',
  },
  {
    id: 'STU003',
    name: 'Rajesh Patel',
    rollNumber: 'ME-2021-032',
    email: 'rajesh.patel@college.edu',
    department: 'Mechanical',
    enrollmentYear: 2021,
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
    dob: '2002-12-10',
  },
  {
    id: 'STU004',
    name: 'Neha Singh',
    rollNumber: 'CE-2023-018',
    email: 'neha.singh@college.edu',
    department: 'Civil',
    enrollmentYear: 2023,
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
    dob: '2004-03-28',
  },
];

export const mockApplications: Application[] = [
  {
    id: 'APP001',
    studentId: 'STU001',
    type: 'id_card',
    status: 'pending',
    processingType: 'standard',
    submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 500,
    studentName: 'Arjun Kumar',
    rollNumber: 'CSE-2022-001',
  },
  {
    id: 'APP002',
    studentId: 'STU002',
    type: 'certificate',
    certificateType: 'completion',
    status: 'approved',
    processingType: 'standard',
    submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    processedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 200,
    studentName: 'Priya Sharma',
    rollNumber: 'ECE-2022-045',
  },
  {
    id: 'APP003',
    studentId: 'STU003',
    type: 'both',
    certificateType: 'excellence',
    status: 'ready_for_pickup',
    processingType: 'expedited',
    submittedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    processedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 1000,
    studentName: 'Rajesh Patel',
    rollNumber: 'ME-2021-032',
  },
  {
    id: 'APP004',
    studentId: 'STU004',
    type: 'certificate',
    certificateType: 'participation',
    status: 'pending',
    processingType: 'expedited',
    submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 800,
    studentName: 'Neha Singh',
    rollNumber: 'CE-2023-018',
  },
];

export const certificateTypes = {
  completion: 'Degree Completion',
  excellence: 'Academic Excellence',
  participation: 'Course Participation',
};

export const processingPrices = {
  standard: { id_card: 500, certificate: 200, both: 700 },
  expedited: { id_card: 800, certificate: 500, both: 1000 },
};
