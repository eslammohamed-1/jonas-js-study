# 095 — Execution Contexts and The Call Stack

## الفكرة
الكود بيتنفذ إزاي بالظبط بعد الـ compilation؟ → بيتعمل **global execution context** للـ top-level code، وبعدين **execution context لكل function call**. جوه كل context: **variable environment** + **scope chain** + **this**. وكل الـ contexts دي بتترص في **call stack** عشان الـ engine يعرف هو فين.

## أهم الحاجات

### Top-level code و Global Execution Context
- بعد الـ compile → بيتعمل **global execution context** للـ **top-level code**.
- **top-level code** = الكود اللي **مش جوه أي function**.
- في الأول بيتنفذ الكود اللي برّه الـ functions بس — منطقي، الـ functions بتتنفذ **لما تتنادى**.
- شفناها في الـ Pig Game: `init` كان لازم نناديها في الـ top-level عشان تشتغل أول ما الصفحة تحمّل.
- مثال الـ slide:
```js
const name = 'Jonas';

const first = () => {
  let a = 1;
  const b = second(7, 9);
  a = a + b;
  return a;
};

function second(x, y) {
  var c = 2;
  return c;
}

const x = first();
```
- `name` = top-level → يتنفذ في الـ global context.
- `first` (expression) و`second` (declaration) بيتعملهم **declare** عشان يتنادوا بعدين، بس **الكود اللي جواهم** مبيتنفذش غير لما يتنادوا.

### Execution Context = إيه؟
- **abstract concept**. تعريف جوناس: **environment بيتنفذ فيه جزء من كود JS**.
- زي **صندوق** فيه كل المعلومات اللازمة عشان الكود يتنفذ: local variables، الـ arguments اللي اتبعتت للـ function…
- **كود JS دايمًا بيشتغل جوه execution context**.
- **تشبيه البيتزا** 🍕: طلبت بيتزا takeaway → جاية في **علبة** ومعاها **شوكة وسكينة** و**الإيصال** (عشان تدفع قبل ما تاكل).
  - البيتزا = الكود اللي هيتنفذ.
  - العلبة = الـ execution context (الأكل بيحصل جواها).
  - الشوكة والإيصال = الحاجات اللازمة للتنفيذ.

### الترتيب
1. **Global execution context واحد بس** في أي مشروع مهما كان كبير — default، والـ top-level بيتنفذ فيه.
2. **Execution** = الـ CPU بيعالج الـ machine code اللي وصله.
3. لما الـ top-level يخلص → الـ functions تبدأ تتنفذ: **كل function call = execution context جديد** فيه اللي محتاجاه الـ function دي بالظبط. ونفس الكلام للـ **methods** (functions متعلقة في objects).
4. كل الـ contexts دي مع بعض = **الـ call stack**.
5. لما كل الـ functions تخلص → الـ engine **يستنى callback functions** (زي handler بتاع click) — والـ **event loop** هو اللي بيجيبها.

### جوه الـ Execution Context إيه؟
1. **Variable Environment**:
   - كل الـ **variables** (let, const, var) والـ **function declarations**.
   - **`arguments` object** خاص: فيه كل الـ arguments اللي اتبعتت للـ function صاحبة الـ context.
2. **Scope Chain**:
   - function تقدر توصل لـ variables **برّه** نفسها (شفناها في المشاريع).
   - الـ scope chain = **references لـ variables برّه الـ function الحالية**، ومحفوظة في كل context. (تفاصيل في محاضرة الـ scope.)
3. **`this` keyword** — variable خاص (ليه محاضرة لوحده).

- الـ 3 دول بيتعملوا في **creation phase** — **قبل** التنفيذ على طول.
- ⚠️ **Arrow functions**: الـ context بتاعها **ملوش `arguments` ولا `this`** خاصين بيها. بتستخدم بتوع **أقرب regular function parent**. تفصيلة مهمة جدًا هنرجعلها.
- ورا الكواليس الموضوع أعقد، بس ده كفاية.

