# 111 — The Spread Operator `...` (شرح تفصيلي)

> الملف ده شرح أطول من `notes.md`. الأمثلة كلها تنفع تتكتب في `09-Data-Structures-Operators/starter/script.js`.
> حط كل مثال جوّا `{ ... }` عشان الأسماء متضربش في بعض.

---

## 1) يعني إيه Spread؟ وليه محتاجه؟

الـ Spread operator هو التلات نقط `...`، ووظيفته إنه **يفرد** عناصر الـ array (أو أي iterable) واحد واحد، كأني كتبتهم بإيدي ومفصولين بفاصلات.

تخيل علبة فيها 3 بيضات. لو حطيت العلبة في كرتونة تانية، هيبقى عندي "علبة جوّا كرتونة". الـ Spread كأني فتحت العلبة وحطيت البيض نفسه في الكرتونة.

### المشكلة من غيره
```js
const arr = [7, 8, 9];

// عايز array جديدة فيها 1, 2 في الأول وبعدين عناصر arr
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 7, 8, 9]
```
تخيل لو `arr` فيها 100 عنصر! 😅

### الحل بالـ Spread
```js
const newArr = [1, 2, ...arr];
console.log(newArr); // [1, 2, 7, 8, 9]
```

---

## 2) بالنقط vs من غير نقط

```js
const arr = [7, 8, 9];

console.log([1, 2, arr]);    // [1, 2, [7, 8, 9]]  ← array جوّا array
console.log([1, 2, ...arr]); // [1, 2, 7, 8, 9]    ← العناصر اتفردت
```

ونفس الكلام مع `console.log` نفسها:
```js
const newArr = [1, 2, ...arr];
console.log(newArr);    // [1, 2, 7, 8, 9]  ← قيمة واحدة (array)
console.log(...newArr); // 1 2 7 8 9        ← 5 قيم منفصلة
```
السطر التاني كأني كتبت `console.log(1, 2, 7, 8, 9)`.

---

## 3) القاعدة الذهبية: فين ينفع أستخدمه؟

**الـ Spread ينفع بس في الأماكن اللي بتستنى قيم مفصولة بفاصلات.** وده عمليًا مكانين:
1. **وأنا ببني array:** `[...arr]`
2. **وأنا بمرر arguments لـ function:** `fn(...arr)`

(ومن ES2018 كمان وأنا ببني **object**: `{...obj}`، وهنشوفها تحت.)

ومينفعش مثلًا جوّا template literal:
```js
const str = 'Jonas';
// console.log(`${...str} Schmedtmann`); // ❌ SyntaxError: Unexpected token '...'
```
لأن `${}` بتستنى **قيمة واحدة**، مش قيم مفصولة بفاصلات.

---

## 4) Spread vs Destructuring

الاتنين بيطلّعوا عناصر من array، فممكن يتلخبطوا. الفرق:

| | Destructuring (108) | Spread (111) |
|---|---|---|
| بيعمل إيه | بيطلع عناصر في **متغيرات جديدة** | بيفرد **كل** العناصر، ومش بيعمل متغيرات |
| بياخد كام عنصر | اللي أختاره | كلهم |
| مكانه | **شمال** الـ `=` | **يمين** الـ `=`، أو جوّا `()` بتاعة function |
| الشكل | `const [a, b] = arr` | `const x = [...arr]` / `fn(...arr)` |

```js
const [first, second] = restaurant.mainMenu; // destructuring: متغيرين جداد
const menuCopy = [...restaurant.mainMenu];   // spread: array جديدة فيها كله
```

> (في محاضرة 112 هنشوف إن `...` لما تيجي **شمال** الـ `=` بتبقى حاجة تانية اسمها Rest. فالمكان هو اللي بيحدد.)

---

## 5) أضيف عناصر على array من غير ما ألمس الأصلية

```js
const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);              // ['Pizza', 'Pasta', 'Risotto', 'Gnocchi']
console.log(restaurant.mainMenu);  // ['Pizza', 'Pasta', 'Risotto'] ← زي ما هي
```
إحنا **بنبني array جديدة من الصفر** (الـ `[]` بتقول كده)، ومش بنعدّل في `mainMenu`.

---

## 6) Shallow copy لـ array

```js
const mainMenuCopy = [...restaurant.mainMenu];
mainMenuCopy.push('Lasagna');
console.log(mainMenuCopy);        // [..., 'Lasagna']
console.log(restaurant.mainMenu); // من غير Lasagna ✅
```

### ليه مش `const copy = restaurant.mainMenu`؟
لأن ده **مش نسخة**، ده متغير تاني بيشاور على **نفس** الـ array في الـ memory (reference). أي تعديل في واحد هيبان في التاني:
```js
const notACopy = restaurant.mainMenu;
// notACopy.push('X'); // ← كده هتعدّل restaurant.mainMenu نفسها!
```

