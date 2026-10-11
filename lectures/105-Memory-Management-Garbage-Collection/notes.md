# 105 — Memory Management: Garbage Collection

## الفكرة
الجزء التاني من memory management: **إزاي الـ memory بتتفضّى** (الخطوة 3 في الـ lifecycle). في الـ **call stack** بسيطة جدًا، وفي الـ **heap** فيه **garbage collection** بخوارزمية **mark-and-sweep**. وفي الآخر **memory leaks** وإزاي أتجنبها، و4 مواضيع behind the scenes مأجّلة لبعدين.

## أهم الحاجات

### تذكير بالـ lifecycle
1. allocate (اتشرحت) → 2. use (واضحة) → 3. **release** ← المحاضرة دي: الـ memory بتتفضّى إزاي لما القيمة متبقاش محتاجاها؟
- القيم في الـ stack والـ heap → لازم نحلّل الاتنين.

### الـ Call Stack — بسيطة
- الـ variable environments (اللي فيها الـ primitives) **بتتمسح ببساطة لما الـ EC يطلع من الـ stack**.
- مثال: global EC فيه `x` (primitive)، وEC بتاع `calcAge` فيه `y` و`z`. لما EC الـ `calcAge` يطلع → الـ variable environment بتاعه **يتشال من الـ memory معاه** → المكان يتفضّى.
- `x` في الـ **global EC** → الـ global EC **عمره ما بيختفي** → **global variables عمرها ما بتتمسح** (مش مشكلة كبيرة، بس حلو تعرفها).

### الـ Heap — Garbage Collection
- عشان تمسح الـ objects القديمة اللي مش مستخدمة → الـ engines بتستخدم **garbage collection** = **الأداة الأساسية** للـ memory management في أي JS engine.
- **الـ engine** بيشغّلها **أوتوماتيك وقت ما يشوف** — **إحنا مبنتحكمش** إمتى (وده كويس، بيسهّل حياتنا).
- تشبيه: **خدمة تنضيف أوتوماتيك** بتيجي البيت كل شوية تشوف الحاجات القديمة اللي محدش بيستخدمها وترميها.
- فيه طرق كتير، بس **كل الـ engines الحديثة** بتستخدم **mark-and-sweep**.

### Mark-and-Sweep
الرسمة: في الـ stack variables زي `hobbies` (أحمر) و`tasks` (أخضر) شايلين **references** لـ objects في الـ heap. الأحمر بيشاور على object تاني (رمادي)، والأخضر على object تاني (أزرق). (وفي الـ heap مش بس objects — كمان arrays, functions, sets, maps…)

#### Phase 1 — Mark
- كل الـ objects اللي **ممكن نوصلها (reachable) من root** → تتعلّم **alive**.
- **Roots** = نقط البداية اللي الخوارزمية بتدوّر منها:
  - **الـ global EC** (موجود دايمًا).
  - أي **EC لـ function شغالة**.
  - **event listeners**.
  - **active timers**.
  - **closures** (بعدين).
- في المثال:
  - الأحمر والأخضر alive (موصولين من root).
  - الرمادي والأزرق alive (موصولين من objects reachable).
  - البنفسجي alive (من **active timer**)، والأصفر alive (من **closure**).
  - **البينك** مفيش حاجة بتشاور عليه → **مش marked** → "dead".

#### Phase 2 — Sweep
- كل الـ objects **اللي متعلمتش** (unreachable) **بتتمسح**، والـ memory بتاعتها **تتسترد (reclaimed)** للـ allocations الجاية.
- في المثال: **البينك** اتمسح.

#### لما `getTasks` تخلص
- الـ EC بتاعها يطلع → مفيش حد بيشاور على **الأخضر** → والأزرق كمان مبقاش reachable → في الـ GC الجاي (mark → sweep) **الاتنين يتمسحوا**.
- ⚠️ **مفيش طريقة نتحكم أو نشغّل الـ GC يدويًا**، ومنعرفش **إمتى وكام مرة** بيشتغل. بيعتمد على: الـ app بياكل memory قد إيه، الـ memory المتاحة، أنهي JS engine في البراوزر، إلخ.

