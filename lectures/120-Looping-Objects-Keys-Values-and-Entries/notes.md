# 120 — Looping Objects: Object Keys, Values, and Entries

## الفكرة
for-of بيشتغل على arrays (iterables). الـ objects **مش iterable** — بس أقدر أعمل loop عليها **بطريقة غير مباشرة**: أحوّلها لـ array الأول.

3 اختيارات حسب أنا عايز إيه:
- الأسماء (keys) → `Object.keys()`
- القيم → `Object.values()`
- الاتنين → `Object.entries()`

## 1) Property NAMES — `Object.keys`
```js
const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);
// We are open on 3 days: thu, fri, sat,
```
`.length` بتاعة الـ keys = عدد الـ properties في الـ object 👌

## 2) Property VALUES — `Object.values`
```js
const values = Object.values(openingHours);
console.log(values);
// [{open: 12, close: 22}, {open: 11, close: 23}, {open: 0, close: 24}]
```
الـ loop عليها نفس الكلام.

## 3) Entire object — `Object.entries`
entries = names + values مع بعض.
```js
const entries = Object.entries(openingHours);
console.log(entries);
// [['thu', {open: 12, close: 22}], ['fri', {...}], ['sat', {...}]]
```
كل عنصر = `[key, value]`.

### ⚠️ الفرق عن الـ arrays
- Array: `menu.entries()` — method على الـ array نفسها (بترجّع `[index, el]`)
- Object: `Object.entries(obj)` — مش method على الـ object

جوناس قال إنه وقع في المشكلة دي بنفسه.

### الـ loop + destructuring (و nested كمان)
```js
// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
// On thu we open at 12 and close at 22
// ...
```
الـ value نفسها object → فبعمل destructuring ليها كمان في نفس المكان `{ open, close }`.
لو الـ value بسيطة → `[key, value]` بس، وأسمّيهم زي ما أنا عايز.

## ملحوظات لنفسي
- كنت فاكر إن `for (const x of openingHours)` هيشتغل، طلع **لأ** — الـ objects مش iterable.
- الـ 3 دول كلهم بيحوّلوا الـ object لـ **array**.
- `Object.entries(obj)` ✅ / `obj.entries()` ❌
- الـ `{ open, close }` جوّا الـ `[ ]` — destructuring جوّا destructuring.