### يعني إيه "Shallow"؟
بينسخ **المستوى الأول بس**. لو جوّا الـ array فيه array أو object تاني، النسخة والأصل بيشاوروا على **نفس** العنصر الداخلي:
```js
const original = [1, [2, 3]];
const copy = [...original];
copy[0] = 100;      // مش هيأثر على original
copy[1].push(4);    // هيأثر! لأن [2, 3] نفس الـ reference
console.log(original); // [1, [2, 3, 4]]
```

---

## 7) دمج arrays

```js
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
// ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']
```
وممكن أدمج أي عدد، وأحط عناصر في النص: `[...a, 'x', ...b, ...c]`.

---

## 8) Iterables: الـ Spread مش للـ arrays بس

الـ Spread شغال على أي **iterable**. والـ iterables هي:
- **Arrays**
- **Strings**
- **Maps**
- **Sets**
- لكن **مش Objects** (الـ objects مش iterables).

### على string
```js
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // ['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str);  // J o n a s
```

### على Set (موجودة في أول الـ starter!)
```js
const allFoods = [...italianFoods, ...mexicanFoods];
console.log(allFoods); // كل الأكلات في array واحدة (فيها تكرار tomatoes و garlic)
```
(الـ Sets والـ Maps هنشرحهم بالتفصيل في محاضرات قدام، بس حلو تعرف إن الـ spread شغال عليهم.)

---

## 9) Spread وأنا بمرر arguments لـ function

ده من أهم الاستخدامات. عندي function بتاخد 3 parameters منفصلين، والبيانات عندي في array:

```js
restaurant.orderPasta = function (ing1, ing2, ing3) {
  console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
};

const ingredients = ['tomatoes', 'garlic', 'basil'];
// أو من المستخدم:
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// قديم
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// بالـ Spread
restaurant.orderPasta(...ingredients);
// Here is your delicious pasta with tomatoes, garlic and basil
```

ومثال من `Math`:
```js
const prices = [12, 7, 25];
console.log(Math.max(...prices)); // 25
console.log(Math.max(prices));    // NaN ← لأنه استلم array مش أرقام
```

---

## 10) Spread على Objects (من ES2018)

مع إن الـ objects مش iterables، من **ES2018** الـ spread بقى شغال عليها كمان، **بس جوّا `{}`** (وأنا ببني object).

### object جديد = القديم + حاجات زيادة
```js
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
```
الترتيب في الـ objects مش مهم في العرض، بس **مهم لو فيه property متكررة**: اللي بعدها يكسب:
```js
const a = { ...restaurant, name: 'New Name' }; // name = 'New Name'
const b = { name: 'New Name', ...restaurant }; // name = 'Classico Italiano'
```

### Shallow copy لـ object (بدل `Object.assign`)
```js
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name);     // Classico Italiano ✅
```
ودي أسهل بكتير من `Object.assign({}, restaurant)` اللي شفناها في السكشن اللي فات.

بس برضه **shallow**:
```js
restaurantCopy.mainMenu.push('Lasagna');
console.log(restaurant.mainMenu); // فيها Lasagna! ⚠️ نفس الـ array الداخلية
```

### بس مينفعش أعمل spread لـ object جوّا array
```js
// const arrFromObj = [...restaurant]; // ❌ TypeError: restaurant is not iterable
```

---

## 11) أخطاء شائعة

| الغلط | النتيجة | الصح |
|---|---|---|
| `[1, 2, arr]` وعايز العناصر | array جوّا array | `[1, 2, ...arr]` |
| `` `${...arr}` `` | `SyntaxError` | الـ spread بس في array أو arguments أو object |
| `const copy = arr` | مش نسخة، نفس الـ reference | `const copy = [...arr]` |
| فاكر إن النسخة deep | العناصر الداخلية مشتركة | خلي بالك من الـ nested |
| `[...restaurant]` | `TypeError: not iterable` | `{...restaurant}` |
| `Math.max(arr)` | `NaN` | `Math.max(...arr)` |

---

## 12) ملخص في سطور

- `[...arr, x]` → array جديدة + عناصر.
- `[...arr]` → shallow copy.
- `[...a, ...b]` → دمج.
- `[...'text']` → حروف (iterables: arrays, strings, maps, sets — مش objects).
- `fn(...arr)` → تمرير arguments.
- `{ ...obj, key: val }` → object جديد (ES2018).
- `{ ...obj }` → shallow copy لـ object.
- قاعدة سريعة: **لو كنت هكتب قيم مفصولة بفاصلات → الـ Spread ينفع.**
