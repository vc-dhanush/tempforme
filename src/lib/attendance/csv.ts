import type { AttendanceData, AttendanceRecord, SchoolClass, Student } from "./types";

const CSV_KEYS = {
  classes: "attendance-csv-classes",
  students: "attendance-csv-students",
  records: "attendance-csv-records",
} as const;

const emptyData = (): AttendanceData => ({
  classes: [],
  students: [],
  records: [],
});

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function parseCsv(content: string): string[][] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine);
}

function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}

export function serializeToCsv(data: AttendanceData): {
  classes: string;
  students: string;
  records: string;
  combined: string;
} {
  const classes = toCsv([
    ["id", "name", "createdAt"],
    ...data.classes.map((item) => [item.id, item.name, item.createdAt]),
  ]);

  const students = toCsv([
    ["id", "classId", "name", "registerNumber", "createdAt"],
    ...data.students.map((item) => [
      item.id,
      item.classId,
      item.name,
      item.registerNumber,
      item.createdAt,
    ]),
  ]);

  const records = toCsv([
    ["id", "classId", "studentId", "date", "status"],
    ...data.records.map((item) => [
      item.id,
      item.classId,
      item.studentId,
      item.date,
      item.status,
    ]),
  ]);

  const combined = [
    "# CLASSES",
    classes,
    "",
    "# STUDENTS",
    students,
    "",
    "# ATTENDANCE",
    records,
  ].join("\n");

  return { classes, students, records, combined };
}

export function parseFromCsv(
  classesCsv: string,
  studentsCsv: string,
  recordsCsv: string,
): AttendanceData {
  const classesRows = parseCsv(classesCsv).slice(1);
  const studentsRows = parseCsv(studentsCsv).slice(1);
  const recordsRows = parseCsv(recordsCsv).slice(1);

  const classes: SchoolClass[] = classesRows.map((row) => ({
    id: row[0] ?? "",
    name: row[1] ?? "",
    createdAt: row[2] ?? new Date().toISOString(),
  }));

  const students: Student[] = studentsRows.map((row) => ({
    id: row[0] ?? "",
    classId: row[1] ?? "",
    name: row[2] ?? "",
    registerNumber: row[3] ?? "",
    createdAt: row[4] ?? new Date().toISOString(),
  }));

  const records: AttendanceRecord[] = recordsRows.map((row) => ({
    id: row[0] ?? "",
    classId: row[1] ?? "",
    studentId: row[2] ?? "",
    date: row[3] ?? "",
    status: "absent",
  }));

  return { classes, students, records };
}

export function loadAttendanceData(): AttendanceData {
  if (typeof window === "undefined") return emptyData();

  try {
    const classesCsv = localStorage.getItem(CSV_KEYS.classes);
    const studentsCsv = localStorage.getItem(CSV_KEYS.students);
    const recordsCsv = localStorage.getItem(CSV_KEYS.records);

    if (!classesCsv && !studentsCsv && !recordsCsv) {
      return emptyData();
    }

    return parseFromCsv(classesCsv ?? "id,name,createdAt", studentsCsv ?? "id,classId,name,registerNumber,createdAt", recordsCsv ?? "id,classId,studentId,date,status");
  } catch {
    return emptyData();
  }
}

export function saveAttendanceData(data: AttendanceData): void {
  if (typeof window === "undefined") return;

  const csv = serializeToCsv(data);
  localStorage.setItem(CSV_KEYS.classes, csv.classes);
  localStorage.setItem(CSV_KEYS.students, csv.students);
  localStorage.setItem(CSV_KEYS.records, csv.records);
}

export function downloadCombinedCsv(data: AttendanceData, filename?: string): void {
  const csv = serializeToCsv(data).combined;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename ?? `attendance-data-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importCombinedCsv(content: string): AttendanceData {
  const sections = content.split(/^# /m).filter(Boolean);
  let classesCsv = "id,name,createdAt";
  let studentsCsv = "id,classId,name,registerNumber,createdAt";
  let recordsCsv = "id,classId,studentId,date,status";

  for (const section of sections) {
    const [heading, ...rest] = section.split("\n");
    const body = rest.join("\n").trim();
    const key = heading.trim().toUpperCase();

    if (key === "CLASSES") classesCsv = body;
    if (key === "STUDENTS") studentsCsv = body;
    if (key === "ATTENDANCE") recordsCsv = body;
  }

  return parseFromCsv(classesCsv, studentsCsv, recordsCsv);
}
