# 098 — Variable Environment: Hoisting and The TDZ

## الفكرة
نبص على الـ **variable environment** وإزاي الـ variables بتتعمل: **hoisting** = بعض أنواع الـ variables ينفع تستخدمها **قبل** ما تتعرف في الكود. بيختلف حسب النوع (function declaration / var / let-const / function expressions و arrows). وكمان **Temporal Dead Zone (TDZ)** وليه موجودة، وليه الـ hoisting موجود أصلًا.

## أهم الحاجات

### Hoisting = إيه؟
- execution context = variable environment + scope chain + this. خلصنا الـ scope chain، دلوقتي الـ variable environment.
- **Hoisting** = بيخلّي بعض أنواع الـ variables **accessible/usable قبل ما تتعرف** في الكود.
- الناس بتقول إن الـ variables "**بتترفع لفوق** الـ scope بتاعها" (مثلًا لأول الـ function) — ده **شكله من برّه** بس، **مش اللي بيحصل فعلًا**.
- اللي بيحصل فعلًا:
  - **قبل التنفيذ**، الكود **بيتعمله scan** يدوّر على الـ variable declarations — في الـ **creation phase** بتاعة الـ execution context.
  - لكل variable يلاقيه → **property جديدة تتعمل في الـ variable environment object**.

### الجدول (hoisted؟ / القيمة المبدئية / الـ scope)
| | Hoisted? | Initial value | Scope |
|---|---|---|---|
| **function declarations** | ✅ YES | **الـ function نفسها** | block (strict mode) |
| **`var` variables** | ✅ YES | **`undefined`** | function |
| **`let` / `const`** | ❌ NO (تكنيكلي آه) | **`<uninitialized>`**, **TDZ** | block |
| **function expressions & arrows** | حسب اتعملت بـ var ولا let/const | | |

#### Function declarations
- hoisted والقيمة المبدئية = **الـ function الفعلية**.
- يعني أقدر **أنادي function declaration قبل ما أكتبها** — قولنا كده قبل كده، دلوقتي عرفنا **ليه**: لأنها متخزنة في الـ variable environment قبل ما الكود يبدأ.
- block scoped — **في strict mode بس**. في **sloppy mode** (متستخدموش) → function scoped.

#### `var`
- hoisted بس بشكل مختلف: لو وصلتلها قبل التعريف → **`undefined`** مش القيمة.
- غريب جدًا للمبتدئين: كنت أتوقع error أو القيمة الحقيقية، مش undefined اللي ملهاش أي فايدة.
- **مصدر bugs شائع** → من أهم أسباب إننا **تقريبًا مبنستخدمش var** في JS الحديثة.

#### `let` و `const`
- **مش hoisted** عمليًا. (تكنيكلي hoisted بس قيمتها **uninitialized** — مفيش قيمة خالص — فكأن الـ hoisting محصلش.)
- بنقول إنها في **Temporal Dead Zone (TDZ)** → **مينفعش أوصلها من أول الـ scope لحد سطر التعريف**.
- لو استخدمتها قبل التعريف → **error**.
- و**block scoped**.
- كل ده مع بعض = **ليه let/const اتعملوا** وليه بنستخدمهم بدل var.

#### Function expressions و arrow functions
- **هما variables** → بيتصرفوا زي الـ variable اللي اتعملوا بيه:
  - بـ `var` → hoisted لـ **undefined**.
  - بـ `let`/`const` → **TDZ** — مينفعش تتستخدم قبل التعريف.
- ده سبب إن function expressions **مينفعش تتنادى قبل ما تتكتب** عكس الـ declarations.

### الـ TDZ بالتفصيل
```js
const myName = 'Jonas';

if (myName === 'Jonas') {
  console.log(`Jonas is a ${job}`); // ❌ ReferenceError: Cannot access 'job' before initialization
  const age = 2037 - 1989;
  console.log(age);
  const job = 'teacher';
  console.log(x); // ❌ ReferenceError: x is not defined
}
```
- `job` = const → scoped للـ if block، **متاحة من سطر تعريفها بس**.
- الـ **TDZ** بتاعة `job` = المنطقة من أول الـ scope لحد سطر التعريف — الـ variable **موجود في الـ scope بس مينفعش يتستخدم بأي شكل** (كأنه مش موجود).
- استخدامه جوه الـ TDZ → **`Cannot access 'job' before initialization`**.
- استخدام variable **عمره ما اتعمل** (`x`) → error **مختلف**: **`x is not defined`**.
- الفرق ده معناه: `job` في الـ TDZ و**uninitialized**، بس الـ engine **عارف إنه هيتعمل initialize** لأنه قرا الكود قبل كده وحطه في الـ variable environment كـ uninitialized. لما التنفيذ يوصل لسطر التعريف → **يطلع من الـ TDZ** ويبقى safe.
- **كل let/const ليه TDZ** من أول الـ scope لحد سطر تعريفه.

### ليه الـ TDZ موجودة؟ (اتعملت في ES6)
1. **أسهل نتجنب ونمسك الـ errors**: variable بـ `undefined` قبل التعريف ممكن يعمل **bugs خطيرة وصعبة** (مثال في المحاضرة الجاية). استخدام variable قبل تعريفه **bad practice** → وأحسن طريقة أتجنبه إني **آخد error**.
2. سبب أصغر: عشان **const** تشتغل صح — مينفعش يبقى undefined وبعدين تتعمله assign (ده يبقى reassign). const **بتتعمل assign بس لما التنفيذ يوصل للتعريف** → مستحيل تتستخدم قبلها.

### طب ليه الـ hoisting موجود أصلًا؟
- مخترع JS عمله عشان **نستخدم function declarations قبل ما نعرّفها** → ضروري لتقنيات زي **mutual recursion**، وناس بتشوفه بيخلي الكود readable أكتر.
- hoisting الـ **var** = **byproduct** (منتج جانبي) — دي كانت الطريقة الوحيدة وقتها، وكانت فكرة إنهم يبقوا undefined شكلها كويسة… بس في الآخر مش أوي.
- JS **مكانتش متخيلة** تبقى اللغة الضخمة دي.
- **مينفعش نشيل** الـ feature دي من اللغة دلوقتي → فبنستخدم **let وconst** كـ workaround.

## الفرق بين…
| Error | سببه |
|---|---|
| `Cannot access 'job' before initialization` | variable موجود بس في الـ **TDZ** |
| `x is not defined` | variable **مش موجود خالص** |

| قبل التعريف | النتيجة |
|---|---|
| function declaration | شغالة ✅ |
| `var` | `undefined` |
| `let`/`const` | ReferenceError (TDZ) |
| `const f = function…` / arrow | ReferenceError (TDZ) |
| `var f = () => …` | `undefined` (ولو ناديتها → error) |

## غلطات لازم أخلي بالي منها
- أعرّف hoisting إنه "بيرفع الكود لفوق" — ده الشكل بس، الحقيقة scan في الـ creation phase.
- أفتكر إن let/const مش hoisted خالص — تكنيكلي hoisted بس uninitialized.
- أنادي function expression قبل تعريفها.
- أتوقع إن `var` قبل التعريف هيدي error → بيدي undefined بهدوء (أخطر).

## ملحوظات لنفسي
- الجدول ده أحفظه: declarations → الـ function / var → undefined / let-const → TDZ / expressions-arrows → زي الـ variable.
- رسالتين الـ error مختلفين → أعرف منهم الـ variable في TDZ ولا مش موجود.
- TDZ = حماية، مش عقوبة 😄.
- hoisting اتعمل عشان الـ functions، والـ var جه "بالمرة".
