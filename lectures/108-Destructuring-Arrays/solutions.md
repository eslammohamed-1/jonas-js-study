# 108 — Destructuring Arrays (الحلول)

> ⚠️ متفتحش الملف ده غير بعد ما تجرّب التمارين في `exercises.md` بنفسك.
> كل حل جوّا `{ }` عشان تقدر تحطهم كلهم في نفس الـ `script.js` من غير تضارب أسماء.

---

## حل تمرين 1
```js
{
  const scores = [90, 75, 60];
  const [math, physics, chemistry] = scores;
  console.log(math, physics, chemistry); // 90 75 60
  console.log(scores); // [90, 75, 60]
}
```
**ليه كده:** الـ `[]` على الشمال بتفكك بالترتيب: أول متغير ياخد أول عنصر وهكذا. والـ array الأصلية مش بتتغير.

---

## حل تمرين 2
```js
{
  const [firstDish, secondDish] = restaurant.mainMenu;
  console.log(firstDish, secondDish); // Pizza Pasta
}
```
**ليه كده:** مش لازم آخد كل العناصر، الـ destructuring بياخد على قد عدد المتغيرات من الأول.

---

## حل تمرين 3
```js
{
  const [firstStarter, , , lastStarter] = restaurant.starterMenu;
  console.log(firstStarter, lastStarter); // Focaccia Caprese Salad
}
```
**ليه كده:** كل فاصلة فاضية (hole) بتعدّي عنصر. عدّينا التاني والتالت، فالمتغير التاني أخد الرابع.

---

## حل تمرين 4
```js
{
  let today = 'Thursday';
  let tomorrow = 'Friday';
  [today, tomorrow] = [tomorrow, today];
  console.log(today, tomorrow); // Friday Thursday
}

{
  const today = 'Thursday';
  const tomorrow = 'Friday';
  // [today, tomorrow] = [tomorrow, today];
  // ❌ TypeError: Assignment to constant variable.
  // لأن الـ swap إعادة تعيين، والـ const مينفعش يتعاد تعيينه.
}
```
**ليه كده:** على اليمين بنعمل array جديدة بالترتيب المعكوس، وعلى الشمال بنفككها في نفس المتغيرات. ومكتبناش `let` في سطر الـ swap لأن المتغيرات متعرّفة خلاص.

---

## حل تمرين 5
```js
{
  function getMinMax(numbers) {
    return [Math.min(...numbers), Math.max(...numbers)];
  }
  const [min, max] = getMinMax([4, 18, 2, 9]);
  console.log(min, max); // 2 18

  restaurant.order = function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  };
  const [starter, mainCourse] = restaurant.order(1, 2);
  console.log(starter, mainCourse); // Bruschetta Risotto
}
```
**ليه كده:** الـ function بترجع قيمة واحدة بس، لكن لو رجّعت array أقدر أفككها فورًا، فكأنها رجّعت قيمتين.
(الـ `...numbers` جوّا `Math.min` ده الـ Spread operator من محاضرة 111.)
ولاحظ إن الـ `order` اللي في `script.js` كانت بترجع `starterMenu[mainIndex]` بالغلط، والصح `mainMenu[mainIndex]`.

---

## حل تمرين 6
```js
{
  const ratings = [4.5, 3.8, [5, 4]];

  const [overall, , details] = ratings;
  console.log(overall, details); // 4.5 [5, 4]

  const [overall2, , [food, service]] = ratings;
  console.log(overall2, food, service); // 4.5 5 4
}
```
**ليه كده:** الشمال بيقلّد شكل اليمين. لما حطيت `[food, service]` مكان العنصر التالت، اتفككت الـ array الداخلية كمان.

---

## حل تمرين 7
```js
{
  const fromApi = [12];
  const [open, close = 22, days = 7] = fromApi;
  console.log(open, close, days); // 12 22 7

  const fromApi2 = [0, null];
  // توقعي: ؟
  const [p = 100, q = 100] = fromApi2;
  console.log(p, q); // 0 null
}
```
**ليه كده:** الـ default بيشتغل **بس** لما القيمة `undefined` (يعني العنصر مش موجود). `0` و`null` قيم موجودة فعلًا، فالـ defaults متطبقتش. دي المفاجأة.

---

## حل تمرين 8
```js
{
  const order = ['Table 5', ['Pizza', 'Pasta'], 'Cash'];

  let [table, [dish1, dish2], payment, tip = 0] = order;
  console.log(
    `${table} ordered ${dish1} & ${dish2}, paid by ${payment}, tip: ${tip}`
  );
  // Table 5 ordered Pizza & Pasta, paid by Cash, tip: 0

  // بونص: swap
  [dish1, dish2] = [dish2, dish1];
  console.log(`${dish1} & ${dish2}`); // Pasta & Pizza
}
```
**ليه كده:** جمعنا كل حاجة: ترتيب + nested + default. واستخدمنا `let` بدل `const` عشان البونص محتاج نعيد تعيين `dish1` و`dish2`. لو كانت `const` كان الـ swap هيدّي `TypeError`.
