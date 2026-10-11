# 011 — Data Types

## الفكرة
أي value في JS يا **object** يا **primitive**.
فيه **7 primitive types**، وأهم 3 هستخدمهم طول الوقت: Number و String و Boolean.

```js
let me = { name: 'Jonas', age: 30 }; // object (هنتعلمه بعدين)

let firstName = 'Jonas';  // primitive
let age = 30;
let isStudent = true;
```

## أهم الحاجات

### الـ 7 primitives
| النوع | يعني | مثال |
|---|---|---|
| Number | أي رقم، صحيح أو عشري (كله floating point) | `23` = `23.0`، `9.99` |
| String | نص بين `'…'` أو `"…"` | `'Jonas'` |
| Boolean | `true` أو `false` بس | `true` |
| Undefined | متغير اتعرّف ومتحطش فيه قيمة | `let children;` |
| Null | فاضي بس **أنا** اللي حاطه عن قصد | `let color = null;` |
| Symbol (ES2015) | قيمة فريدة مبتتغيرش | `Symbol('id')` |
| BigInt (ES2020) | أرقام صحيحة أكبر من اللي Number يشيلها | `123n` |

### typeof
بيرجّع **string** فيه اسم النوع:
```js
typeof true;       // 'boolean'
typeof 23;         // 'number'
typeof 'Jonas';    // 'string'
typeof undefined;  // 'undefined'
typeof null;       // 'object' ← bug قديم ومش هيتصلح (legacy)
```

### Dynamic Typing
النوع بتاع الـ **value** مش بتاع المتغير. مش بقول النوع وأنا بعرّف، وأقدر أحط في نفس المتغير نوع تاني:
```js
let javaScriptIsFun = true;
console.log(typeof javaScriptIsFun); // boolean

javaScriptIsFun = 'YES!';            // من غير let
console.log(typeof javaScriptIsFun); // string
```

### undefined: القيمة والنوع واحد
```js
let year;
console.log(year);        // undefined
console.log(typeof year); // undefined

year = 1991;
console.log(typeof year); // number
```

### Comments
```js
// سطر واحد
/* أكتر
   من سطر */
// console.log(x);  ← أوقف كود مؤقتًا من غير ما أمسحه
```
اختصار: `Cmd + /` على الماك.

## ملحوظات لنفسي
- `console.log(Jonas)` من غير quotes → ReferenceError، JS فاكراه اسم متغير.
- `true` و `false` small letters بس، `True` غلط.
- undefined = لسه مفيش قيمة (JS حاطاها)، null = فاضي عن قصد (أنا حاطه).
- `'100'` غير `100`، لو مش متأكد اعمل `typeof`.
