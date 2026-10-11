# 128 — Working With Strings - Part 1

## مقدمة
3 محاضرات سريعة عن string methods — هنشوفها كتير في باقي الكورس.
سبنا الـ restaurant وبقينا في جو **طيارات وشركات طيران** ✈️

```js
const airline = 'TAP Air Portugal';
const plane = 'A320';
```

## Characters و length (زي الـ arrays)
```js
console.log(plane[0]);   // 'A'
console.log(plane[1]);   // '3'  ← لسه string مش number
console.log(plane[2]);   // '2'
console.log('B737'[0]);  // 'B'  ← ينفع على الـ string مباشرة

console.log(airline.length); // 16
console.log('B737'.length);  // 4
```

## `indexOf` و `lastIndexOf`
```js
console.log(airline.indexOf('r'));          // 6  ← أول ظهور
console.log(airline.lastIndexOf('r'));      // 10 ← آخر ظهور
console.log(airline.indexOf('Portugal'));   // 8  ← كلمة كاملة
console.log(airline.indexOf('portugal'));   // -1 ← case sensitive!
```
- zero-based
- المسافة بتتعد character

## `slice(begin, end)`
فايدة الـ indexes: أستخدمها مع `slice` عشان أقطع جزء.
```js
console.log(airline.slice(4));     // 'Air Portugal'
console.log(airline.slice(4, 7));  // 'Air'
```
- `begin` = يبدأ منين
- `end` = **مش بيتحسب** — بيقف قبله
- طول النتيجة = `end - begin` (7 − 4 = 3)
- النتيجة اسمها **substring**

⚠️ **مش بيغيّر الـ string الأصلي** — مستحيل أعدّل string (primitive). كل الـ methods دي بترجّع **string جديد** → لازم أخزنه في متغير لو عايزه.

### من غير hard-coding
```js
// أول كلمة
console.log(airline.slice(0, airline.indexOf(' ')));      // 'TAP'
// آخر كلمة
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'
```
من غير `+ 1` المسافة بتدخل في النتيجة.

### أرقام سالبة
```js
console.log(airline.slice(-2));    // 'al'  ← يعدّ من الآخر
console.log(airline.slice(1, -1)); // 'AP Air Portuga' ← شال أول وآخر حرف
```

## مثال: الكرسي اللي في النص
طيارات صغيرة (A320، Boeing 737): 6 كراسي في الصف → **B و E في النص**.
الكرسي = رقم الصف + حرف (مثلًا `11B`).
```js
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B'); // middle 😬
checkMiddleSeat('23C'); // lucky 😎
checkMiddleSeat('3E');  // middle 😬
```
`slice(-1)` = آخر حرف.

## ليه الـ strings عندها methods وهي primitives؟ (Boxing)
المفروض الـ methods للـ objects بس... بس JS ذكية:
لما أنادي method على string → JS بتحوّله **behind the scenes** لـ **String object** بنفس المحتوى، تنادي الـ method عليه، وبعدين ترجّعه primitive.
ده اسمه **boxing** (بتحط الـ string في "علبة" = object).

```js
console.log(new String('jonas'));          // String {'jonas'} — object فيه كل الـ methods
console.log(typeof new String('jonas'));   // 'object'
console.log(typeof new String('jonas').slice(1)); // 'string'
```
كل الـ string methods بترجّع **primitive**، حتى لو اتنادت على String object.
(دي theory بس — عشان أفهم ليه بيشتغل.)

## ملحوظات لنفسي
- كنت فاكر إن `slice(4, 7)` بياخد الـ 7 كمان، طلع **end مش included**.
- خلي بالك: `indexOf` case sensitive → `-1` لو مش لاقيه.
- `plane[1]` بيرجّع `'3'` string — لو عايزه رقم لازم أحوّله.
- الـ strings immutable → النتيجة لازم تتخزن.
- `slice(-1)` = آخر حرف — هستخدمها كتير.
