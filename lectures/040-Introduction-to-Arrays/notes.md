# 040 — Introduction to Arrays

## الفكرة
Array = data structure أحط فيه كذا قيمة في متغير واحد بالترتيب، بدل `friend1` و `friend2` و `friend3`.

```js
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020); // طريقة تانية، أقل استخدامًا
```

## أهم الحاجات

### الوصول بالـ index (بيبدأ من 0)
```js
console.log(friends[0]); // Michael
console.log(friends[2]); // Peter
```

### length (مش بيبدأ من 0)
```js
console.log(friends.length);                // 3
console.log(friends[friends.length - 1]);   // Peter ← آخر عنصر دايمًا
```
جوّا `[]` أقدر أحط أي **expression**.

### أعدّل عنصر (mutation)
```js
friends[2] = 'Jay';
console.log(friends); // ['Michael', 'Steven', 'Jay']
```

### const مع arrays
```js
friends[2] = 'Jay';          // ✅ بغيّر جوّا الـ array
friends = ['Bob', 'Alice'];  // ❌ TypeError: Assignment to constant variable
```
الـ array مش primitive، فـ `const` بيمنع إني أبدّله كله، مش إني أغيّر عناصره.

### أي نوع جوّا array
```js
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);        // فيه array جوّا array
console.log(jonas.length); // 5
```

### functions مع arrays
```js
const calcAge = function (birthYear) { return 2037 - birthYear; };
const years = [1990, 1967, 2002, 2010, 2018];

calcAge(years);  // NaN ← مينفعش أبعت الـ array كله
years + 10;      // '1990,1967,2002,2010,201810' ← اتحوّل string

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages); // [47, 70, 19]
```

## ملحوظات لنفسي
- `arr[arr.length]` = `undefined` مش error.
- `typeof []` = `'object'`.
- جوّا `[ ]` لما أعرّف array بحط expressions، مش statements.
