# 108 — Destructuring Arrays

## الفكرة
Destructuring = تفكيك الـ array (أو الـ object) وأخذ القيم منه في متغيرات منفصلة.
مش بيكسر الـ array الأصلي، بيطلع منه قيم بس.

```js
const arr = [2, 3, 4];

// قديم
const a = arr[0];
const b = arr[1];
const c = arr[2];

// حديث
const [x, y, z] = arr;
// x=2, y=3, z=4
```

## أهم الحاجات

### مش لازم آخد كل العناصر
```js
const [first, second] = restaurant.categories;
// Italian, Pizzeria
```

### أتخطى عنصر
أحط مكان فاضي (hole) بفاصلة:
```js
let [main, , secondary] = restaurant.categories;
// Italian, Vegetarian  ← عدّى على العنصر التاني
```

### تبديل متغيرين من غير temp
لازم المتغيرات تكون `let` مش `const`، لأننا بنعيد تعيين قيمهم.
```js
// قديم
const temp = main;
main = secondary;
secondary = temp;

// بـ destructuring
[main, secondary] = [secondary, main];
```

### أخد قيمتين من function راجعة array
```js
const [starter, mainCourse] = restaurant.order(2, 0);
// garlic bread, pizza
```

### Nested destructuring
Array جوّا array:
```js
const nested = [2, 4, [5, 6]];

const [i, , j] = nested;          // i=2, j=[5,6]
const [i2, , [j2, k]] = nested;   // i2=2, j2=5, k=6
```

### Default values
لو العنصر مش موجود → مش undefined، آخد قيمة افتراضية:
```js
const [p = 1, q = 1, r = 1] = [8, 9];
// p=8, q=9, r=1
```
مفيد لما البيانات تيجي من API ومش عارف طول الـ array.

## ملحوظات لنفسي
- الـ `[]` على شمال الـ `=` مش array، دي destructuring assignment.
- الـ array الأصلي بيفضل زي ما هو.
- الترتيب مهم في الـ arrays (مش زي الـ objects).
