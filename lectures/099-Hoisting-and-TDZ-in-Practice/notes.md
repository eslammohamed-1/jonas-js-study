# 099 — Hoisting and TDZ in Practice

## الفكرة
نجرب الـ hoisting بإيدينا: مع الـ **variables** (var / let / const)، ومع الـ **functions** (declaration / expression / arrow)، وبعدين مثال لـ **bug حقيقي** سببه var + hoisting، والـ **best practices**، وفي الآخر فرق صغير: **var بتعمل property على الـ `window` object**.

## أهم الحاجات

### 1) Variables قبل التعريف
```js
// Variables
console.log(me);   // undefined
console.log(job);  // ❌ ReferenceError: Cannot access 'job' before initialization
console.log(year); // ❌ ReferenceError: Cannot access 'year' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;
```
- `me` (var) → hoisted لـ **undefined**.
- `job` (let) و`year` (const) → لسه في الـ **TDZ**. الـ TDZ بتبدأ من **أول الـ scope الحالي** (هنا الـ global) لحد سطر التعريف.

### 2) Functions قبل التعريف
```js
// Functions
console.log(addDecl(2, 3));  // 5 ✅
console.log(addExpr(2, 3));  // ❌ Cannot access 'addExpr' before initialization
console.log(addArrow(2, 3)); // ❌ Cannot access 'addArrow' before initialization

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b; // implicit return
```
- **function declaration** → اشتغلت قبل التعريف ✅ (مش undefined زي الـ var).
- **function expression / arrow** بـ const → هي مجرد **const variable** بقيمة function → في الـ **TDZ** → نفس error الـ let/const.

### لو غيرتهم لـ `var`؟
```js
var addExpr = function (a, b) { return a + b; };
var addArrow = (a, b) => a + b;

console.log(addExpr(2, 3)); // ❌ TypeError: addExpr is not a function
console.log(addArrow);      // undefined
```
- error **مختلف**: **`is not a function`**.
- ليه؟ الـ var hoisted لـ `undefined` → يعني بنعمل `undefined(2, 3)` → بنحاول **ننادي undefined**.
- جوناس ساب `addExpr` بـ const و`addArrow` بـ var كـ reference — بس الاتنين **مش هيشتغلوا**.
- **الـ function الوحيدة اللي تتنادى قبل تعريفها = function declaration**.

### 3) مثال الـ bug (pitfall)
```js
// Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}
```
- e-commerce: function **خطيرة** بتمسح الـ shopping cart، والمفروض تتنادى لو **مفيش products** (0 = falsy → `!numProducts`).
- `numProducts = 10` … بس طلع **"All products deleted!"** 😱.
- ليه؟ وقت الـ if، `numProducts` = **`undefined`** (hoisting الـ var)، و**undefined falsy** → `!undefined` = true → اتمسح كل حاجة.
- `deleteShoppingCart` declaration → متاحة قبل التعريف فاتنادت عادي.
- في code base كبير من غير best practices → **bug صعب جدًا تلاقيه**.

### الـ Best Practices (مش قواعد اللغة — نصايح)
1. **متستخدمش `var`**. استخدم **`const`** أغلب الوقت، و**`let`** لو فعلًا هتغيّر القيمة بعدين.
2. عشان clean code: **اعلن الـ variables في أول كل scope**.
3. **اعلن كل الـ functions الأول، واستخدمها بعد التعريف** — حتى الـ function declarations اللي hoisted. ينفع تستخدمها قبل، بس **ده مش clean**.

### 4) var و الـ `window` object
```js
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false
```
- **`window`** = الـ **global object** بتاع JS في البراوزر. فيه حاجات كتير زي `alert`.
- في آخره لقينا property **`x: 1`** — بس **مفيش y ولا z**.
- **var بتعمل property على الـ window object**؛ let/const **لأ**.
- ده ممكن يبقى ليه implications في بعض الحالات. (استكشف الـ window لوحدك — مثير للاهتمام.)

## الفرق بين…
| قبل التعريف | النتيجة | الـ error |
|---|---|---|
| `var me` | `undefined` | — |
| `let job` / `const year` | ❌ | `Cannot access … before initialization` |
| `function addDecl` | ✅ 5 | — |
| `const addExpr` / `const addArrow` | ❌ | `Cannot access … before initialization` |
| `var addExpr` ونناديها | ❌ | `addExpr is not a function` |

| | `var` | `let` / `const` |
|---|---|---|
| property على `window` | ✅ | ❌ |

## غلطات لازم أخلي بالي منها
- أتشيك على variable بـ var قبل تعريفه وأفتكره بقيمته → هو undefined (falsy!).
- "is not a function" ≠ "before initialization" — الأول var (undefined)، التاني TDZ.
- أعتمد على hoisting الـ function declarations وأناديها قبل التعريف — شغال بس مش clean.

## ملحوظات لنفسي
- مثال `deleteShoppingCart` ده أحسن سبب أقنع بيه أي حد يبطل var.
- الـ best practices التلاتة: const/let بس — variables في أول الـ scope — functions الأول وبعدين الاستخدام.
- رسالة الـ error بتقولي الـ variable اتعرّف بإيه: "not a function" → غالبًا var.
- كنت فاكر إن var وlet مختلفين في الـ scope بس، طلع كمان window property وhoisting.
