# 070 — Basic Styling with CSS

## الفكرة
أساسيات CSS: نعمل style للـ elements وlayout للصفحة. نتعلم الـ **selectors** (element / class / id)، والـ declarations، وربط ملف CSS خارجي، وفكرة الـ **inheritance**.

## أهم الحاجات

### CSS جوه الـ HTML (`<style>`)
- ينفع أكتب CSS في element اسمه `style` — مكانه في الـ **`head`** (لأنه settings مش محتوى مرئي).
```html
<style>
  body {
    background-color: green;
  }
</style>
```
- `body` = **selector** (هنا element selector → بيختار كل elements النوع ده).
- اللي بين `{ }` = **declaration block**.
- `background-color: green;` = **declaration**: property + value.
- فيه أسماء ألوان جاهزة في CSS (green, yellow…).

### ملف CSS خارجي + `link`
- عادة بنكتب CSS في ملف لوحده `style.css` (زي ما بنعمل مع JS) → **بنفصل الـ presentation عن الـ content**.
- بنربطه بـ **`link`** في الـ head:
```html
<link href="style.css" rel="stylesheet" />
```
- `href` نفس الـ attribute بتاع الـ anchor، بس **`link` مش لينك بيتداس** — بيربط CSS بالـ HTML بس.
- لازم `rel="stylesheet"`.
- تريك VS Code: hover على أي لون → يطلع **color picker**.

### Fonts و Inheritance
```css
body {
  background-color: rgb(255, 247, 201);
  font-family: Arial;
  font-size: 20px;
}
```
- `font-family` على الـ body → كل الـ children (h1, p, h2) خدوه → لأنها property بتتـ**inherit**.
- **أغلب الـ properties مش بتتورث**، بس اللي ليها علاقة بالـ **fonts** غالبًا بتتورث.
- عمليًا بنستخدم **web fonts** (زي Google Fonts)، بس هنا Arial كفاية.
- `font-size: 20px` → مش كل حاجة بقت 20، لأن **h1 وh2 ليهم font-size افتراضي من البراوزر** — وأقدر أعمله override:
```css
h1 {
  font-size: 40px; /* جرب 50 كانت ضخمة */
}
```

### Class selector (`.`)
```html
<p class="first">...</p>
<p class="second">...</p>
<p class="first">Please fill in this form :)</p> <!-- زود class first لتاني paragraph -->
```
```css
.first {
  color: red;
}
```
- بيختار **كل** الـ elements اللي عليها الـ class (الاتنين اللي `first`) — مش اللي `second`.
- `color` = لون النص.

### ID selector (`#`)
```css
#your-name {
  background-color: rgb(255, 220, 105);
  border: 5px solid #444;
}
```
- `border` = **shorthand property**: أكتر من value في property واحدة → **width** (5px)، **style** (solid / dotted / dashed)، **color**.
- `#444` = لون بصيغة hex (رمادي غامق). يعني عندي: أسماء ألوان، `rgb(...)`، و`#hex`.
- `border` **مش بيتورث** — وإلا كان كل child جوه الـ form هيبقى ليه border (مش منطقي).

## الفرق بين…
| Selector | الشكل | بيختار |
|---|---|---|
| element | `h1` | كل elements النوع ده |
| class | `.first` | كل اللي عليهم الـ class |
| id | `#your-name` | element واحد |

| | `a` | `link` |
|---|---|---|
| بيعمل | لينك بيتداس | يربط CSS بالصفحة |
| مكانه | body | head |

## غلطات لازم أخلي بالي منها
- أنسى `rel="stylesheet"` → الـ CSS مش هيشتغل.
- أخلط بين `a` و`link`.
- أستغرب ليه h1 مخدش الـ font-size من body → البراوزر عامله default.
- أنسى النقطة أو الـ `#` في الـ selector.

## ملحوظات لنفسي
- fonts بتتورث، border لأ.
- الـ color picker في VS Code مريح.
- `.` للـ class و`#` للـ id — نفس اللي هنستخدمه في `querySelector` بعدين.
