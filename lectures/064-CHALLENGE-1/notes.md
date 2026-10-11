# 064 — CHALLENGE #1 (Developer Skills)

## الفكرة
Challenge السيكشن: نطبّق الـ problem-solving framework (افهم المشكلة → كسّرها لـ sub-problems) على function بتحوّل array درجات حرارة متوقعة لـ string. جوناس قال إن الهدف **مش** إني أوصل للنتيجة، الهدف إني أفكر وأكسّر المشكلة.

## أهم الحاجات

### المطلوب
```js
/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/
```
- علامة `º` مش لازم بالظبط لو مش لاقيها في الكيبورد.

### 1) Understanding the problem
```js
// 1) Understanding the problem
// - Array transformed to string, separated by ...
// - What is the X days? Answer: index + 1
```
- ليه index + 1؟ لأن ده forecast — مينفعش "17ºC in 0 days"، أول عنصر = بكرة.

### 2) Breaking up into sub-problems
```js
// 2) Breaking up into sub-problems
// - Transform array into string
// - Transform each element to string with ºC
// - Strings needs to contain day (index + 1)
// - Add ... between elements and start and end of string
// - Log string to console
```
(آخر واحدة زودها في الآخر — صغيرة بس برضه sub-problem.)

### خطوة 0: hard-code الأول (عشان أفهم)
```js
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

console.log(`... ${data1[0]}ºC ... ${data1[1]}ºC ... ${data1[2]}ºC ...`);
```
- شغالة لـ 3 أيام بس، ومع `data2` (أطول) مش هتنفع → محتاج حاجة **dynamic**.
- بس كتابتها الأول ليها قيمة: بتساعدني أشوف شكل الحل.

### خطوة 1: loop + accumulator string
- array وعاوز أعمل عليها operations → **loop** زي دايمًا.
- نفس فكرة حساب الـ average: كان عندنا `sum` بيبدأ بـ 0 ونزوّد عليه:
  - `[2, 3, 4]`: sum = 0 → 2 → 5 → 9.
- مع الـ strings نفس الفكرة: accumulator اسمه `str` بيبدأ بـ **`''` (empty string)** = الـ "صفر" بتاع الـ strings، وكل iteration أزوّد عليه.
```js
const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str = str + `${arr[i]}ºC`;
  }
  console.log(str);
};
printForecast(data1);
```
- أول مرة عمل save مفيش حاجة حصلت — **نسي ينادي الـ function** 😅.
- (تريك: أعمل select للكلام وأدوس backtick مرة واحدة → يلفه كله في template literal.)
- لو عاوز أشوف الـ string وهو بيكبر خطوة خطوة → الـ debugger.

### خطوة 2: اليوم
```js
str = str + `${arr[i]}ºC in ${i + 1} days`;
```

### خطوة 3: الـ dots
- الـ `...` بتتكرر **بعد كل عنصر** (مع مسافة).
- الـ dots اللي في **الأول**: لو حطيتها جوه الـ loop هتبقى dots كتير → أضيفها **مرة واحدة وأنا بعمل log**.

### الحل النهائي
```js
const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}ºC in ${i + 1} days ... `; // += أقصر
  }
  console.log('...' + str);
};
printForecast(data1);
// ... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ...
```

### التقنيات المستخدمة
- for loop على array.
- **accumulator string** يبدأ بـ `''` (زي الـ sum).
- template literals.
- `i + 1` للأيام.
- `+=` للاختصار.

## الفرق بين…
| | accumulator رقم | accumulator string |
|---|---|---|
| البداية | `0` | `''` |
| كل iteration | `sum += arr[i]` | `str += \`...\`` |
| النتيجة | رقم أكبر | string أطول |

## غلطات لازم أخلي بالي منها
- أنسى أنادي الـ function وأستغرب ليه مفيش output.
- أحط الـ `...` اللي في الأول جوه الـ loop → تتكرر.
- `i` بدل `i + 1` → "in 0 days".
- أعمل hard-code يشتغل مع test data واحدة بس.

## ملحوظات لنفسي
- الـ hard-code كخطوة أولى فكرة حلوة لما مبعرفش أبدأ منين — بعدين أخليه dynamic.
- كنت فاكر إن تحويل array لـ string محتاج method معينة، طلع نفس فكرة الـ sum بس بـ `''`.
- لازم أجرب الحل على `data2` كمان، مش الأولى بس.
- السيكشن ده كان soft skills أكتر، وجوناس شايفها مهمة للنجاح.
