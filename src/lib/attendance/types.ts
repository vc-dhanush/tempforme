export type AttendanceStatus = "present" | "absent";

export type Student = {
  id: string;
  name: string;
  createdAt: string;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceData = {
  students: Student[];
  records: AttendanceRecord[];
};

export type StudentStats = {
  present: number;
  absent: number;
  total: number;
  attendanceRate: number;
};

export type DailyChartPoint = {
  date: string;
  label: string;
  present: number;
  absent: number;
  rate: number;
};
