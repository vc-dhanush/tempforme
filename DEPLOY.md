# Deploy Attendance App to Vercel (Free)

Get a live link like `https://your-app.vercel.app/attendance` in about 5 minutes.

---

## Step 1 — Push code to GitHub

Your code should be on GitHub at:

**https://github.com/vc-dhanush/tempforme**

Make sure the latest attendance changes are on the `main` branch.

---

## Step 2 — Create a Vercel account

1. Go to **https://vercel.com/signup**
2. Sign up with **GitHub** (easiest — connects your repos automatically)

---

## Step 3 — Import your project

1. Open **https://vercel.com/new**
2. Click **Import** next to `vc-dhanush/tempforme` (or search for it)
3. Vercel will auto-detect **Next.js** — leave settings as default:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave default)
   - **Install Command:** `npm install`
4. Click **Deploy**

Wait 1–2 minutes for the build to finish.

---

## Step 4 — Open your live app

After deploy, Vercel gives you a URL like:

```text
https://tempforme.vercel.app
```

**Your attendance app is at:**

```text
https://tempforme.vercel.app
```

The root URL opens the attendance app directly. (Portfolio pages remain at `/about`, `/projects`, etc.)

Bookmark this link and share it with anyone who needs to use the app.

---

## Step 5 — Custom domain (optional)

1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add a domain you own (e.g. `attendance.yourschool.com`)
3. Follow DNS instructions from Vercel

---

## Auto-updates

Every time you push to `main` on GitHub, Vercel will **automatically rebuild and redeploy** your app.

---

## Important notes

| Topic | Detail |
|-------|--------|
| **Data storage** | Attendance data is saved in each user's **browser** (CSV format). It is not stored on Vercel's servers. |
| **Backup** | Users should use **Download CSV** regularly to backup data. |
| **Free tier** | Vercel free plan is enough for this app. |
| **App URL** | Always use `/attendance` at the end of your Vercel link. |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build failed | Check build logs in Vercel dashboard. Run `npm run build` locally first. |
| Page not found | Make sure you open `/attendance` not just the root URL. |
| Data lost on new device | Import the CSV file from **CSV Data** tab. |

---

## Alternative: Netlify

1. Go to **https://app.netlify.com**
2. **Add new site** → **Import from Git** → select `tempforme`
3. Build command: `npm run build`
4. Publish directory: `.next` (or use Netlify's Next.js plugin)
5. Deploy — app at `https://your-site.netlify.app/attendance`

**Vercel is recommended** for Next.js apps (simplest setup).

---

## Quick command (if you use Vercel CLI locally)

```bash
npm i -g vercel
vercel login
vercel --prod
```

Then open: `https://<your-project>.vercel.app/attendance`
