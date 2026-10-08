# 110 — Destructuring Objects (شرح تفصيلي)

> الملف ده شرح أطول من `notes.md`. الأمثلة كلها تنفع تتكتب في `09-Data-Structures-Operators/starter/script.js`.
> حط كل مثال جوّا `{ ... }` عشان الأسماء متضربش في بعض.

---

## 1) ليه أفكك object؟

في الشغل الحقيقي، أغلب البيانات بتيجي **objects**: بيانات طقس، أفلام، مستخدمين، أوردرات... كلها objects جاية من API.
وكل مرة أكتب `restaurant.name` و`restaurant.openingHours` و`restaurant.categories` الكود بيطوّل ويتكرر.

الـ Object Destructuring بيخليني أطلع الـ properties اللي محتاجها في متغيرات في سطر واحد.

```js
// من غير destructuring
const name1 = restaurant.name;
const hours1 = restaurant.openingHours;
const categories1 = restaurant.categories;

// بالـ destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// Classico Italiano {thu: {...}, fri: {...}, sat: {...}} ['Italian', ...]
```

---

## 2) الفرق الأساسي عن الـ arrays

| | Arrays (108) | Objects (110) |
|---|---|---|
| الأقواس | `[ ]` | `{ }` |
| بياخد على أساس إيه | **الترتيب** | **اسم الـ property** |
| الترتيب مهم؟ | أيوه جدًا | لأ خالص |
| التخطي | بالـ hole `, ,` | مش محتاج، بكتب اللي عايزه بس |

يعني في الـ objects لازم أكتب **نفس اسم الـ property بالظبط**. لو كتبت اسم غلط هياخد `undefined`:

```js
const { nme } = restaurant; // غلطة إملائية
console.log(nme); // undefined
```

وبما إن الترتيب مش مهم، دول زي بعض:
```js
const { name, categories } = restaurant;
const { categories, name } = restaurant; // نفس النتيجة
```

---

## 3) تغيير اسم المتغير بـ `:`

ساعات اسم الـ property مش مناسب، أو متعارض مع متغير عندي. بكتب **اسم الـ property** وبعده `:` وبعده **الاسم الجديد**:

```js
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);
```

خد بالك: الشمال قبل `:` = اسم الـ property في الـ object (لازم يطابق). اليمين بعد `:` = اسم المتغير الجديد اللي هستخدمه.
بعد السطر ده **مفيش** متغير اسمه `name` اتعمل، اللي اتعمل هو `restaurantName` بس.

---

## 4) Default Values

لو حاولت أقرا property مش موجودة هتطلع `undefined`. مثلًا مفيش property اسمها `menu` في `restaurant`:

```js
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu);     // []  ← مش موجودة، فأخد الـ default
console.log(starters); // ['Focaccia', 'Bruschetta', ...] ← موجودة، فالـ default ماتطبقش
```

السطر التاني جمع حاجتين: **rename** (`starterMenu: starters`) و**default** (`= []`).
والترتيب في الكتابة: `اسم_الproperty: اسم_جديد = قيمة_افتراضية`.

ليه ده مهم؟ لأن البيانات الحقيقية مش hard-coded زي `restaurant`، بتيجي من برا ومش دايمًا متأكد شكلها إيه. الـ default بيحميني من `undefined`.

---

## 5) Mutating variables (تعديل متغيرات موجودة)

في الـ arrays عملنا swap لمتغيرات موجودة عادي: `[a, b] = [b, a]`. في الـ objects فيه حركة:

```js
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
```

عايز `a` تبقى 23 و`b` تبقى 7. مينفعش `const { a, b } = obj` ولا `let { a, b } = obj` لأنهم متعرّفين خلاص.
طب أكتب من غيرهم؟

```js
// { a, b } = obj; // ❌ SyntaxError: Unexpected token '='
```

ليه؟ لأن لما السطر **يبدأ بـ `{`**، الـ JavaScript فاكرة إنه **code block** (زي بتاع `if` أو block عادي)، ومينفعش أعمل `=` لـ code block.

