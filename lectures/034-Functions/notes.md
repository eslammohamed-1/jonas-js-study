# 034 — Functions

## الفكرة
الـ function = حتة كود بكتبها مرة وأستخدمها كتير.
زي **ماكينة**: بتاخد مدخلات (parameters)، تشتغل عليها، وترجّع ناتج (return).

```js
function logger() {
  console.log('My name is Jonas');
}

logger(); // calling / running / invoking
logger();
logger();
```

## أهم الحاجات

### Parameters و Arguments و return
```js
function fruitProcessor(apples, oranges) {   // apples, oranges = parameters
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;                               // بيطلّع القيمة برّه
}

const appleJuice = fruitProcessor(5, 0);      // 5, 0 = arguments
console.log(appleJuice); // Juice with 5 apples and 0 oranges.

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
```
- **parameter** = الخانة الفاضية في التعريف (متغير محلي جوّا الـ function).
- **argument** = القيمة الحقيقية اللي بحطها وأنا بنادي.

### أمسك الـ return value
```js
const appleJuice = fruitProcessor(5, 0); // الأحسن: أخزنها
console.log(fruitProcessor(5, 0));       // أو أطبعها على طول
```
الاستدعاء نفسه بيتبدل بالقيمة اللي رجعت.

### return بتوقف الـ function
أي سطر بعد `return` مش بيتنفذ.

### console.log ≠ return
```js
function addLog(a, b) { console.log(a + b); }
const r1 = addLog(3, 5);  // يطبع 8، بس r1 = undefined

function addReturn(a, b) { return a + b; }
const r2 = addReturn(3, 5); // r2 = 8
```

### عدد arguments غلط
```js
function add(a, b) { return a + b; }
add(3);         // b = undefined → NaN
add(3, 5, 100); // 8، الزيادة بتتجاهل
```

### DRY = Don't Repeat Yourself
لو بكرر نفس الكود → أحطه في function. و `console.log()` و `Number()` نفسهم functions جاهزة.

## ملحوظات لنفسي
- function من غير return بترجّع `undefined`.
- الـ function اللي مفيهاش parameters ولا return عادي، زي `logger`.
- الـ `()` هي اللي بتشغّل الـ function، من غيرها أنا بشاور عليها بس.
