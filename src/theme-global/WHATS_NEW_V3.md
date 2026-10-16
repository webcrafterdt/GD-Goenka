# Theme v3 — Complete Color Change + TeacherHome Redesign

## 1) Poori app ka color completely badla
Pehli purple/violet theme hata kar ek naya **standard Blue → Sky → Teal**
palette laaya gaya hai — clean, professional, zyada dark nahi (jaisa
aapne bola tha). Ye change **automatically saare 30+ pages** me apply
hoga kyunki:
- `theme-global/variables.scss` — Ionic ke core color variables (primary/
  secondary/tertiary) naye palette me update
- `theme-global/modern-ui.scss` — global shadows, gradients, buttons,
  cards, list-rows sab naye palette me
- Har individual `.page.scss` (aur jaha zaroor tha wahan `.page.html`
  ke inline colors bhi) me purana purple hex codes dhoond kar naye
  palette ke matching blue/teal shades se replace kiye gaye — poori
  app consistent dikhegi, kahin purana purple nahi bacha.

Naya palette:
- Primary: `#2563EB` (blue)
- Secondary: `#0EA5E9` (sky)
- Tertiary: `#0D9488` (teal)
- Success/Danger/Warning status colors untouched (attendance/fees ke
  green/red/amber jaisi ke waisi hain, taaki meaning na badle)

## 2) TeacherHome — poora naya look
- Header me **notification bell icon** add kiya (circular pe le jaata
  hai, unread hone par chhota dot dikhta hai)
- Profile hero card me ek chhoti **greeting line** ("Welcome back" —
  agar aap `.ts` me `greeting` property set karein to time-based
  "Good Morning/Afternoon/Evening" bhi dikha sakte hain)
- **Naye "count" widgets** — 4 quick stat cards (Students, Attendance %,
  Leave Requests, Notices) profile card ke neeche, dashboard grid ke
  upar. Ye reusable `.stat-grid` / `.stat-card` classes use karte hain
  jo `modern-ui.scss` me add ki gayi hain — kisi bhi page pe reuse ho
  sakti hain.
  - Bindings expected in `teacherhome.page.ts`: `totalStudents`,
    `attendancePercent`, `pendingLeaves`, `noticeCount`. Jab tak ye
    properties na ho, cards safely `--` dikhate hain (crash nahi
    karenge).
- Dashboard tiles, quick-links speed-dial, footer — sab naye blue/teal
  palette me update.

## 3) Baaki pages
Sabhi 30+ pages (login, profile, attendance, fees, marks, chat, leave,
circular, groups, etc.) ka color automatically naye palette me change
ho gaya hai global variables + per-page hardcoded hex replace ki wajah
se. Layout/HTML structure/bindings kahin touch nahi hui (sirf colors),
sivaay teacherhome ke jahan aapne specifically bola tha.

## Install steps (same as pehle)
1. `theme-global/variables.scss` → copy to `src/theme/variables.scss`
2. `theme-global/modern-ui.scss` → copy to `src/theme/modern-ui.scss`
   (`src/global.scss` me `@import 'theme/modern-ui.scss';` already hona
   chahiye — agar nahi hai to end me add kar dein)
3. Baaki `pages/*.page.html` / `*.page.scss` apne respective folders me
   replace kar dein.
4. TeacherHome ke count widgets live data ke liye upar diye 4
   properties apne `teacherhome.page.ts` me set karein.
