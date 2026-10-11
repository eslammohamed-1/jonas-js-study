# 066 — Solving CHALLENGE #2 With AI

## الفكرة
Challenge #2 بنحله المرة دي بـ **AI assistant (ChatGPT)** عشان نشوف الـ process بتاع المحاضرة اللي فاتت عمليًا: prompt specific → نختبر → نعدّل بـ prompts تانية (iterative) → ونستخدمه كمان **للتعلم**.

## أهم الحاجات

### المطلوب
```js
/*
Let's say you're building a time tracking application for freelancers. At some point in building this app, you need a function that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Whether the week was full-time (worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/
```
- ينفع أجربه لوحدي الأول كـ extra challenge، بس محتاج features لسه متعلمناهاش، فالحل مش هيبقى perfect.

### الخطوة 1: فهم المشكلة
- المطلوب واضح أصلًا، فاضل تفاصيل هنظبطها في الـ prompt.

### الخطوة 2: اختيار الأداة
- **ChatGPT** (chatgpt.com) — الأشهر. account مجاني كفاية.
- الموديل: **GPT-4o** (الأحسن وقت التسجيل).
- فيه **canvas mode** حلو للكود، بس استخدم الشات العادي.

### الخطوة 3: الـ prompt (specific ومن غير fluff)
القرارات اللي اتاخدت وهو بيكتب:
- الـ function اسمها `analyzeWorkWeek`.
- تستقبل **array** فيها 7 قيم (7 أيام).
- ترجّع **object** (أسهل في الفهم من array — كل data point ليها اسم).
- الـ average: **round to one decimal place**.
- **assume Monday is day 0 in the array**.
- أيام الشغل = الأيام اللي فيها **more than 0 hours** (في الـ test data فيه يومين 0 → 5 أيام شغل).

الـ prompt تقريبًا:
> I'm building a time tracking application for freelancers. Write a function called analyzeWorkWeek that receives an array of daily work hours for a certain week and returns an object with the following data: … (round to one decimal place) … (assume Monday is day 0 in the array) … (with more than 0 hours) …

### الخطوة 4: النتيجة واختبارها
- كتب الكود بسرعة وفي الآخر شرح عمل إيه.
- استخدم حاجات **لسه متعلمناهاش**: `reduce`، و`Math.round`… فإحنا **مش قادرين نتأكد هو صح ولا لأ** لسه.
- نسخه بزرار الـ copy، وساب الـ comments، وبدّل الـ test data بتاعته بتاعتنا.
- النتيجة object فيه: `averageHours`, `daysWorked`, `isFullTime`, `maxDay`, `totalHours`.
  - totalHours = 34.5 (أقل من 35 بشوية) → `isFullTime: false`.
  - غيّر الـ 4 لـ 5 → 35.5 → `isFullTime: true` ✅.
- اتحل من غير ما نكتب كود — بس لو هندخله في app حقيقي لازم **اختبار وفحص أكتر بكتير**.

### الخطوة 5: iterate — maxDay يبقى اسم يوم
- `maxDay` كان `4` = index اليوم (0,1,2,3,**4**) — صح بس مش readable.
- prompt: **"change maxDay to be an actual work day like Monday"**.
- عمل array بأسماء الأيام وحوّل الـ index لاسم → **Friday** ✅.

### iterate تاني: لازم 7 أيام بالظبط
- عمل test تاني `weeklyHours2` فيه 5 أيام بس → المفروض **ميشتغلش**.
- prompt: **"The function should require the input array to have exactly 7 days. Update the function accordingly."**
- زوّد validation بـ error لو مش array أو طوله مش 7.
- في الأول مطلعش error — لأنه **نسي يستخدم `weeklyHours2`** في النداء 😅. بعد ما صلحها: `Input must be an array of exactly 7 daily work hours.`

### الكود النهائي (Written by ChatGPT)
```js
function analyzeWorkWeek(dailyHours) {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Validate that the input array has exactly 7 elements
  if (!Array.isArray(dailyHours) || dailyHours.length !== 7) {
    throw new Error('Input must be an array of exactly 7 daily work hours.');
  }

  // Calculate total hours worked
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);

  // Calculate average daily hours, rounded to one decimal place
  const averageHours = Math.round((totalHours / dailyHours.length) * 10) / 10;

  // Find the day with the most hours worked
  const maxHours = Math.max(...dailyHours);
  const maxDayIndex = dailyHours.indexOf(maxHours);
  const maxDay = daysOfWeek[maxDayIndex]; // Convert index to day name

  // Count the number of days worked
  const daysWorked = dailyHours.filter(hours => hours > 0).length;

  // Check if the week was full-time (35 hours or more)
  const isFullTime = totalHours >= 35;

  // Return the result object
  return {
    totalHours,
    averageHours,
    maxDay, // The name of the day with the most hours
    daysWorked,
    isFullTime,
  };
}

const weeklyHours = [7.5, 8, 6.5, 0, 8.5, 5, 0];
const analysis = analyzeWorkWeek(weeklyHours);
console.log(analysis);

const weeklyHours2 = [7.5, 8, 6.5, 0, 8.5];
const analysis2 = analyzeWorkWeek(weeklyHours2); // ← Error
console.log(analysis2);
```
- لسه متعلمناش: إزاي نعمل errors بإيدينا، ولا `reduce` ولا `filter` — هنتعلمهم في الكورس، وفي الآخر هقدر أكتب ده كله لوحدي.

### استخدام الـ AI للتعلم
- سأله: **"What does the filter method do? Why is it useful? Give me a few examples."** (فيه typo، وبيفهم عادي حتى بالـ typos).
- لقى كلمة مش فاهمها: **callback** → سأل أعمق: **"What is a callback? Explain the filter method in simple terms to a JavaScript beginner."**
- لو الشرح معقد → اطلب يبسّطه.
- الإجابة بتختلف كل مرة حتى لو نفس السؤال.
- جوناس بيهزر: لحد ما ChatGPT يعمل فيديوهات زيه هو في أمان 😄.

### النصيحة الأخيرة
- ممكن أسأل ChatGPT أو الـ **AI assistant اللي في Udemy** لو حاجة مش واضحة في الكورس.
- **متستخدمش AI تحل challenges الكورس** — ده counterproductive ومش هتتعلم حاجة.
- استخدمه في الحل بعد ما تخلص الكورس وتبقى فاهم بتعمل إيه.

## الفرق بين…
| استخدام الـ AI هنا | |
|---|---|
| **لحل مهمة** | prompt specific + context → اختبار → prompts للتعديل |
| **للتعلم** | "إيه ده؟ ليه مفيد؟ أمثلة؟" → وانزل أعمق في الكلمات اللي مش فاهمها |

## غلطات لازم أخلي بالي منها
- prompt عام → حل مش مظبوط. حدد: الاسم، الـ input (array)، الـ output (object)، التقريب، اليوم 0.
- أنسى أستخدم الـ test data الجديدة وأفتكر إن الـ validation مش شغالة.
- أثق في الكود من غير ما أختبر حالات زي 35 بالظبط أو array ناقصة.
- أحل challenges الكورس بالـ AI.

## ملحوظات لنفسي
- الـ prompt الكويس = نفس الـ "understand the problem" بالظبط، بس مكتوبة للـ AI.
- رجّع **object** بدل array لما الداتا ليها أسماء — أوضح.
- لما أرجع للكود ده بعد ما أتعلم `reduce` و`filter` و`Math.max(...)` → أحاول أكتبه لوحدي وأقارن.
- "explain to a JavaScript beginner" — prompt حلو لما شرح يبقى معقد.
