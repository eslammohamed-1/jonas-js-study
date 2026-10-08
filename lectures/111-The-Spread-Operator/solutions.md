# 111 — The Spread Operator `...` (الحلول)

> ⚠️ متفتحش الملف ده غير بعد ما تجرّب التمارين في `exercises.md` بنفسك.
> كل حل جوّا `{ }` عشان تقدر تحطهم كلهم في نفس الـ `script.js`.

---

## حل تمرين 1
```js
{
  const nums = [3, 4, 5];
  const withoutSpread = [1, 2, nums];
  const withSpread = [1, 2, ...nums];
  console.log(withoutSpread); // [1, 2, [3, 4, 5]] ← array جوّا array
  console.log(withSpread);    // [1, 2, 3, 4, 5]   ← العناصر اتفردت

  console.log(withSpread);    // [1, 2, 3, 4, 5]
  console.log(...withSpread); // 1 2 3 4 5
}
```
**ليه كده:** من غير `...` بنحط الـ array كلها كعنصر واحد. بالـ `...` كأننا كتبنا `3, 4, 5` بإيدينا. وفي `console.log(...)` كأننا بعتنا 5 arguments منفصلين.

---

## حل تمرين 2
```js
{
  const newMainMenu = ['Lasagna', ...restaurant.mainMenu, 'Gnocchi'];
  console.log(newMainMenu);         // ['Lasagna', 'Pizza', 'Pasta', 'Risotto', 'Gnocchi']
  console.log(restaurant.mainMenu); // ['Pizza', 'Pasta', 'Risotto']
}
```
**ليه كده:** الـ `[]` بتبني array جديدة من الصفر، والـ spread بيفرد العناصر في أي مكان فيها (أول، نص، آخر). والأصلية مش بتتلمس.

---

## حل تمرين 3
```js
{
  const realCopy = [...restaurant.starterMenu];
  const fakeCopy = restaurant.starterMenu;

  realCopy.push('Olives');
  console.log(realCopy);               // [..., 'Caprese Salad', 'Olives']
  console.log(restaurant.starterMenu); // من غير Olives ✅

  // fakeCopy.push('Olives');
  // توقعي: restaurant.starterMenu هتتعدل هي كمان، لأن fakeCopy
  // مش نسخة، دي reference لنفس الـ array في الـ memory.
}
```
**ليه كده:** `[...arr]` بتعمل array جديدة. لكن `=` لوحدها بتنسخ الـ reference بس.

---

## حل تمرين 4
```js
{
  const fullMenu = [...restaurant.starterMenu, '---', ...restaurant.mainMenu];
  console.log(fullMenu);
  // ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', '---', 'Pizza', 'Pasta', 'Risotto']

  const [s1, s2] = fullMenu;
  console.log(s1, s2); // Focaccia Bruschetta

  // الفرق:
  // 1) Spread: بيفرد كل العناصر، ومش بيعمل متغيرات، ومكانه يمين الـ =.
  // 2) Destructuring: بيطلع عناصر معينة في متغيرات جديدة، ومكانه شمال الـ =.
}
```
**ليه كده:** نفس الـ array، بس كل أداة ليها شغلانة مختلفة.

---

## حل تمرين 5
```js
{
  const nameLetters = [...'Eslam', '!'];
  console.log(nameLetters); // ['E', 's', 'l', 'a', 'm', '!']

  console.log(...'Classico'); // C l a s s i c o

  const allFoods = [...italianFoods, ...mexicanFoods];
  console.log(allFoods); // 12 عنصر (tomatoes و garlic متكررين)

  // const arrFromObj = [...restaurant];
  // ❌ TypeError: restaurant is not iterable

  // console.log(`${...'Eslam'}`);
  // ❌ SyntaxError: Unexpected token '...'
  // لأن ${} بتستنى قيمة واحدة، مش قيم مفصولة بفاصلات.
}
```
**ليه كده:** الـ spread شغال على أي iterable: arrays وstrings وmaps وsets. والـ objects مش iterables، فمينفعش تتفرد جوّا `[]`.

---

## حل تمرين 6
```js
{
  restaurant.orderPasta = function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  };

  const ingredients = ['mushrooms', 'cream', 'parmesan'];
  // أو:
  // const ingredients = [
  //   prompt("Let's make pasta! Ingredient 1?"),
  //   prompt('Ingredient 2?'),
  //   prompt('Ingredient 3?'),
  // ];

  restaurant.orderPasta(...ingredients);
  // Here is your delicious pasta with mushrooms, cream and parmesan

  const prices = [45, 120, 80, 60];
  console.log(Math.max(...prices)); // 120
  console.log(Math.max(prices));    // NaN
}
```
**ليه كده:** `fn(...arr)` = `fn(arr[0], arr[1], arr[2])`. و`Math.max` بتستنى أرقام منفصلة، فلو بعتلها array كلها بترجع `NaN`.

---

## حل تمرين 7
```js
{
  const branch = { ...restaurant, location: 'Zamalek, Cairo', manager: 'Eslam' };
  console.log(branch.location);     // Zamalek, Cairo
  console.log(restaurant.location); // Via Angelo Tavanti 23, Firenze, Italy

  const branch2 = { location: 'Zamalek, Cairo', ...restaurant };
  console.log(branch2.location); // Via Angelo Tavanti 23, Firenze, Italy
  // لأن ...restaurant جت بعدها وفيها location، فكتبت عليها.

  const restaurantCopy = { ...restaurant };
  restaurantCopy.name = 'Ristorante Roma';
  console.log(restaurantCopy.name, restaurant.name); // Ristorante Roma Classico Italiano
}
```
**ليه كده:** من ES2018 ينفع spread جوّا `{}`. ولو فيه property متكررة، **اللي بعد** هو اللي بيكسب. و`{ ...obj }` = shallow copy أسهل من `Object.assign`.

---

## حل تمرين 8
```js
{
  const order = {
    table: 5,
    items: ['Pizza', 'Pasta'],
  };

  const orderCopy = { ...order };
  orderCopy.table = 9;
  orderCopy.items.push('Tiramisu');

  // توقعي: ...
  console.log(order.table); // 5
  console.log(order.items); // ['Pizza', 'Pasta', 'Tiramisu'] 😮

  // التصليح: أنسخ الـ array الداخلية كمان
  const order2 = { table: 5, items: ['Pizza', 'Pasta'] };
  const safeCopy = { ...order2, items: [...order2.items] };
  safeCopy.items.push('Tiramisu');
  console.log(order2.items);   // ['Pizza', 'Pasta'] ✅
  console.log(safeCopy.items); // ['Pizza', 'Pasta', 'Tiramisu']
}
```
**ليه كده:** الـ spread بيعمل **shallow copy**، يعني بينسخ المستوى الأول بس. `table` رقم فاتنسخ عادي، لكن `items` array، فالنسخة أخدت **نفس الـ reference**. التصليح: نعمل spread للـ array الداخلية كمان، و`items` اللي بعد `...order2` بتكتب على القديمة.
