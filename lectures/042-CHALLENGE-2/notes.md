# 042 — CHALLENGE #2: Video Solution

## الفكرة
ستيفن لسه بيبني الـ tip calculator، بس المرة دي بـ function وarrays.

## المطلوب
- نفس القاعدة: 15% لو الـ bill بين 50 و300، وغير كده 20%.
1. function اسمها `calcTip` تاخد أي bill وترجّع الـ tip (أي نوع function). أختبرها بـ 100.
2. array اسمها `bills` فيها الـ test data.
3. array اسمها `tips` فيها tip كل bill باستخدام الـ function.
4. **BONUS:** array اسمها `total` فيها bill + tip.

- **TEST DATA:** 125 و555 و44.
- HINT: كل خانة في الـ array ممكن تبقى الـ return بتاع function، فأنادي الـ function جوه الـ array على طول من غير variables منفصلة.

## حل جوناس
```js
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);
```

### ملاحظات من الحل
- **calcTip:** function expression، ونفس منطق الـ ternary من الـ challenge اللي فات. نتيجة الـ ternary (`bill * 0.15` أو `bill * 0.2`) هي اللي بترجع.
- **نسخة arrow:** في سطر واحد ومن غير `return`. جوناس خلّى الـ expression عشان الـ readability، بس اختار اللي يعجبك.
- **tips:** نفس فكرة ages في محاضرة 40: كل خانة function call على bill بنفس الـ index.
  - طلعله "tips is not defined" لأنه كتب الاسم غلط.
  - جوناس بيحب يدّي الـ arrays **أسماء جمع** (bills، tips) لأنها values كتير.
  - كان ممكن tip1 وtip2 وtip3 وبعدين `[tip1, tip2, tip3]`، بس طريقته أنضف من غير variables زيادة. وفيه طريقة أحسن جاية في السيكشن (loops).
- **totals (Bonus):**
  - `bills + tips` **مش هتنفع**: الـ arrays هتتحوّل strings وتتلزق، ودي حاجة ملهاش لازمة.
  - الصح: element element، يعني `bills[0] + tips[0]` وهكذا، لأن كل واحد value حقيقية تتحسب.

## التقنيات المستخدمة
- function expression + ternary + `&&`.
- arrow function كبديل.
- function calls كـ elements في array.
- الوصول بالـ index `bills[0]`.
- جمع element element.

## غلطات لازم أخلي بالي منها
- `bills + tips` بتعمل string concatenation، مش جمع.
- اسم غلط (`tip` بدل `tips`) يطلّع not defined.
- أنسى أختبر calcTip بـ 100 الأول (المطلوب في نقطة 1).

## ملحوظات لنفسي
- الـ arrays أسماؤها جمع.
- مفيش operations على الـ array كلها. لازم element element، أو loop زي ما هنتعلم.
- جوناس قال فيه طريقة أحسن جاية، وهي الـ loops (challenge 4).
