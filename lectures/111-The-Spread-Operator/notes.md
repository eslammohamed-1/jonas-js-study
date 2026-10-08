# 111 — The Spread Operator (`...`)

## الفكرة
Spread = يفرد عناصر الـ array (أو الـ iterable) واحد واحد.
بنستخدمه لما كنا هنكتب قيم مفصولة بفاصلات `,`.

```js
const arr = [7, 8, 9];

// قديم ووحش
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

// Spread
const newArr = [1, 2, ...arr];
// [1, 2, 7, 8, 9]
```

من غير `...` هتبقى array جوّا array: `[1, 2, [7, 8, 9]]`.

## فرق مهم عن Destructuring
| | Destructuring | Spread |
|---|---|---|
| بيعمل إيه | بيطلع قيم في **متغيرات** | بيفرد كل القيم |
| بيتكتب فين | شمال الـ `=` | أماكن بتستنى قيم مفصولة بـ `,` |

مكانين بس ينفع فيهم Spread عادة:
1. بناء array جديدة: `[...arr]`
2. تمرير arguments لـ function: `fn(...arr)`

مش ينفع جوّا template literal: `` `${...arr}` `` → error.

## Use cases

### أضيف عنصر على array من غير ما ألمس الأصلية
```js
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
```

### Shallow copy لـ array
```js
const mainMenuCopy = [...restaurant.mainMenu];
```

### أدمج array-ين (أو أكتر)
```js
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
```

### على Strings (لأنها iterables)
```js
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
// ['J','o','n','a','s',' ','S.']
```

### Iterables = arrays, strings, maps, sets
**Objects مش iterables** بالمعنى القديم، بس من ES2018 الـ Spread شغال عليهم كمان (للـ properties).

### تمرير arguments لـ function
```js
restaurant.orderPasta = function (ing1, ing2, ing3) {
  console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
};

const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];

// قديم
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// Spread — أحسن بكثير
restaurant.orderPasta(...ingredients);
```

### Spread على Objects (من ES2018)
نسخ + إضافة properties:
```js
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant,
  founder: 'Guiseppe',
};
```

Shallow copy لـ object (بدل `Object.assign`):
```js
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
// الأصلية لسه Classico Italiano
```

## ملحوظات لنفسي
- `...` بتبني **نسخة جديدة**، مش بتعدّل الأصلية.
- Shallow copy = المستوى الأول بس. لو جوّا object تاني، لسه نفس الـ reference.
- قاعدة سريعة: لو هكتب قيم مفصولة بفاصلات → Spread ينفع.
