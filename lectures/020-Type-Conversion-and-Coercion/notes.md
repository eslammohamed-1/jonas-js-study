# 020 — Type Conversion and Coercion

## الفكرة
تحويل الـ types من نوع لنوع بنعمله طول الوقت. فيه **conversion** (أنا اللي بحوّل بإيدي) و**coercion** (JS بتحوّل لوحدها من ورا ضهري). ولازم أفهم قواعد الـ coercion عشان JS ساعات بتتصرف بشكل غريب.

## أهم الحاجات
### Type Conversion (يدوي)
- مثال: input field في الصفحة بيدّيني سنة الميلاد، والـ inputs دي عادةً بتيجي **strings**.
```js
const inputYear = '1991';
console.log(inputYear + 18); // '199118' ← لزق string مش جمع
```

```js
console.log(Number(inputYear), inputYear); // 1991 '1991'
console.log(Number(inputYear) + 18);       // 2009
```
- `Number()` function built-in بتحوّل الـ string لـ number. الـ functions هنفهمها السيكشن الجاي.
- في الـ console الـ number لونه pink والـ string أبيض (الألوان ممكن تتغير مع الوقت).
- **الـ variable الأصلي مش بيتغير.** `inputYear` لسه string، و`Number()` بس بترجّعلي نسخة متحوّلة. عشان كده لازم أستخدم `Number()` في الحساب نفسه.

### NaN
```js
console.log(Number('Jonas')); // NaN
console.log(typeof NaN);      // number 😅
```
- **NaN = Not a Number**، وبتطلع لما عملية فيها أرقام متطلّعش رقم جديد.
- معناها الحقيقي **invalid number**، والدليل إن الـ `typeof` بتاعها number.

### Number ← String
```js
console.log(String(23), 23); // '23' 23
```
- أقل أهمية، بس موجودة.
- `Number` و`String` لازم أول حرف **capital**، وإلا مش هيشتغلوا.

### JS بتحوّل لـ 3 types بس
- **number** و**string** و**boolean**. مينفعش أحوّل لـ undefined أو null.
- الـ boolean ليه سلوك خاص، وليه محاضرة لوحده (truthy & falsy).

### Type Coercion (أوتوماتيك)
- بتحصل لما operator يتعامل مع **قيمتين من نوعين مختلفين**، فـ JS تحوّل واحدة منهم عشان تطابق التانية والعملية تتنفذ.
- في الواقع نادرًا ما بنحوّل يدوي، لأن JS بتعمل coercion في حالات كتير.

#### `+` بيحوّل لـ string
```js
console.log('I am ' + 23 + ' years old'); // I am 23 years old
// زي ما أكون كتبت: 'I am ' + '23' + ' years old'
```
- لما يبقى فيه string وnumber مع `+`، الـ number بيتحوّل لـ string.
- نفس الكلام في الـ template literals، الأرقام بتتحوّل strings.
- لغات كتير معندهاش coercion، فكنت هضطر أكتب `String(23)`.

#### `-` و`*` و`/` بيحوّلوا لـ number
```js
console.log('23' - '10' - 3); // 10
console.log('23' * '2');      // 46
console.log('23' / '2');      // 11.5
```
- الـ `-` بيعمل **العكس**: بيحوّل الـ strings لـ numbers.
- لو كان `+` بدل `-` في المثال الأول، الـ 3 كانت هتتحوّل string والتلاتة يتلزقوا.
- الحتة دي بتلخبط مبتدئين كتير.

### Guess the output 🎯
```js
let n = '1' + 1; // '11'
n = n - 1;
console.log(n); // 10
```
- `'1' + 1` ← `'11'` (string)، وبعدين `'11' - 1` ← الـ `-` بيحوّل لـ number ← 10.

```js
2 + 3 + 4 + '5'; // '95'
```
- 2+3=5، وبعدين 5+4=9، وبعدين `9 + '5'` ← string ← `'95'`.

```js
'10' - '4' - '3' - 2 + '5'; // '15'
```
- 10-4=6، وبعدين 6-3=3، وبعدين 3-2=1، وبعدين `1 + '5'` ← `'15'`.

- جوناس مسح الـ console بزرار **Clear console** عشان يشيل الزحمة.

### رأي جوناس في الـ coercion
- ناس كتير شايفاه bad practice لأنه ممكن يعمل bugs.
- بس ده بيحصل لما مبقاش فاهم القواعد. لو فاهمها، الـ coercion بيخليني أكتب كود أقل وأوضح. فأفهمه و**embrace it**.

## الفرق بين…
| Type Conversion | Type Coercion |
|---|---|
| أنا اللي بحوّل explicitly | JS بتحوّل implicitly |
| `Number('23')`، `String(23)` | `'23' - 10`، `'I am ' + 23` |

| Operator | بيحوّل لـ |
|---|---|
| `+` (لو فيه string) | string |
| `- * /` | number |

## غلطات لازم أخلي بالي منها
- أجمع رقم على input جاي string، فيطلع `'199118'`.
- أفتكر إن `Number(x)` غيّرت x نفسه. هي بترجّع نسخة.
- أكتب `number()` أو `string()` small.
- أنسى إن `+` بيلزق أول ما يقابل string في السلسلة.

## ملحوظات لنفسي
- كنت فاكر إن `'23' - '10'` هتعمل error، وطلعت بترجّع 13 عادي.
- أمشي من الشمال لليمين، وفي كل خطوة أشوف نوع الطرفين والـ operator إيه.
- NaN = invalid number، و`typeof` بتاعها number.
- أي input من صفحة بييجي string، فأحوّله بـ `Number()` قبل الحساب.
