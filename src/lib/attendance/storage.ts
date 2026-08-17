import type { AttendanceData, AttendanceRecord, SchoolClass, Student } from "./types";

export function createId(): string {
  return crypto.randomUUID();
}

export function addClass(data: AttendanceData, name: string): AttendanceData {
  const schoolClass: SchoolClass = {
    id: createId(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  return {
    ...data,
    classes: [...data.classes, schoolClass].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    ),
  };
}

export function isRegisterNumberTaken(
  data: AttendanceData,
  registerNumber: string,
  excludeStudentId?: string,
): boolean {
  const normalized = registerNumber.trim().toUpperCase();
  return data.students.some(
    (student) =>
      student.registerNumber.toUpperCase() === normalized &&
      student.id !== excludeStudentId,
  );
}

export function addStudent(
  data: AttendanceData,
  classId: string,
  name: string,
  registerNumber: string,
): { data: AttendanceData; error?: string } {
  const trimmedName = name.trim();
  const trimmedRegister = registerNumber.trim();

  if (!trimmedName) return { data, error: "Student name is required." };
  if (!trimmedRegister) return { data, error: "Register number is required." };
  if (isRegisterNumberTaken(data, trimmedRegister)) {
    return { data, error: "Register number already exists. It must be unique." };
  }

  const student: Student = {
    id: createId(),
    classId,
    name: trimmedName,
    registerNumber: trimmedRegister,
    createdAt: new Date().toISOString(),
  };

  return {
    data: {
      ...data,
      students: [...data.students, student].sort((a, b) =>
        a.registerNumber.localeCompare(b.registerNumber, undefined, { numeric: true }),
      ),
    },
  };
}

export function removeStudent(
  data: AttendanceData,
  studentId: string,
): AttendanceData {
  return {
    ...data,
    students: data.students.filter((student) => student.id !== studentId),
    records: data.records.filter((record) => record.studentId !== studentId),
  };
}

export function getStudentsForClass(
  data: AttendanceData,
  classId: string,
): Student[] {
  return data.students.filter((student) => student.classId === classId);
}

export function markAbsent(
  data: AttendanceData,
  classId: string,
  studentId: string,
  date: string,
): AttendanceData {
  const existing = data.records.find(
    (record) =>
      record.studentId === studentId &&
      record.date === date &&
      record.classId === classId,
  );

  if (existing) return data;

  const record: AttendanceRecord = {
    id: createId(),
    classId,
    studentId,
    date,
    status: "absent",
  };

  return {
    ...data,
    records: [...data.records, record],
  };
}

export function markPresent(
  data: AttendanceData,
  classId: string,
  studentId: string,
  date: string,
): AttendanceData {
  return {
    ...data,
    records: data.records.filter(
      (record) =>
        !(
          record.studentId === studentId &&
          record.date === date &&
          record.classId === classId
        ),
    ),
  };
}

export function toggleAbsent(
  data: AttendanceData,
  classId: string,
  studentId: string,
  date: string,
  isAbsent: boolean,
): AttendanceData {
  if (isAbsent) {
    return markAbsent(data, classId, studentId, date);
  }
  return markPresent(data, classId, studentId, date);
}

export function clearAbsentForDate(
  data: AttendanceData,
  classId: string,
  date: string,
): AttendanceData {
  return {
    ...data,
    records: data.records.filter(
      (record) => !(record.classId === classId && record.date === date),
    ),
  };
}
