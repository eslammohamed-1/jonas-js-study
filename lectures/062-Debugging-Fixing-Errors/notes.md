# 062 — Debugging (Fixing Errors)

## الفكرة
بعد problem solving، الـ skill المهمة التانية: **debugging** = إني ألاقي الأخطاء وأصلحها. المحاضرة دي overview نظري لعملية الـ debugging (4 مراحل)، والمحاضرة الجاية تطبيق.

## أهم الحاجات

### يعني إيه bug؟
- **software bug** = defect أو مشكلة في برنامج. أي **سلوك مش متوقع أو مش مقصود** من البرنامج = bug.
- الكلمة اتقالت في **الأربعينات (1940s)** لما **حشرة حقيقية** عملت error في كمبيوتر Harvard.
- الـ bugs **طبيعية جدًا** في الـ software development لأننا بشر وبنغلط.
- كل application معقد فيه bugs، وأحيانًا بتفضل مش مكتشفة **لسنين** وتعمل security holes أو مشاكل تانية.
- متزعلش لو عملت bugs — حتى الـ experts بيعملوا.
- مش كل الـ bugs خطيرة؛ كتير منها صغير وسهل.

### مثال
- رجعنا لـ function الـ `reverse` بتاعة المحاضرة اللي فاتت: بعتنالها array، والنتيجة طلعت **متلخبطة (scrambled) مش معكوسة** → أكيد فيه bug جوه الـ function.

### الـ Debugging Process (4 مراحل)
debugging = **finding, fixing, and preventing bugs**.

#### 1) Identify — أعرف إن فيه bug
- بيحصل أثناء الـ **development** (بـ automated testing software) أو من **user reports** في الـ **production**.
- الـ bugs اللي بتتكشف في الـ production **أسوأ نوع** — معناها عدّت من الـ development ووصلت لـ users حقيقيين.
- عشان كده مهم تكتشفها بدري (مثلًا بـ automated tests).
- خد بالك من الـ **context**: بعض الـ bugs بتحصل في **browser معين** بس، أو لـ **users معينين** بس.

#### 2) Find — أعزل مكانه بالظبط
- بالـ **developer console** → ينفع للـ bugs الصغيرة والكود البسيط لما أبقى عندي فكرة هو فين.
- لو الكود معقد ومش عارف الـ bug فين → **debugger software** (المحاضرة الجاية). مهم جدًا أي developer يعرف يستخدمه.

#### 3) Fix — أصلحه
- غالبًا **أسهل مرحلة**: أبدّل الحل الغلط بحل صح شغال.

#### 4) Prevent — أمنع إنه يحصل تاني
- أدور في المشروع على **نفس الغلطة في كود شبهه** (function شبهها مثلًا) — وارد إني عملت نفس الغلطة مرتين → أصلحها في كل حتة.
- طريقة متقدمة: أكتب **tests** بـ testing software (جوناس ممكن يزود bonus section عن الـ testing).

## الفرق بين…
| المرحلة | السؤال | الأداة |
|---|---|---|
| Identify | فيه bug؟ | testing / user reports / context |
| Find | فين؟ | console (بسيط) / debugger (معقد) |
| Fix | إزاي أصلحه؟ | أبدّل الحل الغلط |
| Prevent | هيتكرر؟ | أدور على نفس الغلطة + tests |

## غلطات لازم أخلي بالي منها
- أصلّح الـ bug في مكان واحد وأنسى إن ممكن يكون متكرر في كود شبهه.
- أفتكر إن الـ console كفاية لكل حاجة — في الكود المعقد محتاج debugger.
- أنسى الـ context (browser/user معين).

## ملحوظات لنفسي
- الترتيب: **Identify → Find → Fix → Prevent**.
- كنت فاكر إن الـ fix أصعب حاجة، طلع الـ find هو الصعب والـ fix أسهلهم.
- bug في الـ production = الأسوأ، فالـ tests مش رفاهية.
- قصة الحشرة في كمبيوتر Harvard ظريفة 🐛.
