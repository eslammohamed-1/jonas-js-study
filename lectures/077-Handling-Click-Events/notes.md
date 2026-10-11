# 077 — Handling Click Events

## الفكرة
أول مرة الكود بتاعنا **يتفاعل مع حاجة بتحصل في الـ DOM**: لما أدوس على زرار **Check!**. ده محتاج **event listener**. وبدأنا نبني اللعبة: نجيب التخمين، نحوّله لـ number، ونتعامل مع حالة **مفيش input**.

## أهم الحاجات

### Event و Event Listener
- **event** = حاجة بتحصل في الصفحة: mouse click، الماوس بيتحرك، key press، وغيرهم كتير.
- **event listener** = بيستنى event معين يحصل وبعدين **يتفاعل** معاه.
- مسحنا كود التجارب بتاع المحاضرة اللي فاتت — من هنا بنبني اللعبة بجد.

### الخطوة 1: أختار الـ element اللي الـ event هيحصل عليه
```html
<button class="btn check">Check!</button>
```
- الزرار عليه class **`btn`** و**`check`**. الـ `btn` عام (على زرار Again! كمان) → نستخدم **`.check`**.

### الخطوة 2: `addEventListener`
```js
document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
});
```
- فيه كذا طريقة نسمع بيها events، بس **`addEventListener` الأحسن والأكثر استخدامًا**.
- **أول argument**: نوع الـ event → `'click'`.
- **تاني argument**: function فيها اللي يحصل = **event handler**.
- ليه ينفع أبعت function كـ argument؟ لأن **الـ function مجرد value** (من سيكشن الـ fundamentals) — زيها زي string أو number.
- دي **function expression** عادي، بس بدل ما أحطها في variable بعتها **مباشرة** لـ `addEventListener`.
- كتبت 9 ودوست → 9 في الـ console ✅.

### ⚠️ أنا مش بنادي الـ function!
- أنا **بعرّفها بس** وببعتها. **الـ JavaScript engine هو اللي بيناديها** لما الـ event يحصل.
- مش بتتنفذ أول ما الـ script يشتغل — بس لما أدوس. (وواضح في الكود: مفيش `()` بتناديها.)

### DOM manipulation جوه الـ handler
- جرب يحط سطر تغيير الـ message جوه الـ handler → لما أدوس: الرقم يتطبع **والرسالة تتغير**. (مالهاش علاقة باللعبة، اتمسحت.)

### الخطوة 3: نخزن التخمين في variable
```js
document.querySelector('.check').addEventListener('click', function () {
  const guess = document.querySelector('.guess').value;
  console.log(guess, typeof guess); // '5' 'string'
});
```
- أي حاجة جاية من الـ UI (input) **غالبًا string**.
- هنقارنها بعدين بـ **secret number** عشوائي → لازم نحولها لـ number:
```js
const guess = Number(document.querySelector('.guess').value);
console.log(guess, typeof guess); // 5 'number' (لونه بنفسجي في الـ console)
```

### الخطوة 4: أول سيناريو — مفيش input
- في أي app بياخد input: **أول حاجة أتشيك فيه value ولا لأ**.
- لو دوست Check والـ input فاضي → `Number('')` = **`0`** → و0 **falsy**.
- جوه الـ `if` القيمة بتتحول لـ boolean → 0 = `false`، بس إحنا عاوزين الكود يشتغل **في الحالة دي** → نقلبها بـ **`!`**.
```js
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
  }
});
```
- الـ block بيتنفذ بس لو الشرط كله `true` → `!0` = `true` ✅.
- المحاضرة الجاية: باقي السيناريوهات (التخمين صح، أعلى، أقل) + نعمل الـ secret number.

## الفرق بين…
| | تعريف الـ function | نداء الـ function |
|---|---|---|
| مين بيعمله هنا | أنا (بكتبها جوه addEventListener) | الـ JS engine لما الـ event يحصل |
| فيه `()` بعدها؟ | لأ | — |

## غلطات لازم أخلي بالي منها
- أستخدم `.btn` → هيختار أول زرار (Again!) مش Check.
- أقارن string بـ number من غير `Number()`.
- أنسى إن الـ input الفاضي = `0` بعد `Number()` (falsy).
- أكتب `addEventListener('click', handler())` بقوسين → كده بناديها فورًا ❌.

## ملحوظات لنفسي
- الـ pattern: **select → addEventListener(type, handler)**.
- الـ handler بيتنفذ **بعدين**، مش وقت ما الكود بيتقري — دي كانت لخبطة عندي.
- أول سيناريو دايمًا: **مفيش input**.
- `!guess` بتستغل الـ falsy بتاع 0.
