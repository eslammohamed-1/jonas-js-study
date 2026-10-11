# 045 — Object Methods

## الفكرة
الـ functions مجرد values، فأقدر أعمل key-value pair قيمتها function، يعني أحط functions جوه objects. أي function مربوطة بـ object اسمها **method**. ومعاها keyword مهمة جدًا: **`this`**.

## أهم الحاجات
### الـ object الجديد
```js
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYeah: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true,
  // ...
};
```
- الـ objects بتشيل أي types: arrays، وحتى objects جوه objects، وboolean زي `hasDriversLicense`.

### Version 1: method بـ parameter
```js
  calcAge: function (birthYeah) {
    return 2037 - birthYeah;
  }
```
```js
console.log(jonas.calcAge(1991));    // 46
console.log(jonas['calcAge'](1991)); // 46
```
- الـ key اسم الـ method، وبعده `:`، وبعده **function expression**.
- شبه `const calcAge = function (birthYeah) {...}` بالظبط، الفرق إن calcAge بقت **property** في الـ object، فبنستخدم `:`.
- **لازم expression**. لو كتبت declaration (`function calcAge() {}`) جوه الـ object يطلع **Unexpected token 'function'**. عشان كده كان مهم أفهم يعني إيه function expression.
- **الـ method في الآخر property**، بس قيمتها function. زي ما فيه property قيمتها string أو array أو boolean.
- بنوصلها بالـ dot أو بالـ brackets (والاسم يبقى string)، وبعدين `()` عشان أنادي.
- الأول `jonas.calcAge` بيتحسب ويرجّع الـ function value (precedence)، وبعدين الـ `()` بتناديها.

### المشكلة: 1991 مكتوبة مرتين
- birthYeah موجودة أصلًا في الـ object، فلو بعتها تاني ممكن أغلط (أكتب 1992 مثلًا).
- وحتى لو مغلطتش، ده **ضد DRY**. لو السنة اتغيرت هغيّرها في كل حتة.

### Version 2: `this`
```js
  calcAge: function () {
    // console.log(this);
    return 2037 - this.birthYeah;
  }
```
```js
console.log(jonas.calcAge()); // 46
```
- في كل method، JS بتدّيني variable خاص اسمه **`this`**.
- **`this` = الـ object اللي بينادي الـ method.**
- مين بينادي؟ اللي **قبل الـ dot**: `jonas.calcAge()` ← this = jonas.
- `console.log(this)` جوه الـ method طبع الـ jonas object كله.
- فـ `this.birthYeah` = 1991. هنتعلم `this` بالتفصيل في سيكشن بعدين.

### ليه مش `jonas.birthYeah` على طول؟
- شغالة دلوقتي، بس **ضد DRY** برضه.
- لو غيّرت اسم الـ object لـ `jonas2`، الكود هيبوظ (jonas is not defined)، وهغيّر جوه الـ method بإيدي.
- مع `this` كل حاجة شغالة، لأن this هيشاور على jonas2.
- **أشاور على الـ object بـ this، مش باسمه.**

### Version 3: أحسب مرة وأخزّن
```js
  calcAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  },
```
```js
console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);
```
- لو محتاج الـ age في كذا مكان، ناديت calcAge 4 مرات يعني حسبتها 4 مرات. هنا الحساب سهل، بس لو حساب تقيل هتبقى bad practice.
- الحل: `this.age = ...` بيعمل **property جديدة** على الـ object (زي `jonas.location = 'Portugal'` قبل كده)، وبعدين أجيبها كـ property.
- الـ return مش إجباري، بس جوناس شايفه good practice.
- غيّر `jonas.calcAge()` لـ `jonas.age` في كذا مكان بـ **Cmd + D**.
- دي أكفأ طريقة.

### Challenge: getSummary
> "Jonas is a 46-year old teacher, and he has a driver's license" ← ولو hasDriversLicense false تبقى "no driver's license"

```js
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
  }
```
```js
console.log(jonas.getSummary());
// Jonas is a 46-year old teacher, and he has a driver's license.
```
- **`,`** بين الـ properties والـ methods.
- this جوه getSummary = jonas، لأنه هو اللي نادى.
- **`this.calcAge()` مش `this.age`**: مقدرش أفترض إن calcAge اتنادت قبل كده، ولو متنادتش الـ age property مش هتبقى موجودة.
- أقدر أنادي method من method تانية بـ this، ونفس القاعدة.
- function call جوه template literal عادي.
- **ternary** عشان يختار 'a' أو 'no'.
- خلّى hasDriversLicense false فطلع "no driver's license".
- ⚠️ في كود جوناس مكتوب `${jonas.job}` مش `${this.job}`. شغال، بس حسب كلامه المفروض `this.job`.

### الـ arrays objects برضه
- `friends.push(...)` ← array وبننادي عليها method.
- **الـ arrays نوع خاص من الـ objects**، وعشان كده ليها built-in methods زي push وpop وshift وunshift.
- هنا عملنا methods على objects بتاعتنا، وهناك استخدمنا built-in methods. التفاصيل جاية.

## الفرق بين…
| Property | Method |
|---|---|
| value عادية (string، array…) | value عبارة عن function |
| `jonas.age` | `jonas.calcAge()` |

| `this.birthYeah` | `jonas.birthYeah` |
|---|---|
| شغالة لو اسم الـ object اتغير | هتبوظ لو الاسم اتغير |

## غلطات لازم أخلي بالي منها
- أكتب function declaration جوه object، فيطلع Unexpected token.
- أنسى الـ `,` بعد الـ method.
- أستخدم `this.age` قبل ما calcAge تتنادي، فتبقى undefined.
- أكتب اسم الـ object جوه الـ method بدل `this`.
- (من نوتتي القديمة) متعملش الـ method arrow function، لأن الـ arrow مالهاش `this` (محاضرة 36).

## ملحوظات لنفسي
- `this` = اللي قبل الـ dot وقت النداء.
- جوناس قال `this` بتلخبط، فأوقف وأعيد الشرح لو محتاج.
- `this.x = ...` جوه method بتعمل property جديدة.
- arrays = objects مخصوصة، فده سبب وجود `.push` و`.length`.
