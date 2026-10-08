# 108 — Destructuring Arrays (تدريبات)

> اكتب الحلول في `09-Data-Structures-Operators/starter/script.js` وشوف النتيجة في الـ Console.
> حط كل تمرين جوّا `{ ... }` لوحده، عشان أسماء المتغيرات متضربش في بعض.
> **الحلول في `solutions.md`، متفتحهوش غير لما تجرّب بجد.**

المستويات: 🟢 سهل · 🟡 متوسط · 🔴 أصعب شوية

---

## تمرين 1 🟢 — أول destructuring
**البيانات:**
```js
const scores = [90, 75, 60];
```
**المطلوب:** طلّع التلات قيم في 3 متغيرات `math` و`physics` و`chemistry` في سطر واحد بالـ destructuring، واطبعهم.

**المتوقع تقريبًا:** `90 75 60`، والـ `scores` نفسها لسه زي ما هي.

---

## تمرين 2 🟢 — أول عنصرين بس
**البيانات:** `restaurant.mainMenu` (فيها `['Pizza', 'Pasta', 'Risotto']`).

**المطلوب:** خد أول طبقين بس في متغيرين `firstDish` و`secondDish`.

**المتوقع تقريبًا:** `Pizza Pasta`

---

## تمرين 3 🟢 — التخطي بالـ hole
**البيانات:** `restaurant.starterMenu` (فيها `['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']`).

**المطلوب:** خد **الأول** و**الرابع** بس في متغيرين `firstStarter` و`lastStarter`، من غير ما تستخدم أي index.

**المتوقع تقريبًا:** `Focaccia Caprese Salad`

---

## تمرين 4 🟡 — Swap من غير temp
**البيانات:**
```js
let today = 'Thursday';
let tomorrow = 'Friday';
```
**المطلوب:**
1. بدّل القيمتين في سطر واحد بالـ destructuring، من غير متغير `temp`.
2. جرّب نفس الكلام بس لو المتغيرين `const`، واكتب في كومنت الـ error اللي ظهر وليه.

**المتوقع تقريبًا:** `Friday Thursday`، وفي حالة `const` هيظهر `TypeError`.

---

## تمرين 5 🟡 — قيم راجعة من function
**المطلوب:**
1. اعمل function عادية اسمها `getMinMax` بتاخد array أرقام وبترجع array فيها `[أصغر رقم, أكبر رقم]`. (تقدر تستخدم `Math.min(...)` و`Math.max(...)` أو loop).
2. نادي عليها بـ `[4, 18, 2, 9]` وفكك النتيجة مباشرة في `min` و`max`.
3. وبعدين: صلّح/اكتب `restaurant.order` بحيث ترجع `[starterMenu[starterIndex], mainMenu[mainIndex]]`، ونادي `restaurant.order(1, 2)` وفكك النتيجة في `starter` و`mainCourse`.

**المتوقع تقريبًا:** `2 18` وبعدين `Bruschetta Risotto`

---

## تمرين 6 🟡 — Nested destructuring
**البيانات:**
```js
const ratings = [4.5, 3.8, [5, 4]];
```
**المطلوب:**
1. خد أول رقم في `overall`، والـ array اللي جوّا كلها في `details`.
2. في سطر تاني: خد أول رقم في `overall2`، وفك الـ array الداخلية في `food` و`service`، ومتاخدش الرقم التاني (`3.8`).

**المتوقع تقريبًا:** `4.5 [5, 4]` وبعدين `4.5 5 4`

---

## تمرين 7 🔴 — Default values
**البيانات:**
```js
const fromApi = [12];
const fromApi2 = [0, null];
```
**المطلوب:**
1. فك `fromApi` في 3 متغيرات `open`، `close`، `days`. خلي الـ default لـ `close` = `22` ولـ `days` = `7`.
2. فك `fromApi2` في `p` و`q` بـ default `100` للاتنين. قبل ما تشغّل، **توقع** النتيجة واكتبها في كومنت، وبعدين شغّل وقارن.

**المتوقع تقريبًا:** `12 22 7`، والجزء التاني فيه مفاجأة صغيرة 😉

---

## تمرين 8 🔴 — كله مع بعض
**البيانات:**
```js
const order = ['Table 5', ['Pizza', 'Pasta'], 'Cash'];
```
**المطلوب:** في **سطر destructuring واحد**:
- `table` = `'Table 5'`
- `dish1` و`dish2` = الطبقين اللي جوّا الـ array الداخلية
- `payment` = `'Cash'`
- `tip` = default `0` (مش موجود في الـ array)

وبعدين اطبع جملة زي: `Table 5 ordered Pizza & Pasta, paid by Cash, tip: 0`

وبونص 🎁: لو الكاشير غلط وبدّل الطبقين، بدّلهم بالـ destructuring (فكّر هل محتاج `let` ولا `const`).

**المتوقع تقريبًا:** الجملة اللي فوق، وبعد البونص `Pasta & Pizza`.
