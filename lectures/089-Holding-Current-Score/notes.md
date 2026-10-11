# 089 — Holding Current Score

## الفكرة
زرار **Hold**: الـ current score يتضاف للـ **total score** بتاع اللاعب الـ active في الـ `scores` array، وبعدين switch. ولو وصل **100** → يكسب: class `player--winner`، الـ dice يختفي، و**الزراير تبطل تشتغل** باستخدام state variable اسمه **`playing`**. وفي النص: refactor لـ **`switchPlayer`** وdebugging لغلطتين حقيقيتين.

## أهم الحاجات

### الـ plan (comments)
```js
btnHold.addEventListener('click', function () {
  // 1. Add current score to active player's score
  // 2. Check if player's score is >= 100
  // Finish the game
  // Switch to the next player
});
```
- الـ flowchart: Hold → add current score to total → score >= 100؟ آه: player wins / لأ: switch player.

### 1) نضيف الـ current للـ total
```js
scores[activePlayer] += currentScore;
// scores[1] = scores[1] + currentScore
```
- `activePlayer` (0 أو 1) = **index** في `scores` — هنا بانت فايدة 0 و1.

### نعرضه
```js
document.getElementById(`score--${activePlayer}`).textContent =
  scores[activePlayer];
```
- ids: `score--0` و`score--1`.

### Refactor: `switchPlayer`
- محتاجين **نفس كود الـ switch** بتاع الـ Roll → نسخه = يكسر **DRY** → نعمله function:
```js
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
```
- **مفيش parameters ولا return** — الكود هو هو في المكانين. (في المشروع الأول كان فيه حاجة بتتغير — الرسالة — فاحتجنا parameter.) دي مجرد **reusable piece of code**.
- بنناديها `switchPlayer()` في الـ else بتاع الـ Roll وفي الـ Hold.

### Debugging #1: الـ score مش بيظهر
- عمل Hold بـ 6 → الـ total فاضل **0** ❌.
- `console.log('Hold button')` → الـ event شغال (والـ background اتنقل والـ current اتصفّر).
- `console.log(scores[activePlayer])` **بعد** الـ assignment → طلع **8** صح → يعني المشكلة في **العرض** بس.
- السبب: كان كاتب `` `current--${activePlayer}` `` بدل **`score--`** 🤦. اتصلحت وشال الـ console.logs (حتى بتاع الـ dice).
- جوناس ساب الـ debugging في الفيديو عن قصد — **console.log بنستخدمه طول الوقت للـ debugging**.

### 2) Check للفوز
```js
if (scores[activePlayer] >= 100) {
  // Finish the game
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
```
- `player--winner` من الـ CSS (خلفية أغمق وأحمر).
- لازم نشيل `player--active` وإلا هيبقى عليه الاتنين.
- الـ switch بقى في الـ **else** — لو حد كسب منبدّلش.
- للاختبار حط **20** بدل 100 (وإلا هياخد وقت للأبد).

### Debugging #2: الـ winner class مش بتتضاف
- كسب بـ 21 ومحصلش حاجة، وفضل يقدر يلعب. في الـ HTML: لسه `player--active` ومفيش `player--winner`.
- السبب: **`querySelector` من غير `.`** — نفس الغلطة اللي حذّرنا منها!
  - `querySelector` → محتاج **selector** (`.player--0`).
  - `getElementById` → اسم الـ id بس.
- جوناس: الغلطات دي بتحصل طول الوقت، متجلدش نفسك.

### المشكلة: لسه أقدر ألعب بعد الفوز + الـ dice ظاهر
- الحل: **state variable** يقول حالة اللعبة (بنلعب ولا لأ):
```js
let playing = true;
```
- لما حد يكسب: `playing = false;`
- ونحط logic الزرارين جوه `if (playing)`:
```js
btnRoll.addEventListener('click', function () {
  if (playing) {
    // كل الكود القديم
  }
});
```
- `playing` boolean أصلًا → مش محتاج `playing === true`.
- Prettier بيظبط الـ indentation لوحده بعد ما ننقل الكود.
- الزراير لسه بتتداس بس **مبيحصلش حاجة**.
- الـ state variables زي `playing` **شائعة جدًا في البرمجة** — وده سبب إن الألعاب حلوة للتعلم، فيها logic كتير من النوع ده.

### إخفاء الـ dice عند الفوز
```js
diceEl.classList.add('hidden');
```

### كود الـ Hold النهائي
```js
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

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
```
- (وأرجّع 20 لـ 100 في الآخر.)
- فاضل زرار **New game** — المحاضرة الجاية.

## الفرق بين…
| | `querySelector` | `getElementById` |
|---|---|---|
| `player--${activePlayer}` (class) | `` `.player--${activePlayer}` `` بالنقطة | — |
| `score--${activePlayer}` (id) | `` `#score--...` `` | `` `score--${activePlayer}` `` |

## غلطات لازم أخلي بالي منها
- `current--` بدل `score--` (غلطة جوناس #1).
- `querySelector` من غير `.` (غلطة جوناس #2).
- أنسى أشيل `player--active` من الفايز.
- الـ switch برّه الـ else → يبدّل حتى بعد الفوز.
- أنسى `if (playing)` في زرار من الاتنين.

## ملحوظات لنفسي
- طريقة جوناس في الـ debugging: log إن الـ event شغال → log القيمة **بعد** ما تتغير → لو صح يبقى المشكلة في العرض.
- `playing` = فكرة state للعبة كلها — هستخدمها في أي حاجة ليها "انتهت".
- function من غير parameters عادي لو الكود مش بيتغير.
- `scores[activePlayer]` — هنا فهمت ليه 0 و1.
