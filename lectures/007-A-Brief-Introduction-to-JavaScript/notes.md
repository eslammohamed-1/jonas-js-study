# 007 — A Brief Introduction to JavaScript

## الفكرة
يعني إيه JavaScript وبنستخدمها في إيه. محاضرة theory بتحط الأساس لباقي الكورس.

## أهم الحاجات
### تعريف جوناس
> JavaScript is a **high-level, object-oriented, multi-paradigm programming language.**

نفكّكها:
- **programming language:** أداة بكتب بيها كود يقول للكمبيوتر يعمل حاجة.
- **high-level:** مش محتاج أفكر في حاجات معقدة زي إدارة الـ memory وأنا البرنامج شغال. فيه abstractions كتير مخبّية التفاصيل دي، وده بيخلي اللغة أسهل في الكتابة والتعلّم.
- **object-oriented:** اللغة معتمدة أساسًا على فكرة الـ objects عشان تخزّن أغلب أنواع الـ data.
- **multi-paradigm:** مرنة جدًا، فأقدر أكتب بأكتر من style، زي imperative وdeclarative. ودي مجرد طرق مختلفة أرتّب بيها الكود.

### الـ 3 تكنولوجيز بتوع الويب
| | دوره |
|---|---|
| **HTML** | الـ content: النصوص والصور والزراير |
| **CSS** | الـ presentation: الـ styling والـ layout |
| **JavaScript** | الـ programming language الحقيقية: بتضيف dynamic وinteractive effects، وبتغيّر الـ content أو الـ CSS، وبتجيب data من servers، وبتبني applications كاملة في المتصفح (web applications) |

### تشبيه الأسماء والصفات والأفعال
- **HTML = nouns** ← `<p>` ده paragraph (اسم).
- **CSS = adjectives** ← "الـ paragraph لونه أحمر" (red صفة).
- **JavaScript = verbs** ← "خبّي الـ paragraph" (فعل).

### مثال Twitter
- أول ما الصفحة تفتح بيظهر spinners ← JS بتحمّل data في الـ background، ولما توصل بتخبّي الـ spinners وتعرض الـ content (تغيير styles وcontent).
- زرار tweet يظهر الـ tweet box، ولما أدوس برّه تختفي.
- لما أعدّي بالماوس على user تظهر معلوماته، وغالبًا بتتحمّل on the fly.
- جوناس قال إننا في آخر الكورس هنعرف نعمل كل ده.

### Frameworks وLibraries
- React وAngular وVue بيسهّلوا كتابة web applications كبيرة.
- بس كلهم **100% مبنيين على JavaScript**.
- عشان كده لازم أبقى كويس جدًا في JS **قبل** ما أبدأ framework، مش بعد ما أعرف أكتب 10 سطور.
- وكمان الـ framework اللي مشهور النهارده ممكن ميفضلش مشهور، ولو أنا قوي في JS هتعلّم اللي بعده بسهولة.
- كلام جوناس: تعلّم JS صح هو أحسن investment في الـ web development career.

### JavaScript مش المتصفح بس
- اللغة والمتصفح حاجتين منفصلين.
- **Front-end:** JS في المتصفح، وده اللي هنعمله في الكورس.
- **Back-end:** JS على web server بـ **Node.js** من غير متصفح، وبتتعامل مع databases وكده.
- وكمان ممكن **native mobile apps** بـ React Native وIonic، و**native desktop apps** بـ Electron.

### JavaScript Releases (لمحة)
- سنة 2015 نزل update ضخم اسمه رسميًا **ES2015**، والناس بتقوله **ES6** عشان جه بعد ES5.
- **ES = ECMAScript.**
- من بعد ES2015 فيه release جديد كل سنة فيه features جديدة.
- كل الـ releases من ES2015 ورايح هي اللي بنسميها **modern JavaScript**.
- الكورس بيعلّم modern JS من الأول، بس هيوريني المهم من ES5 كمان. وفيه فيديو كامل عن الموضوع ده في آخر السيكشن.

## الفرق بين…
| Front-end | Back-end |
|---|---|
| JS في المتصفح | JS على server (Node.js) |
| effects وweb apps | بيتعامل مع databases |

## غلطات لازم أخلي بالي منها
- إني أنط لـ React أو أي framework وأنا لسه ضعيف في JS.
- إني أفتكر إن ES6 وES2015 حاجتين مختلفين. هما نفس الحاجة.

## ملحوظات لنفسي
- high-level يعني مش شايل هم الـ memory.
- HTML اسم، وCSS صفة، وJS فعل. تشبيه سهل يتفتكر.
- ES6 = ES2015، وكل حاجة بعدها modern JS.
- بالنسبالي في الشغل: أقوّي JS الأول وبعدين أي framework يبقى سهل.
