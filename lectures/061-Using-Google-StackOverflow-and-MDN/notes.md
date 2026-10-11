# 061 — Using Google, StackOverflow and MDN

## الفكرة
بنطبّق الـ framework بتاع المحاضرة اللي فاتت (افهم → كسّر → research) على مشكلة حقيقية بسيطة: **temperature amplitude**، وبنستخدم **Google وStack Overflow وMDN** في الـ research.

## أهم الحاجات

### المشكلة (Problem 1)
> شغالين في شركة بتعمل smart home thermometer. المطلوب: Given an array of temperatures of one day, calculate the **temperature amplitude**. Keep in mind that sometimes there might be a **sensor error**.

```js
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
```

### الخطوة 1: افهم المشكلة (بالأسئلة)
```js
// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?
```
- amplitude = **أعلى درجة − أقل درجة** → ودي اللي الـ function هترجعها.
- الـ sensor error باين من الداتا: string `'error'`. هنعمل إيه؟ **نتجاهله**.

### الخطوة 2: كسّرها لـ sub-problems
```js
// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it
```
- محدش قال "اعمل function"، بس أي task زي دي **الأحسن أعملها function**.

### الخطوة 3: Research — إزاي أجيب الـ max؟
- في Google أكتب كلمة **JavaScript** + وصف واضح لللي عاوزه: `javascript get max value in array`.
- **Stack Overflow** = موقع أسئلة وأجوبة، وغالبًا حد سأل نفس سؤالي قبلي.
- هلاقي حلول مش فاهمها (prototypes، `apply` مع `Math`، والـ "weird dots" اللي هنشوفها بعدين) → **أنزل لحد ما ألاقي حل أفهمه بالأدوات اللي أعرفها**.
- عادة أول أو تاني حل هو الأحسن، بس هنا نزلنا شوية.
- الفكرة من الحل: افترض إن **أول عنصر هو الـ max**، ولف على الـ array، ولو العنصر الحالي أكبر من الـ max → يبقى هو الـ max الجديد.
- **متعملش copy للكود من Stack Overflow** — افهم الحل واكتبه بنفسك.

### تتبّع الـ loop بإيدي (على `[3, 7, 4]`)
- قبل الـ loop: `max = 3` (أول عنصر).
- i=0: هل 3 > 3؟ لأ → مفيش حاجة.
- i=1: هل 7 > 3؟ آه → `max = 7`.
- i=2: هل 4 > 7؟ لأ.
- النتيجة: 7 ✅ (ولما زوّد 23 بقى هو الـ max).
- نفس فكرة الـ challenge اللي فات لما بدأنا الـ sum بـ 0 — هنا starting value كويسة = **أول عنصر**.

### الـ min بنفس الطريقة في نفس الـ loop
- `min` بيبدأ من نفس النقطة، وسطر زيادة في نفس الـ loop: لو الحالي أصغر من الـ min → يبقى هو الـ min.
- بما إن `temps[i]` اتكررت كتير → عملنا variable `curTemp` (واستخدم `Cmd/Ctrl + D` عشان يختار كل التكرارات ويغيّرهم مرة واحدة).

### تجاهل الـ errors بـ `continue`
- الـ logic المفروض يشتغل بس لو العنصر **number**.
- لو `typeof curTemp !== 'number'` → `continue` → يخلص الـ iteration دي وينط على اللي بعدها على طول (فـ `'error'` يتعدّى ونروح لـ 9).

### الكود الكامل
```js
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue; // تجاهل الـ sensor error

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude); // 23 (17 - (-6))
```
- من دلوقتي جوناس بيكتب `cl` + Enter (الـ snippet) بدل `console.log`.
- 23 = رقم جوناس المفضل 😄.

### Problem 2: الـ function تاخد arrays اتنين
> الـ project manager رجع وقال: الـ function لازم تستقبل **two arrays of temperatures**، والباقي زي ما هو.

```js
// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays
```
- لو دمجت الاتنين في array واحدة في أول الـ function → **باقي الـ logic يفضل زي ما هو**.

### Research تاني: `javascript merge two arrays`
- لقينا على Stack Overflow و**MDN** الـ method اسمها **`concat`**.

### MDN — إزاي أقرأه
- فيه وصف قصير + examples سريعة.
- على الشمال: **كل الـ methods** بتاعة الـ array (لأننا في صفحة array method) — `concat` زيها زي `push` و`shift` و`includes`.
- مثلًا `push`: بتزوّد **zero or more elements** في آخر الـ array وبترجع الطول الجديد → يعني ينفع أبعت أكتر من عنصر مرة واحدة.
- فيه وصف طويل وsyntax رسمي (شكله يخوّف) → جوناس بيفضّل يركز على الـ **examples**.
- MDN = **"the complete, but unofficial JavaScript documentation"**، وجوناس اتعلم منه حاجات كتير جدًا.

مثال MDN:
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log(array3); // ['a', 'b', 'c', 'd', 'e', 'f']
```

### الحل الجديد
```js
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2); // نفس اسم الـ parameter القديم عشان الباقي ميتغيرش
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew); // max 9, min 0 → 9
```

## الفرق بين…
| | Google | Stack Overflow | MDN |
|---|---|---|---|
| بستخدمه في | أبدأ البحث | ألاقي حد سأل نفس سؤالي | أفهم method أو feature بالتفصيل |
| خلي بالك | اكتب "javascript" + وصف دقيق | متعملش copy، دوّر على حل تفهمه | ركّز على الـ examples |

## غلطات لازم أخلي بالي منها
- copy-paste من Stack Overflow من غير ما أفهم.
- أبدأ الـ max/min بـ 0 بدل أول عنصر (هتفرق لو كل القيم سالبة أو كلها موجبة).
- أنسى إن الداتا فيها حاجة مش number → المقارنة هتبوظ.
- أكرر الـ logic مرتين لـ arrays اتنين بدل ما أدمجهم.

## ملحوظات لنفسي
- كنت فاكر إن "research" يعني ألاقي الكود وأنسخه، طلع يعني ألاقي **الفكرة** وأكتبها أنا.
- تسمية `temps` بعد الـ concat بنفس اسم الـ parameter القديم ذكية — مغيرتش ولا سطر تحت.
- `continue` جه في وقته هنا.
- `Cmd + D` لتغيير كل تكرارات الكلمة — أستخدمها أكتر.
- MDN يبقى أول مكان أفتحه لأي method.
