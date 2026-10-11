# 078 — Implementing the Game Logic

## الفكرة
نبني **logic اللعبة**: نعمل **secret number** عشوائي، ونغطي السيناريوهات (صح / أعلى / أقل)، ونعمل **score** بيقل مع كل غلطة، ونخسر لما يخلص. وأهم فكرة: **الـ state** لازم تبقى في الكود مش في الـ DOM بس.

## أهم الحاجات

### الـ secret number — جوه الـ handler ولا برّه؟
- **برّه**. عاوزينه يتعمل **مرة واحدة** لما الـ app يبدأ.
- لو جوه الـ handler → **رقم جديد مع كل click** → اللعبة ملهاش معنى.

### بنعمل رقم من 1 لـ 20 (جرّبه خطوة خطوة في الـ console)
- زي الـ dice roll في سيكشن الـ fundamentals.
```js
Math.random();                       // من 0 لـ 1 (رقم جديد كل مرة)
Math.random() * 20;                  // من 0 لـ 20 بس decimal
Math.trunc(Math.random() * 20);      // من 0 لـ 19 (عمره ما يوصل 20، أقصاه 19.999…)
Math.trunc(Math.random() * 20) + 1;  // من 1 لـ 20 ✅
```
- `Math` = object جاهز في JS فيه methods كتير، منها `random` و`trunc`.
- `Math.trunc` بتشيل الـ decimal ("noise").

```js
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber; // مؤقتًا عشان نختبر
```
- في اللعبة الحقيقية الرقم **مستخبي** ورا الـ `?`، بس أثناء الـ development بنظهره عشان نختبر. (ظهر 20 مرة → يعني 20 جوه الـ range.)
- كان اسمه `number` في الأول وغيّره لـ `secretNumber` — تريك VS Code: double click يختار الكلمة، وبعدين **double click (مع Alt/Option) على باقي الأماكن** → multiple cursors وأغيّرهم مرة واحدة.

### السيناريوهات في `if / else if`
```js
if (!guess) {
  document.querySelector('.message').textContent = '⛔️ No number!';
} else if (guess === secretNumber) {
  document.querySelector('.message').textContent = '🎉 Correct Number!';
} else if (guess > secretNumber) {
  document.querySelector('.message').textContent = '📈 Too high!';
} else if (guess < secretNumber) {
  document.querySelector('.message').textContent = '📉 Too low!';
}
```
- اختبر: الرقم 3 → 12 = Too high، 1 = Too low، 3 = Correct ✅.

### الـ Score — أعمله إزاي؟
- **طريقة 1**: أقرا الـ score من الـ DOM، أطرح 1، وأكتبه تاني.
- **طريقة 2 (الأحسن)**: **variable في الكود** أنقصه، وبعدين أعرض قيمته في الـ DOM.
```js
let score = 20; // let مش const لأننا هنغيره (const immutable)
```
```js
score = score - 1; // نفس score--
document.querySelector('.score').textContent = score;
```
- اتحط في الحالتين الغلط (أعلى وأقل).

### Application State
- ليه الطريقة 2 أحسن؟ عشان **الداتا تبقى في الكود** مش في الـ DOM بس → الـ app يعرف الـ score في أي وقت.
- `score` = **state variable** — جزء من الـ **application state** = كل الداتا المهمة للـ app.
- و`secretNumber` (كان 17 ساعتها) برضه جزء من الـ state.
- القاعدة: **كل الداتا تبقى متاحة في مكان في الكود**، مش نعتمد على الـ DOM يشيلها.

### الخسارة
- كان بيدوس كتير والـ score نزل لـ 0 وبعدين سالب للأبد — البرنامج **ميعرفش يعني إيه يخسر أو يكسب**، ده **علينا** نكتبه.
- `if` جوه `else if` — عادي خالص.
- أول محاولة `score > 0` → كان لسه بيقدر يدوس لما الـ score = 1 ومتخسرش → لازم **`score > 1`**.
- لما يخسر → نكتب 0 في الـ score.

### الكود لحد دلوقتي
```js
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';

    // When guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
```
- فيه **كود متكرر كتير** (الفرق بس في الرسالة) — هنصلحه في آخر المشروع. دلوقتي "make it work" الأول.
- فاضل: الـ highscore وزرار Again!، بس الأول المحاضرة الجاية عن تغيير CSS من JS.

## الفرق بين…
| | الـ state في الـ DOM بس | state variable في الكود |
|---|---|---|
| الـ app يعرف القيمة؟ | لازم يقراها من الصفحة كل مرة | دايمًا متاحة |
| جوناس بيفضّل | ❌ | ✅ |

| | جوه الـ handler | برّه الـ handler |
|---|---|---|
| secretNumber | رقم جديد كل click ❌ | مرة واحدة ✅ |

## غلطات لازم أخلي بالي منها
- `Math.trunc(Math.random() * 20)` من غير `+ 1` → من 0 لـ 19.
- `const score` → error لما أعمل `score--`.
- `score > 0` بدل `score > 1` → بيسيبني أدوس مرة زيادة.
- أنسى أحدث الـ DOM بعد ما أغيّر الـ variable — الـ variable اتغير بس الشاشة لأ.

## ملحوظات لنفسي
- كنت فاكر إن أسهل حاجة أقرا الـ score من الصفحة، طلع الأحسن variable = **state**.
- الترتيب: غيّر الـ state → اعرضه في الـ DOM.
- الكود المتكرر ده هيبقى درس DRY بعدين — أخلي بالي منه.
- أظهر الـ secretNumber وأنا بختبر، وبعدين أخبيه.
