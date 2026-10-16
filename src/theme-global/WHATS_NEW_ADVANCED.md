# Advanced Theme Upgrade — Kya Naya Hai

## 1) Global upgrade (saare 30+ pages pe automatically apply hoga)
`theme-global/modern-ui.scss` completely upgrade kiya gaya hai. Isse
poori app me ye cheezein automatically better dikhengi — **kisi page
ki HTML ya logic touch kiye bina**:

- Premium font (Poppins) poori app me
- Header/toolbar ko deeper shadow + polish
- Buttons: gradient, colored shadow, press animation
- Inputs/ion-item: rounded, soft glow on focus
- Cards (`ion-card`, `.summary-card`): glass-style border + shadow +
  gradient number text on stat cards
- **`.custom-row`** (18+ list pages jaise Groups, Circular, Fees,
  Attendance list, Student list etc. me use hoti hai) ab ek elevated
  card jaisi dikhti hai — left color accent bar, hover/press lift,
  better spacing
- Dashboard tiles (`.container`), attendance grid (`.student-card`),
  tables, segments, footer, modals — sabka look upgrade kiya gaya
- Naye reusable utility classes bhi diye hain agar aage aur pages
  hand-polish karne ho: `.badge-soft`, `.avatar-ring`,
  `.section-title`, `.empty-state`, `.glass-card`

**Install same as pehle:** `theme-global/modern-ui.scss` ko
`src/theme/modern-ui.scss` par copy-paste karein, `src/global.scss`
ke end me `@import 'theme/modern-ui.scss';` already add hai to bas
file replace karni hai.

## 2) Hand-redesigned pages (poora naya look + view)
In 3 pages ka HTML bhi thoda change kiya gaya hai (jaisa aapne allow
kiya tha) taaki ye "advance" feel de:

- **login.page.html/scss** — animated soft gradient blobs background,
  floating logo ring, glass login card, better spacing
- **teacherhome.page.html/scss** — naya gradient profile-hero card
  (avatar + name + designation badge), dashboard tiles ab white
  elevated icon-tiles ki tarah dikhte hain, footer logout button
  polished
- **teacherprofile.page.html/scss** — gradient banner + tap-to-zoom
  photo, details ab icon ke saath modern info-rows me dikhte hain
  (pehle plain label:value list tha)

## 3) Baaki 27 pages
Inki HTML same rakhi gayi hai (functionality/bindings untouched) —
inpe global upgrade (#1) apply hoga jisse `.custom-row` lists,
`ion-card`/`summary-card`, buttons, inputs sab automatically
zyada "advanced" dikhenge. Agar aap chahein to inme se kisi specific
page (jaise Teacher Fees, Attendance, Marks) ko bhi login/home ki
tarah pura hand-redesign karwa sakte hain — bata dijiyega, wo bhi kar
denge.

## 4) Dark mode
Pehle wale `DARK_MODE_OFF_STEPS.md` ke 3 steps bilkul same hain,
unme koi change nahi kiya.
