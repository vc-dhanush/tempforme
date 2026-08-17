import type {
  AttendanceData,
  AttendanceRecord,
  AttendanceStatus,
  Student,
} from "./types";

const STORAGE_KEY = "attendance-system-data";

const emptyData = (): AttendanceData => ({
  students: [],
  records: [],
});

export function loadAttendanceData(): AttendanceData {
  if (typeof window === "undefined") {
    return emptyData();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as AttendanceData;
    return {
      students: parsed.students ?? [],
      records: parsed.records ?? [],
    };
  } catch {
    return emptyData();
  }
}

export function saveAttendanceData(data: AttendanceData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createId(): string {
  return crypto.randomUUID();
}

export function addStudent(data: AttendanceData, name: string): AttendanceData {
  const student: Student = {
    id: createId(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  return {
    ...data,
    students: [...data.students, student].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  };
}

export function removeStudent(
  data: AttendanceData,
  studentId: string,
): AttendanceData {
  return {
    students: data.students.filter((student) => student.id !== studentId),
    records: data.records.filter((record) => record.studentId !== studentId),
  };
}

export function setAttendance(
  data: AttendanceData,
  studentId: string,
  date: string,
  status: AttendanceStatus,
): AttendanceData {
  const existing = data.records.find(
    (record) => record.studentId === studentId && record.date === date,
  );

  if (existing) {
    return {
      ...data,
      records: data.records.map((record) =>
        record.id === existing.id ? { ...record, status } : record,
      ),
    };
  }

  const record: AttendanceRecord = {
    id: createId(),
    studentId,
    date,
    status,
  };

  return {
    ...data,
    records: [...data.records, record],
  };
}

export function clearAttendanceForDate(
  data: AttendanceData,
  date: string,
): AttendanceData {
  return {
    ...data,
    records: data.records.filter((record) => record.date !== date),
  };
}
