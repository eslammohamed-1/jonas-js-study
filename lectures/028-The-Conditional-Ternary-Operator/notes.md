# 028 — The Conditional (Ternary) Operator

## الفكرة
طريقة تالتة للـ conditionals بعد if/else وswitch: الـ **conditional operator**. بيعمل حاجة شبه if/else في سطر واحد، والأهم إنه **expression**، فبيطلّع value أقدر أخزّنها أو أحطها في template literal.

## أهم الحاجات
### الشكل
```js
const age = 23;
// age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧');
```
- `condition ? لو true : لو false`
- بعد `?` الجزء اللي هيتنفذ لو true، وده ينفع يبقى **حاجة واحدة بس**.
- بعد `:` الجزء الـ else، وده **إجباري**.
- age = 23 ← wine. ولو 15 ← water.

### ليه اسمه Ternary؟
- عشان ليه **3 أجزاء**: الـ condition، وجزء الـ if، وجزء الـ else.
- معظم الـ operators ليهم جزئين، زي `1 + 2`.

### الاستخدام الحقيقي: variable بشرط
- الـ operator دايمًا بيطلّع value، يعني هو **expression**، فأقدر أخزّن نتيجته:
```js
const drink = age >= 18 ? 'wine 🍷' : 'water 💧';
console.log(drink); // wine 🍷
```
- طريقة الـ console.log اللي فوق مش مستخدمة كتير. ده الاستخدام الأشهر.

### نفس الحاجة بـ if/else (للمقارنة بس)
```js
let drink2;
if (age >= 18) {
  drink2 = 'wine 🍷';
} else {
  drink2 = 'water 💧';
}
console.log(drink2);
```
- لازم أعرّف `drink2` **برّه** الـ blocks، لأن اللي بيتعرّف جوه block مش بيبان برّه، وبعدين أعمله reassign جوه.
- الـ ternary حوّل كل البلوك ده لسطر واحد، وجوناس شايفه أسهل في الفهم والكتابة. هنستخدمه في الكورس كله.

### Ternary جوه Template Literal
```js
console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);
```
- في محاضرة 27 حطينا if جوه `${}` وفشلت. الـ ternary expression، فينفع.
- الـ template literal بياخد نتيجة الـ operator (wine أو water) ويحطها في الـ string.
- جوناس قال الحتة دي بتلخبط المبتدئين، فأفتكر: operator = expression = value.

### مش بديل للـ if/else
- if/else لسه محتاجينها طول الوقت، خصوصًا لما يبقى فيه blocks كبيرة.
- الـ ternary مثالي لـ **quick decision**، وخصوصًا في الأماكن اللي JS مستنية فيها expression، زي الـ template literal.

## الفرق بين…
| Ternary | if/else |
|---|---|
| expression (بيطلّع value) | statement |
| سطر واحد | blocks |
| حاجة واحدة في كل جزء | أي عدد سطور |
| الـ else إجباري | الـ else اختياري |
| ينفع جوه `${}` | مينفعش |

## غلطات لازم أخلي بالي منها
- أنسى جزء الـ `:` (الـ else). هو إجباري.
- أحاول أحط كذا سطر في الـ ternary. ده مكانه if/else.
- أعمل `let` وif/else عشان variable بسيط، والـ ternary أنضف.

## ملحوظات لنفسي
- `const x = cond ? a : b;` ← الاستخدام اللي هكتبه كتير.
- لو محتاج شرط جوه template literal يبقى ternary.
- الـ ternary شبه الـ `? :` اللي بشوفه في كود React في الشغل، فهفهمه أحسن دلوقتي.
