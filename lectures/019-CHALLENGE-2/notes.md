# 019 — CHALLENGE #2: Video Solution

## الفكرة
نكمّل على BMI بتاع challenge 1، بس المرة دي نطبع رسالة واضحة مين الـ BMI بتاعه أعلى، بـ if/else وtemplate literal.

## المطلوب
1. أطبع في الـ console مين الـ BMI بتاعه أعلى: `"Mark's BMI is higher than John's!"` أو `"John's BMI is higher than Mark's!"`.
2. أستخدم template literal عشان أحط قيم الـ BMI في الرسالة، مثلًا: `"Mark's BMI (28.3) is higher than John's (23.9)!"`.
- HINT: if/else.

## حل جوناس
- جاب كود challenge 1 (الأوزان والأطوال وحساب الـ BMI) بدل ما يكتبه من الأول.
- كان ممكن يستخدم `markHigherBMI` كـ condition، بس شاله وكتب المقارنة جوه الـ if، لأن ده الأشهر.

### الخطوة 1
```js
if (BMIMark > BMIJohn) {
  console.log("Mark's BMI is higher than John's!");
} else {
  console.log("John's BMI is higher than Mark's!");
}
```
- مع Data 2 ← "John's BMI is higher" (الشرط false فاتنفّذ الـ else).
- مع Data 1 ← "Mark's BMI is higher".
- جوناس عمل `console.log(BMIMark, BMIJohn)` الأول عشان يتأكد إن الـ if/else شغال صح.

### الخطوة 2: template literal
```js
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}
```
- حوّل الـ strings لـ backticks، وحط `${BMIMark}` و`${BMIJohn}` بين الأقواس.

## التقنيات المستخدمة
- إعادة استخدام كود challenge 1.
- if/else بمقارنة `>` مباشرة جوه الشرط.
- template literals مع `${}`.
- Cmd/Ctrl + / عشان أبدّل بين الـ test data.

## غلطات لازم أخلي بالي منها
- في الرسالة التانية لازم أبدّل ترتيب الـ variables، يعني BMIJohn الأول.
- الـ `'` في Mark's: بالـ backticks مفيش مشكلة.

## ملحوظات لنفسي
- جوناس قال لو حليتها بطريقة مختلفة شوية فده كويس، معناه إني بلاقي style بتاعي.
- الإجباري هنا الـ if/else، من غيره مش هتشتغل.
- الأرقام هتطلع بـ decimals كتير، عادي.
