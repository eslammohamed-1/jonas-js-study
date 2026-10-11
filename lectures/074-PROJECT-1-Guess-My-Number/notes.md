# 074 — PROJECT #1: Guess My Number!

## الفكرة
أول مشروع من 3: لعبة **Guess My Number!** (ديزاين retro مستوحى من ألعاب الـ 80s). في المحاضرة دي: شفنا الـ demo، والـ starter files، وأول **DOM manipulation**: نختار element بـ `document.querySelector` ونقرا الـ `textContent`.

## أهم الحاجات

### اللعبة شغالة إزاي (الـ demo)
- فيه **secret number** بين **1 و20**.
- أكتب رقم في الـ input وأدوس **Check!** → رسالة على اليمين:
  - **Too low!** / **Too high!**
  - **Correct Number!** → الشاشة تبقى **خضرا** والـ **Highscore** يتحدث.
- الـ **Score** بيبدأ بـ **20** وبيقل **1** مع كل تخمين غلط.
- **Again!** → يعمل reset لكل حاجة **ما عدا الـ Highscore**. لو كسبت أسرع → الـ Highscore يتحسن، لو أبطأ يفضل زي ما هو.

### الـ starter files
- `.prettierrc` → نفس config سيكشن الـ editor setup، **وهنستخدمه في كل مشروع من دلوقتي**.
- `script.js` فاضي.
- `style.css` (لو مهتم تبص عليه).
- `index.html` → **مهم**: فيه الـ class names بتاعة الـ elements اللي هنختارها.

مثلًا الرسالة في الـ HTML:
```html
<p class="message">Start guessing...</p>
```

### أول selection: `document.querySelector`
```js
console.log(document.querySelector('.message'));
```
- `querySelector` = **method** موجودة على الـ **`document` object** (التفاصيل بعدين).
- بناخد **selector زي CSS بالظبط** كـ string:
  - class → `.message`
  - id → `#...`
- في الـ console بيطلع الـ **element كله**، ولما أعمل hover عليه بيتعلّم في الصفحة.
- ده **أول DOM manipulation** 🎉.

### نقرا النص: `.textContent`
```js
console.log(document.querySelector('.message').textContent);
// Start guessing...
```
- `querySelector` بيرجّع **element** → وعليه أقرا property `textContent`.
- لما يبقى فيه كذا `.` → بيتنفذوا **من الشمال لليمين**: الأول الـ selection، يتبدل بالـ element، وبعدين نقرا الـ property.

### الـ setup
- `cl` + Enter → console.log (الـ snippet).
- Terminal → `Cmd + K` → `live-server` (لازم أكون في فولدر المشروع `Guess-My-Number`).
- جوناس حاطط الـ demo على اليمين والمشروع بتاعنا على الشمال.

## الفرق بين…
| | `document.querySelector('.message')` | `.textContent` بعده |
|---|---|---|
| بيرجّع | الـ element نفسه | النص اللي جواه |

## غلطات لازم أخلي بالي منها
- أنسى الـ `.` قبل اسم الـ class في الـ selector → مش هيلاقي الـ element.
- أستخدم `#` لـ class أو `.` لـ id.
- أشغّل live-server من فولدر غلط.

## ملحوظات لنفسي
- كنت فاكر إن JS بتختار elements بطريقة مختلفة عن CSS، طلع **نفس الـ selectors بالظبط**.
- أفتح `index.html` الأول دايمًا عشان أعرف أسماء الـ classes.
- الـ Highscore هو الحاجة الوحيدة اللي مش بتتعمل reset.
