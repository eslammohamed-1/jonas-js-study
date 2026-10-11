# 049 — Looping Backwards and Loops in Loops

## الفكرة
حاجتين: إني ألف على array **بالعكس** (من الآخر للأول)، وإني أعمل **loop جوه loop**.

## أهم الحاجات
### اللف بالعكس
```js
const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];

// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}
```
بفكّر في الـ 3 أجزاء من جديد:
- **البداية:** آخر index، يعني 4 لما كانت 5 elements. بس **من غير hard-code**: `jonas.length - 1`.
- **الـ condition:** الـ loop تفضل شغالة طول ما `i >= 0`، عشان index 0 نفسه يتطبع.
- **التحديث:** `i--` بدل `i++`، يعني **decrement** بـ 1.

المحاكاة: 4 ← 3 ← 2 ← 1 ← 0 (`0 >= 0` true، فيتطبع) ← -1 (false، فيقف).

- طبع i والقيمة عشان يبان الترتيب: 4، 3، 2، 1، 0.
- لما زوّد `true` (6 elements)، بدأ من 5 لوحده عشان الـ length.
- جوناس قال مش هنعمل كده كتير في الكود الحقيقي، بس تمرين حلو على التفكير في الـ 3 أجزاء.

### Loop جوه Loop
- رجعنا للجيم: **3 exercises**، وكل واحد **5 repetitions**، يعني 15 repetition.

```js
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}
```
- الـ outer loop: `exercise < 4` هي هي `exercise <= 3`، اختار اللي يريّحك.
- الـ inner loop: `rep < 6` هي هي `rep <= 5`.
- جوناس نسي يحوّل الـ strings لـ template literals في الأول.

### بتمشي إزاي؟
1. exercise = 1 ← يطبع "Starting exercise 1".
2. الـ inner loop **تتعمل وتتنفذ كلها**: rep من 1 لـ 5.
3. الـ inner تخلص، فالـ iteration الأولى من الـ outer تخلص.
4. exercise = 2 ← الـ inner تشتغل تاني من 1 لـ 5.
5. exercise = 3 ← نفس الكلام.
- المجموع 3 × 5 = 15.

### الـ inner loop شايفة variable الـ outer
- `exercise` متعرّف في الـ outer loop، فهو **متاح جوه كل الـ block بتاعها**، بما فيه الـ inner loop.
- عشان كده قدر يطبع "Exercise 1: …" و"Exercise 2: …".

## الفرق بين…
| للأمام | بالعكس |
|---|---|
| `let i = 0` | `let i = arr.length - 1` |
| `i < arr.length` | `i >= 0` |
| `i++` | `i--` |

## غلطات لازم أخلي بالي منها
- أبدأ بـ `arr.length` بدل `arr.length - 1`، فأول حاجة هتطلع undefined.
- `i > 0` بدل `i >= 0`، فأول element (index 0) مش هيتطبع.
- أنسى أغيّر `++` لـ `--`، فتبقى infinite loop.
- أستخدم نفس اسم الـ counter في الـ outer والـ inner.

## ملحوظات لنفسي
- أي loop أفكر فيها بالـ 3 أجزاء: البداية، وأستمر لحد إمتى، وأتحرك إزاي.
- الـ inner loop بتخلص كلها في كل iteration من الـ outer.
- الـ inner شايفة variables الـ outer، والعكس لأ.
