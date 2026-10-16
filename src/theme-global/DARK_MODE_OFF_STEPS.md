# Setup Steps

## 0) Modern UI styles activate karna (poori app ke buttons/inputs/cards)
`theme-global/modern-ui.scss` ko copy karke apne project mein
`src/theme/modern-ui.scss` par paste karein, phir `src/global.scss` ke
bilkul aakhir mein ye line add kar dein:
```scss
@import 'theme/modern-ui.scss';
```
Isse poori app ke buttons, input fields, cards, headers automatically
rounded + soft-shadow + modern feel le lenge — bina kisi page ki HTML
ya logic touch kiye.

---

# Dark Mode ko permanently OFF karne ke 3 steps


Page-level colors already fixed kar diye hain (theme-global/variables.scss +
saare .page.scss/.page.html files). Bas neeche ke 3 chhote steps kar dein
taaki poori app **kabhi bhi** phone ke dark mode se affect na ho:

## 1) `src/theme/variables.scss` replace/merge karein
Is folder wali `variables.scss` ko apne project ke `src/theme/variables.scss`
mein copy-paste/merge kar dein. Agar usme pehle se
`@media (prefers-color-scheme: dark) { ... }` wala block hai, use **delete**
kar dein — yahi block dark mode par colors switch karta hai.

## 2) `global.scss` mein dark palette import hata dein
`src/global.scss` file kholein aur agar ye line dikhe:
```scss
@import "@ionic/angular/css/palettes/dark.system.css";
```
ise **hata kar** ye line laga dein (Ionic 7+):
```scss
@import "@ionic/angular/css/palettes/dark.never.css";
```
(Agar aapki Ionic version purani hai aur ye file exist nahi karti, to bas
step 1 wala line hata dena hi kaafi hai — `dark.system.css` import na ho.)

## 3) `src/index.html` mein ek meta tag add karein
`<head>` ke andar ye line add kar dein:
```html
<meta name="color-scheme" content="light only">
```

Bas — in teeno steps ke baad app **hamesha light/modern theme** mein hi
dikhegi, phone Settings mein dark mode on ho ya off, koi fark nahi padega.
Kisi bhi page ki functionality (buttons, forms, navigation, logic) bilkul
touch nahi hui hai — sirf colors update hue hain.
