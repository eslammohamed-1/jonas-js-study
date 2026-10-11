# 025 — CHALLENGE #3: Video Solution

## الفكرة
فريقين جمباز، Dolphins وKoalas، بيتنافسوا 3 مرات، واللي متوسطه أعلى ياخد الكاس. تمرين على if / else if / else والـ logical operators.

## المطلوب
1. أحسب متوسط كل فريق.
2. أقارن المتوسطين وأطبع مين كسب، ومنساش إن ممكن يبقى تعادل (draw).
3. **BONUS 1:** minimum score = 100. الفريق يكسب لو متوسطه أعلى **و**على الأقل 100. (HINT: logical operator + كذا else if)
4. **BONUS 2:** الـ minimum ينطبق على التعادل كمان: التعادل لو المتوسطين متساويين **والاتنين** ≥ 100. غير كده محدش ياخد الكاس.

- **DATA:** Dolphins 96 و108 و89. Koalas 88 و91 و110.
- **BONUS 1:** Dolphins 97 و112 و101. Koalas 109 و95 و123.
- **BONUS 2:** Dolphins 97 و112 و101. Koalas 109 و95 و106.

## حل جوناس
### الجزء 1 و2
```js
const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas) {
  console.log('Dolphins win the trophy 🏆');
} else if (scoreKoalas > scoreDolphins) {
  console.log('Koalas win the trophy 🏆');
} else if (scoreDolphins === scoreKoalas) {
  console.log('Both win the trophy!');
}
```
- الأقواس عشان الجمع يتعمل قبل القسمة (grouping ليه precedence أعلى).
- المتوسطين قريبين، والـ Dolphins أعلى شوية، فطبع "Dolphins win". ولما رفع واحد من أرقام الـ Koalas لـ 100، طبع "Koalas win".
- ملاحظات جوناس:
  - كان ممكن يكتب `scoreDolphins < scoreKoalas` في الشرط التاني، ونفس الكلام.
  - الشرط الأخير `===` مش محتاجه. لو الاتنين اللي قبله false، مفيش احتمال تاني غير التعادل، فـ `else` عادية كانت هتكفي.
  - لو حليتها بطريقة تانية، زي إني أخزّن الشروط في boolean variables أو أرتّب الـ if بشكل مختلف، مش مشكلة طالما النتيجة صح.

### BONUS 1 + BONUS 2 (الكود النهائي)
```js
// BONUS 1
const scoreDolphins = (97 + 112 + 80) / 3;
const scoreKoalas = (109 + 95 + 50) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log('Dolphins win the trophy 🏆');
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  console.log('Koalas win the trophy 🏆');
} else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >= 100) {
  console.log('Both win the trophy!');
} else {
  console.log('No one wins the trophy 😭');
}
```
- Bonus 1: زوّد `&& score >= 100` على شرط الفوز لكل فريق.
- Bonus 2: التعادل بقى محتاج 3 شروط بـ `&&`، وزوّد `else` في الآخر لـ "No one wins".

### جوناس جرّب حالات
- data الـ Bonus 2 (Koalas 106): المتوسطين متساويين والاتنين فوق 100 ← "Both win".
- نقّص أرقام 20 (81 و86): المتوسطين متساويين بس تحت 100 ← "No one wins".
- Dolphins حوالي 96 وKoalas حوالي 84 (الأرقام اللي في الكود فوق): Dolphins أعلى بس مش ≥ 100 ← true && false = false ← وكل الشروط التانية false ← "No one wins".

## التقنيات المستخدمة
- حساب متوسط بالأقواس.
- `if / else if / else` لكذا حالة.
- `&&` عشان أجمع أكتر من شرط.
- `>=` للحد الأدنى (100 نفسها داخلة).
- `===` للتعادل.
- اختبار كل الحالات بتغيير الـ data.

## غلطات لازم أخلي بالي منها
- أنسى الأقواس في المتوسط: `96 + 108 + 89 / 3` غلط.
- أنسى حالة إن محدش يكسب، يعني الـ else الأخيرة.
- في التعادل أشيك على فريق واحد بس ≥ 100. لازم الاتنين.

## ملحوظات لنفسي
- بعد ما أكتب الحل، أجرّب حالات حدية وأتأكد كل block بيتنفذ في وقته.
- جوناس قال لو معرفتش أحل الـ bonuses عادي، أرجع للمحاضرات وأراجع آخر مثال كويس.
- لو آخر شرط هو الاحتمال الوحيد الباقي، `else` كفاية.
