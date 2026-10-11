# 117 — Looping Arrays: The for-of Loop

## الفكرة
طريقة جديدة من **ES6** للـ loop على array — من غير counter ولا condition ولا update.

```js
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
```
- اسمه for-of: "for item **of** menu"
- `item` = العنصر الحالي في كل لفة (أسميه زي ما أنا عايز)
- سطر واحد → مش محتاج `{ }` (زي الـ if)

## ✅ بيدعم `continue` و `break`
ده مهم: في السكشن الجاي هنتعلم طرق تانية للـ loop على arrays **مش بتدعم** continue/break. افتكر ده.

## طب لو عايز الـ index كمان؟
for-of معمول أصلًا للعنصر بس، فالـ index "a bit of a pain" — بس ينفع بـ `.entries()`:

```js
for (const item of menu.entries()) console.log(item);
// [0, 'Focaccia']
// [1, 'Bruschetta']
// ...
```
كل item بقى array: `[index, element]`.

### `menu.entries()` إيه ده؟
```js
console.log(menu.entries());       // Array Iterator {} — مش مفيد
console.log([...menu.entries()]);  // [[0,'Focaccia'], [1,'Bruschetta'], ...]
```
(الـ iterators هنفهمها آخر الكورس — دلوقتي الـ spread بس عشان أشوف جواها.)

### أطبع منيو حلو (يبدأ من 1)
الطريقة القديمة:
```js
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
```
الطريقة الأحسن — **destructuring** على طول في الـ loop:
```js
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
// 1: Focaccia
// 2: Bruschetta
// ...
```

## ملحوظات لنفسي
- كنت فاكر إن for-of بيدّيني الـ index لوحده، طلع لأ — لازم `.entries()`.
- خلي بالك: `menu.entries()` نفسها مش array، هي iterator. لو عايز أشوفها → `[...menu.entries()]`.
- `item[0] + 1` → عشان المنيو في الحقيقة مش بيبدأ من 0.
- for-of + destructuring = 🔥
