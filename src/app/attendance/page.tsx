import { AttendanceApp } from "@/components/attendance/AttendanceApp";

export const metadata = {
  title: "Attendance System",
  description: "Simple attendance maintenance with charts and CSV export",
};

export default function AttendancePage() {
  return <AttendanceApp />;
}
