# 036 — Arrow Functions

## الفكرة
نوع تالت من الـ functions اتضاف في ES6: **arrow function**. هي شكل خاص من الـ function expression، أقصر وأسرع في الكتابة.

## أهم الحاجات
### المقارنة مع الـ expression
```js
// Function expression (للمقارنة)
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}

// Arrow function
const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3); // 46
```
- الـ parameter وبعده السهم `=>` (وعشان كده اسمها arrow function)، وبعده اللي عاوز أرجّعه.
- هي لسه function expression، يعني value متخزنة في variable.
- أسرع ليه؟
  1. **مش محتاج `{ }`**.
  2. **الـ return implicit**: القيمة بترجع لوحدها من غير `return`.
  3. مع parameter واحد مش محتاج `()` حوالين الـ parameter.
- ممتازة للـ **one-liner functions** البسيطة، وهتفيد جدًا في مواقف كتير.
- بننادي عليها زي أي function.

### أكتر من سطر: لازم `{ }` و`return`
```js
const yearsUntilRetirement = birthYeah => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  return retirement;
}
console.log(yearsUntilRetirement(1991)); // 19
```
- حساب سنين المعاش: أحسب السن الأول، وبعدين 65 ناقص السن (65 سن المعاش في دول أوروبية كتير).
- محتاج أكتر من سطر، فرجعنا للـ `{ }`.
- **الـ return لازم يتكتب صريح.** الـ implicit return في الـ one-liner بس.
- 65 - 46 = 19.

### أكتر من parameter: لازم `()`
```js
const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas')); // Jonas retires in 19 years
console.log(yearsUntilRetirement(1980, 'Bob'));   // Bob retires in 8 years
```
- الـ parameters بين `()`. حركة في VS Code: أحدد الـ variable وأكتب `(` فيلفّه بالأقواس.
- الـ arguments بتروح للـ parameters بالترتيب: 1991 لـ birthYeah، و'Jonas' لـ firstName.
- ناديناها مرتين عشان يبان ليه حطينا اللوجيك ده في function.
- كل ما الكود والـ parameters يزيدوا، الـ arrow function بتبقى معقدة أكتر وبنخسر ميزتها.

### أستخدم arrow functions في كل حاجة؟
- **لأ**، والموضوع معقد.
- فيه فرق أساسي: الـ **arrow function مش بتاخد `this` keyword**. ده موضوع لبعدين بكتير.
- التعلم مش linear، والمواضيع لازم تتبني على بعض.
- **دلوقتي:** هنستخدم الـ normal functions (غالبًا expressions) أكتر، والـ arrow للـ one-liners البسيطة بس.
- جوناس بيحب الـ arrow functions وبيستخدمها طول الوقت، بس لسه مش هنفهم كل الـ implications.

## الفرق بين…
| الحالة | الشكل |
|---|---|
| parameter واحد + سطر واحد | `birthYeah => 2037 - birthYeah` |
| أكتر من سطر | `birthYeah => { ...; return x; }` |
| أكتر من parameter | `(birthYeah, firstName) => { ... }` |

| Arrow | Expression / Declaration |
|---|---|
| أقصر، وimplicit return في الـ one-liner | لازم `return` |
| مالهاش `this` | ليها `this` |

## غلطات لازم أخلي بالي منها
- أكتب `{ }` وأنسى `return`، فالـ function هترجّع `undefined`. (من نوتتي القديمة)
- أكتر من parameter من غير `()` يطلّع syntax error.
- أفتكر إن الـ arrow تنفع في كل حتة، وهي مالهاش `this`.

## ملحوظات لنفسي
- `x => x * 2` أبسط شكل.
- `{ }` معناها لازم `return`.
- في كود الشغل (React) الـ arrows في كل حتة، فلازم أتعوّد على أشكالها التلاتة.
