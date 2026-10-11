# 083 — PROJECT #2: Modal Window

## الفكرة
المشروع التاني: أول **UI component** — **modal window** (شباك بيظهر فوق الصفحة ومعاه **overlay** غامق). سهل أكتر ما هو باين، بس هيعلّمني أتعامل مع **classes** — وده **الطريقة الأساسية** اللي بنعدّل بيها صفحات الويب. في المحاضرة دي: نخزّن الـ selections في variables، ونتعرف على **`querySelectorAll`** والـ **NodeList**.

## أهم الحاجات

### المشروع بيعمل إيه (الـ demo)
- 3 زراير، أي واحد فيهم بيفتح **نفس** الـ modal.
- أقفله بـ:
  - زرار الـ ×
  - click برّه الشباك (على الـ **overlay**)
  - زرار **Esc** في الكيبورد

### قفل live-server بتاع المشروع اللي فات
- New Terminal بيفتح terminal **جديد** → عشان أرجع للأولاني: من المنيو أختار رقم 1 (**node**).
- **`Ctrl + C`** (حتى على الماك — **Ctrl مش Cmd**) → يوقف الـ process. أو أيقونة الزبالة.
- بعدها لو عملت reload لـ `localhost:8080` → مفيش connection.

### الـ starter files
- `.prettierrc`، `index.html`، `script.js` (فيه `'use strict'`)، `style.css`.

```html
<button class="show-modal">Show modal 1</button>
<button class="show-modal">Show modal 2</button>
<button class="show-modal">Show modal 3</button>

<div class="modal hidden">
  <button class="close-modal">&times;</button>
  <h1>I'm a modal window 😍</h1>
  <p>Lorem ipsum ...</p>
</div>
<div class="overlay hidden"></div>
```
```css
.hidden {
  display: none;
}
```
- الـ modal **موجود في الـ HTML أصلًا** بس مستخبي بالـ class **`hidden`** (`display: none`).
- مش هنعمل الـ HTML بـ JS — هنـ**ظهره ونخبيه** بس حسب الـ clicks.
- الـ `hidden` هي الـ class الأساسية في المشروع.
- الـ **overlay** = الجزء الغامق اللي بيغطي الخلفية.

### الجديد: نخزّن الـ selections في variables
- المرة دي بنختار **كل اللي محتاجينه في أول الملف**، كل واحد في variable، ونستخدمهم تاني وتالت.
- أحسن بكتير من إني أختار نفس الـ element كل شوية (زي المشروع اللي فات — جوناس عمل كده هناك عشان ميعقدش الدنيا).
- الأسماء زي أسماء الـ classes تقريبًا عشان تبقى مفهومة، و`btn` = button.
```js
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');
console.log(btnsOpenModal);
```

### Bug صغير: `null`
- كتبها الأول `.open-modal` → طلع **`null`** = مفيش element بالـ selector ده. الاسم الصح **`.show-modal`** (لو كان بص في الـ HTML كويس 😅).

### حدود `querySelector`
- بعد التصليح اختار **أول زرار بس**.
- لو الـ selector بيطابق **كذا element** → `querySelector` بيرجّع **الأول بس**.
- الحل: **`querySelectorAll`**:
```js
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal); // NodeList(3)
```
- بيرجّع **NodeList** — لما أعمل hover على العناصر بيتعلّموا الزراير التلاتة.
- NodeList **شبه array** (مش array بالظبط)، بس دلوقتي نتعامل معاها كأنها array.

### loop على الـ NodeList
```js
for (let i = 0; i < btnsOpenModal.length; i++)
  console.log(btnsOpenModal[i].textContent);
// Show modal 1
// Show modal 2
// Show modal 3
```
- `btnsOpenModal[i]` = element، فأقدر أستخدم عليه `textContent` عادي.
- **مفيش `{}`** — زي الـ if/else: لو سطر واحد بس، مش محتاج block.
- دلوقتي بنطبع بس، بعدين هنعمل حاجات حقيقية بنفس الطريقة.

### localhost
- `127.0.0.1:8080` = localhost على port 8080 — نفس الـ URL، فلو كان فيه tab مفتوحة قبل كده نفس الحاجة.

## الفرق بين…
| | `querySelector` | `querySelectorAll` |
|---|---|---|
| بيرجّع | **أول** element مطابق | **كل** المطابقين |
| النوع | element (أو `null`) | NodeList |
| التعامل | على طول | loop |

## غلطات لازم أخلي بالي منها
- `null` = الـ selector غلط → ارجع للـ HTML.
- أستخدم `querySelector` مع class متكررة → هيجيب أول واحد بس ومش هيقول error.
- أفتكر إن NodeList = array بالظبط (مش كده — بس بتتلف بـ for عادي).
- `Cmd + C` على الماك في الـ terminal مش هيوقف السيرفر → `Ctrl + C`.

## ملحوظات لنفسي
- عادة جديدة: **كل الـ selections في أول الملف** في variables.
- `btns...` (جمع) للـ NodeList، `btn...` للواحد — تسمية حلوة.
- `hidden` + `display: none` = طريقة الإظهار والإخفاء كلها هتبقى بالـ classes.
- `null` في الـ console = أراجع اسم الـ class.
