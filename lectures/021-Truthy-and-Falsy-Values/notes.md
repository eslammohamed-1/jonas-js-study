# 021 — Truthy and Falsy Values

## الفكرة
عشان أفهم التحويل لـ boolean لازم أعرف الـ truthy والـ falsy. الـ **falsy** قيم مش false بالظبط، بس لما تتحوّل لـ boolean بتبقى false. وأي حاجة تانية **truthy**.

## أهم الحاجات
### الـ 5 Falsy Values
```js
// 5 falsy values: 0, '', undefined, null, NaN
```
- `0`، و`''` (empty string)، و`undefined`، و`null`، و`NaN`. **بس كده.**
- `false` نفسها false أصلًا، فمش بنعدّها في القايمة.
- أي حاجة تانية **truthy**، زي أي رقم غير 0، وأي string مش فاضية.

### `Boolean()`
```js
console.log(Boolean(0));         // false
console.log(Boolean(undefined)); // false
console.log(Boolean('Jonas'));   // true
console.log(Boolean({}));        // true ← empty object (objects جاية السيكشن الجاي)
console.log(Boolean(''));        // false
```
- `{}` حتى وهو فاضي truthy.
- جوناس قال إنه **عمره ما استخدم `Boolean()` في حياته**. ده بس عشان يشرح الفكرة.

### التحويل لـ boolean دايمًا implicit (coercion)
بيحصل في حالتين:
1. مع الـ **logical operators** (جايين بعدين).
2. في **logical context**، زي الـ condition بتاع if/else.

### مثال الفلوس
```js
const money = 0;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}
// You should get a job!
```
- جوه قوسين الـ if، JS بتحاول تعمل coerce لأي value لـ boolean بقواعد truthy/falsy.
- `money = 0` ← falsy ← false ← الـ else اتنفذ.
- لو `money = 100` ← truthy ← "Don't spend it all".
- double quotes عشان `don't` فيها `'`.

### أتأكد إن variable متعرّف ولا لأ
```js
let height;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
// Height is UNDEFINED
```
- `height` قيمته undefined وده falsy، فالـ else اتنفذ. ولو حطيت فيه أي قيمة هيطبع "defined".
- جوناس قال إننا هنحتاج نتأكد إن حاجة موجودة ولا لأ كتير في الكورس.

### ⚠️ الـ bug بتاع الصفر
```js
let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
// Height is UNDEFINED ❌ مع إن 0 رقم عادي
```
- `0` falsy، فدخل الـ else. ده **bug**، لأننا مفكرناش في حالة إن الـ height ممكن يبقى 0.
- الحل بالـ logical operators، وجاي بعدين.

## الفرق بين…
| Falsy (5 بس) | Truthy (أمثلة) |
|---|---|
| `0` | `100` |
| `''` | `'Jonas'` |
| `undefined` | `{}` |
| `null` | |
| `NaN` | |

## غلطات لازم أخلي بالي منها
- `if (height)` لو الرقم ممكن يبقى 0 بشكل طبيعي، هيتعامل كأنه مش موجود.
- أفتكر إن `{}` الفاضي falsy. هو truthy.
- (من نوتتي القديمة) `'0'` string مش فاضية، فهي truthy. الـ `0` الـ number بس هو اللي falsy.

## ملحوظات لنفسي
- الـ 5: صفر، string فاضية، undefined، null، NaN.
- مش هكتب `Boolean()`. التحويل بيحصل لوحده في الـ if.
- مشكلة الصفر دي هتتحل بالـ logical operators، أفتكرها.
