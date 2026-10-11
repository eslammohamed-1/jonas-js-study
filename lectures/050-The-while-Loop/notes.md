# 050 — The while Loop

## الفكرة
نوع تاني من الـ loops: **while loop**. بتاخد **condition بس**، وده بيخليها أكثر مرونة من الـ for، وتنفع لما **معرفش من الأول** الـ loop هتلف كام مرة.

## أهم الحاجات
### نفس مثال الجيم بالطريقتين
```js
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}
```
- محتاجين نفس الحاجات التلاتة: counter وcondition وزيادة الـ counter.
- بس في الـ while **بحدد الـ condition بس** جوه القوسين.
- اسمها while لأنها **بتلف طول ما** الـ condition true.
- الـ counter بعرّفه **برّه قبل الـ loop**، والزيادة **في آخر الـ block**.
- النتيجة: 1 لـ 10 مرتين، مرة من الـ for ومرة من الـ while.

### الـ while أكثر versatile
- **مش محتاجة counter أصلًا.** كل اللي محتاجاه condition يفضل true، وأي condition، مش لازم يبقى له علاقة بـ counter.

### مثال: نرمي زهرة لحد ما تطلع 6 🎲
```js
let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}
```
- **الرقم العشوائي** (جوناس قال اكتبه وخلاص، وهنفهمه بعدين):
  - `Math.random()` ← رقم عشري بين 0 و1.
  - `* 6` ← عشري بين 0 و6.
  - `Math.trunc(...)` ← بيشيل الجزء العشري، فيطلع من 0 لـ 5.
  - `+ 1` ← من 1 لـ 6.
- الـ condition: `dice !== 6`، يعني الـ loop تفضل لحد ما تطلع 6.
- **لازم أرمي من جديد جوه الـ loop.** لو dice اتعمل مرة واحدة بس وطلع غير 6، الـ loop هتلف **للأبد** (infinite loop)، والمتصفح يقع.
- **مثال تشغيل:** 2 ← 1 ← 5 ← 4 ← طلعت 6 في آخر iteration ← طبع "Loop is about to end..." ← الـ condition بقى false ← وقفت.
- **حالة لطيفة:** لو أول رمية طلعت 6، الـ loop **مش هتبدأ خالص**، يعني 0 iterations.

### إمتى while وإمتى for؟
- **while:** لما **معرفش** هلف كام مرة، زي الزهرة.
- **for:** لما **عارف** العدد، يعني محتاج counter. زي اللف على array: عارف عدد الـ elements، فالـ for عادةً هي الصح.

## الفرق بين…
| for | while |
|---|---|
| counter + condition + update في سطر | condition بس |
| عارف عدد المرات | مش عارف عدد المرات |
| اللف على array | رمي زهرة، أو أي حاجة لحد ما يحصل شرط |

## غلطات لازم أخلي بالي منها
- أنسى أغيّر الحاجة اللي الـ condition معتمد عليها جوه الـ loop (rep++ أو أرمي dice تاني)، فتبقى infinite loop.
- أعرّف الـ counter جوه الـ while، فيرجع لقيمته الأولى كل مرة.
- أعرّف `const dice`، ومش هعرف أعمله reassign.

## ملحوظات لنفسي
- while = "طول ما".
- `Math.trunc(Math.random() * 6) + 1` ← رقم من 1 لـ 6، هنستخدمه في مشروع Pig Game غالبًا.
- لو الشرط false من الأول، الـ while مش هتلف ولا مرة.
- array يبقى for. شرط مجهول عدد مراته يبقى while.
