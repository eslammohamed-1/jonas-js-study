# 086 — PROJECT #3: Pig Game

## الفكرة
المشروع التالت والأكثر exciting: **Pig Game** — لعبة لاعبين اتنين بالـ dice. ده **practice project** نثبّت فيه كل اللي اتعلمناه (reinforcing)، فجوناس هيشرح أقل في الحاجات المعروفة. في المحاضرة دي: شرح اللعبة، الـ **flowchart**، والـ **starting conditions** (الـ scores = 0 والـ dice مخفي)، و**`getElementById`**.

## أهم الحاجات

### اللعبة شغالة إزاي
- الـ demo على **pigGame-v2.netlify.app** (واللينك في الـ README بتاع الـ repo على GitHub).
- لاعبين. اللاعب **الـ active** يعمل **Roll dice**:
  - الرقم بيتجمع في الـ **current score** (score الجولة دي).
  - ممكن يكمّل يرمي أو يعمل **Hold** → الـ current يتضاف للـ **total score** والدور يروح للتاني.
- لو جاب **1** → **يخسر كل الـ current score** والدور يروح للتاني. عشان كده أحيانًا لازم أعمل hold.
- أول واحد يوصل **100 نقطة** يكسب.
- **New game** → الـ dice يختفي وكل الـ scores ترجع 0.
- لو مستعجل وعاوز الأساسيات بس → ممكن تعدّي المشروع، بس جوناس بينصح تعمله.

### الـ Flowchart
- **representation لكل اللي ممكن يحصل في الـ app**.
- على الشمال بالأصفر: **الـ actions اللي اليوزر يقدر يعملها**، ومنها اللي بيحصل:
  - **Roll dice** → generate random dice roll → display dice → هل هو 1؟
    - لأ → add dice roll to current score → display.
    - آه → switch player (والرقم مش بيتضاف).
  - **Hold** → add current score to total score → score >= 100؟
    - آه → current player wins.
    - لأ → switch player.
  - **New game** → كل الـ scores = 0، و**player 1** يرجع اللاعب اللي بيبدأ.
- مفيد جدًا كـ **guide** قبل الكود. مش لازم يبقى دقيق من الأول — ممكن rough sketch.
- جوناس بيرسمها على **diagrams.net** (مجاني وسهل). وصورة الـ flowchart موجودة في الـ starter files.

### الـ starter files
- `script.js` (`'use strict'`)، `style.css`، `index.html`، صورة الـ flowchart، و**6 صور للـ dice** (`dice-1.png` … `dice-6.png`) — صورة لكل رقم، هتفرق بعدين.
- حط المشروع في **desktop منفصل** لأنه محتاج الشاشة كلها.
- live-server: لو port 8080 مشغول (مشروع قديم لسه شغال) هيشتغل على port تاني — عادي.

### الـ HTML المهم
```html
<section class="player player--0 player--active">
  <h2 class="name" id="name--0">Player 1</h2>
  <p class="score" id="score--0">43</p>
  <div class="current">
    <p class="current-label">Current</p>
    <p class="current-score" id="current--0">0</p>
  </div>
</section>
<section class="player player--1">
  ...
  <p class="score" id="score--1">24</p>
  ...
</section>

<img src="dice-5.png" alt="Playing dice" class="dice" />
```
- اللاعبين اسمهم **player 0** و**player 1** (مش 1 و2) — السبب هييجي المحاضرة الجاية.
- الـ scores الاتنين عليهم class `score` بس **كل واحد ليه id مختلف** → هنختار بالـ **id**.

### `getElementById`
```js
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
```
- بالـ `querySelector` لازم **`#`** (الـ selector بتاع الـ id).
- `getElementById` → اسم الـ id **بس من غير `#`** (مش selector).
- نفس النتيجة، و`getElementById` **أسرع شوية** — بس ده يفرق لو بتختار آلاف الـ elements. جوناس عادة بيستخدم `querySelector`.
- اسم `score0El` (**El** = element) عشان ميتلخبطش مع **قيمة** الـ score بتاعة player 0 — كده واضح إنه **DOM element**.
- **comments** زي `// Selecting elements` بتنظم الكود وبتساعد في التخطيط — هنتعود نكتبها أكتر في المشروع ده.

### الـ Starting conditions
```js
// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
```
- بنحط **numbers** مش strings، وJS بيحولها لـ string لوحده عشان يعرضها.
- عملنا class `hidden` في آخر الـ CSS (نفس المشروع اللي فات):
```css
.hidden {
  display: none;
}
```
```js
const diceEl = document.querySelector('.dice');
```
- بان في الـ HTML إن الـ img بقى عليه `dice hidden` ✅.
- لما ننفذ Roll dice → هنشيل الـ `hidden` (المحاضرة الجاية).

## الفرق بين…
| | `querySelector('#score--0')` | `getElementById('score--1')` |
|---|---|---|
| بياخد | CSS selector (بـ `#`) | اسم الـ id بس |
| بيشتغل مع | أي selector | id بس |
| السرعة | عادي | أسرع شوية |

## غلطات لازم أخلي بالي منها
- `getElementById('#score--1')` بالـ `#` ❌.
- أسمي الـ element `score0` → أتلخبط بينه وبين قيمة الـ score. استخدم `El`.
- أستخدم class `score` للاختيار → هيجيب أول واحد بس.

## ملحوظات لنفسي
- قبل أي مشروع: **flowchart** ولو بسيط (diagrams.net).
- تسمية `...El` للـ DOM elements عادة حلوة هاخدها.
- player 0 و1 أكيد عشان هنستخدمهم كـ index في array.
- الـ actions التلاتة: Roll / Hold / New game.
