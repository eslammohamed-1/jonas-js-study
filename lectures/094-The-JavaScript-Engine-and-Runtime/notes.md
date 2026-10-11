# 094 — The JavaScript Engine and Runtime

## الفكرة
إيه هو الـ **JavaScript engine** ومكوناته (**call stack** و**heap**)، والفرق بين **compilation** و**interpretation**، وإزاي JS بتستخدم **just-in-time compilation** (parsing → AST → compilation → execution → optimization). وفي الآخر الـ **JavaScript runtime** في البراوزر (engine + web APIs + callback queue + event loop) وفي Node.js.

## أهم الحاجات

### الـ JavaScript Engine
- **برنامج بينفذ كود JavaScript** — ده كل اللي بيعمله (بخطوات كتير).
- كل browser ليه engine. الأشهر: **V8** بتاع Google → شغال في **Chrome** وفي **Node.js** (الـ runtime اللي بنبني بيه server-side apps برّه البراوزر).
- أي engine فيه دايمًا:
  - **Call Stack** → المكان اللي الكود **بيتنفذ** فيه، باستخدام **execution contexts**.
  - **Heap** → **unstructured memory pool** بيخزّن **كل الـ objects** اللي الـ app محتاجها.
- كده عرفنا الكود **بيتنفذ فين**. فاضل: بيتحول لـ machine code إزاي؟

### Compilation vs Interpretation (computer science side note)
- الـ processor بيفهم 0 و1 بس → أي برنامج لازم يتحول لـ **machine code**.

**Compilation**:
- **الكود كله** يتحول لـ machine code **مرة واحدة**.
- يتكتب في **portable file** يشتغل على أي كمبيوتر.
- خطوتين: build للـ machine code → execution في الـ CPU. والتنفيذ ممكن يحصل **بعد وقت طويل** (زي أي app عندك على الجهاز اتعمله compile من زمان).

**Interpretation**:
- **interpreter** بيمشي على الكود و**ينفذه سطر سطر**.
- مفيش الخطوتين — القراءة والتنفيذ مع بعض. التحويل لـ machine code بيحصل **قبل التنفيذ على طول** مش ahead of time.

- JS كانت **interpreted بس**، والمشكلة إن الـ interpreted **أبطأ بكتير**. زمان كان مقبول، بس مع الـ web apps الحديثة **مش مقبول** (تخيل Google Maps كل ما تسحب الخريطة تستنى ثانية).
- ناس كتير لسه فاكرة إن JS interpreted — **مش صح دلوقتي**.

**Just-in-time (JIT) compilation**:
- خليط بين الاتنين: يعمل compile **للكود كله مرة واحدة** لـ machine code و**ينفذه على طول**.
- نفس خطوتين الـ compilation، بس **مفيش portable file**، والتنفيذ **فورًا** بعد الـ compile.
- أسرع بكتير من سطر سطر.

### JIT في JavaScript خطوة خطوة
1. **Parsing** = قراءة الكود:
   - الكود بيتحول لـ data structure اسمها **AST (Abstract Syntax Tree)**.
   - كل سطر بيتقسم لقطع ليها معنى للغة (زي `const` و`function` keywords) وتتحفظ في الشجرة بشكل منظم.
   - **بيتشيك على الـ syntax errors** هنا.
   - الشجرة دي هتستخدم بعدين لعمل الـ machine code.
   - مثال: `const x = 23;` → الـ AST فيه variable declaration نوعها const واسمها x وقيمتها 23 + حاجات تانية كتير. (مش لازم أعرف شكل الـ AST — للفضول.)
   - ⚠️ الـ AST **ملهوش أي علاقة بالـ DOM tree** — ده representation للكود جوه الـ engine.
