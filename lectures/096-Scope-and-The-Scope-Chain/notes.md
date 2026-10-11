# 096 — Scope and The Scope Chain

## الفكرة
الـ **scoping** بيجاوب على سؤال: **الـ variables عايشة فين؟ وأقدر أوصلها منين؟** في JS عندنا **lexical scoping**، و3 أنواع scope (global / function / block)، و**scope chain** بيخلّي أي scope يشوف متغيرات الـ scopes اللي **برّاه**. وآخر جزء: الفرق بين **الـ scope chain** و**الـ call stack** (مالهمش علاقة ببعض في الترتيب).

## أهم الحاجات

### المصطلحات (جوناس بيفرّق بينهم عن قصد)
- **Scoping** = إزاي الـ variables بتاعة البرنامج **متنظمة وبيتوصلّها** من الـ engine. "Where do variables live?"
- **Lexical scoping** = تنظيم الـ variables والوصول ليها متحكم فيه **بالكامل بمكان كتابة الـ functions والـ blocks في الكود**.
  - مثال: function مكتوبة **جوه** function تانية → توصل لـ variables الـ parent.
- **Scope** = المساحة أو الـ environment اللي **variable معين اتعرّف فيها**. في الـ functions = بالظبط الـ **variable environment** اللي في الـ execution context بتاعها.
- **Scope of a variable** = **المنطقة كلها من الكود** اللي أقدر أوصل فيها للـ variable ده.
- "scope" ≠ "scope of a variable" — فرق دقيق.

### الـ 3 أنواع
(واللي بيتقال على الـ variables بيتقال على الـ functions — هي values في variables.)

#### 1) Global scope
- للـ **top-level code** — variables برّه أي function أو block.
- **متاحة في كل حتة**: كل الـ functions وكل الـ blocks.

#### 2) Function scope (local scope)
- **كل function بتعمل scope**.
- الـ variables جواها متاحة **جواها بس**.
```js
function calcAge(birthYear) {
  const now = 2037;
  const age = now - birthYear;
  return age;
}
console.log(now); // ReferenceError
```
- JS بيدور على `now` في الـ global ومش لاقيه → **ReferenceError**.
- ده سبب error الـ Pig Game: الـ variables اتعرفت جوه `init` فكانت **locally scoped**.
- **مفيش فرق** نوع الـ function: declaration / expression / arrow — **كلهم بيعملوا scope**.

#### 3) Block scope (من ES6)
- زمان **الـ functions بس** اللي بتعمل scopes. من **ES6** الـ **blocks** كمان.
- block = أي حاجة بين `{ }` — زي block الـ `if` أو الـ `for` loop.
- variables جوه الـ block → متاحة جواه بس.
- ⚠️ **block scope بيطبق على `let` و`const` بس** → عشان كده بنقول **let/const = block scoped**.
- لو عرّفت بـ **`var`** جوه block → **متاح برّه الـ block**، scoped للـ function الحالية أو الـ global → **var = function scoped**.
- في ES5 وقبله: global + function scope بس → `var` بتهتم بالـ functions و**بتتجاهل الـ blocks**.
- من ES6 كمان: **الـ functions نفسها block scoped** (في **strict mode** — اللي لازم نستخدمه دايمًا) → function متعرفة جوه block متاحة جواه بس.
- الـ block scope أقرب للغات التانية. الـ function scope بيبقى غريب للمبتدئين — وعشان كده جه الـ block scope في ES6.

### Scope Chain — المثال الأول
```js
const myName = 'Jonas';

function first() {
  const age = 30;

  if (age >= 30) {
    // true
    const decade = 3;
    var millenial = true;
  }

  function second() {
    const job = 'teacher';
    console.log(`${myName} is a ${age}-old ${job}`);
    // Jonas is a 30-old teacher
  }

  second();
}

first();
```
- **Global scope**: `myName` (وتكنيكلي `first` كمان، بس هنا بنبص على المتغيرات بس).
- **first() scope**: `age`.
- **second() scope**: `job`.
- → **nested scopes** واحد جوه التاني.
- `second` محتاجة `myName` و`age` ومش متعرفين فيها. إزاي؟
  - **كل scope بيقدر يوصل لكل الـ variables في كل الـ outer (parent) scopes بتاعته**.
  - `second` → توصل لـ `age` من `first`. و`first` → توصل للـ global. فـ `second` توصل لـ `myName` كمان.
  - ونفس الكلام للـ **function arguments**.
- **Variable lookup**: لو الـ variable مش في الـ scope الحالي → يدور **لفوق** في الـ scope chain لحد ما يلاقيه. لو ملقاهوش → **error**.
- ⚠️ الـ variables **مش بتتنسخ** من scope لتاني — الـ scope بيدور لفوق ويستخدمها.
- ⚠️ **مش بيشتغل بالعكس**: scope **عمره ما** يوصل لـ variables **inner scope**. `first` عمرها ما تشوف `job`. **بيبص لفوق بس، مش لتحت**.
- استخدمنا ده قبل كده في الكود من غير ما نفهمه.

