# 024 — Logical Operators

## الفكرة
نطبّق الـ boolean logic في JS: `&&` (AND) و`||` (OR) و`!` (NOT)، ونستخدمهم ناخد decision معقدة: سارة تسوق ولا لأ.

## أهم الحاجات
### الـ Operators في JS
```js
const hasDriversLicense = true; // A
const hasGoodVision = true;     // B

console.log(hasDriversLicense && hasGoodVision); // true
console.log(hasDriversLicense || hasGoodVision); // true
console.log(!hasDriversLicense);                 // false
```
- `&&` = AND، و`||` = OR، و`!` = NOT.
- لو `hasGoodVision = false`:
  - `&&` ← false (يكفي واحد false)
  - `||` ← true (يكفي واحد true)

### ناخد decision
```js
const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}
```
- الـ variable ده كان عشان يوضح طريقة التفكير بس. عادةً بنكتب الـ condition جوه الـ if على طول:
```js
if (hasDriversLicense && hasGoodVision) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}
```
- لو `hasGoodVision = false` ← "Someone else should drive...".
- لو الاتنين true ← "Sarah is able to drive!".

### variable تالت: isTired (C)
```js
const isTired = true; // C
console.log(hasDriversLicense && hasGoodVision && isTired); // true
```
- أكتر من 2 operands: بزوّد `&&` أو `||` تاني، زي ما بزوّد `+`.
- مع isTired = true:
  - `A || B || C` ← true
  - `A && B && C` ← true (كلهم true)
  - لو واحد بقى false، الـ `&&` كله يبقى false.

### الـ decision النهائي
سارة تسوق لو معاها رخصة **و**نظرها كويس **و**مش تعبانة:
```js
if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}
```
- `!isTired` بيبقى true لما isTired يبقى false.
- لو `isTired = true`: يبقى true && true && **false** ← false ← "Someone else should drive...".
- لو `isTired = false`: يبقى true && true && true ← "Sarah is able to drive!".

## الفرق بين…
| Operator | في JS | بيرجّع true لما |
|---|---|---|
| AND | `&&` | كل الـ operands true |
| OR | `\|\|` | واحد على الأقل true |
| NOT | `!` | الـ value false |

## غلطات لازم أخلي بالي منها
- أنسى الـ `!` قدام isTired، فالشرط يبقى "تسوق وهي تعبانة".
- أستخدم `||` مكان `&&` في شرط كل حاجة فيه لازم تتحقق.

## ملحوظات لنفسي
- `&&` و`||` بيتسلسلوا عادي: `a && b && c`.
- `!` بتتقري "مش": `!isTired` = مش تعبانة.
- جوناس قال: لو حسيت بلخبطة أرجع أحلل المثال تاني مع محاضرة 23، والتمرين هو اللي هيثبّت.
