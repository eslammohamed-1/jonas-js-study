# 110 — Destructuring Objects

## الفكرة
نفس فكرة الـ arrays، بس بنستخدم `{}`، والأسماء لازم تطابق أسماء الـ properties.

```js
const { name, openingHours, categories } = restaurant;
```

الترتيب مش مهم في الـ objects، فمش محتاج أتخطى عناصر.

## أهم الحاجات

### أغيّر اسم المتغير
لسه لازم أكتب اسم الـ property، وبعدين `:` والاسم الجديد:
```js
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
```

### Default values
لو الـ property مش موجودة:
```js
const { menu = [], starterMenu: starters = [] } = restaurant;
// menu = []   (مش موجودة → default)
// starters = starterMenu الحقيقي
```

ممكن أجمع: اسم جديد + default مع بعض.

### Mutating variables موجودة قبل كده
لو `a` و `b` متعرّفين، ومش عايز `const`/`let` جديدة:
```js
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// غلط → JS فاكرة إن `{` بداية code block
// { a, b } = obj;

// الصح → أحطها جوّا قوسين
({ a, b } = obj);
// a=23, b=7
```

### Nested objects
Object جوّا object:
```js
const {
  fri: { open, close },
} = openingHours;
// open=11, close=23

// أو بأسماء مختلفة
const {
  fri: { open: o, close: c },
} = openingHours;
```

### Practical: function بتاخد object واحد
بدل ما أحط parameters كتير بالترتيب، أمرّر object والـ function تفككه فورًا:
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

// لو مبعتش time أو mainIndex → بياخد الـ defaults
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
```

## ليه مهم؟
- بيانات الـ API عادة objects.
- ترتيب الـ properties مش مهم → أسهل في الاستخدام.
- Defaults بتسندني لما البيانات ناقصة.

## ملحوظات لنفسي
- أسماء الـ properties لازم تطابق، مش زي الـ arrays.
- لو عايز mutate متغيرات موجودة: لازم `({ ... } = obj)`.
- Object كـ argument للـ function = تقنية شائعة جدًا في المكتبات.
