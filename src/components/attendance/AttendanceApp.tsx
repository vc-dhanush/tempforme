"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  Download,
  ListChecks,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AttendanceData, AttendanceStatus } from "@/lib/attendance/types";
import {
  addStudent,
  loadAttendanceData,
  removeStudent,
  saveAttendanceData,
  setAttendance,
} from "@/lib/attendance/storage";
import {
  downloadCsv,
  formatDateInput,
  formatDisplayDate,
  getRecordsForDate,
  getStatusForStudent,
  getStudentDailyChart,
  getStudentStats,
  splitPresentAbsent,
} from "@/lib/attendance/utils";

type Tab = "mark" | "lists" | "analytics" | "export";

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "mark", label: "Mark Attendance", icon: CalendarCheck },
  { id: "lists", label: "Present / Absent", icon: ListChecks },
  { id: "analytics", label: "Kid Analytics", icon: BarChart3 },
  { id: "export", label: "Download CSV", icon: Download },
];

export function AttendanceApp() {
  const [data, setData] = useState<AttendanceData>({ students: [], records: [] });
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("mark");
  const [selectedDate, setSelectedDate] = useState(formatDateInput());
  const [newStudentName, setNewStudentName] = useState("");
  const [analyticsStudentId, setAnalyticsStudentId] = useState("");
  const [rangeStart, setRangeStart] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDateInput(date);
  });
  const [rangeEnd, setRangeEnd] = useState(formatDateInput());

  useEffect(() => {
    const loaded = loadAttendanceData();
    setData(loaded);
    if (loaded.students[0]) {
      setAnalyticsStudentId(loaded.students[0].id);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveAttendanceData(data);
  }, [data, ready]);

  const dayRecords = useMemo(
    () => getRecordsForDate(data, selectedDate),
    [data, selectedDate],
  );

  const { present, absent, unmarked } = useMemo(
    () => splitPresentAbsent(data.students, dayRecords),
    [data.students, dayRecords],
  );

  const selectedStudent = data.students.find(
    (student) => student.id === analyticsStudentId,
  );

  const studentStats = useMemo(() => {
    if (!analyticsStudentId) {
      return { present: 0, absent: 0, total: 0, attendanceRate: 0 };
    }
    return getStudentStats(data, analyticsStudentId, rangeStart, rangeEnd);
  }, [analyticsStudentId, data, rangeEnd, rangeStart]);

  const chartData = useMemo(() => {
    if (!analyticsStudentId) return [];
    return getStudentDailyChart(data, analyticsStudentId, rangeStart, rangeEnd);
  }, [analyticsStudentId, data, rangeEnd, rangeStart]);

  const handleAddStudent = () => {
    const name = newStudentName.trim();
    if (!name) return;
    setData((current) => addStudent(current, name));
    setNewStudentName("");
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    setData((current) => {
      let next = current;
      for (const student of current.students) {
        next = setAttendance(next, student.id, selectedDate, status);
      }
      return next;
    });
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setData((current) => setAttendance(current, studentId, selectedDate, status));
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading attendance data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">
              Simple Attendance
            </p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Attendance Maintenance System
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Mark present or absent, view lists, analyze each kid, and export CSV.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <p className="font-medium text-slate-700">{data.students.length} students</p>
            <p className="text-slate-500">{data.records.length} attendance records</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-slate-800">
            <Users className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Students</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={newStudentName}
              onChange={(event) => setNewStudentName(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleAddStudent()}
              placeholder="Add student name"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
            <button
              type="button"
              onClick={handleAddStudent}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </button>
          </div>
          {data.students.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.students.map((student) => (
                <span
                  key={student.id}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm"
                >
                  {student.name}
                  <button
                    type="button"
                    onClick={() =>
                      setData((current) => removeStudent(current, student.id))
                    }
                    className="rounded-full p-0.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${student.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              Add students first, then mark their attendance.
            </p>
          )}
        </section>

        <nav className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "mark" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {formatDisplayDate(selectedDate)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkAll("present")}
                  className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-200"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll("absent")}
                  className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-200"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            {data.students.length === 0 ? (
              <p className="text-sm text-slate-500">No students to mark yet.</p>
            ) : (
              <div className="space-y-2">
                {data.students.map((student) => {
                  const status = getStatusForStudent(data, student.id, selectedDate);
                  return (
                    <div
                      key={student.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="font-medium text-slate-800">{student.name}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "present")}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            status === "present"
                              ? "bg-emerald-600 text-white"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "absent")}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            status === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === "lists" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date for lists
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
              />
              <p className="mt-1 text-xs text-slate-500">
                {formatDisplayDate(selectedDate)}
              </p>
            </div>
            <ListCard
              title="Present"
              count={present.length}
              color="emerald"
              students={present}
              emptyText="No students marked present."
            />
            <ListCard
              title="Absent"
              count={absent.length}
              color="red"
              students={absent}
              emptyText="No students marked absent."
            />
            <ListCard
              title="Not Marked"
              count={unmarked.length}
              color="slate"
              students={unmarked}
              emptyText="Everyone is marked for this date."
            />
          </section>
        )}

        {activeTab === "analytics" && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Student">
                  <select
                    value={analyticsStudentId}
                    onChange={(event) => setAnalyticsStudentId(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
                  >
                    <option value="">Select a student</option>
                    {data.students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="From">
                  <input
                    type="date"
                    value={rangeStart}
                    onChange={(event) => setRangeStart(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
                  />
                </Field>
                <Field label="To">
                  <input
                    type="date"
                    value={rangeEnd}
                    onChange={(event) => setRangeEnd(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
                  />
                </Field>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const end = formatDateInput();
                      const start = formatDateInput(
                        new Date(new Date().setDate(new Date().getDate() - 6)),
                      );
                      setRangeStart(start);
                      setRangeEnd(end);
                    }}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Last 7 days
                  </button>
                </div>
              </div>

              {selectedStudent ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <StatCard label="Present" value={studentStats.present} tone="emerald" />
                  <StatCard label="Absent" value={studentStats.absent} tone="red" />
                  <StatCard label="Total Days" value={studentStats.total} tone="slate" />
                  <StatCard
                    label="Attendance %"
                    value={`${studentStats.attendanceRate}%`}
                    tone="blue"
                  />
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  Select a student to view analytics.
                </p>
              )}
            </div>

            {selectedStudent && chartData.length > 0 ? (
              <>
                <ChartPanel title={`Daily attendance — ${selectedStudent.name}`}>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} domain={[0, 1]} ticks={[0, 1]} />
                      <Tooltip
                        formatter={(value, name) => [
                          Number(value) === 1 ? "Yes" : "No",
                          name === "present" ? "Present" : "Absent",
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="present" fill="#059669" name="Present" />
                      <Bar dataKey="absent" fill="#dc2626" name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPanel>

                <ChartPanel title={`Attendance rate trend — ${selectedStudent.name}`}>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartPanel>
              </>
            ) : selectedStudent ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                No attendance records for {selectedStudent.name} in this date range.
              </div>
            ) : null}
          </section>
        )}

        {activeTab === "export" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Download CSV</h2>
            <p className="mt-2 text-sm text-slate-600">
              Export all attendance records with date, student name, and status. The file
              opens in Excel or Google Sheets.
            </p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                <strong>{data.records.length}</strong> records across{" "}
                <strong>{data.students.length}</strong> students will be exported.
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadCsv(data)}
              disabled={data.records.length === 0}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Download className="h-4 w-4" />
              Download CSV File
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: "emerald" | "red" | "slate" | "blue";
}) {
  const tones = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    red: "border-red-200 bg-red-50 text-red-800",
    slate: "border-slate-200 bg-slate-50 text-slate-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ListCard({
  title,
  count,
  color,
  students,
  emptyText,
}: {
  title: string;
  count: number;
  color: "emerald" | "red" | "slate";
  students: { id: string; name: string }[];
  emptyText: string;
}) {
  const styles = {
    emerald: "border-emerald-200 bg-emerald-50",
    red: "border-red-200 bg-red-50",
    slate: "border-slate-200 bg-slate-50",
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${styles[color]}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-semibold text-slate-700">
          {count}
        </span>
      </div>
      {students.length === 0 ? (
        <p className="text-sm text-slate-600">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-800"
            >
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChartPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}
