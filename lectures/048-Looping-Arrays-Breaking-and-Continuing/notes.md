# 048 — Looping Arrays, Breaking and Continuing

## الفكرة
من أشهر استخدامات الـ for loop إني **ألف على array**: أقرا كل element، أو أبني array جديدة منها. وفي الآخر `continue` و`break`.

## أهم الحاجات
### الـ array
```js
const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];
```
- (جوناس كان مسميها `jonasArray` وبعدين غيّر اسمها لـ `jonas`.)

### اللف على الـ array
```js
// console.log(jonas[0])
// console.log(jonas[1])
// ...
// console.log(jonas[4])
// jonas[5] does NOT exist

for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], typeof jonas[i]);
}
```
- **`i`** اسم الـ counter التقليدي من زمان.
- **يبدأ من 0** لأن الـ array zero-based، وأول element `jonas[0]`.
- الـ counter بيزيد 1 (`i++`).
- جوه الـ loop: `jonas[i]` بدل ما أكتب 0 و1 و2 بإيدي.
- **الـ condition (أصعب جزء):** الـ loop تشتغل لـ i = 0، 1، 2، 3، 4، وتقف عند 5 لأن `jonas[5]` مش موجودة (لما كانت 5 elements). يعني `i < 5`.

### متعملش hard-code للـ length
- لما زوّد `true` في الآخر، الـ `i < 5` مطبعتهاش.
- الحل: **`i < jonas.length`**، وكده بيتحسب لوحده ويبقى 6.

### typeof جوه الـ loop
- النتيجة: string، string، number، string، **object**، boolean.
- الـ friends array طلعت **object**، وده دليل إن الـ array object.

### أبني array جديدة من القديمة
```js
const types = [];

for (let i = 0; i < jonas.length; i++) {
  // Reading from jonas array
  console.log(jonas[i], typeof jonas[i]);

  // Filling types array
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}

console.log(types); // ['string', 'string', 'number', 'string', 'object', 'boolean']
```
- `[]` = **empty array**، وبعملها **برّه** الـ loop.
- types ليها نفس length بتاعة jonas، فبنستخدم نفس الـ loop.
- **طريقة 1:** `types[i] = typeof jonas[i]`، زي `types[0] = 'string'` بس dynamic.
- **طريقة 2 (جوناس شايفها أنضف):** `types.push(...)`. لازم **push مش unshift** عشان الترتيب يفضل صح.
- جوناس قال المثال تعليمي، في الواقع مش هنعمل array بالـ types، بس بيوضح إزاي أبني array جديدة من array.

### الـ pattern اللي لازم أفهمه
- counter يبدأ من 0.
- condition: `i < arr.length`.
- جوه الـ loop: `arr[i]` هو الـ element الحالي، والـ i بيمشي من 0 لحد length - 1.

### مثال عملي: السنين ← الأعمار
```js
const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages); // [46, 30, 68, 17]
```
- نفس اللي عملناه يدوي في tip calculator challenge (index 0 و1 و2)، بس ده اللي بنعمله في الواقع.
- عادي إن الـ counter اسمه i تاني في loop تانية.
- **مقدرش أعمل `2037 - years`** (بتطلع NaN)، فالـ loop بتعمل الحساب element element وتعمل push للنتيجة.
- الـ loop دايمًا شكلها تقريبًا كده لما ألف على array.

### `continue` و`break`
- **`continue`:** يخرج من الـ **iteration الحالي** ويروح للي بعده.
- **`break`:** يوقف **الـ loop كلها**.

```js
console.log('--- ONLY STRINGS ---')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;

  console.log(jonas[i], typeof jonas[i]);
}
```
- لو الـ element مش string، الـ continue يخلي الـ console.log **ميتوصلّوش أصلًا** في الـ iteration ده.
- طبع 'Jonas' و'Schmedtmann' و'teacher' بس. الـ 46 والـ array والـ true اتسابوا.

```js
console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;

  console.log(jonas[i], typeof jonas[i]);
}
```
- أول ما يلاقي number (الـ 46) يوقف كله. طبع 'Jonas' و'Schmedtmann' بس، وحتى الـ 46 نفسها متطبعتش.
- جوناس قال ليهم use cases مهمة، بس صعب يعمل أمثلة صغيرة توضحها.

## الفرق بين…
| `continue` | `break` |
|---|---|
| يسيب الـ iteration ده بس | يوقف الـ loop كلها |
| يكمّل باللي بعده | مفيش حاجة بعده |

| `types[i] = x` | `types.push(x)` |
|---|---|
| بالـ index | في الآخر، وأنضف |

## غلطات لازم أخلي بالي منها
- `i <= arr.length` هتعدّي آخر element وتجيب undefined.
- أبدأ من 1، فهيفوتني أول element.
- أكتب الـ length رقم ثابت، فلو الـ array كبرت مش هيلف على الجديد.
- أعمل الـ empty array **جوه** الـ loop، فهتتعمل من الأول كل iteration.
- أستخدم unshift بدل push، فالترتيب يتقلب.

## ملحوظات لنفسي
- الـ snippet ده لازم أحفظه: `for (let i = 0; i < arr.length; i++) { arr[i] }`.
- array فاضية برّه + push جوه = array جديدة.
- typeof للـ array بيقول object.
- جوناس قال أهم حاجة من المحاضرة إني أفهم الـ snippet بتاع اللف على الـ array.
