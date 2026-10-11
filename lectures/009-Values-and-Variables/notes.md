# 009 — Values and Variables

## الفكرة
**Value** = أصغر حتة بيانات في البرمجة (نص، رقم، …).
**Variable** = صندوق في الذاكرة بحط فيه value وأكتب عليه اسم (label)، وبعدين أرجعلها بالاسم ده.

```js
console.log('Jonas');           // value نص
console.log(23);                // value رقم
console.log(40 + 8 + 23 - 10);  // 61 ← كذا value بيطلعوا value واحدة

let firstName = 'Jonas';  // declaring a variable
console.log(firstName);   // Jonas
```

## أهم الحاجات

### تشريح السطر
`let` (بعرّف متغير جديد) ← `firstName` (الاسم) ← `=` (حط فيه) ← `'Jonas'` (القيمة).
كل ما JS تشوف `firstName` بتحط مكانه القيمة اللي جواه.

### الميزة الكبيرة: أغيّر في مكان واحد
```js
let firstName = 'Matilda'; // غيّرت هنا بس
console.log(firstName);    // Matilda
console.log(firstName);    // Matilda ← كل الأماكن اتغيرت لوحدها
```
لو كاتب `'Jonas'` literal في 10 أماكن، لازم أغيّر الـ 10 بإيدي.

### قواعد التسمية (لو كسرتها = Error)
```js
let 3years = 3;          // ❌ SyntaxError: مينفعش يبدأ برقم
let jonas&matilda = 'JM'; // ❌ رموز ممنوعة (& - . مسافة)
let new = 27;            // ❌ كلمة محجوزة (new, function, if …)

let years3 = 3;          // ✅
let _new = 27;           // ✅ الـ _ والـ $ مسموحين
let $function = 'x';     // ✅
```
- `name` مش محجوزة رسمي بس متستخدمهاش لوحدها، اكتب `firstName` أو `userName`.

### Conventions (مش Error بس عُرف)
```js
let firstNamePerson = 'Jonas'; // camelCase ← ده المعيار في JS
let first_name = 'Jonas';      // snake_case (Python/Ruby)
let PI = 3.1415;               // UPPERCASE ← ثابت عمره ما هيتغير
let Person = 'x';              // ❌ PascalCase سيبه للـ Classes (OOP)
```

### أسماء وصفية
```js
let myFirstJob = 'Programmer';  // ✅ مفهوم من غير ما أدوّر
let myCurrentJob = 'Teacher';

let job1 = 'Programmer';        // ❌ job1 يعني إيه؟
let job2 = 'Teacher';
```
لو قريت الاسم ومفهمتش جواه إيه → غيّره.

## ملحوظات لنفسي
- الـ errors بتظهر في الـ console لوحدها من غير `console.log`، اقرا الرسالة (النوع + الوصف + رقم السطر).
- `let` بتتكتب مرة واحدة بس وقت التعريف، بعد كده `x = قيمة جديدة` من غير `let`.
- `let x = 1; let x = 2;` في نفس الـ scope = SyntaxError.
