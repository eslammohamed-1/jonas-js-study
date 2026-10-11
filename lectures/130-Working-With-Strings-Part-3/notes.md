# 130 — Working With Strings - Part 3

## `split` — من أقوى الـ methods
بيقسم الـ string لأجزاء حسب **divider string** → وبيحطهم في **array**.
```js
console.log('a+very+nice+string'.split('+'));
// ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' '));
// ['Jonas', 'Schmedtmann']
```
مع destructuring على طول:
```js
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
```
بـ slice كان هيبقى أعقد بكتير (ومع جمل طويلة شبه مستحيل).

## `join` — عكس split
```js
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // 'Mr. Jonas SCHMEDTMANN'
```
الـ divider ممكن يبقى أي حاجة (`'---'` مثلًا)، بس هنا المسافة هي اللي منطقية.
(كان ممكن template literal، بس جوناس عايز يورّينا join.)
**split + join** = combo هنستخدمه طول الوقت.

## Capitalize اسم كامل (كذا كلمة)
```js
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // أو:
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis'); // 'Jessica Ann Smith Davis'
capitalizeName('jonas schmedtmann');       // 'Jonas Schmedtmann'
```
الاستراتيجية: split لـ array ← loop على كل كلمة ← capitalize ← push في array جديدة ← join.
- سمّاها `n` مش `name` — عشان مايعملش override للـ parameter (bad practice).
- الطريقة التانية بـ `replace`: بدّل أول حرف بنسخته الكابيتال — نفس النتيجة بأسلوب مختلف خالص.

## Padding
أضيف characters لحد ما الـ string يوصل لطول معيّن.
```js
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
// '++++++Go to gate 23!++++++++++'
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
// '+++++++++++++++Jonas++++++++++'
```
- `padStart(الطول النهائي, الحرف)` — من الأول
- `padEnd(...)` — من الآخر
- الرقم = **الطول الكلي بعد الـ padding** مش عدد الحروف اللي هتتضاف → فالأقصر بياخد padding أكتر

### مثال حقيقي: إخفاء رقم الكريديت كارد
على النت بتشوف آخر 4 أرقام بس والباقي `*`:
```js
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));                // '****7836'
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747')); // شغالة مع strings كمان
```
- `number + ''` → trick لتحويل رقم لـ string (لو أي operand في `+` string، الكل بيبقى string). أسهل من `String(number)`.
- آخر 4 بـ `slice(-4)` ← padStart لحد الطول الأصلي بـ `*`.

## `repeat`
```js
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));
```
زي الشاشات في المطار اللي الرسالة بتعيد نفسها.

```js
const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
```
الإيموجي نفسه string → فأقدر أعمله repeat.

## باقي الـ methods
مش كلهم اتشرحوا — الباقي على **MDN** (ادور على `String replace` مثلًا، وعلى الشمال القايمة كلها). جوناس قال إننا غطّينا أهمهم. ممكن أبص على `concat` مثلًا.

## ملحوظات لنفسي
- `padStart(25, '+')` = الطول النهائي 25، **مش** ضيف 25.
- خلي بالك: لو سمّيت متغير الـ loop بنفس اسم الـ parameter هعمل override.
- `n + ''` = أسرع تحويل لـ string.
- كنت فاكر إن capitalize لاسم كامل محتاج حاجة معقدة، طلع split → loop → join.
- split و join أكتر اتنين هستخدمهم.
