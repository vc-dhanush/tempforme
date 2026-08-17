export type AttendanceStatus = "present" | "absent";

export type SchoolClass = {
  id: string;
  name: string;
  createdAt: string;
};

export type Student = {
  id: string;
  classId: string;
  name: string;
  registerNumber: string;
  createdAt: string;
};

/** Only absent records are stored; present is the default. */
export type AttendanceRecord = {
  id: string;
  classId: string;
  studentId: string;
  date: string;
  status: "absent";
};

export type AttendanceData = {
  classes: SchoolClass[];
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

export type AppScreen =
  | "welcome"
  | "class-select"
  | "add-students"
  | "dashboard";

export type ChartType = "bar" | "line" | "area" | "pie";
