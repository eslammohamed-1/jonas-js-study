# 102 — Regular Functions vs. Arrow Functions

## الفكرة
مطبات `this` مع الـ regular functions والـ arrow functions — عشان أعرف **إمتى أستخدم كل نوع وإمتى أتجنبه**: arrow كـ method (غلط)، function جوه method (مشكلة + حلين)، وفي الآخر الـ **`arguments` keyword**.

## أهم الحاجات

### مطب 1: Arrow function كـ method
```js
// var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(2037 - this.year);
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet(); // Hey undefined
```
- طلع **`Hey undefined`** مش `Hey Jonas`.
- السبب: الـ arrow **ملهاش `this`** → بتاخد `this` بتاع الـ **parent scope** = **الـ global scope** → `window`.
- ⚠️ الـ `{}` بتاعة الـ object **مش code block** ومبتعملش scope — دي **object literal** (طريقة لتعريف objects). يعني `greet` لسه **في الـ global scope**.
- حاجة جديدة: لو حاولت أوصل لـ **property مش موجودة** في object → **مفيش error**، بييجي **`undefined`** بس. `window.firstName` مش موجود → undefined.

#### وأخطر لو فيه `var`
```js
var firstName = 'Matilda';
jonas.greet(); // Hey Matilda 😱
```
- var بتعمل **property على `window`** → `this.firstName` = `window.firstName` = `'Matilda'`.
- مع إن `jonas` هو اللي نادى `greet` — القاعدة دي **مبتطبقش على الـ arrow**.
- سبب كمان في **القايمة الطويلة ضد var**.

#### الـ Best Practice
- **متستخدمش arrow function كـ method أبدًا** — وجوناس شايف ده حتى لو مش هتستخدم `this` في الـ method دي.
- كده **مش هتفكر** كل مرة أستخدم أنهي نوع → دايمًا **function expression عادية**.
- "Hey Matilda" ممكن أتجنبه بإني مستخدمش var، بس "**Hey undefined**" لسه **bug** — والحل regular function:
```js
greet: function () {
  console.log(this);                  // jonas
  console.log(`Hey ${this.firstName}`); // Hey Jonas
},
```
- (جوناس رجّعها arrow تاني بعد ما ورّاها.)

### مطب 2: Function جوه method
```js
calcAge: function () {
  console.log(2037 - this.year);

  const isMillenial = function () {
    console.log(this); // undefined
    console.log(this.year >= 1981 && this.year <= 1996);
  };
  isMillenial();
},
...
jonas.calcAge(); // ❌ Cannot read property 'year' of undefined
```
- `calcAge` regular method → `this` = jonas ✅.
- بس `isMillenial()` = **regular function call** — حتى لو جوه method → `this` = **undefined**.
- كأن الـ function برّه الـ method خالص — نفس النتيجة.
- ناس بتقول ده bug في JS، جوناس شايف لأ: **قاعدة واضحة** إن regular function call → `this` = undefined.

#### Solution 1 — `self` (قبل ES6)
```js
// Solution 1
const self = this; // self or that
const isMillenial = function () {
  console.log(self);
  console.log(self.year >= 1981 && self.year <= 1996);
};
```
- برّه `isMillenial` لسه عندنا `this` = jonas → نحفظه في variable اسمه **`self`** (أو **`that`**).
- جوه الـ function، `self` مش في الـ scope → JS تطلع في الـ **scope chain** لـ `calcAge` → تلاقيه = `this` → **true** ✅.
- حل **pre-ES6** — ممكن تلاقيه في code bases قديمة.

#### Solution 2 — Arrow function (ES6، الأحدث والأحسن)
```js
// Solution 2
const isMillenial = () => {
  console.log(this);
  console.log(this.year >= 1981 && this.year <= 1996);
};
isMillenial();
```
- الـ arrow **ملهاش `this`** → بتاخد `this` بتاع الـ parent = `calcAge` = **jonas** → **true** ✅.
- يعني الـ arrow **بتورث** `this` من الـ parent scope — وده بالظبط اللي محتاجينه هنا.
- **use case مفيد جدًا** للـ arrow function — افتكره.

### الـ `arguments` keyword
- من محاضرة الـ execution context: الـ functions بتاخد **`arguments`** كمان (مش بس `this`) — و**زي `this` متاحة في الـ regular functions بس**.
```js
// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);        // [2, 5]
addExpr(2, 5, 8, 12); // [2, 5, 8, 12]

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8); // ❌ ReferenceError: arguments is not defined
```
- `arguments` = **زي array** فيه كل الـ arguments اللي اتبعتت.
- **مسموح تبعت arguments أكتر من الـ parameters** — مش هيبقى ليهم اسم بس موجودين في `arguments` → ممكن مثلًا loop عليهم وأجمعهم.
- (الـ arrow هنا بـ `{}` وأكتر من سطر → لازم **explicit return**.)
- موجودة في function expressions و declarations، **مش في الـ arrow**.
- مش مهمة أوي في JS الحديثة — فيه طريقة أحدث للـ multiple parameters — بس لازم أعرف إنها موجودة.

## الفرق بين…
| | Regular function | Arrow function |
|---|---|---|
| `this` خاص بيها | ✅ | ❌ (lexical — من الـ parent) |
| `arguments` | ✅ | ❌ `arguments is not defined` |
| كـ method | ✅ استخدمها | ❌ متستخدمهاش أبدًا |
| جوه method ومحتاج `this` بتاع الـ method | ❌ undefined (إلا لو `self`) | ✅ |

| | Solution 1 | Solution 2 |
|---|---|---|
| الطريقة | `const self = this` | arrow function |
| العصر | pre-ES6 | ES6+ (أحسن) |

## غلطات لازم أخلي بالي منها
- أفتكر إن `{}` بتاعة الـ object literal بتعمل scope — **لأ**.
- arrow كـ method → `this` = window → `Hey undefined` (أو `Hey Matilda` مع var).
- أفتكر إن function جوه method بتورث `this` — regular function لأ، arrow آه.
- property مش موجودة مبتديش error → undefined ساكت (bug مستخبي).
- أستخدم `arguments` جوه arrow.

## ملحوظات لنفسي
- القاعدة: **methods → function expression دايمًا**، **functions جوه methods → arrow**.
- `self`/`that` لو شفتها في كود قديم → عارف ليه موجودة.
- كنت فاكر إن arrow مجرد syntax أقصر، طلع ليها سلوك مختلف تمامًا في `this` و`arguments`.
