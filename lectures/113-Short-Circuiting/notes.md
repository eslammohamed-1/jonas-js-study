# 113 — Short Circuiting (&& and ||)

## الفكرة
لحد دلوقتي كنت بستخدم `&&` و `||` مع booleans بس. طلع إنهم بيعملوا أكتر من كده بكتير.

3 حاجات عن الـ logical operators ماكنتش أعرفها:
1. بيشتغلوا مع **أي data type**
2. بيرجّعوا **أي data type** (مش لازم boolean)
3. بيعملوا **short-circuiting** (short-circuit evaluation)

## `||` — OR
**بيرجّع أول قيمة truthy**، ولو مفيش خالص → بيرجّع **آخر قيمة**.
لو أول operand truthy → بيرجّعه على طول ومش بيبص على الباقي أصلًا (ده الـ short circuit).

```js
console.log(3 || 'Jonas');        // 3
console.log('' || 'Jonas');       // 'Jonas'
console.log(true || 0);           // true
console.log(undefined || null);   // null  ← الاتنين falsy فرجّع الأخير

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello'
```
منطقي: OR بيبقى true لو واحد بس true → فلو أول واحد true مفيش داعي يكمّل.

### استخدامه: default values
```js
// بالـ ternary
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;

// بالـ OR — أسهل بكتير
const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10 لو مش موجودة، 23 لو numGuests = 23
```

### ⚠️ المشكلة: الـ 0
```js
restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10; // 10 ❌
```
0 هو العدد الحقيقي للضيوف، بس هو falsy → فخد الـ default. (والـ ternary نفس المشكلة.)
الحل في المحاضرة الجاية → `??`

## `&&` — AND
**بالعكس**: بيرجّع **أول قيمة falsy**، ولو كلهم truthy → بيرجّع **آخر قيمة**.
لو أول operand falsy → بيرجّعه على طول ومش بيبص على التاني.

```js
console.log(0 && 'Jonas');                  // 0
console.log(7 && 'Jonas');                  // 'Jonas'
console.log('Hello' && 23 && null && 'jonas'); // null — مش هيبص على 'jonas' أصلًا
```
منطقي: AND محتاج **كله** true → أول ما يلاقي false خلاص النتيجة false.

### استخدامه: أنفّذ حاجة لو حاجة موجودة
```js
// بالـ if
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// بالـ AND
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
```
لو orderPizza مش موجودة (undefined) → يقف ومحصلش حاجة. لو موجودة → ينفّذ التاني. والتاني ممكن يبقى أي expression حتى call لـ function.

## الخلاصة
| | بيرجّع | استخدام عملي |
|---|---|---|
| `\|\|` | أول **truthy** (أو آخر قيمة) | default values |
| `&&` | أول **falsy** (أو آخر قيمة) | أنفّذ الكود التاني لو الأول truthy |

## ملحوظات لنفسي
- كنت فاكر إن `||` و `&&` بيطلّعوا true/false دايمًا، طلع بيرجّعوا **القيمة نفسها**.
- `undefined || null` → `null` حتى لو null نفسها falsy (عشان هي الأخيرة).
- خلي بالك من الـ 0 والـ `''` مع `||` كـ default — هيضيعوا.
- جوناس قال: **متبدلش كل الـ if بـ && و ||** — الكود هيبقى صعب يتقري.
- طريقة الحفظ: OR بيدوّر على truthy، AND بيدوّر على falsy.
