# 071 — Introduction to the CSS Box Model

## الفكرة
الـ **box model** من أهم أساسيات CSS: كل element = **مستطيل (box)** ليه content وpadding وborder وmargin، وده اللي بيحدد شكله وحجمه. وبعدين طبقناه، واتعلمنا global reset و`box-sizing` وselectors زيادة (`*`، `,`، والـ descendant/child selector).

## أهم الحاجات

### أجزاء الـ box (من جوه لبرّه)
- **Content** → النص والصور. حجمه بـ `width` و`height`.
- **Padding** → مسافة شفافة **جوه** الـ box حوالين المحتوى (`padding`).
- **Border** → حوالين الـ padding والمحتوى.
- **Margin** → مسافة **برّه** الـ box = المسافة **بين الـ boxes**.
- **Fill area** → الـ background color/image بيتطبق على content + padding + border، **مش** الـ margin.
- كلهم **optional**.

### Global reset
- بعض الـ elements واخدة **margin افتراضي** من البراوزر → بيعمل مشاكل.
- بنصفّر كل حاجة الأول بالـ **star selector `*`** (بيختار كل الـ elements):
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
- مع `0` مش محتاج unit.

### `box-sizing: border-box` (دايمًا بنحطها)
- من غيرها: `width: 100px` + padding 20 من كل ناحية → العرض الحقيقي **140px**.
- معاها: الـ padding والـ border **بيدخلوا جوه** الـ width → يفضل 100px.
- جربها على الـ form: `width: 400px` + padding 25 + border 5 → من غير border-box طلع **460px**. ومعاها رجع **400** والـ content بقى **340** عشان يستوعب الباقي.

### تطبيق
```css
body {
  background-color: rgb(255, 247, 201);
  font-family: Arial;
  font-size: 20px;
  padding: 50px; /* جرب 75 وكانت كتير */
}

h1 {
  font-size: 35px;
  margin-bottom: 25px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

p {
  margin-bottom: 20px; /* p selector بيختار التلاتة مهما كانت الـ class */
}
```
- **padding على body** → مسافة بين حافة الشاشة والمحتوى.
- فيه units تانية غير px: `%`، `em`، `rem`، `pt`… بس px أسهل للبداية.
- `margin` / `padding` لوحدها = **الـ 4 جهات**، أو جهة واحدة: `margin-bottom`, `margin-top`, …
- ليه `margin-bottom` مش `padding-bottom` على h1؟ الشكل واحد، بس الـ padding بيبقى **جوه** الـ h1 والمسافة دي منطقي تبقى **برّه**.
- `text-align: center` (أو left / right) → النص في نص الـ box بتاع h2.

### Elements tab في DevTools
- بيوريني الـ box model: content، padding (**أخضر**)، border، margin (**أحمر/برتقالي**).
- أقدر أفعّل/أقفل properties وأشوف الـ markup → مفيد جدًا وأنا شغال HTML/CSS.

### Block vs Inline تاني
- `h2` = block → الـ box واخد السطر كله.
- `a` = inline → الـ box على قد النص بس. وبان لما عملناله background:
```css
a {
  background-color: yellowgreen;
}
```
- `input` و`button` كمان **inline**.

### الـ form
```css
#your-name {
  background-color: rgb(255, 220, 105);
  border: 5px solid #444;
  width: 400px;
  padding: 25px;    /* مسافة جوه بين المحتوى والـ border */
  margin-top: 30px; /* مسافة برّه بين الصورة والـ form */
}
```
- comments في CSS: `/* */` مش `//`.

### أكتر من selector مرة واحدة (`,`)
```css
input,
button {
  padding: 10px;
  font-size: 16px;
}
```

### الـ child selector (selector جوه selector)
```css
#your-name h2 {
  color: olivedrab;
}
```
- مسافة بين الاتنين = "الـ h2 اللي **جوه** `#your-name`" بس → الـ h2 التاني ميتأثرش.
- الجزء التاني ممكن يبقى أي selector (class / id).
- مهم: **نفس الـ selectors دي هنستخدمها في JavaScript** نختار بيها elements في الـ DOM manipulation.

### حجم الصورة
- من غير حجم → الصورة بتاخد أكبر حجم ممكن (حجم الصورة الأصلي).
```css
#course-image {
  width: 300px; /* جرب 200 */
}
```
- بالـ id (مش `img`) عشان لو فيه صور تانية ميتأثروش.
- أحدد **width بس** → الـ height يتظبط **proportionally**.
- لو حطيت width وheight الاتنين 300 → **اتغير الـ aspect ratio** وبقت مربع.
- غالبًا أسهل أحدد الـ width.

### آخر كلام
- ده **أقل من 5%** من CSS — متكلمناش عن positioning ولا **flexbox** ولا **CSS grid**. الهدف أفهم كود المشاريع وأفهم الـ selectors.

## الفرق بين…
| | Padding | Margin |
|---|---|---|
| مكانه | جوه الـ box | برّه الـ box |
| بيتلوّن بالـ background؟ | آه | لأ |
| استخدامه | مسافة بين المحتوى والحافة | مسافة بين elements |

| | من غير border-box | مع border-box |
|---|---|---|
| width 400 + padding 25 + border 5 | 460px | 400px (content 340) |

## غلطات لازم أخلي بالي منها
- أنسى الـ global reset وأتلخبط من margins البراوزر.
- أحدد width وheight الاتنين للصورة → تتمط.
- `//` في CSS — غلط، `/* */`.
- `#your-name h2` بمسافة ≠ `#your-name, h2` بكومة.

## ملحوظات لنفسي
- كنت فاكر إن الـ width هو العرض النهائي دايمًا، طلع لأ من غير `border-box`.
- الـ reset بتاع `*` أحطه في أي مشروع.
- DevTools → Elements أحسن طريقة أفهم ليه حاجة واخدة مساحة.
- المسافة + الـ selector (descendant) هستخدمها في `querySelector` كمان.
