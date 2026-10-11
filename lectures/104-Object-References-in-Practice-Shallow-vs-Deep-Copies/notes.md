# 104 — Object References in Practice (Shallow vs. Deep Copies)

## الفكرة
نجرب الـ **object references** بالكود: نسخ object بـ `=`، تعديل properties في `const`، بعت object لـ function، وبعدين نعمل نسخة حقيقية: **shallow copy** بالـ spread operator، و**deep copy/clone** بـ **`structuredClone`**.

## أهم الحاجات

### 1) نسخ بـ `=` → نفس الـ object
```js
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before:', jessica);       // lastName: 'Davis' 😱
console.log('After:', marriedJessica); // lastName: 'Davis'
```
- الـ object في الـ **heap**، والـ call stack شايل **reference** (memory address).
- `marriedJessica = jessica` **مبيعملش object جديد** → نفس الـ reference → **اسمين لنفس الحاجة** → التعديل بيظهر في الاتنين.
- trick: **`console.log` بياخد أكتر من argument** → بكتب string كـ **label** الأول وبعدين القيمة.

### 2) ليه أقدر أعدّل properties في `const`؟
- `const` = مينفعش أغيّر **القيمة** — والقيمة هنا = **الـ reference** المتخزن في الـ stack، مش الـ object.
- تعديل property مبيغيّرش الـ reference → ✅ مسموح:
```js
jessica.age = 30; // ✅ تمام
```
- لكن assign لـ **object جديد** = reference جديد في الـ heap = تغيير القيمة نفسها → ❌:
```js
jessica = { x: 23 }; // ❌ TypeError: Assignment to constant variable.
```
- لو كان `let` → كان هيبقى عادي. فرق **أساسي ومهم جدًا**.

### 3) بعت object لـ function → نفس المشكلة
```js
const jessica1 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

function marryPerson(originalPerson, newLastName) {
  originalPerson.lastName = newLastName;
  return originalPerson;
}

const marriedJessica = marryPerson(jessica1, 'Davis');

// const marriedJessica = jessica1;
// marriedJessica.lastName = 'Davis';

console.log('Before:', jessica1); // Davis
console.log('After:', marriedJessica); // Davis
```
- مع إننا منسخناش يدوي — بعتنا الـ object للـ function → **الـ reference بس اللي اتبعت**.
- `originalPerson` جوه الـ function = **نفس الـ object** في الـ heap → التعديل بيوصل للأصل.
- الحالة دي **أشيع بكتير** من النسخ اليدوي → خلي بالك منها.
- (جوناس غيّر الاسم لـ `jessica1` عشان الكود يبقى readable.)

### 4) Shallow copy — spread operator
```js
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  familiy: ['Alice', 'Bob'],
};

// Shallow copy
const jessicaCopy = { ...jessica };
jessicaCopy.lastName = 'Davis';
```
- `{ }` = **object جديد في الـ heap**، و`...jessica` (الـ **spread operator** — التفاصيل بعدين) بيحط كل properties `jessica` فيه → reference جديد في `jessicaCopy`.
- النتيجة: الأصل **Williams**، النسخة **Davis** ✅ (جوناس غلط في الأول وكتب `.newLastName` بدل `.lastName` → النتيجة كانت غريبة لحد ما صلّحها).

#### بس لسه فيه مشكلة 👇
```js
jessicaCopy.familiy.push('Mary');
jessicaCopy.familiy.push('John');

console.log('Before:', jessica);   // familiy فيها Mary و John 😱
console.log('After:', jessicaCopy); // familiy فيها Mary و John
```
- `familiy` = **array = object** → **nested object** في الـ heap لوحده، والـ property شايلة **reference** ليه.
- الـ spread نسخ الـ properties: الـ primitives (firstName, lastName, age) **اتنسخت فعلًا**، بس `familiy` **اتنسخ الـ reference بتاعها** → الاتنين بيشاوروا على **نفس الـ array**.
- يعني نسخ **الـ first level بس** → ده اسمه **shallow copy** (مصطلح هتسمعه كتير).

### 5) Deep copy / Deep clone — `structuredClone`
```js
// Deep copy/clone
const jessicaClone = structuredClone(jessica);
jessicaClone.familiy.push('Mary');
jessicaClone.familiy.push('John');

console.log('Original:', jessica);   // familiy: ['Alice', 'Bob'] ✅
console.log('Clone:', jessicaClone); // familiy: ['Alice', 'Bob', 'Mary', 'John']
```
- **deep copy (deep clone)** = نسخ **الـ object كله بكل الـ nested objects**.
- في الشغل الحقيقي ده غالبًا اللي عايزه — مثلًا أعدّل في object كبير وأضمن إن **الداتا الأصلية متتغيرش**.
- `structuredClone` **جديدة نسبيًا** — في كل الـ browsers الحديثة، مش في القديمة (متقلقش دلوقتي).
- زمان كان لازم **library خارجية زي Lodash** عشان deep clone.
- (جوناس علّق الـ push بتاع الـ shallow copy عشان Mary وJohn اللي اتضافوا قبل كده كانوا لسه ظاهرين في الأصل.)
- shortcut في VS Code: **Cmd/Ctrl + /** = comment / uncomment.

## الفرق بين…
| | `b = a` | Shallow `{ ...a }` | Deep `structuredClone(a)` |
|---|---|---|---|
| object جديد في الـ heap؟ | ❌ | ✅ | ✅ |
| الـ primitives (first level) | مشتركة | منسوخة | منسوخة |
| الـ nested objects/arrays | مشتركة | **مشتركة** (reference) | منسوخة |
| تعديل النسخة بيأثر على الأصل؟ | ✅ دايمًا | في الـ nested بس | ❌ |

| مع `const obj` | مسموح؟ |
|---|---|
| `obj.age = 30` (تعديل property) | ✅ |
| `obj = { x: 23 }` (object جديد) | ❌ Assignment to constant variable |

## غلطات لازم أخلي بالي منها
- أفتكر إن `const` بتخلّي الـ object immutable — لأ، الـ reference بس اللي ثابت.
- أبعت object لـ function تعدّل فيه وأنا فاكر إن الأصل في أمان.
- أفتكر إن الـ spread بيعمل نسخة كاملة — **shallow** بس؛ الـ arrays/objects اللي جوه مشتركة.
- أكتب property غلط (`newLastName`) → JS هتعمل property جديدة ساكتة من غير error.

## ملحوظات لنفسي
- **`structuredClone`** = الحل لما أحتاج نسخة كاملة مستقلة.
- shallow = أول مستوى بس — الـ nested لسه reference.
- `console.log('Label:', value)` trick مفيد جدًا في الـ debugging.
- كنت فاكر إن الـ function بتاخد "نسخة" من الـ object، طلع بتاخد الـ reference.
