# 084 — Working With Classes

## الفكرة
نخلي الـ modal يفتح ويقفل عن طريق **إضافة وإزالة classes** بـ `classList` — وده **الطريقة الأساسية** اللي بنغيّر بيها شكل الصفحات في الواقع. وكمان: لو نفس الـ handler هيتستخدم في كذا event listener → نطلّعه في **named function**.

## أهم الحاجات

### event listener على الـ 3 زراير (جوه الـ loop)
```js
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', function () {
    console.log('Button clicked');
  });
```
- `btnsOpenModal[i]` = الزرار الحالي في كل iteration → نحط عليه listener.
- **event handler** و**event listener** تقريبًا نفس المعنى.
- الـ handler = **anonymous function** + function expression (value).
- الغلطة: كان كاتب `console.log` حوالين الـ addEventListener نفسه — مالوش معنى، الـ log مكانه **جوه** الـ handler.
- الـ console بيكتب `2`, `3`… جنب الرسالة لما تتكرر.

### إظهار الـ modal = نشيل `hidden`
- جرب يشيل `hidden` من الـ HTML بإيده → الـ modal ظهر. وده بالظبط اللي هنعمله بـ JS.
```js
modal.classList.remove('hidden');
overlay.classList.remove('hidden');
```
- `classList` = property على الـ element، وليها methods: **`remove`**, **`add`**, **`contains`**.
- أقدر أشيل **كذا class** مرة واحدة: `classList.remove('hidden', 'other')`.
- ⚠️ **من غير نقطة**: `'hidden'` مش `'.hidden'` — النقطة للـ **selector** بس، هنا أنا ببعت **اسم** الـ class. (جوناس كان بيغلط فيها.)
- في DevTools بان إن `hidden` اتشالت من الـ element.

### ليه classes أحسن من `.style`؟
```js
// نفس النتيجة بس أوحش:
modal.style.display = 'block'; // display: none = مخفي، block = ظاهر
```
- class بتـ**جمّع (aggregate)** styles كتير في مكان واحد. `hidden` فيها style واحد بس، بس تخيل لو فيها 10 properties → هكتبهم كلهم في JS وأفتكر الأسماء والقيم ❌.
- القاعدة: **لما أحتاج أغيّر styles → أحطها في class في CSS، وأضيف/أشيل الـ class من JS**.
- كل class زي **container** فيه properties كتير → add/remove = تفعيل/إلغاء كلهم مرة واحدة.

### القفل = نرجّع `hidden`
```js
btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});
```
- الـ engine هو اللي بينادي الـ function لما الـ click يحصل على الـ element ده.

### القفل بالـ click على الـ overlay
- نسخ نفس الكود للـ overlay → اشتغل، بس **كود متكرر** ❌.
- الحل: نطلّعه في **named function** (function expression في variable):
```js
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
```
- ⚠️ `closeModal` **من غير `()`** — لو كتبت `closeModal()` هتتنفذ **فورًا** أول ما JS يقرا السطر، مش لما يحصل click.
- عمل نفس الحاجة لـ `openModal` وشال الـ console.log وحط الـ functions جنب بعض.
- الفايدة: **DRY** + **readable / expressive / declarative**: "btnCloseModal, addEventListener click, closeModal" بتتقري زي جملة.
- ده **refactoring** — الشغل زي ما هو، 3 زراير تفتح وطريقتين تقفل ✅.

### الـ takeaways (جوناس قال اكتبها notes 😄)
1. لو نفس الـ function هتتستخدم في **كذا event listener** → اعملها function لوحدها وابعتها كـ argument.
2. **إضافة وإزالة classes** هي اللي بنعملها طول الوقت عشان نغير شكل الـ elements.
3. (الحاجة التالتة: **نتشيك** هل class موجودة → المحاضرة الجاية مع الـ key press.)

## الفرق بين…
| | `classList` (classes) | `.style` |
|---|---|---|
| كذا style مرة واحدة | ✅ | لازم أكتبهم واحد واحد |
| الـ styles فين | في CSS | جوه JS |
| الأفضل عمليًا | ✅ | للحاجات البسيطة/الديناميكية |

| | `addEventListener('click', closeModal)` | `addEventListener('click', closeModal())` |
|---|---|---|
| بيحصل إيه | يتنادى لما الـ click يحصل ✅ | يتنفذ فورًا والنتيجة (undefined) تتبعت ❌ |

## غلطات لازم أخلي بالي منها
- `classList.remove('.hidden')` بالنقطة ❌.
- `console.log(...addEventListener(...))` بدل ما الـ log يبقى جوه الـ handler.
- نفس الكود في handlers كتير بدل function واحدة.
- القوسين بعد اسم الـ handler.

## ملحوظات لنفسي
- `classList.add / remove / contains` — التلاتة الأساسيين.
- كنت بفكر أغيّر الـ styles بـ `.style` على طول، طلع الـ classes هي الطريقة الاحترافية.
- الكود بقى بيتقري زي جملة إنجليزي — ده الهدف من التسمية الكويسة.
