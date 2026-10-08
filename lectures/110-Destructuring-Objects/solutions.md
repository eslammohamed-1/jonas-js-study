# 110 — Destructuring Objects (الحلول)

> ⚠️ متفتحش الملف ده غير بعد ما تجرّب التمارين في `exercises.md` بنفسك.
> كل حل جوّا `{ }` عشان تقدر تحطهم كلهم في نفس الـ `script.js`.

---

## حل تمرين 1
```js
{
  const { name, location, mainMenu } = restaurant;
  console.log(name, location, mainMenu);
}
```
**ليه كده:** في الـ objects بنستخدم `{}` وبنكتب أسماء الـ properties بالظبط.

---

## حل تمرين 2
```js
{
  const { mainMenu, location, name } = restaurant;
  console.log(name, location, mainMenu); // نفس النتيجة

  const { locaton } = restaurant;
  console.log(locaton); // undefined
}
```
**ليه كده:** الـ object destructuring بيدوّر **بالاسم** مش بالترتيب، فالترتيب مش فارق. والاسم الغلط مش موجود في الـ object فبيرجع `undefined` (مش error).

---

## حل تمرين 3
```js
{
  const { name: title, categories: labels } = restaurant;
  console.log(title, labels); // Classico Italiano ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
  // console.log(categories); // ❌ ReferenceError (لو مفيش categories متعرّفة بره)
}
```
**ليه كده:** قبل `:` اسم الـ property، وبعدها اسم المتغير. المتغير اللي بيتعمل هو الاسم الجديد بس.

---

## حل تمرين 4
```js
{
  const {
    drinksMenu = ['Water'],
    mainMenu: mains = [],
    rating = 4.2,
  } = restaurant;
  console.log(drinksMenu, mains, rating); // ['Water'] ['Pizza', 'Pasta', 'Risotto'] 4.2
}
```
**ليه كده:** الـ default بيتطبق بس لما الـ property مش موجودة (`undefined`). `mainMenu` موجودة فأخدت قيمتها الحقيقية، والتانيين أخدوا الـ defaults. والشكل: `property: newName = default`.

---

## حل تمرين 5
```js
{
  let city = 'Cairo';
  let country = 'Egypt';
  const place = { city: 'Firenze', country: 'Italy', zip: 50132 };

  // { city, country } = place;
  // ❌ SyntaxError: Unexpected token '='
  // لأن السطر بيبدأ بـ { فـ JS فاكراه code block

  ({ city, country } = place);
  console.log(city, country); // Firenze Italy
}
```
**ليه كده:** القوسين بيقولوا لـ JS إن ده expression مش block، فتعرف إنه destructuring assignment.

---

## حل تمرين 6
```js
{
  const {
    thu: { open, close },
  } = restaurant.openingHours;
  console.log(open, close); // 12 22

  const {
    openingHours: {
      sat: { open: satOpen, close: satClose },
    },
  } = restaurant;
  console.log(satOpen, satClose); // 0 24
}
```
**ليه كده:** بعد `:` بدل اسم جديد بنحط `{}` تانية، فبيكمّل تفكيك لجوّا. وفي التاني نزلنا مستويين: `openingHours` ثم `sat`. ولاحظ إن `openingHours` و`sat` مش بيبقوا متغيرات.

---

## حل تمرين 7
```js
{
  // من غير default على sun:
  // const { sun: { open: sunOpen, close: sunClose } } = restaurant.openingHours;
  // ❌ TypeError: Cannot read properties of undefined (reading 'open')

  const {
    sun: { open: sunOpen = 'closed', close: sunClose = 'closed' } = {},
  } = restaurant.openingHours;
  console.log(sunOpen, sunClose); // closed closed
}
```
**ليه كده:** `sun` نفسها `undefined`، ومينفعش أفكك `undefined`. فحطيت default `= {}` لـ `sun`، فبقى بيفكك object فاضي، وجوّاه `open` و`close` مش موجودين فأخدوا `'closed'`.

---

## حل تمرين 8
```js
{
  restaurant.orderDelivery = function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  } = {}) {
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
    starterIndex: 0,
  });
  // Order received! Focaccia and Pizza will be delivered to Via del Sole, 21 at 20:00

  // بونص
  restaurant.orderDelivery();
  // Order received! Bruschetta and Pizza will be delivered to undefined at 20:00
}
```
**ليه كده:** الـ function بتفكك الـ object وهو داخل، فالترتيب وقت النداء مش مهم، والـ defaults بتسد الناقص. والبونص هو `= {}` بعد الـ `}`: لو مفيش argument خالص، بيفكك object فاضي بدل `undefined`، فمش هيضرب `TypeError`. (`address` لسه `undefined` لأن ملهاش default، وده طبيعي.)
