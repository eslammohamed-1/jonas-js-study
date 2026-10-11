# 081 — Implementing Highscores

## الفكرة
آخر feature ناقصة في اللعبة: **Highscore**. لما أكسب، لو الـ score بتاع الجولة دي **أكبر من الـ highscore** → يبقى هو الـ highscore الجديد. ومحفوظ بين الجولات بفضل زرار Again!.

## أهم الحاجات

### بيشتغل إزاي (الـ demo)
- أول جولة كسبت بـ score 10 → الـ highscore = 10 (أول لعبة).
- Again! → الـ score يرجع 20، بس الـ highscore فاضل.
- كسبت بـ 17 → أكبر من 10 → highscore = 17.

### الـ state variable
```js
let highscore = 0;
```
- بيبدأ بـ **0** → كده أول score هيبقى دايمًا هو الـ highscore (أي score أكبر من 0).

### بنتشيك فين؟
- الـ highscore بيتحدث **أول ما اللاعب يكسب** → يعني جوه block الـ **win**.
```js
// When player wins
} else if (guess === secretNumber) {
  document.querySelector('.message').textContent = '🎉 Correct Number!';
  document.querySelector('.number').textContent = secretNumber;

  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';

  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
}
```
- الـ HTML: `<span class="highscore">0</span>`.
- نفس الـ pattern: غيّر الـ **state** (`highscore = score`) → اعرضه في الـ **DOM**.
- جوناس: **اكتب ده كله بإيدك** عشان يثبت في دماغك.

### الاختبار (كل السيناريوهات)
- كسب بـ 14 → highscore من 0 لـ 14 ✅.
- Again! → كل حاجة reset **ما عدا الـ highscore** — ده كان الهدف من الزرار. لو عملت **reload** للصفحة → الكود كله يشتغل من الأول وكل حاجة تضيع.
- كسب بـ 18 → أكبر من 17 → highscore = 18 ✅.
- كسب بـ 12 → **أقل** → الـ highscore فاضل 18 لأن الشرط `false` ✅.
- **لازم أختبر كل السيناريوهات** اللي كتبتها في الكود، مش الحالة الحلوة بس.

### الخلاصة
- اللعبة بقت **functional** بالكامل 🎉 — أول game بنيته بالكود.
- المحاضرة الجاية: **تنضيف الكود** (الـ duplicate code في too high / too low وغيره) — مهم نـ"finish" الـ apps مش بس نخليها تشتغل.

## الفرق بين…
| | score | highscore |
|---|---|---|
| البداية | 20 | 0 |
| بيتغير إمتى | كل تخمين غلط (−1) | لما أكسب بـ score أكبر |
| Again! | يرجع 20 | **مبيتغيرش** |

## غلطات لازم أخلي بالي منها
- أحط الـ check برّه block الفوز → هيتحدث مع كل click.
- أعرّف `highscore` جوه الـ handler → يرجع 0 كل مرة.
- أنسى أحدث الـ DOM بعد `highscore = score`.
- أختبر الحالة اللي بتكسب بس وأنسى الحالة اللي الـ score فيها أقل.

## ملحوظات لنفسي
- البداية بـ 0 هنا صح (عكس max/min في السيكشن اللي فات) لأن أي score أكبر من 0.
- الـ state variables كلها برّه الـ handlers: `secretNumber`, `score`, `highscore`.
- reload = كل الـ state يضيع. Again! = بعمل reset للي أنا عاوزه بس.
