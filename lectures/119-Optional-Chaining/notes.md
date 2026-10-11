# 119 — Optional Chaining (?.)

## المشكلة
عايز ساعة الفتح يوم الإتنين:
```js
console.log(restaurant.openingHours.mon);       // undefined — مفيش mon
console.log(restaurant.openingHours.mon.open);  // ❌ TypeError
```
`undefined.open` → error.
الداتا ممكن تكون جاية من API — مش كل المطاعم بتفتح الإتنين، ومعرفش مسبقًا.

الحل القديم:
```js
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// ولو openingHours نفسها ممكن متبقاش موجودة:
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
```
بيبقى messy أوي مع الـ objects الـ nested اللي فيها properties اختيارية كتير.

## الحل: `?.` (ES2020)
```js
console.log(restaurant.openingHours.mon?.open);           // undefined — من غير error
console.log(restaurant.openingHours?.mon?.open);          // كذا واحد عادي
```
- لو اللي **قبل** `?.` موجود → يكمّل ويقرا اللي بعده
- لو مش موجود → يرجّع **undefined على طول**

"موجود" هنا = **مش nullish** (مش null ومش undefined). يعني 0 و `''` يعتبروا موجودين.

## مثال عملي: open/closed لكل يوم
```js
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}
// On mon, we open at closed
// ...
// On thu, we open at 12
// On fri, we open at 11
// On sat, we open at 0
```
- `[day]` — اسم الـ property جاي من متغير → لازم **bracket notation** (من سكشن الأساسيات). `.day` مش هينفع.
- كان `|| 'closed'` الأول → يوم السبت طلع **closed** غلط عشان بيفتح الساعة **0** (falsy). الحل `??`.

`?.` و `??` اتضافوا **مع بعض في ES2020** — معمولين يشتغلوا سوا، والاتنين على فكرة الـ nullish.

## على الـ Methods
أتأكد إن الـ method موجودة قبل ما أناديها:
```js
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// ['Focaccia', 'Pasta']

console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
// 'Method does not exist'
```
من غيرها: error إني بنادي حاجة مش function.

## على الـ Arrays
أتأكد إن الـ array مش فاضية:
```js
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');
// 'Jonas'  — أو 'User array empty' لو فاضية
```
من غيرها:
```js
if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');
```

## ملحوظات لنفسي
- خلي بالك: الـ syntax في الـ method call هو `fn?.()` — النقطة قبل القوسين.
- `?.` تقريبًا دايمًا معاها `??` عشان أعمل حاجة لو مفيش نتيجة.
- كنت فاكر إن `?.` بيتأكد من falsy، طلع **nullish** — فالـ 0 بيعدّي.
- الترتيب: `?.` بتسأل عن اللي **على شمالها**.
- `openingHours[day]` مش `openingHours.day`.
