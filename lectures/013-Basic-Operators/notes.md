# 013 — Basic Operators

## الفكرة
الـ operator بياخد value أو أكتر ويطلّع value جديدة.
أنواعه: arithmetic، assignment، comparison، logical (الأخير له درس لوحده).

```js
const now = 2037;
const ageJonas = now - 1991; // 46
const ageSarah = now - 2018; // 19
console.log(ageJonas, ageSarah); // كذا value في console.log واحدة
```

## أهم الحاجات

### Arithmetic: `+ - * / **`
```js
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 92 4.6 8   ← ** = أُس (2 × 2 × 2)
```

### `+` مع النصوص = concatenation
```js
const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName); // Jonas Schmedtmann
console.log(firstName + lastName);       // JonasSchmedtmann ← نسيت المسافة
```

### Assignment: `= += *= ++ --`
```js
let x = 10 + 5; // 15  ← الـ + بيتنفذ الأول وبعدين =
x += 10;        // x = x + 10 → 25
x *= 4;         // x = x * 4 → 100
x++;            // 101
x--;
x--;            // 99
```

### Comparison: `> < >= <=` → بترجع Boolean
```js
console.log(ageJonas > ageSarah); // true
console.log(ageSarah >= 18);      // true  (19 أكبر من أو يساوي 18)

const isFullAge = ageSarah >= 18; // أخزن النتيجة في متغير
```

### أقدر أخلط الحساب والمقارنة
```js
console.log(now - 1991 > now - 2018); // true
```
الطرح بيتحسب الأول وبعدين المقارنة (precedence، الدرس الجاي).

## ملحوظات لنفسي
- `'5' + 3` = `'53'` مش 8، الـ `+` مع string بيلزق.
- `>=` يعني "أكبر من **أو يساوي**"، 18 نفسها بتدّي true.
- `x++` و `++x` مختلفين لو بستخدم القيمة في نفس السطر (`let b = a++` بياخد القديمة).
- `2 + 3 * 4` = 14، الضرب قبل الجمع.
