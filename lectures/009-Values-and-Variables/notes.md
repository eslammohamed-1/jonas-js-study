# 009 — Values and Variables

## الفكرة
الـ value هي أصغر حتة معلومة في البرمجة، والـ variable صندوق بخزّن فيه الـ value عشان أستخدمها تاني كتير. وفي آخر المحاضرة قواعد وconventions تسمية الـ variables.

## أهم الحاجات
### الـ Value
- **value = piece of data**، أصغر unit of information في JS.
```js
console.log('Jonas'); // 'Jonas' دي value
console.log(23);      // 23 value تانية
```
- في `40 + 8 + 23 - 10` فيه 4 values، والـ operators بيجمعوهم في value واحدة هي 61.

### الـ Variable (الصندوق)
```js
let firstName = 'Jonas';
console.log(firstName); // Jonas
```
- اللي عملناه ده اسمه **declaring a variable**. بيتعمل variable حقيقي في الـ memory وتتخزن فيه الـ value.
- تشبيه جوناس: صندوق فيه كتاب، ومكتوب عليه label. الـ label هو اسم الـ variable (`firstName`)، والكتاب هو الـ value (`'Jonas'`).
- ده نفس اللي عملناه في الأول بـ `let js = 'amazing'`.
- `console.log` هنستخدمها طول الكورس عشان نطلّع أي حاجة من الكود للـ console.

### أغيّر في مكان واحد بس
```js
let firstName = 'Matilda';

console.log(firstName);
console.log(firstName);
console.log(firstName); // Matilda في التلاتة
```
- كل ما JS تشوف اسم الـ variable بتحط مكانه الـ value.
- من غير variables كنت هغيّر 'Jonas' لـ 'Matilda' بإيدي في كل مكان.

### Conventions: camelCase
```js
let firstNamePerson; // camelCase: أول كلمة small، والباقي أول حرف capital
let first_name;      // بالـ underscore، مشهور في Ruby
```
- camelCase هو الـ standard في JS، وأغلب الكود اللي هشوفه مكتوب بيه.

### Hard rules: لو كسرتها يطلع error
```js
let 3years = 3;          // ❌ مينفعش الاسم يبدأ برقم
let jonas&matilda = 'JM'; // ❌ unexpected token: &
let jonas_matilda = 'JM'; // ✅

let new = 27;      // ❌ new دي reserved keyword
let function = 27; // ❌ نفس الكلام
let $function = 27; // ✅ أو _function
```
- الاسم ممكن يكون فيه **حروف وأرقام و`_` و`$` بس**.
- مينفعش يبدأ برقم.
- مينفعش يبقى reserved keyword.

### قراءة الـ Errors
- `let 3years = 3` طلّع **SyntaxError: Invalid or unexpected token**، ومعاه رقم السطر (13).
- **SyntaxError** يعني غلطت في كتابة الكود نفسه.
- **الـ errors بتظهر في الـ console لوحدها** من غير `console.log`.
- جوناس قال أتعوّد أقرا رسايل الـ errors من أول الكورس.

### كلمة `name`
```js
let name = 'Jonas'; // شغالة، بس متعملهاش
```
- هي kind of reserved، بس legal. وفي حالات بتعمل مشاكل. عشان كده جوناس دايمًا بيكتب `firstName`.

### متبدأش بحرف capital
```js
let Person = 'jonas'; // ❌ convention: ده لحاجة معينة (OOP)
let person = 'jonas'; // ✅
```
- مش illegal، بس الأسماء اللي بتبدأ بـ capital محجوزة لاستخدام في OOP هنشوفه بعدين.

### الـ constants كلها capital
```js
let PI = 3.1415;
```
- لو قيمة عارف إنها **عمرها ما هتتغير** أكتبها كلها uppercase. وVS Code بيلوّنها لون مختلف عشان عارف الـ convention ده.

### أسماء descriptive
```js
let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

let job1 = 'programmer'; // أسوأ: معرفش مين فيهم إيه
let job2 = 'teacher';

console.log(myFirstJob);
```
- من مجرد الاسم لازم أفهم الـ variable فيه إيه. ده بيخلي الكود cleaner.
- لو غيّرت `myFirstJob` لـ 'Coder' هتتغير في البرنامج كله.

## الفرق بين…
| Hard rule (error) | Convention (عُرف بس) |
|---|---|
| يبدأ برقم ❌ | camelCase |
| رموز غير `_` و`$` ❌ | متبدأش بـ capital |
| reserved keyword ❌ | الـ constants كلها UPPERCASE |
| | أسماء descriptive، ومتستخدمش `name` |

## غلطات لازم أخلي بالي منها
- أسمّي variable باسم keyword زي `new` أو `function`.
- أستخدم `&` أو أي رمز غير `_` و`$`.
- أسمّي `name` لوحدها.
- لو لقيت الـ quotes بتتغير من single لـ double لوحدها، فده الـ formatter عند جوناس، مش حاجة مهمة.

## ملحوظات لنفسي
- variable = صندوق + label، والـ value هي اللي جوه.
- الـ errors بتطلع في الـ console لوحدها، أقرا النوع ورقم السطر.
- `_` و`$` هما الرمزين الوحيدين المسموحين.
- لو قريت الاسم ومفهمتش جواه إيه، أغيّره.
