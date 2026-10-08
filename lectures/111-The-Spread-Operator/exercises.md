# 111 — The Spread Operator `...` (تدريبات)

> اكتب الحلول في `09-Data-Structures-Operators/starter/script.js`.
> حط كل تمرين جوّا `{ ... }` لوحده عشان الأسماء متضربش.
> **الحلول في `solutions.md`، جرّب الأول.**

المستويات: 🟢 سهل · 🟡 متوسط · 🔴 أصعب شوية

---

## تمرين 1 🟢 — بالنقط ومن غيرها
**البيانات:**
```js
const nums = [3, 4, 5];
```
**المطلوب:**
1. اعمل `withoutSpread = [1, 2, nums]` و`withSpread = [1, 2, ...nums]` واطبعهم، واكتب في كومنت الفرق.
2. اطبع `withSpread` مرة عادي ومرة `console.log(...withSpread)`.

**المتوقع تقريبًا:** `[1, 2, [3, 4, 5]]` و`[1, 2, 3, 4, 5]`، وبعدين `1 2 3 4 5` منفصلين.

---

## تمرين 2 🟢 — أضيف طبق من غير ما ألمس الأصلية
**المطلوب:** اعمل `newMainMenu` فيها `'Lasagna'` في **الأول** وكل `restaurant.mainMenu` وبعدين `'Gnocchi'` في **الآخر**. اطبعها واطبع `restaurant.mainMenu`.

**المتوقع تقريبًا:** `['Lasagna', 'Pizza', 'Pasta', 'Risotto', 'Gnocchi']`، والأصلية زي ما هي.

---

## تمرين 3 🟢 — نسخة حقيقية vs مش نسخة
**المطلوب:**
1. اعمل `realCopy = [...restaurant.starterMenu]` و`fakeCopy = restaurant.starterMenu`.
2. اعمل `push('Olives')` على `realCopy` واطبع `restaurant.starterMenu`.
3. فكر (من غير ما تشغّل) إيه اللي هيحصل لو عملت `push` على `fakeCopy`، واكتبه في كومنت. (متشغلهاش عشان متغيرش بيانات المطعم للتمارين اللي بعد.)

**المتوقع تقريبًا:** الأصلية مش هيبقى فيها `Olives` من `realCopy`.

---

## تمرين 4 🟡 — دمج + Spread vs Destructuring
**المطلوب:**
1. اعمل `fullMenu` فيها `starterMenu` و`mainMenu` مع بعض، وبينهم string `'---'`.
2. من `fullMenu` باستخدام **destructuring** خد أول عنصرين في `s1` و`s2`.
3. اكتب في كومنت سطرين: إيه الفرق بين اللي عملته في 1 واللي عملته في 2.

**المتوقع تقريبًا:** array فيها 8 عناصر و`'---'` في النص، و`Focaccia Bruschetta`.

---

## تمرين 5 🟡 — Iterables
**المطلوب:**
1. حول اسمك `'Eslam'` لـ array حروف وزوّد في آخرها `'!'`.
2. اطبع حروف `'Classico'` منفصلة في `console.log` واحد بالـ spread.
3. استخدم الـ Sets اللي في أول `script.js` (`italianFoods` و`mexicanFoods`) واعمل array واحدة فيها الاتنين.
4. جرّب `[...restaurant]` واكتب الـ error في كومنت (وبعدين اعمله كومنت عشان باقي الكود يشتغل).
5. بونص: جرّب `` `${...'Eslam'}` `` واكتب الـ error وليه.

**المتوقع تقريبًا:** `['E','s','l','a','m','!']`، `C l a s s i c o`، array فيها 12 أكلة، `TypeError: restaurant is not iterable`، و`SyntaxError`.

---

## تمرين 6 🟡 — Spread في arguments
**المطلوب:**
1. اعمل `restaurant.orderPasta = function (ing1, ing2, ing3) { ... }` بتطبع `Here is your delicious pasta with <ing1>, <ing2> and <ing3>`.
2. اعمل `const ingredients = ['mushrooms', 'cream', 'parmesan']` ونادي الـ function بالـ spread.
3. (اختياري) اعمل `ingredients` بـ 3 `prompt()` بدل ما تكتبهم.
4. اطبع أكبر سعر في `const prices = [45, 120, 80, 60]` باستخدام `Math.max`، ومرة جرّب `Math.max(prices)` من غير spread.

**المتوقع تقريبًا:** جملة الباستا، و`120`، و`NaN` من غير spread.

---

## تمرين 7 🔴 — Spread على objects
**المطلوب:**
1. اعمل `branch` = نسخة من `restaurant` + `location: 'Zamalek, Cairo'` + `manager: 'Eslam'`. اطبع `branch.location` و`restaurant.location`.
2. اعمل نسخة تانية بس حط `location` الجديدة **قبل** `...restaurant`. إيه اللي اتغير؟ وليه؟
3. اعمل `restaurantCopy = { ...restaurant }` وغيّر `name` في النسخة لـ `'Ristorante Roma'`، واطبع الاسمين.

**المتوقع تقريبًا:** `Zamalek, Cairo` والأصلي زي ما هو؛ في 2 الـ location هتبقى القديمة؛ و`Ristorante Roma Classico Italiano`.

---

## تمرين 8 🔴 — فخ الـ Shallow copy
**البيانات:**
```js
const order = {
  table: 5,
  items: ['Pizza', 'Pasta'],
};
```
**المطلوب:**
1. اعمل `orderCopy = { ...order }`.
2. غيّر `orderCopy.table = 9` واعمل `orderCopy.items.push('Tiramisu')`.
3. **قبل ما تشغّل** اكتب توقعك لـ `order.table` و`order.items` في كومنت، وبعدين شغّل وقارن.
4. صلّح الموضوع بحيث `items` كمان تبقى نسخة مستقلة، باستخدام الـ spread بس.

**المتوقع تقريبًا:** `order.table` لسه `5` لكن `order.items` فيها `Tiramisu` 😮، وبعد التصليح الأصلي مش بيتأثر.
