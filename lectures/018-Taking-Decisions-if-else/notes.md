# 018 — Taking Decisions: if / else Statements

## الفكرة
أخلي الكود ياخد قرارات: لو الشرط true ينفّذ بلوك، ولو false ينفّذ بلوك تاني. ده اسمه **if / else control structure**، ومن أهم حاجات البرمجة.

## أهم الحاجات
### المثال: سارة تقدر تطلع رخصة؟
البرنامج: لو السن 18 أو أكتر يطبع إنها تقدر، ولو لأ يطبع فاضلها كام سنة.

```js
const age = 19;
const isOldEnough = age >= 18;

if (isOldEnough) {
  console.log('Sarah can start driving license 🚗');
}
```
- `if (condition) { ... }`: الـ condition هو أي حاجة بتطلّع **boolean**.
- لو true، الـ block اللي بين `{ }` يتنفذ، أيًا كان عدد السطور فيه.
- لو خليت age = 15 مش هيطبع حاجة خالص.
- الـ emoji على Mac بـ **Cmd + Ctrl + Space**، وعلى Windows 10 بـ **Win + .** (مش مهم).

### الشرط جوه الـ if على طول (الأشهر)
```js
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}
// Sarah is too young. Wait another 3 years :)
```
- في الشغل بنكتب المقارنة جوه القوسين على طول بدل variable منفصل.
- الـ **else block** بيتنفذ لما الشرط يطلع false.
- **الـ else اختياري.** لو مش موجود والشرط false، JS بتكمّل للسطر اللي بعد الـ if.

### ليه اسمها Control Structure؟
- لأنها بتديني control على طريقة تنفيذ الكود. الكود مبقاش بيتنفذ linearly كله؛ أنا بحدد بلوكات تتنفذ وبلوكات لأ.
- وفيه control structures تانية جاية بعدين.

### أعمل variable بشرط (القرن)
```js
const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century); // 21
```
- 1998 ← 20، و2012 ← 21.
- جوناس بيفترض إن مفيش حد مولود في القرن الـ 19.
- **لازم أعرّف `century` برّه الـ blocks.** أي variable بيتعرّف جوه block (`{ }`) مش بيبان برّه.
- لو كتبت `let century = 20` جوه الـ if وعملت log برّه، يطلع **century is not defined**.
- فالحل: أعرّفه برّه فاضي بـ `let`، وأعمله reassign جوه. السبب بالتفصيل جاي بعدين.

### الخلاصة
```js
if (condition) {
  // يتنفذ لو true
} else {
  // يتنفذ لو false (اختياري)
}
```

## غلطات لازم أخلي بالي منها
- أعرّف الـ variable جوه الـ if وأحاول أستخدمه برّه، فيطلع not defined.
- أستخدم `const` للـ variable اللي هعمله reassign جوه الـ if، لازم `let`.
- (من نوتتي القديمة) `if (x > 5);` بـ semicolon بعد القوس، كده الـ block هيتنفذ دايمًا.

## ملحوظات لنفسي
- الـ condition = أي حاجة بتطلّع true/false.
- `{ }` = code block، واللي بيتعرّف جواه بيفضل جواه.
- else اختياري، بس مفيد لما عاوز حاجة تحصل في الحالتين.
- if/else ده أساس أي logic هكتبه في الشغل.
