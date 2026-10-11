# 103 — Memory Management: Primitives vs. Objects

## الفكرة
أول جزء من **memory management**: الـ JS engine بيحجز memory للـ variables **فين وإزاي**، وبيفضّيها لما متبقاش محتاجاها. أهم حاجة في المحاضرة كلها: **object references** — الـ variable مش شايل الـ object، شايل **reference** ليه.

## أهم الحاجات

### Memory management = إيه؟
- إزاي الـ engine **يحجز (allocate)** مكان في الـ memory للـ variables، وبعدين **يفضّي** المكان اللي variables مبقتش محتاجاها → عشان الـ app يشتغل smooth ومن غير ما الـ memory تخلص.
- السؤال: **الـ variables بتتعمل فين وإزاي؟**
- في لغات low-level زي **C / C++** المبرمج بيحجز الـ memory **بإيده**. JS بتعمل كده **أوتوماتيك** → أسهل وأسرع، وبيقلل bugs زي **memory leaks**.

### Memory Lifecycle (لكل value)
1. **Allocate** — أول ما أعمل value جديدة (مثلًا أديها لـ variable) الـ engine بيحجز حتة memory ليها، سواء value صغيرة (`23.7`) أو object ضخم أو function.
2. **Use** — الـ memory بتتستخدم وأنا بقرا / بكتب / بعدّل القيمة (واضحة بس جزء من الـ lifecycle).
3. **Release** — لما القيمة متبقاش محتاجاها → تتمسح من الـ memory والمكان يتفضّى لقيم جديدة (إزاي؟ المحاضرة الجاية).

### Memory Allocation — كل نوع في مكان مختلف
- أنواع القيم في JS:
  - **Primitives**: Number, String, Boolean, Undefined, Null, Symbol, BigInt.
  - **Objects**: كل حاجة تانية — object literal، **arrays**، وحتى **functions**.
- الـ engine فيه:
  - **Call stack** — فين الـ functions بتتنفذ.
  - **Heap** — فين الـ objects بتتخزن.
- **Objects → الـ heap**.
- **Primitives → الـ call stack** — بالتحديد في **الـ execution context اللي اتعملت فيه** (في الـ variable environment بتاعه، بس لأنه عايش في الـ stack بنقول "في الـ stack").
- استثناءات: الـ engines الحديثة sophisticated — ممكن مثلًا تحط **string طويل جدًا** (primitive) في الـ heap عشان تعمل optimize للـ stack. بس كـ **mental model** القاعدة دي كفاية.
- وكمان: **references to objects** بتتخزن في الـ **call stack**.

### المثال خطوة بخطوة (stack + heap)
```js
const name = 'Jonas';
const age = calcAge(1991);

function calcAge(birthYear) {
  const now = 2037;
  const x = now - birthYear;
  return x;
}

let newAge = age;
newAge++;

const location = { /* ... */ city: /* ... */ };
const newLocation = location;
newLocation.city = 'Lisbon';
console.log(location); // city: 'Lisbon' 😱
```
(الكود من السلايد زي ما اتوصف — الأسماء من المحاضرة.)

1. **Global EC** على الـ stack → `name = 'Jonas'` (string = primitive) **في الـ stack**.
2. `calcAge` → **EC جديد** فوق الـ stack → `now` و`x` أرقام → primitives في الـ EC ده.
3. الـ function ترجع → الـ EC بتاعها **يطلع من الـ stack** ومعاه القيم اللي كانت فيه **تختفي**. الـ return `46` يتخزن في `age` في الـ global EC.
4. `newAge = age` → `46` تتخزن **تاني** في الـ stack كـ `newAge`.
5. `newAge++` → 47، و**`age` يفضل 46** — كل variable **شايل نسخته** من القيمة. (بديهي — بس مختلف جدًا عن الـ objects.)
6. `location` = object → **يتخزن في الـ heap**.
   - طب الكود هيعرف إزاي إن الـ object ده اسمه `location`؟ ← **reference**.
   - الـ variable `location` في الـ EC **شايل reference** للـ object (تقنيًا **memory address**)، **مش الـ object نفسه**.
   - الميكانيزم ده **مستخبي** عننا — على السطح يبان إن الـ variable شايل الـ object.
7. `newLocation = location` → بننسخ **الـ reference بس**، مش الـ object → **الاتنين بيشاوروا على نفس الـ object** في الـ heap.
8. `newLocation.city = 'Lisbon'` → **mutate** للـ object في الـ heap.
9. `console.log(location)` → **city = 'Lisbon'** كمان! لأن `location` و`newLocation` **هما نفس الـ object** → عدّلت من واحد = اتعدّل في التاني → **ضيّعنا** قيمة الـ city الأصلية.

- **`calcAge` نفسها object** → متخزنة في الـ heap، والـ variable `calcAge` شايل reference ليها. وهي كانت **hoisted** — يعني في الـ heap من الأول (وإلا مكناش هنقدر نناديها في السطر التاني)؛ اتحطت في الآخر في الرسمة لأغراض تعليمية.

## الفرق بين…
| | Primitives | Objects |
|---|---|---|
| الأنواع | Number, String, Boolean, Undefined, Null, Symbol, BigInt | object literals, arrays, functions |
| بتتخزن فين | **call stack** (في الـ EC بتاعها) | **heap** |
| الـ variable شايل إيه | القيمة نفسها | **reference** (memory address) |
| النسخ `b = a` | نسخة مستقلة | نفس الـ object (reference بس) |
| تعديل النسخة | الأصل مبيتأثرش | الأصل **بيتأثر** |

| | Call stack | Heap |
|---|---|---|
| وظيفته | تنفيذ الـ functions | تخزين الـ objects |
| فيه | primitives + references | objects (وfunctions) |

## غلطات لازم أخلي بالي منها
- أفتكر إن `const newObj = obj` بيعمل نسخة جديدة — ده **reference** لنفس الـ object.
- أعدّل "النسخة" وأستغرب إن الأصل اتغير.
- أنسى إن arrays وfunctions **objects** برضه → نفس الكلام.
- أفتكر إن القاعدة (primitives في الـ stack) مطلقة — فيه استثناءات (string ضخم)، بس الـ mental model كفاية.

## ملحوظات لنفسي
- **أهم جملة**: الـ variables في الـ call stack **مش شايلة objects — شايلة references** بتشاور عليها.
- primitive = كل واحد معاه نسخته؛ object = كلهم بيبصوا على نفس الحاجة.
- الـ lifecycle: allocate → use → release (الـ release في المحاضرة الجاية).
