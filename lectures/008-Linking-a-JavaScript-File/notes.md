# 008 — Linking a JavaScript File

## الفكرة
نكتب JavaScript في فايل حقيقي بدل الـ console، ونربطه بـ HTML ونشغّله في المتصفح. وكمان نعرف ليه بنحتاج `console.log`.

## أهم الحاجات
### الـ Starter Code
- بنزّله من GitHub repo بتاع الكورس (اللينك في أول text lecture في أول سيكشن): الزرار الأخضر ← **Download ZIP**.
- لو على موبايل أو شاشة صغيرة ومش لاقي الزرار، أنزل لحد الـ FAQ، هلاقي لينك التحميل هناك.
- جوناس قال أقرا الـ FAQs كلها قبل ما أكمّل.
- كل سيكشن أو مشروع ليه فولدر، وجواه:
  - **starter** ← نقطة البداية، وده اللي أفتحه كـ project folder في VS Code.
  - **final** ← الكود في آخر السيكشن. لو حاجة باظت عندي أقارن بيه.
- VS Code ← New Window ← Open Folder ← أختار الـ starter.

### ليه HTML؟
- الـ JS في الـ front-end بتبقى attached لصفحة HTML، فلازم يبقى عندي HTML document.

### Inline script (الطريقة الأولى)
```html
<script>
  let js = 'amazing';
  if (js === 'amazing') alert('JavaScript is FUN!');
</script>
```
- جوناس حطه تحت الـ `<style>`.
- **الـ semicolon `;`** في آخر السطر بتقول لـ JS إن السطر خلص. مش إجبارية وفيه ناس بتشيلها، بس جوناس شايفها good practice وبتخلي الكود أنضف.
- عشان أشغّل الكود أفتح index.html في Chrome، والـ alert هيطلع. ولو عملت reload هيطلع تاني.
- **Cmd/Ctrl + B** بيقفل الـ sidebar في VS Code عشان المساحة.

### ليه النتيجة مش ظاهرة؟
```js
40 + 8 + 23 - 10;
```
- حطيتها في الـ script وعملت reload، ومظهرتش لا في الصفحة ولا في الـ console.
- السبب: الـ console بيعرض النتيجة على طول بس لما أكتب فيه مباشرة. لكن الكود اللي في script **مش بيطبع حاجة لوحده**.
- لازم أقول لـ JS صراحةً تطبع:
```js
console.log(40 + 8 + 23 - 10);
```
- الـ console بيقولي النتيجة جاية من أنهي فايل وأنهي سطر (مثلًا index.html على سطر 31).
- ولازم أدوس OK على الـ alert الأول عشان الكود يكمّل للسطر اللي بعده.
- جوناس شبّه `console.log` بإنها **كوبري** بين الـ script والـ developer console.

### External file (الطريقة الصح)
- inline script ميزته الوحيدة إنه مش بيحمّل فايل زيادة، بس وحش في فصل الـ content عن الـ logic.
- نعمل فايل **script.js** (اسم standard)، وننقل الكود فيه، ونشيل الـ inline script.
- كده فيه **separation of concerns** بين الـ presentation والـ logic، والكود أسهل يتصان على المدى الطويل.
- لو عملت reload دلوقتي مش هيحصل حاجة، لأن الـ HTML لسه ميعرفش الكود فين.

### الربط
```html
  <script src="script.js"></script>
</body>
```
- بنحطه في **آخر الـ body**.
- الـ script فاضي، ومعاه الـ attribute **`src`**.
- لو script.js في نفس فولدر index.html أكتب اسم الفايل بس، من غير path كامل.

```js
// script.js
let js = 'amazing';
if (js === 'amazing') alert('JavaScript is FUN!');

console.log(40 + 8 + 23 - 10);
```

## الفرق بين…
| Console | Script file |
|---|---|
| بيعرض النتيجة على طول | لازم `console.log` |
| مش محتاج `<script>` | محتاج يتربط بـ HTML |
| للتجربة | للكود الحقيقي |

| Inline script | External file |
|---|---|
| مفيش فايل زيادة يتحمّل | separation of concerns |
| الـ HTML والـ logic متلخبطين | أسهل في الصيانة |

## غلطات لازم أخلي بالي منها
لو الـ alert أو الـ output مطلعش، يبقى الفايل مش مربوط صح. أتأكد من:
- script.js في **نفس الفولدر** بتاع index.html.
- `src` متكتبة صح.
- مفيش errors في كود الـ JS نفسه.

## ملحوظات لنفسي
- كنت فاكر إن أي حساب في الكود هيظهر لوحده زي في الـ console، وطلع لازم `console.log`.
- `<script src="script.js">` في آخر الـ body.
- starter ← بشتغل فيه، final ← بقارن بيه لو حاجة باظت.
- في مذاكرتي بشتغل في 09-Data-Structures-Operators/starter، نفس الفكرة.
