# 082 — Refactoring Our Code: The DRY Principle

## الفكرة
نخلص المشروع بـ **refactoring**: نعيد ترتيب الكود **من غير ما نغيّر شغله**، عشان نشيل الـ **duplicate code** ونطبّق مبدأ **DRY (Don't Repeat Yourself)**. عملناها بطريقتين: **ندمج blocks** شبه بعض بـ ternary، و**نعمل function** للكود المتكرر.

## أهم الحاجات

### ليه الـ duplicate code وحش؟
- كود "too high" وكود "too low" **تقريبًا نفس الكود**، الفرق في الـ string بس → **مش DRY**.
- لو عاوز أغيّر حاجة (مثلًا رسالة الخسارة) → لازم أغيّرها في **كذا مكان**. صغيرة هنا، بس في code base كبير = **كابوس**.
- عادي **أبدأ** بكود متكرر عشان أخليه يشتغل (ده اللي جوناس عمله)، وبعدين أعمل refactor.

### Refactoring = إيه؟
- **restructure للكود من غير ما يتغير شغله** → عشان نحسّنه ونشيل التكرار.
- **أول خطوة**: ألاقي الكود المتكرر أو شبه المتكرر.

### Refactor 1: دمج too high و too low
- الاتنين في الحقيقة معناهم: **التخمين ≠ الرقم السري** → block واحد `guess !== secretNumber`.
- الفرق الوحيد (الرسالة) → **ternary operator**:
```js
// When guess is wrong
} else if (guess !== secretNumber) {
  if (score > 1) {
    document.querySelector('.message').textContent =
      guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game!';
    document.querySelector('.score').textContent = 0;
  }
}
```
- ليه ينفع؟ لأن الـ ternary **operator** → **بيرجّع value** (واحد من الاتنين) والقيمة دي هي اللي بتتحط في `textContent`.
- الكود القديم مامسحوش — **عمله comment** كـ reference.
- مسح الـ `}` بالغلط وطلع خط أحمر → رجّعها.
- اختبر: 20 too high، 17، 19، 18 ✅ — الـ refactor نجح.

### Refactor 2: function للكود المتكرر
- لما أعمل select لـ `document.querySelector('.message').textContent` → VS Code بيعلّم كل التكرارات → **5 مرات**!
- ونفس الكلام لتغيير الـ number، والـ score، وحساب الـ secretNumber (مكانين).
- الحل: function وأناديها في كل مكان.
```js
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
```
- استبدل كل الأماكن:
```js
if (!guess) {
  displayMessage('⛔️ No number!');
} else if (guess === secretNumber) {
  displayMessage('🎉 Correct Number!');
  ...
} else if (guess !== secretNumber) {
  if (score > 1) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    ...
  } else {
    displayMessage('💥 You lost the game!');
    ...
  }
}

// وفي زرار Again!
displayMessage('Start guessing...');
```
- مع الـ ternary: نتيجته بتبقى هي الـ **argument**.
- اختبر بـ click من غير رقم → "No number!" ✅.

### فايدة تانية: الكود بيتقري أسهل
- بعد سنة لو رجعت للكود: `document.querySelector('.message').textContent = ...` محتاج أفكر فيها، لكن `displayMessage('...')` **واضحة على طول**.
- الـ readability مهمة في الـ web development.

### الباقي
- جوناس معملش functions للـ number والـ score والـ secretNumber (بياخد وقت) — أقدر أعملها لوحدي كتمرين، مش ضروري.
- **خلي الـ refactoring في دماغك دايمًا** وإنت بتكتب كود — هنعمله كتير في الكورس.
- المشروع الجاي: **Modal Window** (UI component حقيقي).

## الفرق بين…
| طريقة الـ refactor | امتى | مثال |
|---|---|---|
| دمج blocks | conditions معناها واحد والفرق صغير | too high + too low → `guess !== secretNumber` + ternary |
| function | نفس السطر في أماكن كتير | `displayMessage(message)` |

## غلطات لازم أخلي بالي منها
- أغيّر سلوك الكود وأنا بعمل refactor → ده مش refactor.
- أمسح الكود القديم قبل ما أتأكد إن الجديد شغال (جوناس علّق عليه).
- أنسى الـ curly braces وأنا بشيل blocks.
- أفتكر إن `if/else` بس اللي ينفع هنا — الـ ternary بيرجع value فينفع جوه argument.

## ملحوظات لنفسي
- DRY = Don't Repeat Yourself.
- "make it work" الأول → وبعدين refactor. مش لازم أكتب كود perfect من أول مرة.
- تمرين: أعمل `displayNumber` و`displayScore` بنفسي.
- select لجزء من الكود في VS Code بيورّيني تكراراته — طريقة سريعة ألاقي الـ duplicate.
