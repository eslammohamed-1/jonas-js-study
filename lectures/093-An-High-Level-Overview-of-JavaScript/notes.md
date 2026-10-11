# 093 — An High-Level Overview of JavaScript

## الفكرة
مقدمة السيكشن: نظرة عامة (big picture) على JavaScript من خلال **تعريف طويل جدًا** جوناس كتبه بهزار، ونفكّه كلمة كلمة. الهدف مش التخويف — الـ **big picture قبل الـ deep dive** تقنية تعلم ممتازة.

## أهم الحاجات

### التعريف القديم vs الجديد
- القديم: JavaScript is a **high-level, object-oriented, multi-paradigm** programming language — صح 100% بس "tip of the iceberg".
- الجديد (جملة مش مقروءة عن قصد 😄):
> JavaScript is a **high-level**, **prototype-based object-oriented**, **multi-paradigm**, **interpreted or just-in-time compiled**, **dynamic**, **single-threaded**, **garbage-collected** programming language with **first-class functions** and a **non-blocking event loop concurrency model**.

- فيه **9 topics** هنعدي عليهم (بترتيب مختلف شوية).

### 1) High-level
- أي برنامج محتاج **hardware resources** زي **memory** و**CPU**.
- **Low-level** (زي **C**): بتدير الـ resources بإيدك — مثلًا تطلب memory عشان تعمل variable.
- **High-level** (زي **JavaScript** و**Python**): مش بتدير حاجة، فيه **abstractions** بتعمل الشغل ده.
- ميزة: أسهل في التعلم والاستخدام. عيب: البرامج **عمرها ما هتبقى سريعة/optimized** زي برامج C.

### 2) Garbage-collected
- من الأدوات اللي بتشيل إدارة الـ memory عننا.
- **algorithm جوه الـ JavaScript engine** بيشيل الـ objects **القديمة اللي مش مستخدمة** من الـ memory عشان متتملاش.
- زي "**cleaning guy**" بينضف الـ memory كل شوية بدل ما نعملها في الكود.

### 3) Interpreted or just-in-time compiled
- الـ processor بيفهم **0 و1 بس** = **machine code**.
- مش عملي نكتبه → بنكتب JavaScript (human-readable، abstraction فوق الـ machine code) ولازم **يتترجم** لـ machine code.
- الترجمة دي = **compiling** أو **interpreting** — موجودة في **كل** لغة لأن محدش بيكتب machine code بإيده.
- في JavaScript بتحصل **جوه الـ JavaScript engine** (تفاصيل في السيكشن ده).

### 4) Multi-paradigm
- **paradigm** = approach وطريقة تفكير في **تنظيم الكود** → بتحدد الـ coding style والـ technique في المشروع. (abstract دلوقتي، هيوضح بعدين.)
- 3 paradigms مشهورين:
  - **Procedural** → اللي بنعمله لحد دلوقتي: كود **linear** وشوية functions في النص.
  - **Object-oriented (OOP)**.
  - **Functional (FP)**.
- وكمان بنقسّم الـ paradigms لـ **imperative** و**declarative** (بعدين).
- لغات كتير بتدعم paradigm واحد بس. **JavaScript بتعمل الكل** → مرنة جدًا، والاختيار ليا. والكورس هيوريني الكل.

### 5) Prototype-based object-oriented
- **تقريبًا كل حاجة في JS object**، ما عدا **primitive values** (numbers, strings…). الـ **arrays مثلًا objects**.
- ليه أقدر أعمل array وأستخدم `push` عليها؟ بسبب **prototypal inheritance**:
  - الـ arrays بتتعمل من **blueprint** (template) اسمه **prototype**.
  - الـ prototype فيه **كل الـ array methods**.
  - الـ arrays اللي بعملها بـ**تـ inherit** الـ methods منه → فأقدر أستخدمها.
- ده **تبسيط جامد** — فيه سيكشن OOP كامل بعدين.

### 6) First-class functions
- الـ functions بتتعامل **زي أي variable عادي**:
  - أبعت function **لـ function تانية**.
  - أرجّع function **من function**.
- قوي جدًا، وبيسمح بـ **functional programming**.
- استخدمناها من غير ما نعرف اسمها:
```js
overlay.addEventListener('click', closeModal);
```
بعتنا `closeModal` لـ `addEventListener` كأنها variable.
- مش كل اللغات فيها first-class functions.

### 7) Dynamic (= dynamically-typed)
- **مش بنحدد data types للمتغيرات** — النوع بيتعرف **لما الـ engine ينفذ الكود**.
- نوع المتغير **ممكن يتغير** لما أعمل reassign.
- أغلب اللغات التانية لازم تحدد النوع بإيدك → بيمنع bugs، وعشان كده فيه ناس عاوزة JS تبقى **strongly-typed**. فيه جدل.
- لو عاوز JS بـ types → **TypeScript**.

### 8) Single-threaded
- **concurrency model** = إزاي الـ engine بيتعامل مع **كذا task بتحصل في نفس الوقت**.
- محتاجينه لأن JS بتشتغل في **thread واحد** → **تعمل حاجة واحدة بس في المرة**.
- **thread** = set of instructions بتتنفذ في الـ **CPU** — المكان اللي الكود بيتنفذ فيه فعلًا.

### 9) Non-blocking event loop
- طب لو فيه task طويلة زي **fetching data من remote server**؟ هتـ**block** الـ thread الوحيد؟ مش عاوزين ده.
- عاوزين **non-blocking behavior** → بالـ **event loop**:
  - بياخد الـ long-running tasks، **ينفذها في الـ background**، ويرجّعها للـ **main thread** لما تخلص.
- ده أعقد topic في الكورس كله تقريبًا — عشان كده في آخر الكورس. وده كمان تبسيط.

## الفرق بين…
| | Low-level (C) | High-level (JS, Python) |
|---|---|---|
| إدارة الـ memory/CPU | يدوي | abstractions + garbage collection |
| السهولة | أصعب | أسهل |
| السرعة | أسرع | أبطأ / أقل optimized |

| | Dynamically-typed (JS) | Statically-typed (أغلب اللغات / TypeScript) |
|---|---|---|
| النوع | يتعرف وقت التنفيذ ويتغير | بتحدده بإيدك |
| bugs | أكتر احتمال | أقل |

## غلطات لازم أخلي بالي منها
- أفتكر إن "high-level" يعني أحسن في كل حاجة — هو أسهل بس أبطأ.
- أفتكر إن arrays حاجة غير objects — هي objects.
- أفتكر إن single-threaded يعني JS مش هتقدر تعمل حاجات طويلة من غير ما تقف → الـ event loop بيحل ده.

## ملحوظات لنفسي
- أحفظ الـ 9 كلمات: high-level, garbage-collected, interpreted/JIT, multi-paradigm, prototype-based OOP, first-class functions, dynamic, single-threaded, non-blocking event loop.
- `addEventListener('click', closeModal)` = first-class functions — أخيرًا ليها اسم.
- `push` شغالة بسبب الـ prototype — هستنى سيكشن OOP.
- أبص على TypeScript بعد ما أخلص الكورس (مهم في الشغل).
