# 035 — Function Declarations vs. Expressions

## الفكرة
فيه أكتر من طريقة أكتب بيها function في JS، وكل نوع بيشتغل بشكل مختلف شوية. هنا: **function declaration** و**function expression**، والفرق العملي بينهم.

## أهم الحاجات
### Function Declaration
```js
// Function declaration
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}
const age1 = calcAge1(1991);
```
- اسمها declaration لأننا بنستخدم `function` نعرّف بيها function، زي ما بنعرّف variable.
- الـ parameter زي **local variable** متاح جوه الـ function بس.
- في الأول خزّن الـ age في variable وبعدين عمل return، وبعدين **بسّطها**: لو كل اللي هعمله إني أرجّع القيمة، يبقى أعمل `return` للـ expression على طول.
- function generic تشتغل مع أي سنة.

### Parameter vs Argument (بدقة)
- ناس بتستخدمهم كأنهم نفس الحاجة، ومش مشكلة كبيرة. بس بدقة:
  - **parameter** = الـ placeholder في الـ function.
  - **argument** = القيمة الحقيقية اللي بتملا الـ placeholder.

### Function Expression
```js
// Function expression
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
const age2 = calcAge2(1991);

console.log(age1, age2); // 46 46
```
- `function` **من غير اسم**، يعني **anonymous function**، ومتخزّنة في variable، والـ variable ده بقى هو الـ function.
- الجزء `function (birthYeah) {...}` ده **expression**، والـ expression بتطلّع value، والـ value دي اتخزنت في `calcAge2`.
- بنناديها بنفس الطريقة وبنمسك الـ return بنفس الطريقة، والنتيجة نفسها.
- لازم أعرف النوعين، لأن فيه أماكن هنحتاج نكتبها expression بالذات.

### الـ Functions مجرد Values
- في JS **الـ function value**، زي الـ number والـ string والـ boolean.
- الـ function مش type زي string أو number، بس هي value، فأقدر أخزّنها في variable.
- دي هتبقى مهمة جدًا لما ندخل في الـ functions بعمق بعدين.

### الفرق العملي: أنادي قبل ما أعرّف
```js
const age1 = calcAge1(1991); // ✅ شغال
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}

const age2 = calcAge2(1991); // ❌ ReferenceError: Cannot access 'calcAge2' before initialization
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
```
- الـ declaration أقدر أناديها **قبل** ما أعرّفها في الكود. الـ expression لأ.
- السبب الداخلي اسمه **hoisting**، وهيتشرح في سيكشن جاي.
- النداء قبل التعريف مش فكرة كويسة في حالات كتير، بس ينفع لو محتاجه.

### أستخدم أنهي واحدة؟
- غالبًا **personal preference**.
- جوناس بيفضّل **expressions**:
  - بتجبره على structure حلوة: يعرّف كل الـ functions فوق الأول، وبعدين يناديهم.
  - بيحب كل حاجة تبقى متخزنة في variables، values وfunctions.
- developers تانيين كتير بيفضّلوا declarations، وده عادي.
- بس **لازم أعرف الاتنين** وأفرّق بينهم، لأن كل واحد ليه مكانه.

## الفرق بين…
| Declaration | Expression |
|---|---|
| `function calcAge1(...) {}` | `const calcAge2 = function (...) {}` |
| ليها اسم | anonymous ومتخزنة في variable |
| أقدر أناديها قبل التعريف (hoisting) | ❌ Cannot access before initialization |
| | جوناس بيفضّلها |

## غلطات لازم أخلي بالي منها
- أنادي function expression قبل السطر اللي اتعرّفت فيه.
- أفتكر إن الـ function type زي string. هي value.

## ملحوظات لنفسي
- الاتنين بيتنادوا بنفس الطريقة: `calcAge(1991)`.
- لو القيمة هتتحسب وترجع على طول: `return 2037 - birthYeah;` من غير variable وسيط.
- (جوناس كاتب `birthYeah` بالغلط في الكود بتاعه، فلو شفتها في الـ repo متستغربش.)
- hoisting هيتشرح في Behind the Scenes.
