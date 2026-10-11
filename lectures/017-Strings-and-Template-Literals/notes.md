# 017 — Strings and Template Literals

## الفكرة
بناء string كبيرة بالـ `+` متعب جدًا (مسافات وأقواس). من ES6 فيه **template literals** بالـ backticks، بكتب فيها الجملة عادي وبحط الـ variables جواها على طول.

## أهم الحاجات
### الـ Variables
```js
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;
```

### الطريقة القديمة بالـ `+`
```js
const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas); // I'm Jonas, a 46 year old teacher!
```
- **`I'm` فيها single quote**، فلازم الـ string دي تبقى بـ double quotes، وإلا الـ `'` اللي في I'm هتقفل الـ string.
- المهم إن كل string تبدأ وتخلص بنفس الرمز، والنوعين بيعملوا string عادي.
- `(year - birthYear)` لازم بين أقواس عشان الحساب يتعمل الأول وبعدين الـ concatenation.
- الحساب بيطلع number والباقي strings. JS بتحوّل الـ number لـ string لوحدها، وده اسمه **type coercion** وجاي بعدين.
- جوناس نسي مسافات في الأول، وطلعت الجملة لازقة في بعض. إدارة المسافات بالطريقة دي وجع دماغ.

### Template Literal
```js
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);
```
- لازم **backticks** `` ` ``، وهي فوق الـ Tab في الكيبورد الإنجليزي. الـ single والـ double quotes مش هينفعوا.
- `${...}` بحط جواها variable أو أي JavaScript، زي الحساب `year - birthYear`. تقنيًا أي **expression**، والـ expressions جاية في محاضرة بعدين.
- مفيش `+`، ومفيش تفكير في المسافات.
- جوناس كتب `${teacher}` بالغلط بدل `${job}`، فطلع error. عرف الغلطة من رسالة الـ error. لازم أتعوّد أقرا الـ error.
- template literals من أكتر features الـ ES6 استخدامًا.

### Backticks لأي string عادي
```js
console.log(`Just a regular string...`);
```
- شغالة عادي من غير placeholders.
- فيه developers بيستخدموا backticks لكل الـ strings، عشان ميفكروش أنهي quotes، ولو احتاجوا يحطوا variable بعدين متبقاش محتاجين يغيّروا. جوناس نفسه مش بيعمل كده، بس شايفها منطقية.

### Multiline strings
الطريقة القديمة (قبل ES6):
```js
console.log('String with \n\
multiple \n\
lines');
```
- `\n` = new line، special character في لغات كتير.
- وبعدها `\` عشان أكمّل في السطر اللي بعده. ودي شغالة بسبب bug في اللغة.

بالـ template literal:
```js
console.log(`String
multiple
lines`);
```
- بدوس Enter وخلاص.
- هتبقى مفيدة جدًا لما نبني HTML من JS ونحطه في الصفحة dynamically.
- أي multiline string ← template literal دايمًا.

## الفرق بين…
| `'...'` / `"..."` + `+` | `` `...${}...` `` |
|---|---|
| لازم `+` بين كل حتة | بكتب الجملة عادي |
| المسافات بإيدي | المسافات زي ما هي |
| الحساب لازم بين أقواس | الحساب جوه `${}` |
| multiline بـ `\n\` | Enter عادي |

## غلطات لازم أخلي بالي منها
- `'I'm'` بـ single quotes بيقفل الـ string بدري، فأستخدم `"I'm"` أو backticks.
- أنسى المسافات في الـ concatenation.
- أكتب كلمة بدل اسم الـ variable جوه `${}`، زي `${teacher}` بدل `${job}`.
- أستخدم `'` بدل `` ` `` مع `${}`، فمش هيشتغل وهيطبع `${firstName}` زي ما هي.

## ملحوظات لنفسي
- الـ backtick فوق الـ Tab.
- `${}` بتاخد أي expression، مش variable بس.
- من هنا ورايح أي string فيها variables هكتبها template literal.
- الـ multiline هتفرق معايا جامد في سيكشن الـ DOM.
