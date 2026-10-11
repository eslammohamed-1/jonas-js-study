# 039 — CHALLENGE #1: Video Solution

## الفكرة
رجعنا لفريقين الجمباز Dolphins وKoalas، بس بقاعدة جديدة: الفريق يكسب **بس** لو متوسطه على الأقل **ضعف** متوسط التاني. تمرين على arrow functions وfunctions عادية وإزاي الـ data بتتنقل بينهم.

## المطلوب
1. arrow function اسمها `calcAverage` تحسب متوسط 3 scores.
2. أستخدمها أحسب متوسط الفريقين.
3. function اسمها `checkWinner` تاخد `avgDolphins` و`avgKoalas` وتطبع الفايز ونقطه، مثلًا "Koalas win (30 vs. 13)".
4. أستخدم checkWinner مع DATA 1 وDATA 2.
5. أتجاهل التعادل.

- **DATA 1:** Dolphins 44 و23 و71، Koalas 65 و54 و49.
- **DATA 2:** Dolphins 85 و54 و41، Koalas 23 و34 و27.
- HINT: A على الأقل ضعف B يعني `A >= 2 * B`.

## حل جوناس
```js
const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5)); // 4 ← اختبار سريع

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('No team wins...');
  }
}
checkWinner(scoreDolphins, scoreKoalas); // No team wins...

checkWinner(576, 111); // Dolphins win 🏆 (576 vs. 111)

// Test 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas); // Dolphins win 🏆 (60 vs. 28)
```

### ملاحظات من الحل
- **calcAverage:**
  - `a, b, c` أسماء generic عن قصد، لأنها تحسب متوسط أي 3 أرقام مش scores بس. والأسماء الأوضح مقبولة برضه.
  - `()` حوالين الـ parameters لأنهم أكتر من واحد، وسطر واحد فـ **مفيش return** (implicit).
  - اختبرها بـ 3 و4 و5، والمتوسط المفروض 4، قبل ما يكمّل.
- **الـ function زي ماكينة:** مش فارق معاها الـ inputs جاية منين ورايحة فين، scores أو أطوال أو فلوس. **standalone ومعزولة** عن باقي الكود، ولازم أستوعب الحتة دي.
- **Test 1:** الـ Koalas أعلى بس مش الضعف، فطبع "No team wins...".
- **checkWinner برضه independent:** ناداها بأرقام عشوائية (576، 111) واشتغلت. مش لازم القيم تيجي من calcAverage.
- **غلطة إملائية:** كاتب `avgDolhins` (ناقص p)، فحددها بـ **Cmd + D** كذا مرة وصلّحها في كل الأماكن مرة واحدة.
- **Test 2:** عشان يعيد استخدام نفس الـ variables، خلّاهم **`let`**، وفي التانية شال `let` (reassign مش variable جديد). النتيجة 60 vs. 28، يعني الـ Dolphins كسبوا بالعافية. لو الـ Koalas معاهم 3 نقط زيادة محدش كان هيكسب.
  - كان ممكن أعمل variables جديدة لـ test 2، وده مقبول برضه.

### الـ data flow
- `calcAverage(44, 23, 71)` ← النتيجة اتخزنت في `scoreDolphins` ← اتبعتت argument لـ `checkWinner` ← بقت `avgDolphins` جوه الـ function.

## التقنيات المستخدمة
- arrow function بأكتر من parameter وimplicit return.
- function expression فيها if / else if / else.
- template literals.
- `>=` و`2 *` للشرط.
- `let` عشان reassign.
- Cmd + D لتعديل كذا occurrence.

## غلطات لازم أخلي بالي منها
- أنسى `()` حوالين `(a + b + c)` قبل القسمة.
- أعمل الـ scores بـ `const` وبعدين أحاول أعيد assign.
- أكتب `let` تاني في test 2، فيطلع error لأن الـ variable موجود.

## ملحوظات لنفسي
- أختبر أي function بأرقام سهلة الأول قبل ما أستخدمها.
- الـ function مش لازم تعرف القيم جاية منين، وده اللي بيخليها reusable.
- الحل في final folder في الـ repo.
