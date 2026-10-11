# 021 — Truthy and Falsy Values

## الفكرة
**Falsy** = قيم مش false بس لو اتحولت لـ Boolean بتبقى `false`.
هما **5 بس**: `0`، `''`، `undefined`، `null`، `NaN`. أي حاجة تانية = **truthy**.

```js
console.log(Boolean(0));         // false
console.log(Boolean(undefined)); // false
console.log(Boolean(''));        // false
console.log(Boolean('Jonas'));   // true
console.log(Boolean({}));        // true ← object فاضي truthy!
```

## أهم الحاجات

### التحويل بيحصل لوحده في الشروط
عمليًا مش بكتب `Boolean()`، الـ coercion بيحصل في `if` وفي الـ logical operators.
```js
const money = 0;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!'); // ← ده اللي بيطبع، 0 falsy
}
```

### أتأكد إن المتغير ليه قيمة
```js
let height;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED'); // ✅
}
```

### الـ bug بتاع الصفر
```js
let height = 0;
if (height) { … } else {
  console.log('Height is UNDEFINED'); // ❌ مع إن القيمة موجودة = 0
}
```
الحل بييجي بعدين (مقارنة صريحة أو `??`).

## ملحوظات لنفسي
- `{}` و `[]` truthy حتى لو فاضيين، و `''` بس هو اللي falsy.
- `'0'` و `'false'` strings مش فاضية = truthy.
- خد بالك من `if (num)` لو الرقم ممكن يكون 0 بشكل طبيعي.
