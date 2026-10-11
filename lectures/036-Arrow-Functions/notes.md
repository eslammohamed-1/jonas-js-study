# 036 — Arrow Functions

## الفكرة
Arrow function = شكل أقصر من الـ function expression، ظهر في ES6.

```js
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const calcAge3 = birthYear => 2037 - birthYear;
console.log(calcAge3(1991)); // 46
```

## أهم الحاجات

### parameter واحد + سطر واحد
- مش محتاج `()` حوالين الـ parameter.
- مش محتاج `{}` ولا `return`، القيمة بترجع لوحدها (**implicit return**).

### أكتر من سطر → `{}` و `return`
```js
const yearsUntilRetirement = birthYear => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return retirement;   // لازم أكتبها هنا
};
console.log(yearsUntilRetirement(1991)); // 19
```

### أكتر من parameter → `()`
```js
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};
console.log(yearsUntilRetirement(1991, 'Jonas')); // Jonas retires in 19 years
console.log(yearsUntilRetirement(1980, 'Bob'));   // Bob retires in 8 years
```

### من غير parameters
```js
const greet = () => 'Hello!';
```

### ملخص الأشكال
| الحالة | الشكل |
|---|---|
| param واحد + سطر | `x => x * 2` |
| أكتر من param | `(a, b) => a + b` |
| مفيش params | `() => 'hi'` |
| أكتر من سطر | `(…) => { …; return …; }` |

## ملحوظات لنفسي
- الـ arrow مالهاش `this` بتاعها، فمش هتنفع في كل حتة (زي الـ methods). جوناس هيشرح ده بعدين.
- `{}` من غير `return` = بترجع `undefined`.
- أرجّع object على طول: `() => ({ a: 1 })` بأقواس.
