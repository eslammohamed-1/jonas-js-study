# مذاكرة جوناس JS 📚

موقع مذاكرتي الشخصية لكورس **[The Complete JavaScript Course](https://www.udemy.com/course/the-complete-javascript-course/)** بتاع **[Jonas Schmedtmann](https://github.com/jonasschmedtmann)**.

🔗 **الموقع:** https://eslammohamed-1.github.io/jonas-js-study/

## فيه إيه
- **الرئيسية:** المحاضرات اللي خلصتها واللي جاية، والقعدة الجاية.
- **الخطة:** الجدول الأسبوعي، وقعدات Section 9، واللي بعدها لحد آخر ديسمبر.
- **صفحة لكل محاضرة:** نوتات · شرح · تدريبات (تفاعلية: تعلّم اللي خلصته، وتجرّب الكود على طول، وتظهر الحل) · حلول.
- التقدم بيتحفظ في المتصفح (localStorage)، وفيه صفحة لنقله من جهاز لجهاز.

## إضافة محاضرة جديدة
1. اعمل فولدر في `lectures/` باسم `رقم-اسم-المحاضرة` وحط فيه `notes.md` و`explanation.md` و`exercises.md` و`solutions.md`.
   - عناوين التمارين بالشكل `## تمرين 1 🟢 — ...` والحلول `## حل تمرين 1` عشان زرار «أظهر الحل» يشتغل.
2. في `js/data.js` حط `slug` للمحاضرة دي في `SECTION9` (أو ضيف سكشن جديد).
3. `git push`، والموقع يتحدث لوحده.

## ملحوظات
- مفيش build step: HTML/CSS/JS عادي، و[marked](https://github.com/markedjs/marked) و[highlight.js](https://highlightjs.org/) و[DOMPurify](https://github.com/cure53/DOMPurify) من CDN.
- **الترانسكريبتات مش مرفوعة هنا** لأنها كلام جوناس من الكورس وحقوقها ليه ولـ Udemy. موجودة عندي على الجهاز بس.
- النوتات والشرح والتدريبات مكتوبة بأسلوبي للمذاكرة. بيانات `restaurant` اللي في ملعب الكود مأخوذة من الـ starter files بتاعة [كورس جوناس](https://github.com/jonasschmedtmann/complete-javascript-course). الكورس وكل حقوقه لجوناس.
