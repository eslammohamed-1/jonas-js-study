# 090 — Resetting the Game

## الفكرة
آخر محاضرة في المشروع والسيكشن: زرار **New game** يرجّع كل الـ **initial conditions**. وعشان منكررش الكود، كل الـ starting conditions اتنقلت في function اسمها **`init`** بنناديها عند تحميل الصفحة **و** عند الـ click. وقابلنا أول مرة مشكلة **scope**.

## أهم الحاجات

### الـ challenge
- قبل الحل: جوناس طلب أجربها لوحدي (أصعب شوية من Guess My Number). **المهم أكتب كود بنفسي** مش إني أوصل للحل.

### إيه اللي محتاج يرجع؟
**الـ UI**:
```js
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
```
- مش عارف مين كسب → أشيل `player--winner` من **الاتنين**.
- JS **مش بيعمل error** لو شلت class مش موجودة — بيعمل ولا حاجة.
- ولو **ضفت** class موجودة أصلًا → **مش بيضيفها مرتين**.
- player 0 هو اللي بيبدأ → `add('player--active')` على طول (مش remove وبعدين add)، وplayer 1 → remove.

**الـ state (internal)**:
- `scores` → `[0, 0]`، `currentScore` → 0، `activePlayer` → 0، `playing` → `true`.

### `init` function (DRY)
- الكود ده هو هو الـ starting conditions → **مننسخوش**، نعمل function فيها الاتنين:
```js
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
```
- `init` = initialization. reusable piece of code، من غير arguments.
- (`Alt + ↓` لنقل السطور تاني.)

### مشكلة 1: الصفحة رجعت للأرقام العشوائية والـ dice ظاهر
- الكود بقى **جوه function** ومحدش بيناديها → مبيتنفذش وقت التحميل.
- الحل: **`init();`** بعد التعريف مباشرة → يشتغل أول ما الـ script يتحمّل.

### مشكلة 2: `playing is not defined` (Scope!)
- عرّفنا `let scores = ...` إلخ **جوه** `init` → المتغيرات دي **متاحة جوه الـ function بس** = **scoped to init**.
- الـ handlers التانية (Roll / Hold) مش شايفاهم.
- الحل:
  1. **نعلن** عنهم برّه أي function **من غير قيمة**: `let scores, currentScore, activePlayer, playing;` (كذا variable فاضيين بالكومة — من سيكشن الـ fundamentals).
  2. جوه `init` **نعمل assign بس — من غير `let`** (لو كتبت `let` هعمل variables جديدة محلية).
- **Declaring ≠ assigning**: المتغيرات "عايشة" برّه، و`init` بتديلها قيم بس → متاحة في كل الـ functions.
- الـ scope هيتشرح بعمق **السيكشن الجاي**.

### زرار New game
```js
btnNew.addEventListener('click', init);
```
- بنبعت `init` نفسها (value) **من غير `()`** — JS هو اللي هيناديها لما يحصل click.

### الاختبار
- لعب لحد ما player 1 كسب → New game → كل حاجة رجعت ✅. وكمان لما player 2 كسب → New game → player 1 رجع هو الـ current ✅.
- رجّع الـ threshold من 20 لـ **100**.

### الكود النهائي كامل
```js
'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
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
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
```
- كده خلصنا **الـ fundamentals part** من الكورس 🎉. السيكشن الجاي مهم جدًا: **JavaScript شغالة إزاي behind the scenes**.

## الفرق بين…
| | Declaring | Assigning |
|---|---|---|
| الشكل | `let scores;` | `scores = [0, 0];` |
| بيعمل إيه | يخلق الـ variable في الـ scope ده | يدّي قيمة لـ variable موجود |
| في init | ❌ (هيبقى محلي) | ✅ |

| | `init` | `init()` |
|---|---|---|
| فين | `addEventListener('click', init)` | بعد التعريف عشان يشتغل وقت التحميل |

## غلطات لازم أخلي بالي منها
- أحط الـ starting conditions في function وأنسى أناديها.
- `let` جوه `init` → `is not defined` برّه.
- أشيل `player--active` من الاتنين وأنسى أرجّعه لـ player 0.
- أنسى أرجّع `playing = true` → اللعبة متشتغلش بعد الـ reset.
- أسيب الـ threshold على 20 بعد الاختبار.

## ملحوظات لنفسي
- `init` pattern: الـ state + الـ UI في function واحدة، تتنادى عند التحميل وعند الـ reset — هستخدمه في أي مشروع.
- add/remove مش بيعملوا error لو الـ class موجودة/مش موجودة — مريح.
- أول احتكاك بالـ scope — كنت فاكر إن أي variable في الملف متاح في كل حتة، طلع لأ لو اتعرّف جوه function.
- المقارنة بـ Guess My Number: هناك كررنا الكود في الـ reset، هنا عملنا init — أنضف بكتير.
