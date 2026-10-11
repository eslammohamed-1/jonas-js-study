# 080 — CHALLENGE #1 (Guess My Number: Again! button)

## الفكرة
قبل الـ challenge صلحنا حاجة: **نخبّي الـ secret number** ونظهره بس لما اللاعب يكسب. وبعدين الـ challenge: نعمل زرار **Again!** اللي بيعمل reset للعبة عشان ألعب تاني **من غير reload**.

## أهم الحاجات

### تصليح: إخفاء الرقم
- كان فيه سطر بيعرض الرقم أول ما الصفحة تحمّل → **قصّه** ونقله لسيناريو الفوز:
```js
// When player wins
} else if (guess === secretNumber) {
  document.querySelector('.message').textContent = '🎉 Correct Number!';
  document.querySelector('.number').textContent = secretNumber; // ← هنا بس
  ...
}
```
- كده بقت لعبة بجد (لعب كذا مرة: 10 too low، 15 too high… لحد ما وصل).
- (جوناس قال إن الـ highscore شغال وهو بيلعب، بس احنا لسه منفذناهوش — هييجي المحاضرة الجاية.)

### المطلوب
```js
/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
```
- الخطوات موجودة عشان ميبقاش overwhelming. لو عاوز تحدي أكبر → وقف الفيديو وحلها من غير الخطوات.
- حاول تفتكر الـ addEventListener **من غير ما تنسخه** من الزرار التاني.

### حل جوناس خطوة خطوة

#### 1) الزرار + الـ handler
```js
document.querySelector('.again').addEventListener('click', function () {
  // ...
});
```
- الـ handler ده **anonymous function** — مالهاش اسم (مش متخزنة في variable).

#### 2) نرجّع الـ state variables
- `score = 20`.
- secretNumber **جديد**: نعمل نفس الحسبة ونعمل **reassign** (من غير `let` جوه، عشان منعملش variable جديد).
- عشان نقدر نعمل reassign → لازم الـ secretNumber فوق يبقى **`let`** مش `const`:
```js
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
```

#### 3) نرجّع الـ UI
- الرسالة → `'Start guessing...'` (موجودة في الـ HTML).
- الـ score → `score` (الـ variable اللي فيه 20 أصلًا — أحسن من تكرار 20). (جوناس كتب 20 الأول بالغلط وصلحها.)
- الرقم → `'?'`.
- الـ input → `''`: الـ value بتاع الـ input **دايمًا string**، والـ empty string = مفيش قيمة.

#### 4) نرجّع الـ styles
- الخلفية `#222` (رمادي غامق) والعرض `15rem`.

### الحل الكامل
```js
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
```
- اختبره بعد ما كسب، **وكمان في نص اللعبة** → كل حاجة رجعت ✅.
- ليه ده مهم؟ عشان بعدين الـ **highscore يفضل محفوظ** بين الجولات (لو عملت reload هيضيع).
- ممكن أستخدم الأسهم اللي في الـ input (number type) بدل ما أكتب.

### التقنيات
- addEventListener على زرار تاني.
- reassign لـ state variables (`let`).
- `textContent` / `value` / `style`.
- anonymous function.

## الفرق بين…
| | `let secretNumber = ...` جوه الـ handler | `secretNumber = ...` |
|---|---|---|
| النتيجة | variable جديد محلي — اللي فوق ميتغيرش ❌ | reassign للـ state ✅ |

## غلطات لازم أخلي بالي منها
- أسيب `secretNumber` كـ `const` → error مع الـ reassign.
- أكتب `let` جوه الـ handler → اللعبة هتفضل بالرقم القديم.
- أنسى أفضّي الـ input أو أرجّع الـ width.
- أكتب `20` بدل `score` (تكرار).

## ملحوظات لنفسي
- كنت ناسي إن الـ `const` هيمنع الـ reassign — جوناس غيّرها لـ `let` في نص الحل.
- أي "reset" = أرجّع **الـ state** + أرجّع **الـ UI** + أرجّع **الـ styles**.
- جوناس قال: متنسخش الكود، اكتبه بإيدك — muscle memory.
- الـ highscore هو الحاجة الوحيدة اللي مش هتتعمل reset.
