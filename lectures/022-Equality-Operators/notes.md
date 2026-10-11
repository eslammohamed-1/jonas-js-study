# 022 — Equality Operators: == vs. ===

## الفكرة
عشان أعرف هل قيمتين **متساويين** (مش أكبر أو أصغر) فيه equality operators: `===` (strict) و`==` (loose). وكمان المحاضرة فيها `prompt` و`else if` والـ different operator `!==`.

## أهم الحاجات
### `===`
```js
const age = 18;
if (age === 18) console.log('You just became an adult :D (strict)');
```
- بيرجّع boolean: true بس لو الطرفين **متطابقين بالظبط**.
- `18 === 18` ← true، و`18 === 19` ← false.
- **if بسطر واحد مش محتاج `{ }`**، أكتب السطر على طول.
- لو age = 19 مش هيطبع.

### متلخبطش `=` مع `===`
- `=` assignment، و`===` comparison.

### Strict `===` vs Loose `==`
```js
'18' == 18;  // true  ← بيعمل type coercion
'18' === 18; // false ← مش بيعمل coercion
```
- `===` اسمه **strict equality operator** لأنه **مش بيعمل type coercion**.
- `==` اسمه **loose equality operator** وبيعمل coercion: `'18'` بتتحوّل لـ 18 وبعدين بيقارن.

```js
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)'); // مش هيطبع
if (age == 18) console.log('You just became an adult :D (loose)');   // هيطبع
```
- لما age كانت 18 number، الاتنين طبعوا. ولما بقت `'18'` string، الـ loose بس اللي طبع.

### القاعدة: استخدم `===` دايمًا
- الـ `==` مليان قواعد وسلوكيات غريبة، وممكن يعمل bugs صعب ألاقيها.
- كـ clean code rule: **أتجنب `==` على قد ما أقدر**، ومعظم الـ JS developers بينصحوا بكده.
- حتى لو محتاج type conversion، أحوّل يدوي قبل المقارنة أحسن ما أعتمد على `==`.
- جوناس: من هنا ورايح هنفترض إن `==` مش موجود أصلًا.

### `prompt`: آخد value من الصفحة
```js
const favourite = prompt("What's your favourite number?");
console.log(favourite);        // '23' ← أبيض يعني string
console.log(typeof favourite); // string
```
- `prompt` بتفتح نافذة أكتب فيها حاجة وأدوس Enter، والقيمة بتطلع **string**. لازم أخزّنها في variable.

```js
if (favourite == 23) { // '23' == 23 ← true بسبب الـ coercion
  console.log('Cool! 23 is an amazing number!');
}
```
- مع `==` اشتغلت، ومع `===` لأ، لأن `'23' !== 23`.
- الحل الصح: أحوّل الـ input لـ number:
```js
const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);        // 23 ← pink يعني number
console.log(typeof favourite); // number
```

### `else if`: كذا شرط ورا بعض
```js
if (favourite === 23) { // 22 === 23 -> FALSE
  console.log('Cool! 23 is an amzaing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 9) {
  console.log('9 is also a cool number');
} else {
  console.log('Number is not 23 or 7 or 9');
}
```
- لو الشرط الأول false، مش بيروح للـ else على طول. بيجرّب الـ `else if` اللي بعده، وبعدين اللي بعده، ولو كله false يروح للـ else الأخير.
- أقدر أزوّد `else if` قد ما أنا عاوز، وبنستخدمها من وقت للتاني.

### الـ Different Operator `!==`
```js
if (favourite !== 23) console.log('Why not 23?');
```
- `!==` strict، و`!=` loose. **استخدم الـ strict برضه.**
- لو دخلت 9: هيطبع "9 is also a cool number" **و**"Why not 23?"، لأن دول if statementين منفصلين.
- لو دخلت 23: هيطبع رسالة الـ 23 بس.

## الفرق بين…
| `===` strict | `==` loose |
|---|---|
| من غير type coercion | بيعمل type coercion |
| `'18' === 18` ← false | `'18' == 18` ← true |
| ✅ استخدمه دايمًا | ❌ اعتبره مش موجود |

| equal | different |
|---|---|
| `===` / `==` | `!==` / `!=` |

## غلطات لازم أخلي بالي منها
- `if (age = 18)`: ده assignment مش مقارنة.
- أقارن قيمة `prompt` بـ number بـ `===` من غير `Number()`، فدايمًا هيطلع false.
- أستخدم `==` عشان "تشتغل وخلاص"، وده بيخبّي bugs.
- أفتكر إن `if` منفصل بعد سلسلة if/else if جزء منها. هو بيتشيك لوحده.

## ملحوظات لنفسي
- `===` و`!==` بس، وأنسى إن `==` موجود.
- `prompt` بترجّع string دايمًا، فألفّها بـ `Number()`.
- if بسطر واحد ينفع من غير `{ }`.
- `else if` بتخليني أشيك على كذا حالة بالترتيب.
