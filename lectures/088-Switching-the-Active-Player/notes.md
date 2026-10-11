# 088 — Switching the Active Player

## الفكرة
لما اللاعب يجيب **1** → الدور يروح للتاني. محتاجين نعرف **مين الـ active player** (state variable بقيمة 0 أو 1)، ونختار الـ element بتاعه **dynamically**، ونعمل reset للـ current score، ونغيّر الشكل بـ **`classList.toggle`**.

## أهم الحاجات

### الـ activePlayer state
```js
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
```
- `activePlayer` = **0** لو player 1 بيلعب، **1** لو player 2.
- **ليه 0 و1 مش 1 و2؟** لأن الـ **total scores** (الأرقام الكبيرة اللي بتتراكم) هتتخزن في **array** — والـ array **zero-based**:
  - score بتاع player 1 → `scores[0]`
  - score بتاع player 2 → `scores[1]`
  → فالـ activePlayer ينفع يبقى **index** مباشرة (هنستخدمه المحاضرة الجاية).
- `scores` = `const` لأنها array (بنغير جواها مش بنعمل reassign).

### نختار الـ current element dynamically
بدل `current0El` الثابت:
```js
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
```
- الـ ids: `current--0` و`current--1` → نبني اسم الـ id بـ **template literal** + `activePlayer`.
- تريك مهم جدًا: **بناء اسم الـ id dynamically**.

### Switch player بالـ ternary
```js
activePlayer = activePlayer === 0 ? 1 : 0;
```
- لو 0 → يبقى 1، غير كده → 0. reassign.
- اختبر: player 0 كان بيجمع، جاب 1 → الرمية الجاية ظهرت تحت player 1 ✅… بس:
  - الـ **current score مرجعش 0** → اتضاف على القديم ❌.
  - **الشكل مش متغير** (المفروض الجانب الـ active يبقى أبيض).
  - الـ current بتاع اللاعب اللي فات المفروض يظهر **0**.

### Reset للـ current score — **قبل** الـ switch
```js
document.getElementById(`current--${activePlayer}`).textContent = 0; // اللاعب الحالي لسه
currentScore = 0;
activePlayer = activePlayer === 0 ? 1 : 0;
```
- لازم نصفّر الـ DOM بتاع اللاعب **الحالي قبل** ما نغيّر `activePlayer`، وإلا هنصفّر بتاع التاني.
- `currentScore = 0` مكانه مش فارق لأنه مش مربوط بلاعب.

### الشكل: class `player--active`
```html
<section class="player player--0 player--active">
```
- اللاعب الـ active عليه **`player--active`** (الخلفية البيضا). Player 0 بيبدأ بيها.
```js
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
```
(نسخ وغيّر — "I'm too lazy" 😄 — وكان كاتب `--1` للاتنين وصلحها.)

### `classList.toggle`
```js
player0El.classList.toggle('player--active');
player1El.classList.toggle('player--active');
```
- **toggle**: لو الـ class **مش موجودة → يضيفها**، لو **موجودة → يشيلها**.
- كان ممكن أعملها بإيدي (أتشيك بـ contains وبعدين add/remove) — toggle بيوفر ده.
- كان ممكن نستخدمه في مشروع الـ modal، بس جوناس كان عاوز يورينا `contains`.
- بما إن الـ class بتبدأ على **واحد بس** → toggle على الاتنين مع بعض = هتفضل دايمًا على **واحد بس**.

### الكود
```js
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
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});
```
- اختبر: الـ switch شغال والشكل بيتغير ✅. فاضل الـ **Hold** (المحاضرة الجاية).

## الفرق بين…
| method | بتعمل إيه |
|---|---|
| `add` | تضيف |
| `remove` | تشيل |
| `contains` | تسأل (true/false) |
| `toggle` | تضيف لو مش موجودة / تشيل لو موجودة |

## غلطات لازم أخلي بالي منها
- أصفّر الـ current **بعد** الـ switch → هصفّر اللاعب الغلط.
- أنسى `currentScore = 0` → الرمية الجاية تتجمع على القديم.
- toggle على لاعب واحد بس → الاتنين ممكن يبقوا active أو محدش.
- `getElementById('current--${activePlayer}')` بـ quotes عادية.

## ملحوظات لنفسي
- كنت بسأل ليه 0 و1 — طلع عشان يبقوا **index** في `scores`.
- بناء الـ id بـ template literal = بدل `if (activePlayer === 0) ... else ...`.
- toggle على الاتنين = swap. حلوة.
- ترتيب الـ switch: صفّر الـ UI → صفّر الـ state → بدّل اللاعب → بدّل الشكل.
