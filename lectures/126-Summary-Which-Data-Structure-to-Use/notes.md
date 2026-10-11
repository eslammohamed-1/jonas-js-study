# 126 — Summary: Which Data Structure to Use?

## الداتا بتيجي منين؟ (3 مصادر)
1. **من الكود نفسه** — مثلًا status messages بتظهر حسب اللي اليوزر بيعمله
2. **من الـ UI** — حاجة اليوزر بيكتبها في form، أو مكتوبة في الـ DOM (tasks في todo app، مصاريف في budget app)
3. **من external sources** — غالبًا **Web API** (طقس، أفلام، أسعار عملات...). هنتعلمها بعدين.

API = Application Programming Interface — نجيب بيه داتا من web apps تانية.

أيًا كان المصدر → عندي **collection** من الداتا → محتاج **data structure**. وعندي 4 built-in.

## القرار الأول
- **list بسيطة من القيم**؟ → **Array** أو **Set**
- **key-value pairs**؟ → **Object** أو **Map**

الفرق: الـ key بيوصف القيمة. في الـ list القيم من غير وصف.

## مثال: JSON من API
```json
[
  { "title": "...", "publisher": "...", "id": "..." },
  { "title": "...", "publisher": "...", "id": "..." },
  { "title": "...", "publisher": "...", "id": "..." }
]
```
- JSON = text (string طويل) بس بنفس شكل objects و arrays في JS → بيتحوّل بسهولة
- كل وصفة **object** — محتاج keys توصف القيم (title, publisher)
- الوصفات مع بعض **array** — مش محتاج أوصف كل واحدة، كلهم recipes
- **array of objects** = حاجة هتشوفها طول الوقت كـ developer

## حاجات تانية موجودة (للمعلومية)
- **WeakSet** و **WeakMap** في JS
- data structures مش built-in: stacks, queues, linked lists, trees, hash tables — مش مهمين دلوقتي

## Arrays vs Sets
| Arrays | Sets |
|---|---|
| قيم **بترتيب** | قيم **unique** |
| ممكن duplicates | لما الـ **performance** مهمة جدًا (البحث والمسح لحد **10x أسرع**) |
| لما عايز **أعدّل** في الداتا (array methods كتير) | شيل duplicates من array |

Sets **مش بديل** للـ arrays — بتكمّلها.

## Objects vs Maps
| Objects | Maps |
|---|---|
| الطريقة التقليدية (مكانش فيه maps قبل ES6) | **أداء أحسن** كـ key-value store |
| أسهل في الكتابة والوصول (`.` و `[]`) | الـ keys **أي نوع** |
| الناس متعودة عليها | سهل الـ iteration |
| | سهل أعرف الـ **size** |

استخدام objects كـ key-value stores بس ليه عيوب تقنية — فيه ناس بتقول "كنا بنسيء استخدام الـ objects".

### إمتى إيه؟
- **Map**: لما محتاج أربط keys بـ values وبس، أو محتاج keys **مش strings**
- **Object**: لما محتاج **functions كـ values** (methods + `this` — **مستحيل في الـ maps**)، ومع **JSON** (إلا لو هحوّله لـ map، وده نادر)

لسه بنستخدم objects طول الوقت، بس الـ maps مهمة جدًا — **أهم من الـ sets بكتير**.

## ملحوظات لنفسي
- السؤال الأول دايمًا: محتاج أوصف القيم (keys) ولا لأ؟
- خلي بالك: `this` مش بيشتغل في map → methods = object.
- كنت فاكر إن الـ Set مجرد array من غير تكرار، طلع كمان **أسرع** في البحث والمسح.
- array of objects → أكتر شكل داتا هشوفه من الـ APIs.