#### الأحمر (`hobbies` في الـ global)؟
- **عمره ما هيتمسح** — الـ global EC عمره ما بيختفي → الـ root ده موجود دايمًا → الأحمر دايمًا reachable.
- يعني **أي object global عمره ما بيتعمله garbage collect** — حتى لو مبقتش محتاجه.

### Memory Leaks
- **memory leak** = object **مش محتاجه** بس لسه **reachable غلط** من root → يتعلّم alive **وميتمسحش**.
- تشبيه: إنك **تنسى ترمي حاجات** مش محتاجها → تزحم البيت.
- مصادر رئيسية للـ references الغلط: **event listeners وtimers قديمة ومش لازمة**.
  - timer بيعمل object → الـ object ده هيفضل reachable **إلا لو الـ developer مسح الـ timer**. لو الـ timer فضل شغال → بيشاور على الـ object للأبد → leak.
  - نفس الكلام لـ event listener مبقاش محتاجه.
- **إزاي أتجنب**:
  1. **وقّف الـ timers والـ event listeners** لما متبقاش محتاجها — خصوصًا لو بتشاور على **objects كبيرة**.
  2. **متعملش objects كبيرة global** — مش هتتمسح أبدًا → leak.
- الموضوع كبير، بس كفاية كده دلوقتي.

### الحقيقة أعقد بكتير
- فيه **heaps متعددة**، الـ objects بتتنقل من heap لـ heap **حسب عمرها**، والـ GC ليه **algorithms مختلفة** لكل heap زي **generational garbage collection**… بس الـ overview ده أكتر من كفاية دلوقتي.

### 4 مواضيع behind the scenes مأجّلة
1. **Closures** → سكشن **A Closer Look at Functions**.
2. **Prototypal inheritance** → سكشن **Object Oriented Programming** (ملوش لازمة نتعلمه دلوقتي وننساه).
3. **Event loop** بالتفصيل → سكشن **Asynchronous JavaScript**.
4. **الـ DOM behind the scenes** → سكشن **Advanced DOM and Events**.

### خلصنا السكشن 🎉
- سكشن طويل ومفاهيم صعبة ومحيرة — **عادي**، جزء من التعلم. حتى لو مفهمتش 100%، تقدر تكمل. الوصول للآخر لوحده ميزة كبيرة.

## الفرق بين…
| | Call stack | Heap |
|---|---|---|
| الـ release | الـ EC يطلع → الـ variables تتمسح معاه | **Garbage collection** (mark-and-sweep) |
| الـ global | global variables مش بتتمسح | global objects مش بتتمسح |

| Phase | بيحصل إيه |
|---|---|
| **Mark** | كل اللي reachable من root → alive |
| **Sweep** | كل اللي مش marked → يتمسح والـ memory ترجع |

| Roots |
|---|
| global EC · ECs شغالة · event listeners · active timers · closures |

## غلطات لازم أخلي بالي منها
- أفتكر إني أقدر أشغّل الـ GC بإيدي أو أعرف إمتى بيشتغل — **لأ**.
- أسيب timers وevent listeners شغالين بعد ما خلصت منهم → memory leak.
- أحط objects كبيرة في الـ global scope → عمرها ما هتتمسح.
- أفتكر إن object "مش محتاجه" هيتمسح أوتوماتيك — بيتمسح بس لو **unreachable**.

## ملحوظات لنفسي
- الكلمة المفتاحية: **reachable**. الـ GC مش بيسأل "محتاجه؟"، بيسأل "أقدر أوصله من root؟".
- memory leak = reachable بالغلط.
- closures هتبقى root برضه — أفتكر ده لما أوصلها.
