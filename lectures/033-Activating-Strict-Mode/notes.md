# 033 — Activating Strict Mode

## الفكرة
Strict mode = وضع بيخلي JS أدق: بيمنع حاجات معينة، وبيطلّع **error** واضح بدل ما يسكت على الغلط.
بفعّله بسطر واحد **أول حاجة في الملف**:

```js
'use strict';

// باقي الكود
```

## أهم الحاجات

### لازم يكون أول statement
- قبله comments بس، مينفعش أي كود.
- لو فيه كود قبله → مش هيتفعّل.
- ممكن أفعّله لـ function أو block لوحده، بس جوناس دايمًا بيحطه أول الملف.

### بيكشف المتغيرات اللي اسمها غلط
```js
'use strict';
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // نسيت حرف s
if (hasDriversLicense) console.log('I can drive :D');
// ❌ ReferenceError: hasDriverLicense is not defined
```
من غير strict mode، JS كانت هتعمل متغير global جديد في سكوت، ومش هيطبع حاجة، ومش هعرف ليه.

### كلمات محجوزة للمستقبل
```js
'use strict';
const interface = 'Audio'; // ❌ Unexpected strict mode reserved word
const private = 534;       // ❌
```
زي `interface` و `private` و `public` و `protected` و `package` و `implements` و `static`. محجوزة عشان ممكن تدخل اللغة بعدين.

## ملحوظات لنفسي
- strict mode = حاجتين: (1) بيمنع حاجات غلط، (2) بيطلّع errors كانت بتعدّي في سكوت.
- من دلوقتي كل script أبدأه بـ `'use strict';`.
- (الـ modules والـ classes strict لوحدهم، ده بعدين.)