الحل: أحط السطر كله جوّا **قوسين**:
```js
({ a, b } = obj);
console.log(a, b); // 23 7
```

> 💡 لو السطر اللي قبله مفيهوش `;`، الأقواس ممكن تتلزق فيه وتعمل مشكلة. فخلي بالك تقفل السطر اللي قبله بـ `;`.

---

## 6) Nested Objects

`openingHours` نفسها object، وجوّاها `fri` object تاني:

```js
const { openingHours } = restaurant;

// أطلع fri بس
const { fri } = openingHours;
console.log(fri); // {open: 11, close: 23}

// أفكك fri نفسها في open و close
const {
  fri: { open, close },
} = openingHours;
console.log(open, close); // 11 23
```

بعد `fri:` بدل ما أكتب اسم جديد، بكتب `{ }` تانية، فهو بيكمّل تفكيك جوّا.
ولاحظ إن `fri` نفسها **مش** بتبقى متغير هنا، المتغيرات اللي اتعملت `open` و`close` بس.

وممكن كمان أغيّر الأسماء:
```js
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 11 23
```

وممكن أفكك من `restaurant` على طول من غير خطوة `openingHours`:
```js
const {
  openingHours: {
    sat: { open: satOpen, close: satClose },
  },
} = restaurant;
console.log(satOpen, satClose); // 0 24
```

---

## 7) الاستخدام العملي: function بتاخد object واحد (`orderDelivery`)

لما الـ function يبقى ليها parameters كتير، بقى صعب أفتكر الترتيب:
```js
// لازم أفتكر: starterIndex الأول ولا mainIndex؟ والوقت فين؟
// orderDelivery(2, 2, '22:30', 'Via del Sole, 21');
```

الحل: أبعت **object واحد**، والـ function **تفككه فورًا** في الـ parameters:

```js
restaurant.orderDelivery = function ({
  starterIndex = 1,
  mainIndex = 0,
  time = '20:00',
  address,
}) {
  console.log(
    `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  );
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
// Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
// Order received! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00
```

المميزات:
- **الترتيب مش مهم** وأنا ببعت الـ object (`time` قبل `address` عادي).
- **الأسماء واضحة** وقت النداء، فأنا عارف كل قيمة دي إيه.
- **الـ defaults** بتسد مكان أي حاجة مبعتهاش.

ودي تقنية بتلاقيها كتير جدًا في المكتبات اللي هتستخدمها بعدين.

---

## 8) أخطاء شائعة

| الغلط | النتيجة | الصح |
|---|---|---|
| `const { nme } = restaurant` | `undefined` | الاسم لازم يطابق: `name` |
| `{ a, b } = obj;` | `SyntaxError` | `({ a, b } = obj);` |
| `const { name: restaurantName } = restaurant` وبعدين `console.log(name)` | `name` مش متعرّف (أو بتجيب حاجة تانية) | استخدم `restaurantName` |
| `const { fri: { open } } = openingHours` وبعدين `console.log(fri)` | `fri` مش متعرّف | لو محتاجها اعمل `const { fri } = openingHours` لوحدها |
| فاكر الـ default بيشتغل مع `null` | مش بيشتغل، بس مع `undefined` | — |
| بتنادي `orderDelivery()` من غير object خالص | `TypeError` لأنه بيحاول يفكك `undefined` | ابعت `{}` على الأقل |

---

## 9) ملخص في سطور

- `const { name, categories } = restaurant` → بالأسماء، والترتيب مش مهم.
- `const { name: restaurantName } = restaurant` → rename.
- `const { menu = [] } = restaurant` → default.
- `const { starterMenu: starters = [] } = restaurant` → rename + default.
- `({ a, b } = obj);` → mutate متغيرات موجودة، والأقواس لازمة.
- `const { fri: { open, close } } = openingHours` → nested.
- `function ({ x = 1, y }) {}` → أفكك الـ object وهو داخل الـ function.