2. **Compilation** → ياخد الـ AST ويحوله لـ **machine code**.
3. **Execution** → فورًا (JIT)، في الـ **call stack** (المحاضرة الجاية).
4. **Optimization**:
   - في الأول بيعمل نسخة machine code **unoptimized جدًا** عشان يبدأ ينفذ بأسرع وقت.
   - في الـ background الكود **بيتعمله optimize وrecompile** والبرنامج شغال.
   - بيحصل كذا مرة، وكل مرة الكود القديم **يتبدل** بالأحسن **من غير ما التنفيذ يقف**.
   - ده اللي بيخلي engines زي V8 سريعة.
- الـ parsing والـ compilation والـ optimization بيحصلوا في **threads خاصة جوه الـ engine** مش متاحة من الكود — منفصلة عن الـ **main thread** اللي بيشغّل الـ call stack وبينفذ كودنا.
- كل engine بيعملها بشكل مختلف شوية، بس ده الشكل العام.
- "المرة الجاية حد يقولك JS interpreted، ورّيله السلايد دي" 😄.

### الـ JavaScript Runtime (في البراوزر)
- **runtime** = **صندوق كبير / container** فيه كل اللي محتاجه عشان أستخدم JS (هنا في البراوزر).
- **قلب أي runtime = JS engine** → من غير engine مفيش runtime ولا JS أصلًا.
- بس الـ engine لوحده مش كفاية. محتاج:

**Web APIs**:
- كل حاجة ليها علاقة بالـ **DOM**، و**timers**، وحتى **`console.log`**!
- functionalities متاحة للـ engine بس **مش جزء من لغة JS نفسها**.
- JS بتوصلها عن طريق الـ global **`window` object**.
- منطقي تبقى جزء من الـ runtime لأنه صندوق فيه كل حاجة متعلقة بـ JS.

**Callback Queue**:
- data structure فيها **كل الـ callback functions الجاهزة تتنفذ**.
- مثال: event handler على زرار = **callback function**.
- لما الـ event يحصل (click):
  1. الـ callback **يتحط في الـ callback queue**.
  2. لما الـ **call stack يفضى** → يتنقل للـ stack ويتنفذ.

**Event Loop**:
- **ياخد الـ callbacks من الـ callback queue ويحطها في الـ call stack** عشان تتنفذ.
- هو ده اللي بيعمل الـ **non-blocking concurrency model** (تفاصيل في محاضرة خاصة بعدين — أساسية لأي developer).

### Node.js runtime
- JS ممكن تشتغل **برّه البراوزر**، زي Node.js.
- شبه بتاع البراوزر، بس **مفيش web APIs** (البراوزر هو اللي بيوفرها).
- بدالها: **C++ bindings** و**thread pool**. التفاصيل مش مهمة — المهم إن فيه runtimes مختلفة.

## الفرق بين…
| | Compilation | Interpretation | JIT (JS الحديثة) |
|---|---|---|---|
| إمتى يتحول | الكل مرة واحدة ahead of time | سطر سطر وقت التنفيذ | الكل مرة واحدة وينفذ فورًا |
| portable file | ✅ | ❌ | ❌ |
| السرعة | سريع | بطيء | سريع + optimization |

| | Engine | Runtime |
|---|---|---|
| إيه هو | البرنامج اللي بينفذ JS | الصندوق كله |
| فيه | call stack + heap | engine + web APIs + callback queue + event loop |

| | Call Stack | Heap |
|---|---|---|
| بيعمل | تنفيذ الكود (execution contexts) | تخزين الـ objects |

## غلطات لازم أخلي بالي منها
- "JS interpreted language" → مش دقيق، هي **JIT compiled**.
- الـ AST ≠ الـ DOM tree.
- `console.log` والـ DOM والـ timers مش جزء من JS — Web APIs.
- Node.js مفيهوش DOM.

## ملحوظات لنفسي
- أرسم الـ runtime بإيدي: Engine (Heap + Call Stack) | Web APIs | Callback Queue ← Event Loop.
- الـ callback = الـ handler اللي بعتناه لـ addEventListener — ده اللي بيروح الـ queue.
- كنت فاكر إن `console.log` من JS نفسها، طلعت Web API.
- V8 = Chrome + Node.
