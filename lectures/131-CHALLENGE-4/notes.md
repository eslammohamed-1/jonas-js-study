# 131 — CHALLENGE #4 (underscore_case → camelCase)

مختلف عن اللي قبله، و**صعب عن قصد**. لو اتزنقت متتعصبش — اتفرج على الحل وقِف وكمّل.

## المطلوب
برنامج بياخد **list من أسماء متغيرات** مكتوبة underscore_case ويحوّلها لـ camelCase.
- الـ input من **textarea** والتحويل لما أدوس على **button** — الاتنين اتعملوا بالكود ده (`createElement` هنتعلمه بعدين):
```js
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
```

Test data (أحطها في الـ textarea):
```
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
```
الـ output المطلوب — 5 `console.log` منفصلين:
```
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
```

Hints:
1. افتكر إيه الـ character اللي بيعمل سطر جديد في الـ textarea
2. يكفي يشتغل مع اسم من **كلمتين** (`a_b`)
3. ابدأ بالـ camelCase بس من غير ما تفكر في الـ ✅ (دي الصعبة)

## حل جوناس
```js
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
```

### الخطوات
1. event listener على الـ button (click)
2. أجيب الـ value من الـ textarea → string واحد كبير
3. `split('\n')` → array فيها 5 أسطر (`\n` = new line)
4. loop على كل سطر:
   - `toLowerCase()` (فيه `Some`, `AGE` كابيتال) ← `trim()` (فيه مسافات قبل) ← `split('_')` → chaining
   - destructuring لـ `[first, second]`
   - أول كلمة زي ما هي + التانية capitalized بطريقة الـ `replace` (أول حرف بنسخته الكابيتال)
5. الـ ✅:
   - **كلهم يبدأوا من نفس المكان** → كل الـ strings لازم نفس الطول → `padEnd(20)`
     (لو مسافات بس أقدر أشيل الـ argument التاني — الـ default مسافة)
   - **عددهم بيزيد** (1، 2، 3...) → محتاج الـ index → `rows.entries()` + `[i, row]` ← `'✅'.repeat(i + 1)`

### الـ bugs اللي وقع فيها (عادي جدًا في البرمجة)
- **"Cannot read property replace of undefined"** — كتب `for (const row in rows)` بدل `of` 😅. `for...in` loop قديم (مش مهم دلوقتي) فمطلعش error، بس رجّع indexes. Debug بـ `console.log(row, first, second)`.
- كتب `toUpperCase` من غير `()` — ماندهش الـ method.

## التقنيات المستخدمة
- `split('\n')` لتقسيم الأسطر
- chaining: `toLowerCase().trim().split('_')`
- array destructuring
- capitalize بـ `replace(s[0], s[0].toUpperCase())`
- `padEnd` للمحاذاة
- `repeat` + `entries()` للـ index

## ملحوظات لنفسي
- خلي بالك: `for...of` مش `for...in` — الـ in مش هيطلّع error بس هيدّيني indexes!
- `method` من غير `()` = مش بيتنفّذ.
- كنت فاكر إن المحاذاة محتاجة حساب، طلع `padEnd(20)` بس.
- كل ضغطة على الزرار بتطبع تاني — عادي.
