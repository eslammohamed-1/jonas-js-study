# 047 — Iteration: The for Loop

## الفكرة
الـ loops **control structure** تانية زي if/else، وآخر موضوع كبير في سيكشن الـ fundamentals. بتخليني أعمل **automate** لمهمة بتتكرر. أول نوع: الـ **for loop**، وده loop ليه counter.

## أهم الحاجات
### المشكلة: الجيم 🏋️
```js
// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// ... لحد 10
```
- 10 تكرارات = 10 سطور متكررة، ولو 30 يبقى 30. ولو عاوز أغيّر كلمة، هغيّرها في كل السطور.
- ده **ضد DRY**. الحل loop تنفّذ السطر تاني وتاني لحد ما أقولها تقف.

### الـ for loop
```js
// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}
```
الـ for statement ليه **3 أجزاء** بينهم `;`:
1. **القيمة الابتدائية للـ counter:** `let rep = 1`. الـ rep (repetition) variable عادي. لازم **`let`** لأن الـ loop هتغيّره.
2. **الـ condition:** `rep <= 10`. **بيتشيك قبل كل iteration.** لو true يتنفذ الـ iteration، ولو false الـ loop تقف.
3. **تحديث الـ counter بعد كل iteration:** `rep = rep + 1`، أو أبسط: **`rep++`**.

- **الـ for loop بتفضل شغالة طول ما الـ condition true.** جوناس كتبها comment وقال ده نوع النوتس اللي يتمنى إننا ناخدها.
- من غير الجزء التالت، rep هيفضل 1 للأبد والـ condition عمره ما يبقى false.

### الأول بنص ثابت
- لما الـ string كانت ثابتة ("repetition 1")، الـ dev tools مطبعتش نفس السطر 10 مرات. حطت **رقم 10 جنبه** (يعني اتكرر 10 مرات).

### أستخدم الـ counter جوه الـ loop
- `rep` variable عادي ومتاح جوه الـ block، فحوّلنا الـ string لـ template literal وحطينا `${rep}`. كده بقت تطبع 1، 2، 3… dynamically.

### بيمشي إزاي؟ (خطوة بخطوة)
- rep = 1 ← الشرط true ← يطبع repetition 1 ← rep++ ← rep = 2 ← الشرط true ← يطبع 2 ← … ← rep = 10 ← `10 <= 10` true ← يطبع 10 ← rep = 11 ← `11 <= 10` false ← **وقف**. يعني بالظبط 10 مرات.
- لو بدأت بـ `rep = 5` يبدأ من repetition 5.
- لو الشرط `rep <= 30` يبقى 30 تكرار.

## غلطات لازم أخلي بالي منها
- أنسى `rep++`، أو أكتب شرط عمره ما يبقى false، فتبقى **infinite loop** والمتصفح يهنج.
- `const rep` مش هتنفع، لأن الـ counter بيتغير.
- أستخدم `,` بدل `;` بين الـ 3 أجزاء.
- `rep < 10` بدل `rep <= 10` هيطلع 9 مرات بس.
- (من نوتتي القديمة) لو الشرط false من الأول، الـ body مش هيتنفذ ولا مرة، لأن الشرط بيتشيك قبل كل iteration.

## ملحوظات لنفسي
- for (البداية; الشرط; التحديث).
- شغالة **طول ما** الشرط true، يعني مش "لحد ما" يبقى true.
- `rep++` = `rep = rep + 1`.
- الـ loops جاية بتطبيقات أكتر، زي إني ألف على array.
