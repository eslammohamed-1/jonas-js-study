# 033 — Activating Strict Mode

## الفكرة
قبل ما نكمّل، نفعّل **strict mode**، وده mode خاص في JS بيسهّل إني أكتب secure code، يعني أتجنب accidental errors.

## أهم الحاجات
### تجهيز السيكشن
- فولدر starter بتاع Fundamentals Part 2 من الـ GitHub repo. فيه script.js جاهز ومربوط بالـ HTML خلاص.

### التفعيل
```js
'use strict';
```
- السطر ده فعّل strict mode للـ script كله.
- **لازم يبقى أول statement في الفايل.** لو فيه أي كود قبله مش هيتفعّل. الـ comments عادي لأن JS بتتجاهلها.
- ممكن أفعّله لـ function أو block معيّن بس، لكن جوناس مش شايف فايدة، ودايمًا بيحطه أول الـ script. وأنا أعمل زيه.

### بيساعدني إزاي؟ (سببين)
1. بيمنعني أعمل حاجات معينة.
2. بيطلّع **errors واضحة** في الـ console في حالات كانت JS هتفشل فيها **في صمت** من غير ما تقولّي.

### المثال: غلطة في اسم variable
```js
'use strict';

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // ← نسيت الـ s
if (hasDriversLicense) console.log('I can drive :D');
```
- **من غير strict mode:** مفيش "I can drive" ومفيش error. السبب إن السطر ده عمل variable **جديد** (`hasDriverLicense`) واداه true، والأصلي لسه false. فعندي bug ومعرفش هو فين.
- **مع strict mode:** `ReferenceError: hasDriverLicense is not defined` على سطر 6، فأعرف على طول إن ناقص s.
- جوناس قال الغلطة دي بتحصل أكتر ما أتخيل.
- passTest خلاها `const` لأنها مش هتتغير (const by default).

### كلمات محجوزة للمستقبل
```js
const interface = 'Audio'; // ❌ Unexpected strict mode reserved word
const private = 534;       // ❌
```
- strict mode بيحجز شوية أسماء لـ features ممكن تدخل اللغة بعدين، فيسهل تطبيقها. مثلًا private ممكن تبقى private fields في الـ classes.
- نفس فكرة إني مينفعش أسمّي variable `if` (Unexpected token 'if').

### حاجات تانية
- strict mode بيغيّر حاجات في الـ functions والـ objects وsetting properties على primitives وغيرها. جوناس هيذكرها لما نوصلها.
- **من هنا ورايح كل الكورس بيفترض إن strict mode شغال**، وجوناس هيحطه في كل script.

## غلطات لازم أخلي بالي منها
- أحط `'use strict';` بعد أي كود، فمش هيتفعّل.
- أكتب اسم variable غلط من غير strict mode، فـ JS تعمل واحد جديد في صمت.

## ملحوظات لنفسي
- strict mode = يمنع + يطلّع errors بدل الصمت.
- أول سطر في أي script: `'use strict';`.
- `interface` و`private` ممنوعين كأسماء variables.
- (من نوتتي القديمة) الـ modules والـ classes بيبقوا strict لوحدهم، وده هييجي بعدين.
