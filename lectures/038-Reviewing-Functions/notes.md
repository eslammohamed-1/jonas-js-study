# 038 — Reviewing Functions

## الفكرة
مراجعة لكل اللي اتعلمناه عن الـ functions. ومعاها حاجة جديدة: **`return` بتخرج من الـ function فورًا**، وكام shortcut في VS Code.

## أهم الحاجات
### حوّلنا الـ arrow لـ expression عادية وفصلنا calcAge
```js
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}

const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;
  return retirement;
  // return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas')); // 19
```
- شلنا السهم وكتبنا `function`، فبقت function expression عادية.
- طلّعنا حساب السن لـ `calcAge`، وyearsUntilRetirement بتناديها (زي المحاضرة اللي فاتت).

### نفس اسم الـ parameter في functionين؟ عادي
- `birthYeah` في calcAge **ملهاش أي علاقة** بـ `birthYeah` في yearsUntilRetirement. دول parameterين مختلفين، يعني variableين مختلفين.
- كل parameter بيبقى **local variable** للـ function بتاعته. وحتى لو فيه variable برّه بنفس الاسم مفيش مشكلة.
- لو غيّرت اسمه في calcAge لـ `year` هتشتغل بنفس الطريقة.
- الـ data flow: 1991 ← birthYeah في yearsUntilRetirement ← اتبعتت argument لـ calcAge ← بقت birthYeah بتاعتها ← 2037 - 1991.
- رجّعنا number بدل string، لأن الـ input number، فـ good practice أرجّع number برضه.

### حالة إن الشخص طلع معاش خلاص
```js
const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}

console.log(yearsUntilRetirement(1991, 'Jonas')); // Jonas retires in 19 years ← 19
console.log(yearsUntilRetirement(1950, 'Mike'));  // Mike has already retired 🎉 ← -1
```
- مايك 1970 طلعله -2، يعني رقم سالب، وده معناه إنه طلع معاش. فلازم نتعامل مع الحالة دي.
- جوه الـ if block أقدر أحط أي كود، **حتى return**.
- **`-1`** رقم standard في البرمجة معناه "مالوش معنى".

### ⚠️ `return` بتخرج من الـ function فورًا
- `return` بترجّع القيمة، وبعدها الـ function **تخلص فورًا**. وبنقول إن الـ function **returned**.
- جوناس حط الـ console.log **بعد** الـ return، فاتجاهل وعمره ما اتنفذ.
- الحل: الـ console.log **قبل** الـ return (زي الكود فوق).

### VS Code shortcuts
- **Option/Alt + ↑ / ↓:** يحرّك السطر لفوق أو لتحت (Move Line Up/Down).
- **Add Cursor Below.**
- **Cmd/Ctrl + D:** Add Next Occurrence، يحدد الكلمة اللي بعدها من نفس النوع، فأعدّل كذا مكان مرة واحدة.

### مراجعة: الـ 3 أنواع
| النوع | ملاحظة |
|---|---|
| **Function declaration** | ينفع أستخدمها قبل ما أعرّفها في الكود |
| **Function expression** | function value متخزنة في variable |
| **Arrow function** | expression برضه بس خاصة، حلوة للـ one-liners (من غير return ومن غير `{ }`)، ومالهاش `this` |
- التلاتة طرق مختلفة بس **بيشتغلوا بشكل متشابه**: ياخدوا input، ويحوّلوا data، ويطلّعوا output. وكله اختياري.

### تشريح الـ function
- **function name:** زي `calcAge`.
- **parameters:** placeholders بتستقبل الـ input، زي local variables جوه الـ function.
- **function body:** الكود اللي بيتعمله reuse، وهنا الـ input بيتعالج.
- **return statement:** بيطلّع value، **وبيوقف الـ function فورًا**.
- **calling:** الاسم + `()`. **من غير `()` الـ function مجرد value**، ومع `()` بتتنادي (call = run = invoke = execute).
- **arguments:** القيم الحقيقية للـ parameters.
- بعد ما الـ function تخلص، الـ call كله بيتبدّل بالـ returned value، وبنخزّنه في variable.

### `console.log` ≠ `return` (تاني)
- `console.log` جوه الـ function بيطبع رسالة في الـ console بس، ومالوش علاقة بالـ return.
- `console.log` نفسها function call جوه الـ function، والـ argument بتاعها هو اللي بيتطبع.
- إحنا بنستخدمها عشان نشوف نتايج تجاربنا في الـ browser.

## الفرق بين…
| `fn` | `fn()` |
|---|---|
| الـ function كـ value | بنادي الـ function وتتنفذ |

## غلطات لازم أخلي بالي منها
- أحط كود بعد `return`، فعمره ما هيتنفذ.
- أفتكر إن نفس اسم الـ parameter في functionين يبقى نفس الـ variable.
- أرجّع types مختلفة من نفس الـ function من غير سبب. جوناس رجّع number في الحالتين (`retirement` و`-1`).

## ملحوظات لنفسي
- `return` = خروج فوري.
- `-1` بمعنى "مفيش نتيجة" convention هشوفه كتير.
- Cmd + D وAlt + ↑↓ هيوفّروا وقت كتير.
- الـ parameters local، فمحدش يشوفها برّه الـ function.
