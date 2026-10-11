# 100 — The this Keyword

## الفكرة
الـ **`this` keyword** (أو `this` variable) = **variable خاص بيتعمل لكل execution context** (يعني لكل function) — هو التالت مع الـ variable environment والـ scope chain. قيمته **مش ثابتة**: بتعتمد على **الـ function اتنادت إزاي**، وبتتحدد **وقت النداء بس**.

## أهم الحاجات

### القاعدة العامة
- `this` بياخد قيمة **الـ owner** بتاع الـ function اللي اتستخدم فيها → "**بيشاور على الـ owner**".
- **مش static** — عكس `x = 5` اللي هيفضل 5 دايمًا. `this` بيتحدد **لما الـ function تتنادى**، وحسب **طريقة** النداء.

### 4 طرق (حالات)

#### 1) Method → `this` = **الـ object اللي بينادي الـ method**
- method = function متعلقة بـ object.
```js
const jonas = {
  name: 'Jonas',
  year: 1989,
  calcAge: function () {
    return 2037 - this.year;
  },
};
jonas.calcAge(); // 48
```
- اللي بينادي `calcAge` هو `jonas` → `this` = `jonas` → `this.year` = 1989.
- كتابة `jonas.year` هنا ليها نفس التأثير، بس **`this.year` أحسن بكتير** (لأسباب هنشوفها في الكورس).

#### 2) Simple function call (مش method، مش متعلقة بـ object) → `this` = **`undefined`**
- ده في **strict mode** بس.
- من غير strict mode → `this` = **الـ global object** = **`window`** في البراوزر → ممكن يعمل مشاكل كبيرة → **سبب كمان تستخدم strict mode دايمًا**.

#### 3) Arrow functions → **ملهاش `this` خاص بيها**
- مش طريقة نداء بالظبط، بس نوع function لازم نحسبه.
- لو استخدمت `this` جوه arrow → هياخد **`this` بتاع الـ surrounding (parent) function**.
- اسمه التقني: **lexical `this`** — لأنه بيتجاب من الـ **outer lexical scope** بتاع الـ arrow.
- **متنساش ده أبدًا** — جوناس نفسه وقع في bug أو اتنين بسببه.

#### 4) Event listener → `this` = **الـ DOM element اللي الـ handler متعلق بيه**

### `this` **مش** إيه (misconceptions شائعة)
- **عمره ما يشاور على الـ function نفسها** اللي بنستخدمه فيها.
- **عمره ما يشاور على الـ variable environment** بتاع الـ function.

### طرق تانية (بعدين)
- فيه طرق نداء تانية: الـ **`new`** keyword، و**`call` / `apply` / `bind`** — هنتكلم عن `this` معاهم لما نوصلهم.

## الفرق بين…
| طريقة النداء | قيمة `this` |
|---|---|
| Method `obj.method()` | الـ object اللي بينادي الـ method |
| Simple function call (strict) | `undefined` |
| Simple function call (sloppy) | `window` |
| Arrow function | `this` بتاع الـ parent scope (lexical this) |
| Event listener | الـ DOM element اللي عليه الـ handler |
| `new`, `call`, `apply`, `bind` | لاحقًا |

## غلطات لازم أخلي بالي منها
- أفتكر إن `this` ثابت أو بيتحدد وقت كتابة الكود — لأ، **وقت النداء**.
- أفتكر إن `this` = الـ function نفسها أو الـ variable environment بتاعها.
- أستخدم `this` جوه arrow وأتوقعه يبقى الـ object.
- أشتغل من غير strict mode → `this` يبقى `window` بدل undefined.

## ملحوظات لنفسي
- السؤال الوحيد اللي أسأله: **"مين اللي نادى الـ function دي؟"**.
- arrow = مفيش `this` → بص للـ parent.
- `this.year` أحسن من `jonas.year` جوه الـ method.
