# 110 — Destructuring Objects (تدريبات)

> اكتب الحلول في `09-Data-Structures-Operators/starter/script.js`.
> حط كل تمرين جوّا `{ ... }` لوحده عشان الأسماء متضربش.
> **الحلول في `solutions.md`، جرّب الأول.**

المستويات: 🟢 سهل · 🟡 متوسط · 🔴 أصعب شوية

---

## تمرين 1 🟢 — أول object destructuring
**البيانات:** `restaurant`

**المطلوب:** طلّع `name` و`location` و`mainMenu` في سطر واحد، واطبعهم.

**المتوقع تقريبًا:** `Classico Italiano Via Angelo Tavanti 23, Firenze, Italy ['Pizza', 'Pasta', 'Risotto']`

---

## تمرين 2 🟢 — الترتيب مش مهم
**المطلوب:** اكتب نفس destructuring تمرين 1 بس بترتيب **معكوس** (`mainMenu` الأول). وبعدين جرّب تكتب `locaton` (غلط إملائي) بدل `location` واطبعه.

**المتوقع تقريبًا:** نفس النتيجة للترتيب المعكوس، و`undefined` للاسم الغلط.

---

## تمرين 3 🟢 — Rename
**المطلوب:** طلّع من `restaurant`:
- `name` في متغير اسمه `title`
- `categories` في متغير اسمه `labels`

واطبعهم. وبعدين جرّب تطبع `categories` في نفس الـ block. (فكر: هل اتعملت؟)

**المتوقع تقريبًا:** `Classico Italiano ['Italian', ...]`، و`categories` مش هتبقى متغير جديد (هتاخد error لو مفيش واحد متعرّف بره).

---

## تمرين 4 🟡 — Defaults + rename
**المطلوب:** من `restaurant` طلّع:
- `drinksMenu` (مش موجودة) بـ default `['Water']`
- `mainMenu` باسم `mains` وبـ default `[]`
- `rating` (مش موجودة) بـ default `4.2`

**المتوقع تقريبًا:** `['Water'] ['Pizza', 'Pasta', 'Risotto'] 4.2`

---

## تمرين 5 🟡 — Mutating variables
**البيانات:**
```js
let city = 'Cairo';
let country = 'Egypt';
const place = { city: 'Firenze', country: 'Italy', zip: 50132 };
```
**المطلوب:**
1. خلي `city` و`country` ياخدوا القيم اللي في `place` من غير `let` أو `const` جديدة.
2. جرّب الأول من غير قوسين، واكتب الـ error في كومنت، وبعدين صلّحه.

**المتوقع تقريبًا:** `Firenze Italy`، والمحاولة الأولى `SyntaxError`.

---

## تمرين 6 🟡 — Nested objects
**المطلوب:**
1. من `restaurant.openingHours` طلّع مواعيد `thu` في متغيرين `open` و`close`.
2. في سطر تاني، من `restaurant` **مباشرة** (من غير ما تطلع `openingHours` الأول) طلّع مواعيد `sat` بأسماء `satOpen` و`satClose`.

**المتوقع تقريبًا:** `12 22` وبعدين `0 24`

---

## تمرين 7 🔴 — Nested + defaults
**البيانات:** نفس `restaurant.openingHours`.

**المطلوب:** طلّع مواعيد `sun` (مش موجودة في البيانات!) في `sunOpen` و`sunClose`، بحيث لو اليوم مش موجود ياخدوا `'closed'`.

**تلميح:** هتحتاج default للـ object الخارجي (`sun`) نفسه، مش بس للـ properties الداخلية. جرّب الأول من غير default على `sun` وشوف إيه اللي هيحصل.

**المتوقع تقريبًا:** `closed closed`، والمحاولة من غير default على `sun` هتدّي `TypeError`.

---

## تمرين 8 🔴 — orderDelivery بتاعتك
**المطلوب:**
1. اعمل `restaurant.orderDelivery` بتاخد **object واحد** وتفككه في الـ parameters: `starterIndex` (default `1`)، `mainIndex` (default `0`)، `time` (default `'20:00'`)، `address`.
2. تطبع: `Order received! <starter> and <main> will be delivered to <address> at <time>`
3. نادي عليها مرتين:
   - مرة بكل القيم: `starterIndex: 2, mainIndex: 2, time: '22:30', address: 'Via del Sole, 21'` (اكتبهم بأي ترتيب).
   - مرة بـ `address` و`starterIndex: 0` بس.
4. بونص 🎁: خلي الـ function متضربش لو اتنادت من غير أي argument خالص `restaurant.orderDelivery()`.

**المتوقع تقريبًا:**
```
Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30
Order received! Focaccia and Pizza will be delivered to ... at 20:00
```
