# 027 — Statements and Expressions

## الفكرة
مفهوم theory: الفرق بين **expression** و**statement**. overview سريع بس، عشان المحاضرات الجاية تبقى مفهومة.

## أهم الحاجات
### Expression = حتة كود بتطلّع value
```js
3 + 4                  // expression ← 7
1991                   // expression برضه، أي value
true && false && !false // expression ← بتطلع boolean
```
- مش السطر كله، `3 + 4` نفسها هي الـ expression.

### Statement = حتة أكبر بتتنفذ ومش بتطلّع value
```js
if (23 > 10) {
  const str = '23 is bigger';
}
```
- الـ if/else **statement**، وعشان كده جوناس بيسميها "if else statement" طول الوقت، ونفس الكلام للـ switch statement.
- هو بيعمل actions (هنا بيعرّف variable اسمه str) بس مش بيطلّع value.
- البرنامج كله عبارة عن sequence of actions، والـ actions دي statements.

### تشبيه اللغة
- الـ statement زي **جملة كاملة**، والـ expressions زي **الكلمات** اللي بتكوّن الجملة.
- `'23 is bigger'` لوحدها expression، والسطر كله `const str = '23 is bigger';` statement.
- **أي حاجة بتخلص بـ semicolon غالبًا statement** (جملة كاملة).

### ليه الفرق ده مهم؟
JS بتستنى expressions في أماكن وstatements في أماكن. مثلًا **الـ template literal بياخد expressions بس**:
```js
const me = 'Jonas';
console.log(`I'm ${2037 - 1991} years old ${me}`); // ✅
```
- `2037 - 1991` expression، و`me` variable، والـ variable expression برضه لأنه بيتبدّل بقيمته.

```js
console.log(`I'm ${if (23 > 10) {...}}`); // ❌ SyntaxError: Unexpected token 'if'
```
- statement جوه `${}` مالوش معنى، فـ JS بتطلّع error.

### المهم من المحاضرة
- جوناس قال القواعد بالظبط fuzzy، ومش لازم أفهم كل التفاصيل (ومتسألش أسئلة كتير عنها في الـ Q&A).
- المطلوب أعرف:
  - **expressions بتطلّع values**
  - **statements جمل كاملة بتترجم الـ actions**

## الفرق بين…
| Expression | Statement |
|---|---|
| بتطلّع value | مش بتطلّع value لوحدها |
| زي الكلمة | زي الجملة الكاملة |
| `3 + 4`، `1991`، `me` | `if/else`، `switch`، `const x = ...;` |
| ينفع جوه `${}` | مينفعش جوه `${}` |

## غلطات لازم أخلي بالي منها
- أحط if جوه template literal، فيطلع Unexpected token. (الحل بالـ ternary operator، المحاضرة الجاية.)

## ملحوظات لنفسي
- expression = value، statement = action.
- `${}` بتقبل أي expression: variable أو حساب أو function call.
- الفرق ده هيفرق في الـ ternary والـ arrow functions بعدين.
