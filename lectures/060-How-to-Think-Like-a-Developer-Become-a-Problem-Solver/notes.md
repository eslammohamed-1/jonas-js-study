# 060 — How to Think Like a Developer: Become a Problem Solver!

## الفكرة
حل المشاكل من أهم حاجات البرمجة. جوناس بيدينا **framework من 4 خطوات** لحل أي problem، ومشروحة على مثال: "function بتعمل reverse لأي حاجة نبعتهالها".

## أهم الحاجات

### يعني إيه "problem" هنا؟
- مشكلة حقيقية محتاجة حل، مثلًا: "في array فيها GPS coordinates، هات أقرب نقطتين لبعض".
- **مش** معناها إصلاح أخطاء/bugs (ده debugging، حاجة تانية).

### غلطات John (ودلوقتي بقى قرّب يبقى job-ready)
- بيـ**نط على المشكلة** من غير تفكير.
- بيكتب الحل بطريقة **مش منظمة** ومن غير منطق.
- بيتوتر لما الحاجة متشتغلش على طول.
- **مكسوف يعمل research** لما ميعرفش.

### الـ mindset الصح
- **اهدا وبطّأ**، متنطش على حل من غير plan.
- فكر بشكل **منطقي وعقلاني** — البرمجة في الآخر logic.

### الـ Framework (4 خطوات)

#### 1) افهم المشكلة 100%
- ارجع لورا وبص على الصورة الكبيرة.
- أهم حاجة: **اسأل الأسئلة الصح**.

مثال: الـ project manager قال: _"We need a function that reverses whatever we pass into it."_
أسئلة:
- "whatever" يعني إيه؟ إيه اللي ينفع يتعكس؟ → منطقيًا **strings, numbers, arrays** بس.
  - **objects** مالهاش order محدد → مينفعش تتعكس.
  - مش هنعكس `undefined` ولا `null` ولا boolean.
- لو حد بعت حاجة غير string/number/array نعمل إيه؟
- الـ function ترجع إيه؟ دايمًا string؟ ولا **نفس الـ type اللي دخل**؟ → غالبًا نفس الـ type.
- أسئلة ناحية الحل: إزاي أعرف الـ argument ده number ولا string ولا array؟ وإزاي أعكس كل نوع؟
- طبيعي دلوقتي متعرفش الأسئلة الصح — بتيجي مع الوقت والـ practice.

#### 2) Divide and Conquer — (غالبًا أهم خطوة)
- كسّر المشكلة الكبيرة لأكبر عدد ممكن من **sub-problems** صغيرة → أسهل بكتير.
- وبرضه بتساعد في الخطوة 1، لأنك بتفك المشكلة لحد ما تفهمها بالظبط.
- الـ sub-problems للمثال:
  1. أتشيك الـ argument ده number ولا string ولا array.
  2. أعكس number.
  3. أعكس string.
  4. أعكس array.
  5. أرجّع القيمة المعكوسة.
- بقت زي **task list** → أحل كل واحدة **لوحدها (in isolation)** وأكمل.
- الاستراتيجية دي شغالة مع مشاكل أكبر بكتير، وبتستخدم برّه البرمجة كمان.

#### 3) Research — متتكسفش
- **الأول جرب بنفسك** تحل الـ sub-problem.
- لو بتخبط في حيطة باستمرار → متضيعش وقت، دوّر: **Google**, **Stack Overflow**, **MDN**.
- الـ research جزء ضخم من شغل المبرمج. عادي جدًا إنك متعرفش.
- أمثلة لأسئلة أدور عليها:
  - how to check if a value is a number / array / string in JavaScript
  - how to reverse a number / string / array in JavaScript

#### 4) Pseudo-code (للمشاكل الأكبر)
- اجمع كل اللي فات واكتب **pseudo-code** قبل الكود الحقيقي.
- pseudo-code = وصف **غير رسمي** للكود — "code for humans, not computers".
- **مفيش قواعد** — اكتبه بحيث تفهمه إنت أو الفريق.
```
function reverse(value)
  if value type !string && !number && !array
    return value

  if value type == string
    reverse string
  if value type == number
    reverse number
  if value type == array
    reverse array

  return reversed value
```
- واضح إنه مش JavaScript، بس بقى list of instructions جاهزة تتحول لكود.
- أول شرط بيرجّع الـ value زي ما هي لأننا قررنا إن الـ function تشتغل على string/number/array بس.

### نصيحة أخيرة
- طوّر **فضول حقيقي** إزاي الحاجات بتشتغل — في البرمجة وفي الدنيا كلها.
- أمثلة: **Richard Feynman** كان بيصلّح راديوهات وهو مراهق، و**Elon Musk** عمل أول لعبة كمبيوتر وعنده 12 سنة.

## الفرق بين…
| | Problem solving | Debugging |
|---|---|---|
| يعني إيه | إيجاد حل لمشكلة حقيقية (زي أقرب نقطتين) | إصلاح أخطاء في الكود |
| المحاضرة دي | ✅ | ❌ (المحاضرات الجاية) |

## غلطات لازم أخلي بالي منها
- أبدأ أكتب كود على طول قبل ما أفهم المطلوب.
- أعتبر الـ research ضعف — ده جزء من الشغل.
- أحاول أحل المشكلة كلها مرة واحدة بدل ما أكسّرها.
- أعمل research قبل ما أجرب خالص (الأول أجرب لوحدي).

## ملحوظات لنفسي
- الـ 4 خطوات: **Understand → Divide → Research → Pseudo-code**.
- الخطوة 2 هي اللي بتفرق — هكتب الـ sub-problems كـ comments في الكود قبل ما أبدأ.
- في الشغل في نجوى: قبل أي task أكتب الأسئلة الأول.
- objects مينفعش تتعكس لأنها مالهاش ترتيب — حلوة دي.
