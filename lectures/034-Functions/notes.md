# 034 — Functions

## الفكرة
الـ functions هي الـ building block الأساسي لأي JS application حقيقي. أبسط تعريف: حتة كود أقدر أستخدمها تاني كتير. زي الـ variable، بس بدل ما يشيل value بيشيل سطر كود أو أكتر.

## أهم الحاجات
### أول function
```js
function logger() {
  console.log('My name is Jonas');
}

// calling / running / invoking function
logger();
logger();
logger();
```
- الكلمة `function` وبعدها اسم الـ function وبعده `()` و`{ }`.
- اللي جوه `{ }` اسمه **function body**، وده اللي بيتنفذ لما أشغّل الـ function.
- عشان أستخدمها: الاسم + `()`. ده اسمه **calling** أو **running** أو **invoking**، والتلاتة نفس المعنى.
- اتنادت 3 مرات، فاتطبع "My name is Jonas" 3 مرات.

### الـ function كـ ماكينة
- الـ function مش بس بتعيد كود: ممكن **تاخد data** و**ترجّع data**.
- تشبيه جوناس: **food processor**. بتحط فيه فاكهة، وهو بيعمل حاجة (الـ function body)، ويطلّعلك عصير.

### Parameters و return
```js
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
```
- اسم descriptive، زي الـ variables.
- **parameters** (`apples`، `oranges`): زي variables خاصة بالـ function دي بس، وبتتحدد قيمتها لما أنادي الـ function. هي الـ input data.
- جوه الـ function بستخدمهم كأنهم variables عادية.
- **`return`**: برجّع أي value من الـ function، وأقدر أستخدمها في أي حتة في الكود بعدين.
- جوناس كان عامل `console.log(apples, oranges)` جوه الـ function الأول عشان يشوف القيم (طلع 5 0)، وبعدين شاله.

### الـ Arguments وأمسك القيمة الراجعة
```js
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice); // Juice with 5 apples and 0 oranges.
console.log(fruitProcessor(5, 0)); // نفس النتيجة من غير ما أخزّن
```
- الـ parameters زي **خانات فاضية** وأنا بكتب الـ function، ولما أناديها أملاها بقيم حقيقية.
- القيم الحقيقية دي اسمها **arguments**: apples = 5 وoranges = 0 (بالترتيب).
- بعد ما الـ function تخلص، **الـ call نفسه بيتبدّل بالقيمة اللي رجعت**.
- لو عاوز القيمة لازم أخزّنها في variable (capture)، أو أعمل log على طول.

### نفس الـ function بقيم مختلفة
```js
const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice); // Juice with 2 apples and 4 oranges.
```
- عملنا function **generic** تشتغل مع أي عدد تفاح وبرتقان.
- **لو عمري ما ناديت الـ function، الكود اللي جواها عمره ما هيتنفذ.**

### logger: من غير parameters ومن غير return
- لو بعتلها argument زي `logger(23)`، مفيش parameters تستقبله، فمش هيأثر.
- **مش كل function لازم ترجّع حاجة أو تاخد parameters.** النوع ده بنستخدمه لما يبقى عندي block عاوز أعيده كتير.
- النوع الكامل (parameters + return) أشهر بكتير.
- **`console.log` ≠ return.** الـ logger بتطبع في الـ console بس، ومش بترجّع value، فمش بنخزّن نتيجتها. تقنيًا بترجّع `undefined`، بس مش مهم هنا.

### DRY
- الـ functions بتخلي الكود **maintainable**، لأني بعمل reusable chunks بدل ما أكتب نفس الكود كذا مرة.
- المبدأ ده اسمه **Don't Repeat Yourself (DRY)**: الكود يفضل dry، من غير تكرار.

### Built-in functions
```js
const num = Number('23');
```
- `console.log` نفسها function، بس built-in. بنناديها بـ `()` ونبعتلها value.
- و`Number('23')` built-in function بتاخد الـ string argument وترجّعها number، ونخزّنها عادي.

## الفرق بين…
| Parameter | Argument |
|---|---|
| في تعريف الـ function | وأنا بنادي الـ function |
| الخانة الفاضية | القيمة الحقيقية |
| `apples`، `oranges` | `5`، `0` |

| `return` | `console.log` |
|---|---|
| بيطلّع value أقدر أخزّنها | بيطبع في الـ console بس |
| `const x = fn()` فيها قيمة | من غير return تبقى x = `undefined` |

## غلطات لازم أخلي بالي منها
- أكتب الـ function وأنسى أناديها، فمفيش حاجة هتحصل.
- أفتكر إن `console.log` جوه الـ function معناها إنها رجّعت قيمة.
- أنسى أخزّن القيمة الراجعة، فتضيع.
- (من نوتتي القديمة) لو بعت arguments أقل من الـ parameters، الناقص بيبقى `undefined`.

## ملحوظات لنفسي
- calling = running = invoking.
- الـ `()` هي اللي بتشغّل الـ function.
- جوناس قال لو أول مرة أشوف functions طبيعي أتلخبط. أراجع المحاضرة كويس قبل ما أكمّل.
- لو لقيت نفسي بكرر كود، أحطه في function (DRY).
