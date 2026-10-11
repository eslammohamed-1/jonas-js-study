# 079 — Manipulating CSS Styles

## الفكرة
الـ DOM فيه كمان **CSS styles**، فأقدر أغيّرها من JS. لما اللاعب يكسب: **خلفية الصفحة تبقى خضرا** و**مربع الرقم يبقى أعرض**.

## أهم الحاجات

### Comments عشان الكود يبقى أوضح
```js
// When there is no input
// When player wins
// When guess is too high
// When guess is too low
```

### نغيّر خلفية الـ body
- أختار الـ `body` (element selector — **من غير نقطة**، ومفيش غير body واحد).
- **`.style`** → وبعدين اسم الـ CSS property.
```js
document.querySelector('body').style.backgroundColor = '#60b347';
```
- في CSS: `background-color` (بـ dash). في JS **مينفعش** → **camelCase**: `backgroundColor`. ونفس القاعدة لأي property من كلمتين.
- اللون من الـ CSS (hex RGB) وبيتكتب **string**.
- `=` زي أي set في الـ DOM.

### نعرّض الرقم
```js
document.querySelector('.number').style.width = '30rem';
```
- الـ width الأصلي `15rem` → دبلناه.
- **القيمة لازم string ومعاها الـ unit** → `'30rem'`. مينفعش `30` ولا `30rem` من غير quotes. نفس الكلام لـ `%` و`px`.

### مكانها
```js
// When player wins
} else if (guess === secretNumber) {
  document.querySelector('.message').textContent = '🎉 Correct Number!';

  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
}
```

### دي Inline Styles
- مش بنغيّر ملف الـ CSS خالص.
- بتتحط كـ **inline style** في الـ HTML عن طريق الـ `style` attribute — بان في DevTools على الـ number والـ body.

### حاجة جانبية: الـ terminal
- قفل لوحة الـ terminal مش بيوقف live-server. عشان أوقفه فعلًا: **أيقونة الزبالة (kill terminal)** أو **`Ctrl + C`**.

## الفرق بين…
| CSS | JavaScript |
|---|---|
| `background-color: #60b347;` | `.style.backgroundColor = '#60b347';` |
| `width: 30rem;` | `.style.width = '30rem';` |

## غلطات لازم أخلي بالي منها
- `style.background-color` ❌ → `style.backgroundColor`.
- `style.width = 30` ❌ → `'30rem'` (string + unit).
- أختار `.body` بنقطة ❌ → `body`.
- أفتكر إن الـ CSS file اتغير — لأ، ده inline.

## ملحوظات لنفسي
- القاعدة: **`element.style.propertyInCamelCase = 'value + unit'`**.
- الـ styles من JS = inline → عشان كده بتكسب على الـ CSS file.
- `Ctrl + C` يوقف live-server.
