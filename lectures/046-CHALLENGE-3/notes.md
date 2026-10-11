# 046 — CHALLENGE #3: Video Solution

## الفكرة
رجعنا لمارك وجون والـ BMI، بس المرة دي بـ **objects وmethods و`this`**.

## المطلوب
- BMI = `mass / height ** 2`.
1. object لكل واحد فيه الاسم الكامل والوزن والطول (Mark Miller وJohn Smith).
2. method اسمها `calcBMI` على كل object (نفس الـ method في الاتنين)، تخزّن الـ BMI في property **وكمان** ترجّعه.
3. أطبع مين الـ BMI بتاعه أعلى بالاسم الكامل والـ BMI، مثلًا "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!".

- **TEST DATA:** مارك 78 kg و1.69 m، جون 92 kg و1.95 m.

## حل جوناس
```js
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi, john.bmi); // ~27.3 ~24.2

// "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

if (mark.bmi > john.bmi) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`)
} else if (john.bmi > mark.bmi) {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`)
}
```

### ملاحظات من الحل
- **calcBMI من غير parameters**: بتاخد الـ data من الـ object نفسه بـ this، زي calcAge في المحاضرة اللي فاتت.
- `this.bmi = ...` بيعمل property جديدة، وبعدين `return this.bmi`.
- `mark.calcBMI()` ← this = mark ← `mark.bmi = mark.mass / mark.height ** 2`.
- **من غير ما أنادي الـ method، `mark.bmi` مش هتبقى موجودة.** الـ method مش بتنادي نفسها.
- نسخ نفس الـ method في john، فاشتغلت مع data جون لأن this بقت john. نفس الكود بيتأقلم مع كل object.
- **تكرار الـ method في الاتنين ضد DRY.** فيه حل بالـ **OOP** بعدين، بس دلوقتي المهم إنها تشتغل.
- جوناس نسي `.log` تاني 😄 ("How can that still happen after all these years?").

### VS Code tips من الفيديو
- **Cmd + D:** يحدد الـ occurrence اللي بعدها، واستخدمه عشان يبدّل mark بـ john في الجملة.
- كتب `BMI` capital بدل `bmi` في الـ log. مقدرش يستخدم Cmd + D لأنه هيحدد حاجات مش عاوزها، فـ **Cmd + double click** على كل كلمة عشان يعمل multiple cursors. (ممكن تبقى Ctrl أو Option حسب الإعدادات.)

## التقنيات المستخدمة
- object literals.
- methods بـ function expression.
- `this` عشان أقرا properties وأعمل property جديدة.
- if / else if مع template literals.
- multiple cursors في VS Code.

## غلطات لازم أخلي بالي منها
- أستخدم `mark.bmi` قبل ما أنادي `mark.calcBMI()`، فتبقى undefined.
- الأسماء case sensitive: `bmi` غير `BMI`.
- أكتب `mark.mass` جوه الـ method بدل `this.mass`، فالـ method متنفعش لما أنسخها لـ john.

## ملحوظات لنفسي
- method واحدة بـ this تشتغل مع أي object، وده أول طعم من الـ OOP.
- لازم أنادي الـ method الأول عشان الـ property تتعمل.
- جوناس قال لو مش فاهم أوقف وأعيد، وهو نفسه بيعمل كده في الكورسات.
