# 030 — JavaScript Releases: ES5, ES6+ and ESNext

## الفكرة
تاريخ JS، وإزاي الـ releases شغالة، وإزاي أستخدم modern JS النهارده مع إن المستخدمين ممكن يكونوا على browsers قديمة. مهمة للشغل، ولأني هسمع المصطلحات دي في الـ community طول الوقت.

## أهم الحاجات
### التاريخ باختصار
- **1995:** Netscape Navigator (كان الـ browser المسيطر) جاب **Brendan Eich** يعمل أول نسخة من JS في **10 أيام**. كان اسمها **Mocha**، وكان فيها features أساسية كتير من اللي في JS النهارده.
- **1996:** اتغيّر الاسم لـ **LiveScript**، وبعدين **JavaScript**، عشان يجذبوا developers الـ Java، اللي كانت أشهر لغة ساعتها.
  - **JavaScript ملهاش أي علاقة بـ Java.** الاسم كان marketing بس.
- **1996 برضه:** Microsoft عملت Internet Explorer ونسخت JS، وسمتها **JScript** لأسباب قانونية. كده بقى فيه لغتين شبه بعض وبيتنافسوا، وده مش كويس.
- **1997:** اللغة اتبعتت لمنظمة مستقلة اسمها **ECMA**، وطلّعت **ECMAScript 1 (ES1)**، أول standard رسمي، فبقى كل browser يطبّق نفس الـ standard.
  - **ECMAScript** = الـ standard، و**JavaScript** = اللغة زي ما هي متطبّقة في الـ browsers.
- **2009:** نزل **ES5**، بعد خلافات كتير، وفيه features حلوة.
- **يونيو 2015:** نزل **ES6**، **أكبر update في تاريخ اللغة**.
  - اسمه الرسمي **ES2015**، والناس بتقول ES6.
- من 2015: **annual release cycle**، release كل سنة فيها features قليلة بدل نسخة ضخمة كل كام سنة، فأسهل الواحد يواكب. ES2016 (ES7)، وES2017، وهكذا.

### Backwards Compatibility (لحد ES1)
- كود مكتوب سنة 1997 هيشتغل في browser حديث النهارده عادي، من غير version numbers.
- السبب مبدأ **"don't break the web"**: تقريبًا مفيش حاجة بتتشال من اللغة، بس بيتضاف.
- فالنسخ الجديدة **incremental updates** من غير breaking changes. عشان كده جوناس بيسميها **releases** مش versions.
- تخيّل لو شالوا feature، موقع من 2008 كان هيبوظ.
- **العيب:** bugs وحاجات غريبة قديمة كتير لسه موجودة. JS اتعملت في 10 أيام لهدف بسيط (dynamics بسيطة للصفحات)، مش لـ web apps كاملة. وده عمل للغة سمعة وحشة عند مبرمجين كتير.
- **الحل:** أتعلم modern JS اللي يهم النهارده، وأتجاهل أغلب الحاجات الغريبة القديمة. وده اللي هنعمله في الكورس.

### Forwards Compatibility: مش موجودة
- كود من المستقبل (مثلًا 2089) مش هيشتغل في browsers النهارده. الـ browsers مش بتفهم features متعرفهاش.

### أستخدم modern JS إزاي النهارده؟
| | Development | Production |
|---|---|---|
| إمتى | وأنا ببني الـ app على جهازي | بعد الـ deploy، شغال عند المستخدمين |
| الحل | آخر نسخة من **Google Chrome** | **transpiling + polyfilling** لـ ES5 |
- في الـ production مقدرش أتحكم في الـ browser اللي المستخدم فاتح بيه، ولا أفترض إن الكل على آخر نسخة.
- هنستخدم **Babel** بعدين في الكورس عشان نعمل transpile. دلوقتي مش محتاجينه.

### دعم كل release
- **ES5:** مدعوم بالكامل في كل الـ browsers لحد IE9 (2011)، فهو safe، وعشان كده هو الـ target للـ transpiling.
- **ES6+ (من ES6 لـ ES2020):** مدعومة كويس في الـ modern browsers (من وقت تسجيل الفيديو، نص 2020). مع بعض = **modern JavaScript**. وهنا بيدخل الـ transpiling عشان مش كل المستخدمين على browsers حديثة.
- **ES6 compatibility table:** أعرف منها أنهي feature مدعومة فين. اللينك في صفحة الـ resources على jonas.io.
- **ESNext:** الـ releases الجاية (ES2021، ES2022…).
  - الـ features الجديدة بتعدّي على **4 stages**. لما توصل **stage 3** الـ browsers بتبقى متأكدة إنها هتوصل stage 4، فبتبدأ تطبّقها قبل ما تدخل الـ specification رسمي.
- جوناس بيضيف فيديوهات للـ features الجديدة كل سنة.

### الكورس بيعلّم الـ releases إزاي
- modern JS من الأول.
- وكمان يوريني إزاي الحاجات كانت بتتعمل زمان، زي `let`/`const` وقبلهم `var`.
- **ليه ES5 لسه مهم؟**
  1. أفهم الـ features شغالة إزاي behind the scenes، زي إن ES6 classes بتخبّي تفاصيل الـ OOP.
  2. tutorials وأمثلة كتير أونلاين لسه مكتوبة ES5.
  3. في شغل كتير هشتغل على **code bases قديمة** ممكن يبقى فيها ES5 كتير.

## الفرق بين…
| Backwards compatible ✅ | Forwards compatible ❌ |
|---|---|
| كود قديم يشتغل في browser جديد | كود جديد مش هيشتغل في browser قديم |

| ES5 | ES6+ | ESNext |
|---|---|---|
| مدعوم في كل حاجة، target للـ transpiling | modern JS (ES2015 لحد ES2020) | الـ releases الجاية |

## غلطات لازم أخلي بالي منها
- أفتكر إن JavaScript ليها علاقة بـ Java.
- أفترض إن كل المستخدمين على آخر browser وأطلّع modern JS من غير transpiling.
- أسمّي الـ releases "versions" بمعنى إن فيها breaking changes. مفيش.

## ملحوظات لنفسي
- ES6 = ES2015، و ES6+ = modern JS.
- "don't break the web": مفيش حاجة بتتشال، عشان كده الـ quirks القديمة لسه موجودة.
- في الشغل: ممكن ألاقي ES5 في كود قديم، وBabel بيحوّل الكود الحديث.
- Development = Chrome حديث، وProduction = transpile.
