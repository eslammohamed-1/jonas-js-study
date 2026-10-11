# 097 — Scoping in Practice

## الفكرة
تطبيق عملي للـ scoping على مثال "semi complex": functions جوه functions، وblock جوه function، ونشوف الـ **variable lookup** في الـ scope chain، والفرق بين **let/const** و**var** في الـ blocks، وإن الـ **functions block scoped** في strict mode، والفرق بين **إنشاء variable جديد بنفس الاسم** و**reassign** لـ variable من scope برّه.

## أهم الحاجات

### الخطوة 1: function في الـ global + global variable
```js
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); // Jonas
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
```
- `calcAge` (function declaration للتنويع) متعرّفة في الـ **global scope**، وبتعمل scope خاص بيها = الـ variable environment بتاع الـ execution context بتاعها.
- `firstName` **مش** في scope الـ calcAge → **variable lookup** في الـ scope chain → الـ parent = global → لقاه ✅.
- لو كتبت `lastName` (مش موجود في أي حتة) → **`lastName is not defined`**.
- جرب `name` الأول → **مطلعش error** لأن `name` اسم variable **خاص** مينفعش نستخدمه (اتقال في أول الكورس).
- ⚠️ `firstName` متعرّف **بعد** الـ function — ومفيش مشكلة! لأن كود الـ function مبيتنفذش غير لما تتنادى، والنداء جه **بعد** `firstName` ما اتعرّف واتحط في الـ global variable environment.

### الخطوة 2: function جوه function
```js
function printAge() {
  const output = `${firstName}, you are ${age}, born in ${birthYear}`;
  console.log(output);
}
printAge();
```
- `age` مش في scope الـ printAge → lookup → لقاه في **calcAge** (الـ parent).
- `birthYear` → نفس الكلام — الـ **parameters بتتعامل زي الـ variables العادية** في الـ scoping.
- **scope of a variable**: `age` متاح في calcAge **وكل الـ child scopes** جواها، بس **مش برّاها**.
```js
// console.log(age);  // ❌ برّه calcAge — ReferenceError
// printAge();        // ❌ printAge is not defined
```
- الـ scope chain **one-way street** — الـ global مش شايف حاجة جوه calcAge، ولا حتى الـ functions.
- `firstName` في printAge → **lookup أطول**: printAge ❌ → calcAge ❌ → global ✅.

### الخطوة 3: block scope (millennial)
- millennial = مولود بين **1981 و1996**.
```js
if (birthYear >= 1981 && birthYear <= 1996) {
  const str = `Oh, and you're a millenial, ${firstName}`;
  console.log(str);
}
// console.log(str); // ❌ str is not defined
```
- الـ block = scope جديد → الـ lookup بتاع `firstName` بقى خطوة كمان، وبرضه لقاه.
- `str` (const) **block scoped** → برّه الـ block = error.

### `var` بتتجاهل الـ block
```js
if (birthYear >= 1981 && birthYear <= 1996) {
  var millenial = true;
}
console.log(millenial); // true ✅
```
- **var = function scoped** → الـ scope بتاعها **printAge كلها**، مش الـ block.
- **متستخدمش var** في كودك — دايمًا const/let. بس لازم تفهمها لأنك هتشوفها في **كود قديم أو code bases تانية**.

### الـ functions block scoped (strict mode بس)
```js
if (birthYear >= 1981 && birthYear <= 1996) {
  function add(a, b) {
    return a + b;
  }
}
// console.log(add(2, 3)); // ❌ add is not defined
```
- الـ scope بتاع `add` = الـ block بس.
- لو **شلت `'use strict'`** → اشتغلت وطلعت **5**. بس **لازم نستخدم strict mode دايمًا** → رجّعه.

### تجربة 1: variable **جديد** بنفس اسم واحد في parent scope
```js
if (birthYear >= 1981 && birthYear <= 1996) {
  // Creating NEW variable with same name as outer scope's variable
  const firstName = 'Steven';
  const str = `Oh, and you're a millenial, ${firstName}`; // Steven
}
```
- طلع **Steven** مش Jonas — JS بيدور في الـ **current scope الأول**، ولقاه → **مفيش lookup** خالص.
- بس في printAge (برّه الـ block) → `firstName` لسه **Jonas** (مش في الـ scope ده، فـ lookup لحد الـ global).
- عندي **2 variables** اسمهم `firstName` — **مختلفين تمامًا**، بس صدفة نفس الاسم، ومفيش مشكلة لأنهم في scopes مختلفة.
- عشان كده ينفع **functions كتير بنفس أسماء الـ parameters** — كل parameter متعرّف في scope الـ function بتاعته.

### تجربة 2: **reassign** لـ variable من parent scope
```js
let output = `${firstName}, you are ${age}, born in ${birthYear}`; // بقت let
...
if (...) {
  // Reassigning outer scope's variable
  output = 'NEW OUTPUT!';
}
console.log(output); // NEW OUTPUT!
```
- **معملناش variable جديد** — غيّرنا قيمة الـ variable بتاع الـ parent (printAge) **من جوه child scope** → اتغير فعلًا.
- لو كتبت `const output = 'NEW OUTPUT!'` جوه الـ block → **variable جديد** → الـ output بتاع printAge **مش هيتأثر** ويرجع للأصلي.

### الكود الكامل
```js
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();
```
- الكود الحقيقي **مش المفروض يبقى معقد كده** — ده بس عشان نفهم الـ scoping.

## الفرق بين…
| | `const firstName = 'Steven'` جوه block | `output = 'NEW OUTPUT!'` جوه block |
|---|---|---|
| بيعمل إيه | variable **جديد** في الـ block | **reassign** للـ variable بتاع الـ parent |
| الـ parent بيتأثر؟ | ❌ | ✅ |

| جوه `if` block | برّه الـ block في نفس الـ function |
|---|---|
| `const str` | ❌ not defined |
| `var millenial` | ✅ true |
| `function add` (strict) | ❌ not defined |
| `function add` (من غير strict) | ✅ 5 |

## غلطات لازم أخلي بالي منها
- أستخدم variable اسمه `name` → مش هيدي error ويلخبطني.
- أفتكر إن تعريف `firstName` بعد الـ function هيعمل مشكلة → لأ، المهم وقت **النداء**.
- `const output` جوه الـ block وأنا قصدي أغيّر اللي برّه.
- أنسى إن `output` لازم تبقى `let` عشان أعمل reassign.

## ملحوظات لنفسي
- JS بيدور في الـ **current scope الأول** — لو لقى خلاص، مش بيكمل لفوق (shadowing).
- كنت فاكر إن الـ variables بنفس الاسم هتعمل مشكلة، طلع عادي لو scopes مختلفة.
- `name` متستخدمش كاسم variable.
- أكتب نفس الكود ده بإيدي وأشيل الـ comments واحدة واحدة وأتوقع النتيجة قبل ما أشغّل.
