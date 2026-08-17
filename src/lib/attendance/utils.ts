import type {
  AttendanceData,
  AttendanceRecord,
  AttendanceStatus,
  DailyChartPoint,
  Student,
  StudentStats,
} from "./types";

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

export function getRecordsForDate(
  data: AttendanceData,
  date: string,
): AttendanceRecord[] {
  return data.records.filter((record) => record.date === date);
}

export function getStatusForStudent(
  data: AttendanceData,
  studentId: string,
  date: string,
): AttendanceStatus | null {
  return (
    data.records.find(
      (record) => record.studentId === studentId && record.date === date,
    )?.status ?? null
  );
}

export function splitPresentAbsent(
  students: Student[],
  records: AttendanceRecord[],
): { present: Student[]; absent: Student[]; unmarked: Student[] } {
  const present: Student[] = [];
  const absent: Student[] = [];
  const unmarked: Student[] = [];

  for (const student of students) {
    const record = records.find((item) => item.studentId === student.id);
    if (!record) {
      unmarked.push(student);
    } else if (record.status === "present") {
      present.push(student);
    } else {
      absent.push(student);
    }
  }

  return { present, absent, unmarked };
}

export function getStudentStats(
  data: AttendanceData,
  studentId: string,
  startDate: string,
  endDate: string,
): StudentStats {
  const records = data.records.filter(
    (record) =>
      record.studentId === studentId &&
      record.date >= startDate &&
      record.date <= endDate,
  );

  const present = records.filter((record) => record.status === "present").length;
  const absent = records.filter((record) => record.status === "absent").length;
  const total = records.length;

  return {
    present,
    absent,
    total,
    attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
  };
}

export function getStudentDailyChart(
  data: AttendanceData,
  studentId: string,
  startDate: string,
  endDate: string,
): DailyChartPoint[] {
  const records = data.records
    .filter(
      (record) =>
        record.studentId === studentId &&
        record.date >= startDate &&
        record.date <= endDate,
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  return records.map((record) => ({
    date: record.date,
    label: formatDisplayDate(record.date),
    present: record.status === "present" ? 1 : 0,
    absent: record.status === "absent" ? 1 : 0,
    rate: record.status === "present" ? 100 : 0,
  }));
}

export function buildCsv(data: AttendanceData): string {
  const header = ["Date", "Student Name", "Status"];
  const rows = data.records
    .slice()
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      const studentA = data.students.find((s) => s.id === a.studentId)?.name ?? "";
      const studentB = data.students.find((s) => s.id === b.studentId)?.name ?? "";
      return studentA.localeCompare(studentB);
    })
    .map((record) => {
      const studentName =
        data.students.find((student) => student.id === record.studentId)?.name ??
        "Unknown";
      return [record.date, studentName, record.status];
    });

  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  return [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}

export function downloadCsv(data: AttendanceData, filename?: string): void {
  const csv = buildCsv(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename ?? `attendance-${formatDateInput()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
