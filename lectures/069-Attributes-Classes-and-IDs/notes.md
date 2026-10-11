# 069 — Attributes, Classes and IDs

## الفكرة
الـ **attributes** بتوصف الـ elements (زي `href` و`src`)، والـ **classes والـ ids** بنسمي بيها الـ elements عشان نختارها في CSS و**JavaScript (DOM manipulation)**. وفي الآخر form وفكرة **semantic HTML**.

## أهم الحاجات

### Nesting
- ينفع أحط elements جوه بعض: `h1` و`p` جوه `body` → **child elements** للـ body.

### Link: `a` + `href`
```html
<p>
  ... You can learn more about it
  <a href="https://www.udemy.com/user/jonasschmedtmann/">on Udemy</a>.
</p>
```
- `a` = anchor element. النص اللي جواه هو اللي بيظهر.
- `href` = **hypertext reference** → الـ URL اللي اللينك بيروحله.
- أحيانًا live-server ميعملش reload → اعمل reload بإيدك.

### Inline vs Block
- `a` = **inline element** → بيمشي في نفس السطر مع النص.
- `h2` = **block element** → بياخد سطر جديد لوحده (block كبير).

### Image: `img` + `src`
```html
<img src="https://img-a.udemycdn.com/course/480x270/437398_46c3_9.jpg" />
```
- `src` = صورة من الفولدر أو URL.
- **مالهاش closing tag** (مفيش محتوى نصي جواها). الـ `/` في الآخر مش إجبارية.
- كل element ليه attributes بتاعته: `href` ملوش لازمة على `img`، و`src` ملوش لازمة على `a`.

### Classes و IDs
- attributes ينفع تتحط على **أي element**، بنسمي بيها الـ elements عشان:
  - نختارها في **CSS** ونعمل style.
  - نختارها من **JavaScript** في الـ DOM manipulation.
```html
<p class="first">...</p>
<p class="second">Just another paragraph</p>
<img id="course-image" src="..." />
```
- **id لازم يبقى unique** (مرة واحدة في الصفحة). **class يتكرر** عادي.
- في الواقع: تقريبًا **مش بنستخدم ids** للـ styling أو الاختيار من JS — **classes أحسن practice**.
- **Convention**: أسماء الـ classes والـ ids بـ **dash** (`course-image`)، مش camelCase زي JS (`courseImage`). الاتنين شغالين بس ده العرف.

### Form
```html
<form id="your-name">
  <h2>Your name here</h2>
  <p class="first">Please fill in this form :)</p>

  <input type="text" placeholder="Your name" />
  <button>OK!</button>
</form>
```
- بدأها `div` = **أعم box** (generic، ملوش معنى).
- ينفع أكتر من `h2` في نفس الصفحة.
- `input` + `type` (text, button, checkbox, email, file…) + `placeholder`. **مالوش closing tag**.
- `button` **ليه** closing tag (ليه محتوى).
- مش هيعمل حاجة لما أدوس — محتاج JavaScript.

### Semantic HTML
- غيّر الـ `div` لـ **`form`** → نفس الشكل بالظبط، بس **ليه معنى**.
- semantic = أستخدم الـ element المناسب للمحتوى اللي جواه.
- ليه؟ مثلًا **SEO**: Google يفهم كل element معناه إيه بدل boxes مالهاش معنى.

## الفرق بين…
| | class | id |
|---|---|---|
| التكرار | يتكرر | unique |
| CSS selector | `.first` | `#course-image` |
| الاستخدام الفعلي | ✅ الأحسن | قليل |

| | inline (`a`) | block (`h2`, `p`) |
|---|---|---|
| السطر | نفس السطر | سطر جديد لوحده |

## غلطات لازم أخلي بالي منها
- أستخدم نفس الـ id مرتين.
- camelCase في أسماء الـ classes (مش غلط بس عكس الـ convention).
- `div` لكل حاجة بدل الـ element الـ semantic.

## ملحوظات لنفسي
- الـ classes هي اللي هختار بيها elements من JS بعدين — مهمة جدًا.
- `img` و`input` من غير closing tag.
- div = box عام، form/… = box ليه معنى.
