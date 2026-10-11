# 076 — Selecting and Manipulating Elements

## الفكرة
بعد ما قرينا الـ `textContent`، دلوقتي **نغيّره** (set) — ده DOM manipulation بجد. وبنتعامل مع الـ **input field** بالـ property **`value`** بدل `textContent`.

## أهم الحاجات

### Set للـ `textContent`
```js
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';
```
- نفس الـ selection، وبدل ما أقرا → `=` والقيمة الجديدة.
- الإيموجي اختياري (عشان الديزاين بس).
- أول مرة عمل save مفيش حاجة اتغيرت — كان بيبص على **الـ demo** مش النسخة بتاعتنا 😅.
- الـ log اللي **قبل** التغيير → لسه `Start guessing...` (ده اللي في الـ HTML). لو قريت **بعد** التغيير → المحتوى الجديد.
- كده عدّلنا الـ text content بتاع **DOM node** = DOM manipulation.

### الرقم السري والـ score
- من الـ HTML:
```html
<div class="number">?</div>
...
<p class="label-score">💯 Score: <span class="score">20</span></p>
```
```js
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
```
- نسي `.textContent` في الأول — **مينفعش أعمل set للـ element كله**، الـ element فيه حاجات أكتر بكتير من المحتوى.
- فيه طرق تانية للـ selection، هنشوفها في مشروع جاي.

### الـ input field → `value`
```html
<input type="number" class="guess" />
```
```js
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value); // 23
```
- مع الـ input بنقرا/نكتب بـ **`value`** مش `textContent`.
- قبل ما يكتب حاجة كان الـ value **فاضي**.
- لما عمل set → `23` ظهرت في الـ input كأني كتبتها، وأقدر أمسحها عادي.
- عشان الـ log يطلع 23 → لازم يبقى **بعد** سطر الـ set (`Alt + ↓` بينقل السطر لتحت).
- طلعله error: `querySelector` **محتاجة argument واحد على الأقل** — حصل لما عمل save والـ string لسه فاضي.

### الجاي
- إزاي أقرا الرقم **لما أدوس على زرار**؟ → events (المحاضرة الجاية).

## الفرق بين…
| | `textContent` | `value` |
|---|---|---|
| بستخدمه مع | p, div, span… | `input` |
| read / set | الاتنين | الاتنين |

## غلطات لازم أخلي بالي منها
- `document.querySelector('.score') = 10` ❌ → لازم `.textContent`.
- أستخدم `textContent` مع input → مش هيجيب اللي مكتوب.
- أقرا القيمة **قبل** ما أغيرها وأستغرب ليه قديمة → الكود بيتنفذ بالترتيب.

## ملحوظات لنفسي
- input = `value`، أي حاجة تانية = `textContent`.
- `Alt + ↓/↑` لنقل السطور — مفيدة.
- كل الكود ده جوناس علّق عليه بعدين (`/* */`) لأنه كان تجربة بس.
