# Horizon Attendance

Standalone **sky-blue** attendance desk for a single teacher. Open one HTML file (served on **port 5500**) and the whole app runs — roster, period-wise roll, graphs, CSV, and a six-month local register.

This replaces the old MERN split (React + Express + Mongo) with a self-contained frontend that still keeps every saved roll for **at least 6 months**.

## Run on localhost 5500

```bash
cd attendance-app
python3 serve.py
```

Then open [http://localhost:5500](http://localhost:5500).

Any static host on 5500 also works (VS Code Live Server, `npx serve -l 5500`, etc.). Prefer `http://localhost:5500` over double-clicking the file so the browser allows IndexedDB.

## What you can do

1. **Dashboard** — today’s present / late / absent counts and saved periods.
2. **Student roster** — five homerooms (VIII-A, VIII-B, IX-A, X-A, X-B) with realistic fields: roll, admission no., house, guardian, phone.
3. **Mark attendance** — class + date + period + subject + room. Default Present; flip Late / Absent / Excused. Re-opening the same class/date/period loads the saved roll.
4. **Session history** — every period still inside the retention window.
5. **Reports & graph** — stacked day bars and per-student %.
6. **Export** — CSV for office records, plus a full JSON backup.
7. **Campus settings** — school, campus, academic year, faculty, staff ID, department, retention (minimum 6 months).

## Six-month record keeping

- Rolls are stored in **IndexedDB** in this browser (`horizon-attendance-v1`).
- Retention is **6 months minimum**. Older sessions are pruned only when the app opens *after* that window.
- Use the same browser profile on this machine to keep the live register.
- Download **full 6-month backup JSON** from Export if you need an office copy.

## Realistic fields (vs. name + present/absent only)

Period bell times, subject, room, staff ID, academic year, admission number, house, guardian, phone, late and excused marks, and who saved the roll.

Demo students are seeded on first launch so the desk is usable immediately.
