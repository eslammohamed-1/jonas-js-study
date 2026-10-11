# 075 — What's the DOM and DOM Manipulation

## الفكرة
محاضرة نظرية: الـ **DOM** يعني إيه، شكله **tree** إزاي، و**ليه الـ DOM مش جزء من JavaScript** نفسها (هو جزء من الـ **Web APIs**).

## أهم الحاجات

### الـ DOM = إيه؟
- **DOM = Document Object Model** = **structured representation** للـ HTML document.
- بيخلّي JavaScript توصل للـ HTML elements والـ styles وتعدّل فيها:
  - تغيّر **text**
  - تغيّر **HTML attributes**
  - تغيّر **CSS styles**
- يعني الـ DOM = **نقطة الوصل بين الـ HTML documents وكود JavaScript**.
- **البراوزر بيعمله أوتوماتيك** أول ما الصفحة تحمّل.
- متخزّن في **tree structure**، وكل HTML element = **object**.

### الـ DOM tree (على مثال HTML بسيط)
- شبه **شجرة العيلة** → عشان كده بنقول **child / parent / sibling** element.
- كل element في الـ HTML ليه **element node** في الشجرة، وأقدر أوصله وأتعامل معاه من JS.
- الترتيب:
  1. **`document`** فوق خالص → object خاص متاح في JS، وهو **الـ entry point للـ DOM**. (عشان كده `querySelector` موجودة على `document` — محتاجينه نبدأ منه الـ selection.)
  2. أول child: **`html`** → الـ root element.
  3. children الـ html: **`head`** و**`body`** → جنب بعض في الـ HTML، فهما **siblings** في الـ DOM.
  4. وكل ما ننزل في الـ nesting → children أكتر (الـ sections جوه body ليهم children، والـ paragraph الأول جواه link `a`…).
- الـ DOM فيه **أكتر من element nodes**: فيه nodes لـ **النص نفسه** و**comments** وحاجات تانية.
- القاعدة: **أي حاجة في الـ HTML لازم تبقى في الـ DOM** → الـ DOM = representation **كاملة** للـ document.

### الـ DOM مش جزء من JavaScript! ⚠️
- ناس كتير فاكرة إن الـ DOM وmethods زي `document.querySelector` جزء من JS — **غلط**.
- JavaScript = dialect من مواصفات **ECMAScript**، والـ DOM مش موجود فيها.
- لحد دلوقتي استخدمنا **اللغة نفسها** بس. من السيكشن ده هنستخدم **JavaScript في البراوزر** (مش مجرد console — نعدّل صفحات معروضة فعلًا).

### طب شغال إزاي؟ → Web APIs
- الـ DOM وmethods بتاعته جزء من **Web APIs**.
- **Web APIs** = زي **libraries** البراوزر بيعملها implement، ونقدر نوصلها من كود JS.
- **API = Application Programming Interface** (تفاصيل بعدين).
- مكتوبة برضه بـ JavaScript و**متاحة أوتوماتيك** — مش محتاج import ولا أي حاجة.
- فيه **DOM specification رسمية** البراوزرات بتطبقها → عشان كده الـ DOM manipulation **شغال بنفس الطريقة في كل البراوزرات**.
- فيه Web APIs تانية كتير غير الـ DOM: **timers**، **fetch API**، وغيرهم.

## الفرق بين…
| | JavaScript (ECMAScript) | DOM |
|---|---|---|
| جزء من اللغة؟ | آه | لأ |
| جاي منين | المواصفات | Web APIs بتاعة البراوزر |
| أمثلة | let, functions, arrays | `document`, `querySelector` |

## غلطات لازم أخلي بالي منها
- أفتكر إن `document` جزء من JS → هو من البراوزر (Web API).
- أفتكر إن الـ DOM فيه elements بس → فيه text وcomments كمان.

## ملحوظات لنفسي
- `document` = باب الدخول للـ DOM.
- كنت فاكر إن الـ DOM جزء من JavaScript، طلع **Web API**.
- parent/child/sibling هتفرق جدًا لما نتحرك في الشجرة بعدين.
- timers وfetch كمان Web APIs — هنشوفهم بعدين.
