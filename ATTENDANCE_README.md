# Attendance Maintenance System

A simple sky-blue themed web app to manage class attendance. Everyone is **present by default** — you only mark who is **absent**.

## Features

- **Welcome screen** → guides you into the app
- **Class selection** → pick or create a class first
- **Add students** → name + unique register number
- **Absent-only marking** → tap a student to mark absent (tap again to mark present)
- **Present / Absent lists** by date
- **Kid analytics** with date range — Bar, Line, Area, and Pie charts
- **CSV storage** — data saved in CSV format (download & import)

---

## Requirements

- Node.js 18+
- npm

---

## Quick Start

```bash
npm install
npm run dev
```

Open: **http://localhost:3000/attendance**

---

## How to Use

### Step 1 — Welcome
Click **Get Started** on the welcome screen.

### Step 2 — Select Class
- Choose a preset class (Class 1–10) or create a custom class name
- You can also pick a previously saved class

### Step 3 — Add Students
- Enter student **name** and **register number** (must be unique)
- Click **Add Student** for each kid
- Click **Continue to Attendance**

### Step 4 — Mark Attendance
- All students start as **Present**
- Tap a student to mark them **Absent**
- Tap again to mark them back as **Present**
- Use **Clear All Absent** to reset everyone to present for that day

### Step 5 — View Lists
- See **Present** and **Absent** lists for any date

### Step 6 — Kid Analytics
- Select a student and date range
- Choose chart type: **Bar**, **Line**, **Area**, or **Pie**
- View attendance % and daily breakdown

### Step 7 — CSV Data
- **Download CSV** — backup all classes, students, and absent records
- **Import CSV** — restore from a previous backup file

---

## CSV Format

Data is stored in CSV format (not JSON). The downloaded file has three sections:

```csv
# CLASSES
id,name,createdAt
...

# STUDENTS
id,classId,name,registerNumber,createdAt
...

# ATTENDANCE
id,classId,studentId,date,status
...
```

Only **absent** records are stored. Present is the default.

---

## Production Build

```bash
npm run build
npm run start
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |

---

## Tips

- Register numbers must be **unique** across all students
- Download CSV regularly as a backup
- Use **Import CSV** to move data to another computer
