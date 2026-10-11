# 125 — Maps: Iteration

## طريقة تانية لملء الـ Map (من غير set)
الـ `set` بيبقى رخم لو القيم كتير. أقدر أبعت **array of arrays** — كل array جوّا: `[key, value]`:

```js
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);
```
- بكتب map من الصفر في الكود → الطريقة دي أحسن
- بضيف عناصر بالكود (programmatically) → `set` لسه هو الأنسب

## Object → Map
الشكل ده (array of arrays) هو **نفس اللي `Object.entries` بيرجّعه**!
```js
console.log(Object.entries(openingHours)); // [['thu', {...}], ['fri', {...}], ...]

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
```
👈 trick أفتكره: عندي object ومحتاج map.

## Iteration — الـ Maps iterables
for-of شغال عليها مباشرة، وكل item = `[key, value]` → destructuring:
```js
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// Answer 1: C
// Answer 2: Java
// Answer 3: JavaScript
```
- زي الـ loop على object بالظبط — الفرق إن الـ object محتاج `Object.entries` عشان مش iterable. الـ map لأ.
- `typeof key === 'number'` → عشان أطبع الاختيارات بس.

## الكويز
```js
const answer = Number(prompt('Your answer'));
console.log(answer);

console.log(question.get(question.get('correct') === answer));
// 3 → 'Correct 🎉'
// غير كده → 'Try again!'
```
- `Number(...)` عشان الـ prompt بيرجّع string والـ key رقم
- `question.get('correct') === answer` → true/false → والـ true/false نفسهم keys في الـ map 🔥
- (جوناس غلط وكتب `'Correct'` بـ C كابيتال الأول → مشتغلش. الـ key كان `'correct'`.)

## Map → Array
```js
console.log([...question]); // نفس الـ array of arrays اللي بدأنا بيها
```

### `entries()` و `keys()` و `values()`
نفس الـ methods اللي على الـ arrays:
```js
console.log(question.entries());     // MapIterator — شكلها غريب
console.log([...question.keys()]);   // كل الـ keys
console.log([...question.values()]); // كل الـ values
```
لازم spread في array عشان أشوفها. (`[...question.entries()]` نفس `[...question]` بالظبط.)

## ملحوظات لنفسي
- `new Map([[k, v], [k, v]])` = أسرع طريقة لما بكتبها بإيدي.
- `new Map(Object.entries(obj))` = object → map.
- `[...map]` = map → array.
- خلي بالك: الـ prompt بيرجّع string → `Number()` وإلا `===` هيفشل.
- كنت فاكر إن لازم `.entries()` على الـ map في الـ loop زي الـ object، طلع لأ — الـ map iterable لوحدها.
- السؤال الجاي: إمتى map وإمتى object؟ → المحاضرة الجاية.
