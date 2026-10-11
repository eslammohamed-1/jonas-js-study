# 037 — Functions Calling Other Functions

## الفكرة
function بتنادي function تانية من جواها. بنعمل ده طول الوقت في JS، بس مبتدئين كتير بيتلخبطوا فيه، فجوناس عمله فيديو لوحده.

## أهم الحاجات
### المثال: الـ fruitProcessor محتاج ماكينة تقطيع
- الـ fruit processor بقى يعمل عصير من حتت فاكهة صغيرة بس، فمحتاج ماكينة تانية تقطّع الفاكهة الأول.

```js
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));
// Juice with 8 piece of apple and 12 pieces of orange.
```
- `cutFruitPieces` بتاخد عدد فاكهة وترجّعه مضروب في 4 (كل فاكهة 4 حتت). يعني 2 تفاحة ترجّع 8.
- جوه `fruitProcessor` بننادي `cutFruitPieces` **مرتين**: مرة للتفاح ومرة للبرتقان.

### الـ Data بتمشي إزاي (data flow)
1. `fruitProcessor(2, 3)` ← apples = 2، وoranges = 3.
2. `cutFruitPieces(apples)` ← الـ 2 بقت **argument** للـ cutFruitPieces، فبتحل مكان الـ parameter `fruit` ← fruit = 2.
3. `fruit * 4` = 8، ورجعت وانحطت في `applePieces`.
4. نفس الكلام للبرتقان: 3 × 4 = 12.
5. الـ juice string اتبنت بـ applePieces وorangePieces ورجعت.
- الحتة اللي بتلخبط: إننا بننادي cutFruitPieces **مش برقم كتبته بإيدي**، لكن بالـ argument اللي `fruitProcessor` استقبلته.
- مش محتاج أخزّن النتيجة في variable، أعمل log على طول.

### ليه منضربش في 4 على طول وخلاص؟
```js
const applePieces = apples * 4;   // كان ممكن
const orangePieces = oranges * 4;
```
1. عشان أوضح إن function تنادي function دي حاجة **عادية جدًا**.
2. **DRY:** لو الماكينة بقت تقطّع 3 حتت بدل 4، من غير function منفصلة هغيّر في كل مكان. في سطرين مش مشكلة، بس مع 10 فواكه هتبقى مزعجة ومصدر bugs.
   - مع الـ function: بغيّر `fruit * 3` في مكان واحد، فتطلع 6 و9.

## غلطات لازم أخلي بالي منها
- أنسى `return` في الـ function الصغيرة، فالكبيرة يوصلها `undefined`.
- أتلخبط بين أسماء الـ parameters. `fruit` جوه cutFruitPieces غير `apples`، وده عادي، القيمة هي اللي بتتنقل.

## ملحوظات لنفسي
- كل function ليها شغلانة واحدة واضحة.
- أتتبع الـ data بالأسهم: argument يروح للـ parameter، والـ return يرجع مكان الـ call.
- جوناس قال مع الوقت والتمرين هعرف إمتى أعمل function لوحدها وإمتى functions تنادي بعض.
