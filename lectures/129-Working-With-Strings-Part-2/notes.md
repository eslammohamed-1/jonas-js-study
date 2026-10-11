# 129 — Working With Strings - Part 2

## تغيير الـ case
```js
console.log(airline.toLowerCase()); // 'tap air portugal'
console.log(airline.toUpperCase()); // 'TAP AIR PORTUGAL'
console.log('jonas'.toUpperCase()); // ينفع على string مباشرة
```
من غير arguments. بنستخدمهم طول الوقت.

### مثال: أصلّح capitalization اسم راكب
الراكب كتب اسمه غلط في الـ check-in:
```js
const passenger = 'jOnAS'; // المفروض 'Jonas'
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // 'Jonas'
```
الخطوات: كله lower ← أول حرف upper ← + الباقي `slice(1)`.
(جوناس قال: اعملها function تاخد أي اسم — لو عندي وقت.)

## مقارنة emails (مش validation، مقارنة)
```js
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
```
اليوزر كتب مسافات + capitalization غلط + enter (`\n`). بس هو نفس الإيميل تقريبًا.

الطريقة الطويلة:
```js
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); // بيشيل الـ whitespace (مسافات و \n)
```
في خطوة واحدة — **chaining** (كل method بترجّع string فأقدر أنادي اللي بعدها):
```js
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);          // 'hello@jonas.io'
console.log(email === normalizedEmail); // true
```
- أول خطوة مع user input غالبًا: **lowercase**
- من **ES2019**: `trimStart()` و `trimEnd()` — من الأول بس أو الآخر بس
- (برضه ممكن تبقى function: تاخد الإيميلين وترجّع true/false)

## Replacing — من أهم الحاجات
```js
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); // '288.97$'
```
- `replace(اللي هيتشال, اللي هيتحط)`
- في أوروبا الـ `,` فاصلة عشرية — في أمريكا `.`
- chaining تاني

### كلمات كاملة + أول ظهور بس ⚠️
```js
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
// '...boarding gate 23. Boarding door 23!'  ← التانية لسه door
```
`replace` بيغيّر **أول ظهور بس** — ده الطبيعي بتاعه.

### `replaceAll`
```js
console.log(announcement.replaceAll('door', 'gate'));
// '...boarding gate 23. Boarding gate 23!'
```
(وقت التسجيل مكانتش موجودة وطلعت error عند جوناس — دلوقتي شغالة، استخدمها.)

### الحل القديم: regular expression
```js
console.log(announcement.replace(/door/g, 'gate'));
```
- الـ regex بين `/ /` مش quotes
- `g` = **global** → كل الظهورات
- الـ regex من أعقد المواضيع — دلوقتي بس الحتة البسيطة دي

`replace` كمان **case sensitive** زي كل الـ string methods.
وكلهم بيرجّعوا string جديد — مش بيعدّلوا الأصلي.

## Methods بترجّع Booleans
```js
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));   // true
console.log(plane.includes('Boeing')); // false
console.log(plane.startsWith('Airb')); // true
console.log(plane.startsWith('Aib'));  // false
console.log(plane.startsWith('Ai'));   // true — مش لازم كلمة كاملة

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}
```
`includes` زي بتاعة الـ arrays. مفيدين جدًا في الـ conditionals.

## Practice: الشنطة مسموحة؟
```js
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife'); // NOT allowed
checkBaggage('Socks and camera');                              // Welcome
checkBaggage('Got some snacks and a gun for protection');      // NOT allowed
```
ليه `toLowerCase` الأول؟ من غيرها `'Knife'` ≠ `'knife'` → الراكب الأول هيعدّي!
وإلا هضطر أجرّب كل الأشكال (Knife, KNIFE, ...) — مش عملي.

## ملحوظات لنفسي
- كنت فاكر إن `replace` بيغيّر كل الكلمات، طلع **أول واحدة بس** → `replaceAll` أو `/.../g`.
- خلي بالك: user input → `toLowerCase()` (و `trim()`) قبل أي مقارنة.
- `passengerLower[0].toUpperCase() + passengerLower.slice(1)` — الـ pattern ده لـ capitalize.
- `startsWith('Ai')` true عادي — مش لازم الكلمة كلها.
