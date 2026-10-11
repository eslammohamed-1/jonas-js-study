# 037 — Functions Calling Other Functions

## الفكرة
function ممكن تنادي function تانية جواها. زي مصنع عصير بيبعت الفاكهة لماكينة تقطيع الأول.

```js
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));
// Juice with 8 pieces of apple and 12 pieces of orange.
```

## أهم الحاجات

### الداتا ماشية إزاي
1. `fruitProcessor(2, 3)` → `apples = 2`، `oranges = 3`.
2. `cutFruitPieces(apples)` → `fruit = 2` → ترجع `8` → `applePieces = 8`.
3. `cutFruitPieces(oranges)` → `fruit = 3` → ترجع `12` → `orangePieces = 12`.
4. يتبني النص ويرجع لبرّه ويتطبع.

### ببعت الـ parameter مش رقم ثابت
```js
cutFruitPieces(2);      // ❌ كده هيقطّع 2 دايمًا
cutFruitPieces(apples); // ✅ أي رقم يدخل للمصنع
```

### ليه مضربتش في 4 على طول؟ (DRY)
- لو عايز أغيّر التقطيع لـ 3 حتت، أغيّر في مكان واحد بس:
```js
function cutFruitPieces(fruit) { return fruit * 3; }
// Juice with 6 pieces of apple and 9 pieces of orange.
```
- كل function ليها شغلانة واحدة واضحة.

## ملحوظات لنفسي
- الـ function الصغيرة لازم ترجّع بـ `return`، وإلا هيوصل `undefined`.
- اسم الـ parameter جوّا كل function مستقل (`fruit` غير `apples`)، ده عادي.
- ده أول شكل لتقسيم الكود لحتت صغيرة بتكلم بعض.