### الـ block scope في المثال
- الـ `if` block scope فيه **`decade` بس** (const).
- **`millenial`** (var) **مش** في الـ block → جزء من **`first` scope**. (block scopes مبتطبقش على var خالص.)
- 📝 جوناس: "لو بتكتب notes — ودي **لازم** تبقى فيها": **let/const = block scoped، var = function scoped**.
- بما إن `millenial` في `first` → `second` تقدر توصله (حتى لو مش محتاجاه).
- الـ block scope كمان ليه scope chain → يوصل لـ `first` والـ global.
- variables الـ global = **global variables** — متاحة من كل حتة لأنها **فوق خالص** في الـ scope chain.
- ⚠️ الـ **block scope** والـ **second scope** **مش شايفين بعض**: الاتنين **children لـ first** — **sibling scopes** — ولا واحد مكتوب جوه التاني → lexical scoping. **الـ scope chain بيشتغل لفوق مش sideways**.

### Scope Chain vs Call Stack — المثال التاني
```js
const a = 'Jonas';
first();

function first() {
  const b = 'Hello!';
  second();

  function second() {
    const c = 'Hi!';
    third();
  }
}

function third() {
  const d = 'Hey!';
  console.log(d + c + b + a);
  // ReferenceError
}
```
- **Call stack**: global → first → second → third (execution context لكل call بالترتيب، وكل واحد فيه الـ variable environment بتاعه). ده لوحده **ملوش علاقة بالـ scopes**.
- **Scope chain** (المرة دي بنحسب الـ functions كمان):
  - **Global scope** = الـ variable environment بتاع الـ global context: `a`, `first`, `third`.
  - **first scope** = بتاعه (`b`, `second`) + كل الـ global (scope chain).
  - **second scope** = بتاعه (`c`) + first + global — لأنها **مكتوبة جوه first**.
  - **third scope** = `d` + **global بس** — لأنها مكتوبة في الـ global.
- الـ scope chain **بياخد الـ variable environments من الـ execution contexts** — بس كده. **ترتيب الـ calls مالوش أي دور**.
- الـ scope chain في أي scope = **مجموع الـ variable environments بتاعة كل الـ parent scopes**.
- ليه `second` قدرت تنادي `third`؟ لأن `third` **global function** فهي في الـ scope chain بتاع second.
- جوه `third`:
  - `d` ✅ local.
  - `c` → variable lookup → **مش موجود** — متعرّف في `second`، و`third` مش مكتوبة جوه `second`. **حتى لو `second` هي اللي نادتها!**
  - `b` → نفس الكلام.
  - → **ReferenceError**.
- ده الدليل إن **ترتيب الـ function calls مش بيأثر على الـ scope chain خالص**.

### الملخص (summary slide)
1. Scoping = الـ variables عايشة فين / أوصلها منين.
2. 3 أنواع: **global**، **function**، **block** (ES6).
3. **let/const block scoped**؛ **var** بيروح لأقرب **function scope**.
4. **Lexical scoping** = القواعد مبنية على **مكان كتابة** الـ functions والـ blocks.
5. كل scope يوصل لكل variables الـ **outer scopes** = **scope chain**.
6. لو مش في الـ scope الحالي → **variable lookup** لفوق.
7. الـ scope chain **one-way street**: مفيش وصول لـ inner scopes.
8. الـ scope chain في scope = مجموع variable environments كل الـ parents.
9. **الـ scope chain ملهوش علاقة بترتيب نداء الـ functions**.

## الفرق بين…
| | `let` / `const` | `var` |
|---|---|---|
| Scope | **block** | **function** |
| جوه `if {}` | مش متاح برّه | متاح برّه (في الـ function) |
| من | ES6 | ES5 وقبل |

| | Call Stack | Scope Chain |
|---|---|---|
| مبني على | **ترتيب الـ calls** | **مكان كتابة الكود** (lexical) |
| بيحتوي | execution contexts | variable environments بتاعة الـ parents |
| third اتنادت من second | third فوق second | third **مش** شايفة second |

## غلطات لازم أخلي بالي منها
- أفتكر إن function اتنادت من function تانية تشوف متغيراتها → لأ، المهم **اتكتبت فين**.
- أفتكر إن `var` جوه `if` محبوس في الـ block.
- أفتكر إن الـ parent يشوف متغيرات الـ child.
- أفتكر إن sibling scopes شايفين بعض.
- أفتكر إن الـ variables بتتنسخ في الـ scope chain.

## ملحوظات لنفسي
- الجملة اللي جوناس قال لازم تبقى في الـ notes: **let/const block scoped — var function scoped**.
- الـ scope chain = لفوق بس ⬆️، مش لتحت ولا للجنب.
- مثال `third` و`c` → ReferenceError ده أحسن مثال يفرّق بين الـ call stack والـ scope chain. هرسمه.
- error الـ Pig Game بتاع `playing is not defined` بقى مفهوم 100%.
- استخدم strict mode دايمًا عشان الـ functions تبقى block scoped.
