"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  Download,
  GraduationCap,
  ListChecks,
  Sparkles,
  Upload,
  UserPlus,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AppScreen, AttendanceData, ChartType } from "@/lib/attendance/types";
import { downloadCombinedCsv, importCombinedCsv, loadAttendanceData, saveAttendanceData } from "@/lib/attendance/csv";
import {
  addClass,
  addStudent,
  clearAbsentForDate,
  getStudentsForClass,
  removeStudent,
  toggleAbsent,
} from "@/lib/attendance/storage";
import {
  formatDateInput,
  formatDisplayDate,
  getAbsentRecordsForDate,
  getClassStudents,
  getPieChartData,
  getStudentAttendanceTimeline,
  getStudentStats,
  isStudentAbsent,
  splitPresentAbsent,
} from "@/lib/attendance/utils";

const PRESET_CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

type DashboardTab = "mark" | "lists" | "analytics" | "data";

const SESSION_KEY = "attendance-session";

type SessionState = {
  screen: AppScreen;
  selectedClassId: string;
};

export function AttendanceApp() {
  const [data, setData] = useState<AttendanceData>({ classes: [], students: [], records: [] });
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newRegisterNumber, setNewRegisterNumber] = useState("");
  const [studentError, setStudentError] = useState("");
  const [activeTab, setActiveTab] = useState<DashboardTab>("mark");
  const [selectedDate, setSelectedDate] = useState(formatDateInput());
  const [analyticsStudentId, setAnalyticsStudentId] = useState("");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [rangeStart, setRangeStart] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDateInput(date);
  });
  const [rangeEnd, setRangeEnd] = useState(formatDateInput());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loaded = loadAttendanceData();
    setData(loaded);

    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as SessionState;
        if (session.selectedClassId && loaded.classes.some((c) => c.id === session.selectedClassId)) {
          setSelectedClassId(session.selectedClassId);
          setScreen(session.screen === "welcome" ? "class-select" : session.screen);
        }
      }
    } catch {
      // ignore invalid session
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveAttendanceData(data);
  }, [data, ready]);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ screen, selectedClassId }),
    );
  }, [screen, selectedClassId, ready]);

  const selectedClass = data.classes.find((item) => item.id === selectedClassId);
  const classStudents = useMemo(
    () => (selectedClassId ? getClassStudents(data, selectedClassId) : []),
    [data, selectedClassId],
  );

  useEffect(() => {
    if (classStudents[0] && !analyticsStudentId) {
      setAnalyticsStudentId(classStudents[0].id);
    }
  }, [classStudents, analyticsStudentId]);

  const dayAbsentRecords = useMemo(
    () =>
      selectedClassId
        ? getAbsentRecordsForDate(data, selectedClassId, selectedDate)
        : [],
    [data, selectedClassId, selectedDate],
  );

  const { present, absent } = useMemo(
    () => splitPresentAbsent(classStudents, dayAbsentRecords),
    [classStudents, dayAbsentRecords],
  );

  const selectedStudent = classStudents.find((s) => s.id === analyticsStudentId);

  const studentStats = useMemo(() => {
    if (!analyticsStudentId || !selectedClassId) {
      return { present: 0, absent: 0, total: 0, attendanceRate: 100 };
    }
    return getStudentStats(data, selectedClassId, analyticsStudentId, rangeStart, rangeEnd);
  }, [analyticsStudentId, data, rangeEnd, rangeStart, selectedClassId]);

  const chartData = useMemo(() => {
    if (!analyticsStudentId || !selectedClassId) return [];
    return getStudentAttendanceTimeline(
      data,
      selectedClassId,
      analyticsStudentId,
      rangeStart,
      rangeEnd,
    );
  }, [analyticsStudentId, data, rangeEnd, rangeStart, selectedClassId]);

  const pieData = useMemo(() => getPieChartData(studentStats), [studentStats]);

  const handleCreateClass = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const exists = data.classes.some(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (exists) {
      const existing = data.classes.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (existing) {
        setSelectedClassId(existing.id);
        setScreen("add-students");
      }
      return;
    }
    setData((current) => {
      const next = addClass(current, trimmed);
      const created = next.classes.find((item) => item.name === trimmed);
      if (created) setSelectedClassId(created.id);
      return next;
    });
    setNewClassName("");
    setScreen("add-students");
  };

  const handleAddStudent = () => {
    if (!selectedClassId) return;
    const result = addStudent(data, selectedClassId, newStudentName, newRegisterNumber);
    if (result.error) {
      setStudentError(result.error);
      return;
    }
    setData(result.data);
    setNewStudentName("");
    setNewRegisterNumber("");
    setStudentError("");
  };

  const handleToggleAbsent = (studentId: string) => {
    if (!selectedClassId) return;
    const currentlyAbsent = isStudentAbsent(data, selectedClassId, studentId, selectedDate);
    setData((current) =>
      toggleAbsent(current, selectedClassId, studentId, selectedDate, !currentlyAbsent),
    );
  };

  const handleImportCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result ?? "");
      const imported = importCombinedCsv(content);
      setData(imported);
      if (imported.classes[0]) {
        setSelectedClassId(imported.classes[0].id);
        setScreen("dashboard");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 text-sky-700">
        Loading...
      </div>
    );
  }

  if (screen === "welcome") {
    return (
      <ScreenShell>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 rounded-full bg-sky-100 p-5 text-sky-600">
            <GraduationCap className="h-14 w-14" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
            Welcome
          </p>
          <h1 className="mt-3 text-4xl font-bold text-sky-950">
            Attendance Maintenance System
          </h1>
          <p className="mt-4 text-lg text-sky-800/80">
            Mark absent students quickly, track each kid with charts, and save everything
            as CSV.
          </p>
          <ul className="mt-8 space-y-3 text-left text-sky-900">
            <li className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
              <Sparkles className="h-5 w-5 text-sky-500" />
              Select your class first
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
              <UserPlus className="h-5 w-5 text-sky-500" />
              Add students with unique register numbers
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
              <CalendarCheck className="h-5 w-5 text-sky-500" />
              Everyone is present — just mark who is absent
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setScreen("class-select")}
            className="mt-10 rounded-2xl bg-sky-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
          >
            Get Started
          </button>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "class-select") {
    return (
      <ScreenShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <button
            type="button"
            onClick={() => setScreen("welcome")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-sky-950">Select Your Class</h2>
          <p className="mt-2 text-sky-800">
            Choose an existing class or create a new one to continue.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PRESET_CLASSES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleCreateClass(name)}
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-left font-semibold text-sky-900 shadow-sm transition hover:border-sky-400 hover:bg-sky-50"
              >
                {name}
              </button>
            ))}
          </div>

          {data.classes.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-700">
                Your saved classes
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.classes.map((schoolClass) => (
                  <button
                    key={schoolClass.id}
                    type="button"
                    onClick={() => {
                      setSelectedClassId(schoolClass.id);
                      const count = getStudentsForClass(data, schoolClass.id).length;
                      setScreen(count > 0 ? "dashboard" : "add-students");
                    }}
                    className="rounded-2xl border border-sky-300 bg-sky-100 px-5 py-4 text-left font-semibold text-sky-900 transition hover:bg-sky-200"
                  >
                    {schoolClass.name}
                    <span className="mt-1 block text-sm font-normal text-sky-700">
                      {getStudentsForClass(data, schoolClass.id).length} students
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-sky-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-sky-950">Create custom class</h3>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateClass(newClassName)}
                placeholder="e.g. Class 10A"
                className="flex-1 rounded-xl border border-sky-200 px-4 py-3 text-sm outline-none ring-sky-400 focus:ring-2"
              />
              <button
                type="button"
                onClick={() => handleCreateClass(newClassName)}
                className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Create & Continue
              </button>
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "add-students") {
    return (
      <ScreenShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <button
            type="button"
            onClick={() => setScreen("class-select")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Change class
          </button>

          <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-sky-600">Selected class</p>
            <h2 className="text-2xl font-bold text-sky-950">
              {selectedClass?.name ?? "Unknown class"}
            </h2>
            <p className="mt-2 text-sky-800">
              Add students with a unique register number for each kid.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Student name"
                className="rounded-xl border border-sky-200 px-4 py-3 text-sm outline-none ring-sky-400 focus:ring-2"
              />
              <input
                type="text"
                value={newRegisterNumber}
                onChange={(e) => setNewRegisterNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
                placeholder="Register number (unique)"
                className="rounded-xl border border-sky-200 px-4 py-3 text-sm outline-none ring-sky-400 focus:ring-2"
              />
            </div>
            {studentError && (
              <p className="mt-2 text-sm font-medium text-red-600">{studentError}</p>
            )}
            <button
              type="button"
              onClick={handleAddStudent}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              <UserPlus className="h-4 w-4" />
              Add Student
            </button>

            {classStudents.length > 0 && (
              <div className="mt-6 overflow-hidden rounded-xl border border-sky-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-sky-50 text-sky-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Reg. No</th>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classStudents.map((student) => (
                      <tr key={student.id} className="border-t border-sky-100">
                        <td className="px-4 py-3 font-mono text-sky-700">
                          {student.registerNumber}
                        </td>
                        <td className="px-4 py-3 font-medium text-sky-950">
                          {student.name}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setData((current) => removeStudent(current, student.id))
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              type="button"
              disabled={classStudents.length === 0}
              onClick={() => setScreen("dashboard")}
              className="mt-6 w-full rounded-2xl bg-sky-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
            >
              Continue to Attendance
            </button>
          </div>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <header className="border-b border-sky-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
              {selectedClass?.name}
            </p>
            <h1 className="text-2xl font-bold text-sky-950">Attendance Dashboard</h1>
            <p className="mt-1 text-sm text-sky-700">
              All students are present by default — mark only absent students.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setScreen("add-students")}
              className="rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100"
            >
              Add Students
            </button>
            <button
              type="button"
              onClick={() => setScreen("class-select")}
              className="rounded-xl border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-50"
            >
              Change Class
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <nav className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(
            [
              { id: "mark", label: "Mark Absent", icon: CalendarCheck },
              { id: "lists", label: "Present / Absent", icon: ListChecks },
              { id: "analytics", label: "Kid Analytics", icon: BarChart3 },
              { id: "data", label: "CSV Data", icon: Download },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "border-sky-600 bg-sky-600 text-white shadow-md shadow-sky-200"
                    : "border-sky-200 bg-white text-sky-800 hover:border-sky-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "mark" && (
          <section className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label className="mb-1 block text-sm font-medium text-sky-800">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-xl border border-sky-200 px-4 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
                />
                <p className="mt-1 text-xs text-sky-600">{formatDisplayDate(selectedDate)}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  selectedClassId &&
                  setData((current) =>
                    clearAbsentForDate(current, selectedClassId, selectedDate),
                  )
                }
                className="rounded-xl bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-200"
              >
                Clear All Absent (All Present)
              </button>
            </div>

            <p className="mb-4 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-800">
              <strong>{present.length}</strong> present · <strong>{absent.length}</strong>{" "}
              absent · Tap a student to mark them absent
            </p>

            <div className="space-y-2">
              {classStudents.map((student) => {
                const isAbsent = isStudentAbsent(
                  data,
                  selectedClassId,
                  student.id,
                  selectedDate,
                );
                return (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => handleToggleAbsent(student.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                      isAbsent
                        ? "border-red-300 bg-red-50"
                        : "border-sky-100 bg-sky-50/50 hover:border-sky-300"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sky-950">{student.name}</p>
                      <p className="text-xs text-sky-600">Reg: {student.registerNumber}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        isAbsent
                          ? "bg-red-500 text-white"
                          : "bg-sky-500 text-white"
                      }`}
                    >
                      {isAbsent ? "Absent" : "Present"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === "lists" && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2 rounded-2xl border border-sky-200 bg-white p-4 shadow-sm">
              <label className="mb-1 block text-sm font-medium text-sky-800">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border border-sky-200 px-4 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
              />
            </div>
            <ListCard title="Present" count={present.length} tone="sky" students={present} />
            <ListCard title="Absent" count={absent.length} tone="red" students={absent} />
          </section>
        )}

        {activeTab === "analytics" && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Field label="Student">
                  <select
                    value={analyticsStudentId}
                    onChange={(e) => setAnalyticsStudentId(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 px-3 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
                  >
                    <option value="">Select student</option>
                    {classStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.registerNumber} — {student.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="From">
                  <input
                    type="date"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 px-3 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
                  />
                </Field>
                <Field label="To">
                  <input
                    type="date"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="w-full rounded-xl border border-sky-200 px-3 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
                  />
                </Field>
                <Field label="Chart type">
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as ChartType)}
                    className="w-full rounded-xl border border-sky-200 px-3 py-2.5 text-sm outline-none ring-sky-400 focus:ring-2"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="area">Area Chart</option>
                    <option value="pie">Pie Chart</option>
                  </select>
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
                    className="w-full rounded-xl border border-sky-200 px-3 py-2.5 text-sm font-medium text-sky-800 hover:bg-sky-50"
                  >
                    Last 7 days
                  </button>
                </div>
              </div>

              {selectedStudent && (
                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <StatCard label="Present Days" value={studentStats.present} tone="sky" />
                  <StatCard label="Absent Days" value={studentStats.absent} tone="red" />
                  <StatCard label="Total Days" value={studentStats.total} tone="slate" />
                  <StatCard label="Attendance %" value={`${studentStats.attendanceRate}%`} tone="blue" />
                </div>
              )}
            </div>

            {selectedStudent && (
              <ChartPanel title={`${selectedStudent.name} — ${chartType} chart`}>
                <AnalyticsChart
                  chartType={chartType}
                  chartData={chartData}
                  pieData={pieData}
                />
              </ChartPanel>
            )}
          </section>
        )}

        {activeTab === "data" && (
          <section className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-sky-950">CSV Data Storage</h2>
            <p className="mt-2 text-sm text-sky-800">
              All data is saved in CSV format. Download a backup or import a previous CSV
              file to restore your data.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm">
                <p className="font-semibold text-sky-900">{data.classes.length}</p>
                <p className="text-sky-700">Classes</p>
              </div>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm">
                <p className="font-semibold text-sky-900">{data.students.length}</p>
                <p className="text-sky-700">Students</p>
              </div>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm">
                <p className="font-semibold text-sky-900">{data.records.length}</p>
                <p className="text-sky-700">Absent records</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => downloadCombinedCsv(data)}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-5 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-50"
              >
                <Upload className="h-4 w-4" />
                Import CSV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleImportCsv}
              />
            </div>
          </section>
        )}
      </div>
    </ScreenShell>
  );
}

function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-cyan-50 text-sky-950">
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-sky-800">{label}</span>
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
  tone: "sky" | "red" | "slate" | "blue";
}) {
  const tones = {
    sky: "border-sky-200 bg-sky-50 text-sky-900",
    red: "border-red-200 bg-red-50 text-red-900",
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
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
  tone,
  students,
}: {
  title: string;
  count: number;
  tone: "sky" | "red";
  students: { id: string; name: string; registerNumber: string }[];
}) {
  const styles = {
    sky: "border-sky-200 bg-sky-50",
    red: "border-red-200 bg-red-50",
  };
  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${styles[tone]}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-sky-950">{title}</h3>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-semibold text-sky-800">
          {count}
        </span>
      </div>
      <ul className="space-y-2">
        {students.length === 0 ? (
          <li className="text-sm text-sky-700">No students in this list.</li>
        ) : (
          students.map((student) => (
            <li
              key={student.id}
              className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-sky-950"
            >
              <span className="font-mono text-xs text-sky-600">{student.registerNumber}</span>
              <span className="ml-2">{student.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-sky-950">{title}</h3>
      {children}
    </div>
  );
}

function AnalyticsChart({
  chartType,
  chartData,
  pieData,
}: {
  chartType: ChartType;
  chartData: { date: string; present: number; absent: number; rate: number }[];
  pieData: { name: string; value: number; color: string }[];
}) {
  if (chartType === "pie") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {pieData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(v) => [`${v}%`, "Attendance"]} />
          <Legend />
          <Line type="monotone" dataKey="rate" stroke="#0284c7" strokeWidth={2} name="Attendance %" dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(v) => [`${v}%`, "Attendance"]} />
          <Legend />
          <Area type="monotone" dataKey="rate" stroke="#0284c7" fill="#7dd3fc" name="Attendance %" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} domain={[0, 1]} ticks={[0, 1]} />
        <Tooltip
          formatter={(value, name) => [
            Number(value) === 1 ? "Yes" : "No",
            name === "present" ? "Present" : "Absent",
          ]}
        />
        <Legend />
        <Bar dataKey="present" fill="#0284c7" name="Present" />
        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
      </BarChart>
    </ResponsiveContainer>
  );
}
