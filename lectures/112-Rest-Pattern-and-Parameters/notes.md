# 112 — Rest Pattern and Parameters

## الفكرة
Rest = نفس شكل الـ spread بالظبط (`...`) بس **بيعمل العكس**.
- spread → بيفُك (unpack) الـ array لعناصر منفصلة
- rest → بيلِم (pack) كذا عنصر في array واحدة

إزاي أعرف ده ولا ده؟ **من مكانه**:
- يمين الـ `=` → spread
- شمال الـ `=` (مع destructuring) → rest

## 1) Rest في الـ Destructuring

### مع Arrays
```js
// SPREAD — يمين الـ =
const arr = [1, 2, ...[3, 4]];

// REST — شمال الـ =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]
```
اسمه rest عشان بياخد "الباقي" — العناصر اللي ماخدتهاش في متغيرات.

### الـ `...` على الناحيتين في نفس السطر
```js
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// Pizza Risotto ← وبعدهم array فيها كل الباقي
```
- الـ hole (`, ,`) اللي سبته **مش بيدخل** في otherFood.
- rest بيلم اللي **بعد آخر متغير** بس.

### قواعد (غلطت فيها)
- الـ rest لازم يبقى **آخر حاجة** في الـ destructuring:
```js
const [pizza, , risotto, ...otherFood, bread] = [...]; // ❌
// SyntaxError: Rest element must be last element
```
(منطقي — هيعرف يلم لحد فين؟)
- **rest واحد بس** في أي destructuring.

### مع Objects
الباقي بيتجمع في **object جديد** مش array.
```js
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // { thu: {...}, fri: {...} }
```
sat خدته لوحده → الباقي (thu, fri) راح في weekdays.

## 2) Rest Parameters (في الـ Functions)
عكس `fn(...arr)` — هنا الـ function نفسها بتاخد أي عدد arguments وتلمهم في array.

```js
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);                   // 5
add(5, 3, 7, 2);             // 17
add(8, 2, 5, 3, 2, 1, 4);    // 25
```
`numbers` دايمًا array، حتى لو بعتت رقمين.

### spread + rest مع بعض
```js
const x = [23, 5, 7];
add(...x); // 35
```
بفُك الـ array بالـ spread → تدخل الـ function → الـ rest يلمها تاني في `numbers`.

ليه مخليش الـ function تاخد array على طول؟ عشان كده هي **بتقبل الاتنين**: قيم مفردة `add(1,2)` أو array بالـ spread `add(...x)`. وده بيبان أطبيعي. هتشوفه في كود كتير.

### مثال المطعم — argument إجباري والباقي اختياري
```js
orderPizza: function (mainIngredient, ...otherIngredients) {
  console.log(mainIngredient);
  console.log(otherIngredients);
},

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// mushrooms
// ['onion', 'olives', 'spinach']

restaurant.orderPizza('mushrooms');
// mushrooms
// []   ← array فاضية مش undefined
```

## الخلاصة اللي جوناس قالها
| | بيتكتب مكان إيه |
|---|---|
| **Spread** | مكان **قيم** مفصولة بـ `,` |
| **Rest** | مكان **أسماء متغيرات** مفصولة بـ `,` |

## ملحوظات لنفسي
- كنت فاكر إن الـ rest هيلم كل العناصر اللي ماتاخدتش، طلع **مش بيلم الـ holes** — بس اللي بعد آخر متغير.
- خلي بالك: نفس الـ `...` — الفرق كله في المكان (شمال/يمين الـ `=`، أو في الـ parameters vs في الـ call).
- لو مفيش arguments زيادة → `[]` مش `undefined`، فأقدر أعمل loop عليها عادي.
- `function (...nums)` = بلم. `fn(...arr)` = بفُك.
