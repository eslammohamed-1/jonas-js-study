# 012 — let, const and var

## الفكرة
فيه 3 طرق أعمل بيها variable: `let` و`const` (من ES6، يعني modern) و`var` (الطريقة القديمة). إمتى أستخدم أنهي واحدة؟

## أهم الحاجات
### `let`: لما القيمة هتتغير
```js
let age = 30;
age = 31; // reassigning / mutating
```
- بستخدمها للـ variables اللي هتتغير وأنا البرنامج شغال.
- الاسم التقني: **reassigning a value**، أو بنقول إننا **mutate** الـ variable. كلمة mutate هسمعها كتير.
- وكمان لو عاوز أعمل **empty variable**:
```js
let year;
year = 1991;
```
- ده بيحصل في الشغل، زي إني أعرّف كل الـ variables فوق في الفايل، وأدّيها قيم بعدين حسب condition مثلًا.

### `const`: لما القيمة مش هتتغير
```js
const birthYear = 1991;
birthYear = 1990; // ❌ TypeError: Assignment to constant variable.
```
- variable مينفعش يتعمله reassign، أو بالمصطلح التقني **immutable**.
- سنة الميلاد مثال مثالي: عمرها ما بتتغير، لكن السن بيتغير. عشان كده `let` للـ age و`const` للـ birthYear.

```js
const job; // ❌ SyntaxError: Missing initializer in const declaration
```
- عشان const مش بتتغير، **مينفعش أعملها فاضية**. لازم initial value.

### أستخدم أنهي واحدة؟
- **const by default**، و`let` بس لما أكون متأكد إن القيمة لازم تتغير.
- حتى `age` لو متأكد إنه مش هيتغير في البرنامج يبقى const.
- السبب: كل ما الـ mutations تقل كان أحسن، لأن تغيير الـ variables بيفتح باب للـ bugs.
- جوناس قال من هنا ورايح هيستخدم const على قد ما يقدر.

### `var`: متستخدمهاش
```js
var job = 'programmer';
job = 'teacher'; // شغال عادي، زي let
```
- الطريقة القديمة قبل ES6، و**لازم أتجنبها تمامًا**.
- بس لازم أعرفها عشان legacy code وtutorials قديمة.
- من برّه شبه let، بس تحت مختلفين جامد. let **block-scoped** وvar **function-scoped**، وده هيتشرح في سيكشن جاي (جوناس قال section 7) لما نعرف يعني إيه block وfunction.
- جوناس قال إن التعلم مش linear، فساعات بنشوف حاجة قبل ما نفهمها كلها.

### من غير declaration خالص
```js
lastName = 'Schmedtmann';
console.log(lastName); // شغال!
```
- JS مش بتعترض، بس دي **فكرة وحشة جدًا**.
- مش بيعمل variable في الـ scope الحالي، بيعمل **property على الـ global object**. هنفهمها بعدين.
- لازم دايمًا أعمل declare صح.

## الفرق بين…
| | `let` | `const` | `var` |
|---|---|---|---|
| reassign | ✅ | ❌ TypeError | ✅ |
| فاضي من غير قيمة | ✅ | ❌ لازم initializer | ✅ |
| scope | block | block | function |
| إمتى | القيمة هتتغير | الافتراضي | متستخدمهاش |

## غلطات لازم أخلي بالي منها
- أعمل reassign لـ const، فيطلع **TypeError: Assignment to constant variable**.
- أعمل `const` من غير قيمة، فيطلع **Missing initializer in const declaration**.
- أكتب variable من غير let/const، فيبقى property على الـ global object.
- أستخدم var في كود جديد.

## ملحوظات لنفسي
- القاعدة: const الأول، ولو احتجت أغيّر أحوّلها let.
- mutate = غيّرت القيمة. هسمعها كتير.
- block vs function scope هيتشرحوا بعدين (Behind the Scenes)، فمش لازم أفهمها دلوقتي.
- لو شفت var في كود قديم في الشغل، أعرف إنها الطريقة القديمة.
