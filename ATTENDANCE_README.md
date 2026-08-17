# Attendance Maintenance System

A simple web app to mark student attendance, view present/absent lists, analyze each kid with charts, and download all records as CSV.

## Features

- Mark **Present** or **Absent** for each student by date
- View **Present**, **Absent**, and **Not Marked** lists
- **Kid Analytics** with custom date range (bar chart + attendance trend)
- **Download CSV** with date, student name, and status
- Data saves automatically in your browser (no database needed)

---

## Requirements

- **Node.js 18+** (recommended: Node.js 20 or newer)
- **npm** (comes with Node.js)

Check your version:

```bash
node -v
npm -v
```

---

## Quick Start (3 steps)

### 1. Extract the zip

Unzip the folder anywhere on your computer, for example:

```text
attendance-system/
```

### 2. Install dependencies

Open a terminal inside the project folder and run:

```bash
npm install
```

### 3. Run the app

**Development mode** (recommended for daily use):

```bash
npm run dev
```

Open in your browser:

```text
http://localhost:3000/attendance
```

---

## Production Build (optional)

To build and run the optimized version:

```bash
npm run build
npm run start
```

Then open:

```text
http://localhost:3000/attendance
```

---

## How to Use

### Add students
1. Go to `/attendance`
2. Type a student name in **Add student name**
3. Click **Add Student**

### Mark attendance
1. Open the **Mark Attendance** tab
2. Select the date
3. Click **Present** or **Absent** for each student
4. Use **Mark All Present** / **Mark All Absent** for quick bulk marking

### View lists
1. Open the **Present / Absent** tab
2. Pick a date
3. See who is present, absent, or not marked

### Kid analytics
1. Open the **Kid Analytics** tab
2. Select a student
3. Choose **From** and **To** dates (or click **Last 7 days**)
4. View counts, attendance %, and charts

### Download CSV
1. Open the **Download CSV** tab
2. Click **Download CSV File**
3. Open the file in Excel or Google Sheets

---

## Data Storage

- Attendance data is stored in your browser **localStorage**
- Data stays on your computer — no server or database setup required
- Clearing browser data for this site will remove saved attendance records

**Tip:** Export CSV regularly as a backup.

---

## Project Structure

```text
src/
  app/attendance/          # Attendance page route
  components/attendance/   # Main attendance UI
  lib/attendance/          # Storage, types, CSV, analytics helpers
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from https://nodejs.org |
| Port 3000 already in use | Run `npm run dev -- --port 3001` and open `http://localhost:3001/attendance` |
| Page is blank after install | Run `npm install` again, then `npm run dev` |
| Data disappeared | Browser storage was cleared — restore from your latest CSV backup |

---

## Commands Summary

| Command | What it does |
|---------|----------------|
| `npm install` | Install dependencies (run once after extracting) |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server (after build) |
| `npm run lint` | Check code quality |

---

## Support

For issues or changes, edit files in:

- UI: `src/components/attendance/AttendanceApp.tsx`
- Logic: `src/lib/attendance/`