### محاكاة الـ creation phase (على الكود فوق)
- **3 contexts**: global + `first` + `second`.
- **Global**: `name = 'Jonas'`، `first` و`second` (declarations — الـ variable environment فيها الكود كله بتاع الـ function)، `x = unknown` (نتيجة `first()` اللي لسه متنفذتش).
- **first**: `a = 1`، `b = unknown` (محتاج نداء `second`).
- **second**: `c = 2`، و`arguments = [7, 9]` (لأنها **regular function** — `first` arrow فمعهاش arguments).
- ⚠️ تكنيكلي القيم مبتتعرفش في الـ creation phase، بتتعرف في الـ **execution phase** — المحاكاة دي مش دقيقة 100%، للتوضيح بس.

### الـ Call Stack
- السؤال: لو فيه مئات الـ contexts، الـ engine يعرف إزاي ترتيب النداءات وهو واقف فين؟ → **call stack**.
- call stack + memory heap = الـ **JavaScript engine**.
- **مكان الـ execution contexts بتترص فوق بعض** عشان نتابع إحنا فين في التنفيذ.
- الـ context اللي **فوق** = اللي **شغال دلوقتي**. لما يخلص → **يتشال** والتنفيذ يرجع للي تحته.
- تشبيه: اشتريت بيتزا مع صحابك، كل واحد ليه علبة، **رصّيتوا العلب فوق بعض** عشان تعرفوا كل علبة بتاعة مين.

### الكود ماشي إزاي في الـ stack (walkthrough)
1. Global context يتعمل ويتحط في الـ stack → بقى فوق → الـ top-level بيتنفذ: `name`، declare `first` و`second`.
2. `const x = first();` → `first` **context جديد** يتحط **فوق** الـ global ويبقى الحالي.
3. `let a = 1` → في الـ variable environment بتاع **first** مش الـ global.
4. `second(7, 9)` → context جديد لـ `second` فوق → بقى الـ active.
   - ⚠️ **تنفيذ `first` واقف (paused)** عند النقطة دي، ومش هيكمل غير لما `second` ترجع. ومفيش أي function تانية بتتنفذ في الوقت ده.
   - لأن JS ليها **thread of execution واحد** → حاجة واحدة بس في المرة. **متنساش ده أبدًا**.
5. `return c` → context `second` **يتشال (popped off)** من الـ stack ويختفي من الـ memory. (تكنيكلي ممكن يفضل عايش في الـ memory — بعدين في الكورس.)
6. `first` يرجع الـ active ويكمل من مكان ما وقف: `a = a + b` → `return a` → يتشال.
7. رجعنا للـ global عند السطر اللي نادى `first` → القيمة تتحط في `x` → التنفيذ خلص.
- البرنامج يفضل في الحالة دي **لحد ما يخلص فعلًا** = لما أقفل الـ tab أو الـ browser → ساعتها بس الـ **global context يتشال**.
- الـ call stack = **"map" للـ engine** → عمر ترتيب التنفيذ ما يضيع.
- أدق: الكود بيتنفذ **جوه الـ execution contexts اللي في الـ stack** — بس عمومًا "الكود بيتنفذ في الـ call stack" صح.

## الفرق بين…
| | Global Execution Context | Function Execution Context |
|---|---|---|
| العدد | **واحد بس** | واحد **لكل call** |
| إمتى يتعمل | أول ما الكود يبدأ | لما الـ function تتنادى |
| إمتى يتشال | لما أقفل الـ tab/browser | لما الـ function ترجع |

| | Regular function | Arrow function |
|---|---|---|
| `arguments` | ✅ | ❌ (بتاخد من الـ parent) |
| `this` | ✅ | ❌ (بتاخد من الـ parent) |

## غلطات لازم أخلي بالي منها
- أفتكر إن تعريف الـ function = تنفيذها.
- أفتكر إن الـ functions بتتنفذ بالتوازي → لأ، واحدة واقفة لحد ما اللي فوقها ترجع.
- أفتكر إن variable متعرف في `first` موجود في الـ global environment.
- أنسى إن الـ arrow مالهاش `arguments`/`this`.

## ملحوظات لنفسي
- Execution context = **variable environment + scope chain + this**، بيتعملوا في الـ creation phase.
- Call stack = LIFO: آخر واحد دخل أول واحد يطلع.
- تشبيه البيتزا خلاني أفهم: العلبة = context، رص العلب = stack.
- ارسم الـ stack بإيدي لأي كود فيه functions بتنادي بعض.
- "يتشال من الـ memory… بس ممكن يفضل عايش" → دي closures غالبًا، هستناها.
