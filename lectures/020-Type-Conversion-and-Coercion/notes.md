# 020 — Type Conversion and Coercion

## الفكرة
- **Type conversion** = أنا اللي بحوّل النوع بإيدي (`Number()`، `String()`).
- **Type coercion** = JS بتحوّل لوحدها من ورا ضهري لما operator يتعامل مع نوعين مختلفين.

## أهم الحاجات

### Conversion بإيدي
```js
const inputYear = '1991';            // جاية من input = string
console.log(inputYear + 18);         // '199118' ❌ لزق
console.log(Number(inputYear) + 18); // 2009 ✅
console.log(Number(inputYear), inputYear); // 1991 '1991' ← الأصلي لسه string
```

### لو التحويل فشل → NaN
```js
console.log(Number('Jonas')); // NaN = Not a Number (رقم مش صالح)
console.log(typeof NaN);      // 'number' 😅
```

### رقم لنص
```js
console.log(String(23), 23); // '23' 23
```
JS بتحوّل لـ 3 أنواع بس: Number و String و Boolean.

### Coercion لوحدها
```js
console.log('I am ' + 23 + ' years old'); // + مع string → الرقم يبقى string
console.log('23' - '10' - 3);             // 10  ← - بتحوّل لرقم
console.log('23' * '2');                  // 46
console.log('23' / '2');                  // 11.5
console.log('23' > '18');                 // true ← المقارنة برضه بتحوّل لرقم
```
**القاعدة:** `+` = يحوّل لـ string. `- * / > <` = يحوّلوا لـ number.

### Guess the output
```js
let n = '1' + 1; // '11'
n = n - 1;       // 10
console.log(n);  // 10

console.log(2 + 3 + 4 + '5');          // '95'  (9 الأول وبعدين لزق)
console.log('10' - '4' - '3' - 2 + '5'); // '15' (1 وبعدين لزق)
```

## ملحوظات لنفسي
- الـ coercion مفيد (بيوفّر `String()` كتير)، بس لازم أفهم القواعد عشان مايعملش bugs.
- اتعامل من الشمال لليمين: كل خطوة أشوف نوع الطرفين.
- `'5' + 3` = `'53'`، و `'10' - '5'` = `5`.
