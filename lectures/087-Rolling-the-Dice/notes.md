# 087 — Rolling the Dice

## الفكرة
أهم feature في اللعبة: **رمي الـ dice**. بنولّد رقم عشوائي من 1 لـ 6، **نعرض صورة الـ dice المناسبة** بتغيير الـ **`src`**، ولو الرقم مش 1 نزوّده على الـ **current score** (state variable برّه الـ handler).

## أهم الحاجات

### الـ flowchart = divide and conquer
- جزء الـ Roll في الـ flowchart: generate random → display dice → هل هو 1؟ → لأ: add to current score / آه: switch player.
- كل **مربع** في الـ flowchart = **sub-problem** هنكوده.
- بناء مشروع = **حل مشكلة**؛ استخدم الـ flowchart + الـ problem-solving framework مع بعض → المشكلة المخيفة تبقى مشاكل صغيرة سهلة.

### نختار الزراير التلاتة
```js
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
```

### نكتب comments الأول (plan)
```js
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  // 2. Display dice
  // 3. Check for rolled 1: if true, switch to next player
});
```
- الـ handler مكتوب مباشرة لأننا **مش هنستخدمه تاني**.

### 1) الرقم العشوائي
```js
const dice = Math.trunc(Math.random() * 6) + 1;
```
- `diceEl` للـ element و`dice` للرقم — عشان كده سمّينا الـ element بـ El.
- **جوه** الـ handler (مش global) → عاوزين رقم **جديد مع كل رمية**.
- `Math.random()` → 0 لـ 0.999… × 6 → `Math.trunc` → 0 لـ 5 → `+ 1` → **1 لـ 6**.

### 2) نعرض الـ dice
```js
diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;
```
- أول حاجة نشيل `hidden` (كنا ضايفينها في الـ starting conditions).
- الـ HTML: `<img src="dice-5.png" ...>` → الـ **`src` attribute** هو اللي بيحدد الصورة.
- **أقدر أغيّر الـ `src` من JS** → property اسمها `src` زي الـ HTML بالظبط.
- **template literal** → كل الصور اسمها `dice-` + رقم + `.png` → بنحمّل الصورة **dynamically** حسب الرقم.
- عمل `console.log(dice)` مؤقتًا يتأكد إن الصورة = الرقم (2 → 2، 6 → 6، وطلع 1 كمان) ✅.

### 3) Check for 1
```js
if (dice !== 1) {
  // Add dice to current score
} else {
  // Switch to next player
}
```
- الحالة **الأساسية** (اللي مهتمين بيها أكتر) هي إنه **مش 1** → حطها الأول.

### الـ current score = state variable
- مينفعش نخزن الداتا في الـ DOM بس (درس المشروع الأول) → محتاجين variable في الكود.
- فين؟ **مش جوه الـ handler** — الـ function دي بتتنادى مع كل click، فلو جواها هيتعمل **reset لـ 0** كل رمية.
- عشان القيمة **تفضل موجودة (persist)** → برّه في الـ main program:
```js
let currentScore = 0; // let لأننا هنحدثه
```
```js
currentScore += dice; // = currentScore = currentScore + dice
```

### نعرض الـ current score (مؤقتًا على player 0)
```js
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
```
- كمّل بـ `getElementById` (اسم الـ id من غير `#`).
```js
current0El.textContent = currentScore; // CHANGE LATER
```
- `// CHANGE LATER` → لأن بعدين لازم يتعرض عند **اللاعب الـ active**، مش دايمًا player 0. دلوقتي "make it work" بس.

### الكود لحد دلوقتي
```js
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    current0El.textContent = currentScore; // CHANGE LATER
  } else {
    // Switch to next player
  }
});
```
- اختبر: 4 → 4، وبعدين 3 → 7 ✅. جاب 1 → مفيش حاجة حصلت (لسه).
- جوناس: **فكّر لوحدك إزاي تعمل الـ switch player** قبل المحاضرة الجاية.

## الفرق بين…
| | جوه الـ handler | برّه الـ handler |
|---|---|---|
| `dice` | ✅ رقم جديد كل رمية | ❌ |
| `currentScore` | ❌ يرجع 0 كل click | ✅ بيفضل |

## غلطات لازم أخلي بالي منها
- `Math.random() * 6` من غير trunc و+1.
- أنسى أشيل `hidden` → الصورة متظهرش.
- `diceEl.src = 'dice-${dice}.png'` بـ single quotes → مش هيعمل interpolation.
- `let currentScore = 0` جوه الـ handler.

## ملحوظات لنفسي
- كنت فاكر إن تغيير الصورة محتاج حاجة معقدة، طلع مجرد `src` + template literal.
- السؤال الدايم: **الـ variable ده محتاج يعيش بعد ما الـ function تخلص؟** → لو آه يبقى برّه.
- comments كـ plan قبل الكود — ريحتني في الفهم.
- جرب أفكر في switchPlayer قبل ما أكمل الفيديو.
