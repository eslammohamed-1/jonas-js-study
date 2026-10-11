# 118 — Enhanced Object Literals

## الفكرة
الـ restaurant object ده **object literal** — عشان كتبناه "حرفيًا" بالـ `{ }`.
ES6 ضاف **3 طرق** تسهّل كتابة الـ object literals.

## 1) Property بنفس اسم المتغير
فصلنا openingHours لـ object لوحده بره:
```js
const openingHours = {
  thu: { open: 12, close: 22 },
  fri: { open: 11, close: 23 },
  sat: { open: 0, close: 24 },
};

const restaurant = {
  name: 'Classico Italiano',
  // قبل ES6:
  // openingHours: openingHours,

  // ES6 enhanced object literals:
  openingHours,
};
```
بياخد المتغير ويعمل property **بنفس الاسم بالظبط**.
لو عايز اسم تاني (مثلًا `hours`) لازم أغيّر اسم المتغير كمان — غير كده JS مش هتعرف المتغير ده إيه.

## 2) Methods من غير `function`
```js
// القديم
order: function (starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
},

// الجديد
order(starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
},
```
نفس الشغل بالظبط. جوناس بيفضّل الجديد وغيّر الـ object كله ليه، بس دي **personal preference**. الأقواس `()` كفاية توضّح إنها function (وVS Code بيلوّن الـ methods).

## 3) Computed property names
أقدر **أحسب** اسم الـ property بدل ما أكتبه بإيدي — بالـ `[ ]`:
```js
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: { open: 12, close: 22 },   // thu
  [weekdays[4]]: { open: 11, close: 23 },   // fri
  [`day-${2 + 4}`]: { open: 0, close: 24 }, // 'day-6'
};
```
جوّا `[ ]` أي expression (حتى template literal).
قبل كده كان ممكن أحسب الـ **values** بس (زي `12 + 12`)، دلوقتي الـ **names** كمان.

## ملحوظات لنفسي
- `openingHours,` لوحدها = `openingHours: openingHours`.
- مش لازم `function` في الـ methods — `order() {}` كفاية.
- كنت فاكر إن أسماء الـ properties لازم تتكتب ثابتة، طلع ينفع `[expression]`.
- خلي بالك: لما فصلت الـ object بره، لازم `;` بعده وإلا error.
