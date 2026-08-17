import type {
  AttendanceData,
  AttendanceRecord,
  DailyChartPoint,
  Student,
  StudentStats,
} from "./types";
import { getStudentsForClass } from "./storage";

export function formatDateInput(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getAbsentRecordsForDate(
  data: AttendanceData,
  classId: string,
  date: string,
): AttendanceRecord[] {
  return data.records.filter(
    (record) => record.classId === classId && record.date === date,
  );
}

export function isStudentAbsent(
  data: AttendanceData,
  classId: string,
  studentId: string,
  date: string,
): boolean {
  return data.records.some(
    (record) =>
      record.classId === classId &&
      record.studentId === studentId &&
      record.date === date,
  );
}

/** Everyone is present by default; only absent records are stored. */
export function splitPresentAbsent(
  students: Student[],
  absentRecords: AttendanceRecord[],
): { present: Student[]; absent: Student[] } {
  const absentIds = new Set(absentRecords.map((record) => record.studentId));
  const absent: Student[] = [];
  const present: Student[] = [];

  for (const student of students) {
    if (absentIds.has(student.id)) {
      absent.push(student);
    } else {
      present.push(student);
    }
  }

  return { present, absent };
}

export function getClassStudents(data: AttendanceData, classId: string): Student[] {
  return getStudentsForClass(data, classId);
}

export function getStudentStats(
  data: AttendanceData,
  classId: string,
  studentId: string,
  startDate: string,
  endDate: string,
): StudentStats {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  let totalDays = 0;
  let absent = 0;

  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    totalDays += 1;
    const date = formatDateInput(cursor);
    if (isStudentAbsent(data, classId, studentId, date)) {
      absent += 1;
    }
  }

  const present = totalDays - absent;

  return {
    present,
    absent,
    total: totalDays,
    attendanceRate: totalDays > 0 ? Math.round((present / totalDays) * 100) : 100,
  };
}

export function getStudentDailyChart(
  data: AttendanceData,
  classId: string,
  studentId: string,
  startDate: string,
  endDate: string,
): DailyChartPoint[] {
  const absentDates = data.records
    .filter(
      (record) =>
        record.classId === classId &&
        record.studentId === studentId &&
        record.date >= startDate &&
        record.date <= endDate,
    )
    .map((record) => record.date)
    .sort();

  return absentDates.map((date) => ({
    date,
    label: formatDisplayDate(date),
    present: 0,
    absent: 1,
    rate: 0,
  }));
}

export function getStudentAttendanceTimeline(
  data: AttendanceData,
  classId: string,
  studentId: string,
  startDate: string,
  endDate: string,
): DailyChartPoint[] {
  const dates: string[] = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    dates.push(formatDateInput(cursor));
  }

  return dates.map((date) => {
    const absent = isStudentAbsent(data, classId, studentId, date);
    return {
      date,
      label: formatDisplayDate(date),
      present: absent ? 0 : 1,
      absent: absent ? 1 : 0,
      rate: absent ? 0 : 100,
    };
  });
}

export function getPieChartData(stats: StudentStats) {
  return [
    { name: "Present", value: stats.present || 1, color: "#0284c7" },
    { name: "Absent", value: stats.absent, color: "#ef4444" },
  ].filter((item) => item.value > 0);
}
