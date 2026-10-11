# 018 — Taking Decisions: if / else Statements

## الفكرة
`if / else` = **control structure**، بتخليني أختار أنهي جزء من الكود يتنفذ حسب شرط.
الكود مبقاش ماشي سطر ورا سطر وخلاص، فيه بلوك ممكن يتنفذ وبلوك ممكن يتخطى.

```js
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}
// Sarah is too young. Wait another 3 years :)
```

## أهم الحاجات

### الشكل العام
```js
if (condition) {
  // لو الشرط true
} else {
  // لو الشرط false
}
```
- لو الشرط false ومفيش else → JS بتعدّي البلوك كله وتكمل اللي بعده.
- الـ `else` **اختياري**.

### الشرط ممكن يكون مقارنة أو متغير Boolean
```js
if (age >= 18) { … }

const isOldEnough = age >= 18;
if (isOldEnough) { … }
```

### المتغير اللي جوّا البلوك مش بيطلع برّه
```js
const birthYear = 2012;

let century;            // ← أعرّفه برّه الأول
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);   // 21
```
لو كتبت `let century = 20` جوّا كل بلوك → دول متغيرين منفصلين، و`console.log(century)` برّه = ReferenceError.

## ملحوظات لنفسي
- `{ }` بعد if/else اسمها code block.
- `if (x = 5)` غلط، دي assignment مش مقارنة (المقارنة `===`).
- `if (x > 5);` بفاصلة منقوطة = البلوك هيتنفذ دايمًا.
- Template literal مع `${}` بيسهّل الرسالة جوّا الـ else.
