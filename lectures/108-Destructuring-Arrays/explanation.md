# 108 — Destructuring Arrays (شرح تفصيلي)

> الملف ده شرح أطول من `notes.md`. النوتات للمراجعة السريعة، وده لما أحب أفهم الفكرة من الأول.
> كل الأمثلة تنفع تتكتب في `09-Data-Structures-Operators/starter/script.js` وتشوف نتيجتها في الـ Console.
> **نصيحة:** حط كل مثال جوّا `{ ... }` عشان أسماء المتغيرات متضربش في بعض أو في الكود اللي فوق.

---

## 1) يعني إيه Destructuring أصلًا؟ وليه محتاجه؟

Destructuring معناها "تفكيك". بدل ما أطلع كل عنصر من الـ array لوحده بالـ index، بفك الـ array مرة واحدة في كذا متغير.

تخيل إن عندي شنطة فيها 3 حاجات، وعايز أطلعهم. الطريقة القديمة: أمد إيدي وأطلع حاجة حاجة. الـ Destructuring: أفتح الشنطة وكل حاجة تروح مكانها في نفس اللحظة.

ليه ده مهم؟

- **كود أقصر وأوضح:** سطر واحد بدل 3 أو 4.
- **بيانات من الـ API أو من functions:** كتير جدًا بيرجعلي array وأنا عايز أحط كل قيمة في متغير باسم مفهوم.
- **الـ array الأصلي مش بيتأثر:** أنا بس بقرا منه.

```js
const arr = [2, 3, 4];

// الطريقة القديمة
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c); // 2 3 4

// بالـ Destructuring
const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4
console.log(arr);     // [2, 3, 4]  ← زي ما هو
```

### خد بالك من الـ `[]` على الشمال
الـ `[]` اللي على **شمال** الـ `=` مش array جديدة. دي معناها: "يا JavaScript، فكّلي اللي على اليمين بالترتيب ده".
- على **اليمين** `[2, 3, 4]` = بعمل array.
- على **الشمال** `const [x, y, z] =` = بفكك array.

ولازم أكتب `const` أو `let` قبلها لو بعرّف متغيرات جديدة.

---

## 2) مش لازم آخد كل العناصر

الـ Destructuring بيمشي **بالترتيب** من أول الـ array. لو كتبت متغيرين بس، هياخد أول عنصرين ويسيب الباقي.

```js
const [first, second] = restaurant.categories;
console.log(first, second); // Italian Pizzeria
```

`restaurant.categories` فيها `['Italian', 'Pizzeria', 'Vegetarian', 'Organic']`، فأخدنا أول اتنين بس.

---

## 3) التخطي (Skipping) بالـ hole

طب لو عايز الأول والتالت؟ بسيب **مكان فاضي** بين فاصلتين:

```js
const [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian
```

الفاصلة الفاضية دي اسمها "hole"، معناها "عدّي العنصر ده". ولو عايز أعدّي اتنين:

```js
const [one, , , four] = restaurant.categories;
console.log(one, four); // Italian Organic
```

---

## 4) تبديل قيمتين (Swapping) من غير `temp`

ده من أشهر استخدامات الـ Destructuring. تخيل إن صاحب المطعم عايز يبدّل الـ main والـ secondary.

### الطريقة القديمة
```js
let main = 'Italian';
let secondary = 'Vegetarian';

const temp = main;   // احفظ main الأول
main = secondary;    // main بقى Vegetarian
secondary = temp;    // secondary بقى Italian
console.log(main, secondary); // Vegetarian Italian
```

### بالـ Destructuring
```js
let main = 'Italian';
let secondary = 'Vegetarian';

[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegetarian Italian
```

إيه اللي حصل؟
1. على اليمين عملت array جديدة: `['Vegetarian', 'Italian']`.
2. على الشمال فككتها في `main` و`secondary`.

### ⚠️ ليه لازم `let` مش `const`؟
لأن التبديل ده **إعادة تعيين** (reassignment) للمتغيرات. والـ `const` مينفعش يتعاد تعيينه:

```js
const m = 'Italian';
const s = 'Vegetarian';
// [m, s] = [s, m]; // ❌ TypeError: Assignment to constant variable.
```

وكمان لاحظ إني في سطر التبديل **مكتبتش** `let` تاني، لأن المتغيرات متعرّفة خلاص. لو كتبت `let [main, secondary] = ...` تاني في نفس الـ scope هيدّيني error إن المتغير متعرّف قبل كده.

---

## 5) استقبال أكتر من قيمة من function

الـ function في JS بترجع قيمة **واحدة** بس. بس لو القيمة دي array، أقدر أفككها فورًا، فكأن الـ function رجعتلي أكتر من قيمة.

```js
restaurant.order = function (starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
};

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread Pizza
```

> 📝 ملحوظة لنفسي: في الـ `script.js` بتاعي الـ `order` مكتوب فيها `this.starterMenu[mainIndex]` في التانية، والصح `this.mainMenu[mainIndex]`. لو النتيجة طلعت غريبة، ده السبب.

---

## 6) Nested Destructuring (array جوّا array)

```js
const nested = [2, 4, [5, 6]];
```

### المستوى الأول بس
```js
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]
```
`j` هنا array كاملة.

### أفكك الداخلية كمان
بكتب destructuring جوّا destructuring، بنفس شكل البيانات:
```js
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6
```

القاعدة: **الشمال بيقلّد شكل اليمين**. لو اليمين فيه `[ ... [ ... ] ]`، الشمال يبقى نفس الشكل.

---

## 7) Default Values

لو حاولت آخد عنصر مش موجود، هيطلع `undefined`:

```js
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8 9 undefined
```

أقدر أحط قيمة افتراضية بـ `=` جوّا الـ destructuring:

```js
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1
```

الـ default بيشتغل **بس** لو القيمة `undefined`. يعني لو العنصر موجود وقيمته `0` أو `null`، الـ default **مش** هيشتغل:

```js
const [u = 10, v = 10] = [0, null];
console.log(u, v); // 0 null
```

ده مفيد جدًا لما البيانات جاية من API ومش عارف طول الـ array كام.

---

## 8) أخطاء شائعة

| الغلط | ليه غلط | الصح |
|---|---|---|
| `const [a, b] = ...` وبعدين `[a, b] = [b, a]` | `const` مينفعش يتعاد تعيينه | استخدم `let` |
| `let [a, b] = [b, a]` في سطر التبديل | بيحاول يعرّف المتغيرات تاني | `[a, b] = [b, a]` من غير `let` |
| `const [i, j, k] = [2, 4, [5, 6]]` وفاكر إن `k` هتبقى 5 | `k` هتبقى `[5, 6]` كلها | `const [i, , [j, k]] = ...` |
| فاكر إن الترتيب مش مهم | في الـ arrays الترتيب هو كل حاجة | الترتيب مش مهم في الـ objects بس (محاضرة 110) |
| فاكر إن الـ default بيشتغل مع `null` | بيشتغل مع `undefined` بس | — |

---

## 9) ملخص في سطور

- `const [a, b] = arr` → أول عنصرين.
- `const [a, , c] = arr` → أتخطى بالـ hole.
- `[a, b] = [b, a]` → swap، والمتغيرات لازم `let`.
- `const [x, y] = fn()` → أكتر من قيمة من function.
- `const [a, , [b, c]] = nested` → nested.
- `const [a = 1, b = 1] = arr` → defaults لو `undefined`.
