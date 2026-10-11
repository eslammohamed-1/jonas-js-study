# 051 — CHALLENGE #4: Video Solution

## الفكرة
آخر نسخة من tip calculator بتاع ستيفن، المرة دي بـ **loops**. وفي الـ bonus function تحسب متوسط أي array.

## المطلوب
1. array اسمها `bills` فيها الـ 10 test values.
2. arrays فاضية للـ `tips` والـ `totals`.
3. أستخدم `calcTip` القديمة أحسب الـ tip والـ total (bill + tip) لكل bill **بـ for loop**.
- HINT: أنادي calcTip جوه الـ loop وأعمل push للنتايج.
4. **BONUS:** function اسمها `calcAverage` تاخد array اسمها `arr` وترجّع متوسط كل الأرقام فيها:
   - 4.1 variable اسمه `sum` يبدأ من 0، وألف على الـ array وأزوّد كل value عليه.
   - 4.2 أقسم الـ sum على length الـ array.
   - 4.3 أنادي الـ function بالـ `totals`.

- **TEST DATA:** 22، 295، 176، 440، 37، 105، 10، 1100، 86، 52.

## حل جوناس
```js
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calcAverage([2, 3, 7])); // 4
console.log(calcAverage(totals));    // ~275.19
console.log(calcAverage(tips));      // ~42.89
```

### ملاحظات من الحل
- جاب `calcTip` من فوق في نفس الفايل، وده سبب إننا بنحتفظ بكل الكود في فايل واحد.
- **الـ loop:** `i < bills.length` = 10، يعني آخر index 9.
- **ليه `const tip` جوه الـ loop وهو بيتغير؟** هو مش بيتغير. **كل iteration بيتعمل `tip` جديد**، فمفيش mutation، و`const` عادي.
- **حسب الـ tip مرة واحدة في variable** واستخدمه في الـ push التنين. كان ممكن أكتب `calcTip(bills[i])` مرتين، بس كده بحسب مرتين من غير لازمة.
- أحسن من الـ challenge اللي فات (index 0 و1 و2 بإيدي)، لأن **الـ loop هتتعامل مع أي عدد bills**.

### calcAverage (Bonus)
- function expression، وجوناس بيقول إنها النوع المفضل عنده.
- **generic:** الاسم `calcAverage` مش `calcAverageTotals`، لأنها تقبل أي array: bills أو tips أو scores أو أطوال.
- `let sum` لأنه بيتحدّث جوه الـ loop.
- `sum += arr[i]` هي هي `sum = sum + arr[i]`، shorthand.
- **اختبرها خطوة خطوة:** الأول عمل `console.log(sum)` مع `[2, 3, 6]` وطلع 11 ✅، وبعدين ضاف الـ return. 11 / 3 مش رقم صحيح، فغيّر الـ 6 لـ 7، فبقى sum = 12 و12 / 3 = 4 ✅.
- بعد ما بقت بترجّع بدل ما تطبع، **لازم أعمل log للنتيجة برّه**. return غير console.log.
- متوسط الـ totals حوالي 275.19، ومتوسط الـ tips حوالي 42.89.

## التقنيات المستخدمة
- for loop على array + `push` في arrays فاضية.
- إعادة استخدام function جوه loop.
- `const` جوه الـ loop (variable جديد كل iteration).
- accumulator pattern: `let sum = 0` + `+=`.
- function generic بتاخد array كـ parameter.
- اختبار بأرقام بسيطة قبل الـ data الحقيقية.

## غلطات لازم أخلي بالي منها
- أعمل `sum` بـ `const`، فمش هيعرف يتحدّث.
- أعرّف `sum = 0` **جوه** الـ loop، فهيتصفّر كل مرة.
- أنسى `return` وأفتكر الـ console.log جوه الـ function كفاية.
- أقسم على رقم ثابت بدل `arr.length`.

## ملحوظات لنفسي
- الـ accumulator (sum يبدأ 0 وأزوّد عليه في loop) pattern هستخدمه كتير.
- كل iteration ليه scope جديد، فـ const جوه الـ loop عادي.
- جوناس قال: قبل ما أكمّل للسيكشن الجاي أتأكد إني فاهم fundamentals السيكشنين، وممكن أعيد الـ challenges أو أعمل مسائل صغيرة من عندي.
- كده خلصت JavaScript Fundamentals Part 1 وPart 2 🎉
