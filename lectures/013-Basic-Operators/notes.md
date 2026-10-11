# 013 — Basic Operators

## الفكرة
الـ operator بيخليني أغيّر values أو أجمع كذا value وأعمل بيهم أي شغل. فيه أنواع كتير، وهنا شفنا: math وstring concatenation وassignment وcomparison.

## أهم الحاجات
### Math (arithmetic) operators
```js
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah); // 46 19
```
- جوناس بيفترض إن السنة دلوقتي 2037.
- **`console.log` تقدر تطبع كذا value مرة واحدة** لو حطيت بينهم `,`.
- في الأول كتب `2037` مرتين، وده تكرار وحش، لأن لو السنة اتغيرت هغيّر في مكانين. عشان كده حطها في variable اسمه `now`.
- واستخدم **`const` by default** لأن مفيش حاجة هنا بتتغير.
- وأسماء descriptive، زي `ageJonas` و`ageSarah` بدل `age1` و`age2`.

```js
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2
// 92 4.6 8
```
- `*` ضرب، `/` قسمة، `**` أُس (exponentiation).
- جوه الـ `console.log` دول 3 عمليات منفصلة، كل واحدة بتطلع value.

### `+` مع الـ strings (concatenation)
```js
const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + lastName);       // JonasSchmedtmann
console.log(firstName + ' ' + lastName); // Jonas Schmedtmann
```
- لو عاوز مسافة أعمل string فيها مسافة وأجمعها في النص.
- فيه طريقة أحسن اسمها template strings، جاية بعدين.
- و`typeof` كمان operator، شفناه قبل كده.

### Assignment operators
```js
let x = 10 + 5; // 15
```
- الـ `=` نفسه operator. يعني في السطر ده فيه operatorين: `+` و`=`.
- x بقى 15 لأن `+` بيتنفذ **قبل** `=`، وده حسب قواعد الـ operator precedence (المحاضرة الجاية).

```js
x += 10; // x = x + 10 = 25
x *= 4;  // x = x * 4 = 100
x++;     // x = x + 1 → 101
x--;
x--;     // 99
console.log(x); // 99
```
- `+=` اختصار لـ `x = x + 10`. وفيه `/=` برضه بنفس الفكرة.
- `++` بيزوّد 1، و`--` بيقلّل 1.
- استخدمنا `let` هنا لأننا بنعمل reassign لـ x.

### Comparison operators: بيطلّعوا Boolean
```js
console.log(ageJonas > ageSarah); // true
// >, <, >=, <=
console.log(ageSarah >= 18); // true
```
- كأني بسأل الـ operator: هل سن جوناس أكبر من سن سارة؟ ويرد yes يعني `true`، أو no يعني `false`.
- `>=` معناها أكبر من **أو يساوي**، يعني الـ 18 نفسها داخلة:
  - سارة 2019 ← سنها 18 ← `true`
  - سارة 2020 ← سنها 17 ← `false`

### أخزّن النتيجة في variable
```js
const isFullAge = ageSarah >= 18;
```
- في الشغل الحقيقي بنخزّن النتايج في variables، مش بنعمل log وخلاص. إحنا بنعمل log هنا عشان بنتعلم.
- VS Code بيعرف لوحده إن `isFullAge` هيبقى boolean.

### الـ Console شايف الـ variables
- أقدر أكتب `ageSarah >= 18` في الـ console على طول، لأنه شايف كل الـ variables اللي في الـ tab ده، وكمان بيعمل autocomplete.
- بس لو عملت reload كل اللي كتبته في الـ console بيروح. عشان كده جوناس بيكتب في الفايل، عشان يفضل record.

### كله في سطر واحد
```js
console.log(now - 1991 > now - 2018); // true
```
- نفس المقارنة من غير الـ variables الوسيطة.
- السؤال: JS عرفت منين تعمل الطرح الأول وبعدين المقارنة؟ لو كانت ماشية من الشمال لليمين كانت هتقارن 46 بـ now على طول. ده موضوع المحاضرة الجاية (precedence).

## الفرق بين…
| النوع | أمثلة | بيطلّع |
|---|---|---|
| Math | `+ - * / **` | number |
| String `+` | `'a' + 'b'` | string |
| Assignment | `= += *= ++ --` | بيغيّر الـ variable |
| Comparison | `> < >= <=` | boolean |

## غلطات لازم أخلي بالي منها
- أنسى المسافة في الـ concatenation فيطلع `JonasSchmedtmann`.
- `x += 10` مع const مش هتنفع، لأنها reassignment، فلازم `let`.
- `>` غير `>=`. لو الحد نفسه داخل يبقى `>=`.
- أكرر نفس الرقم في كذا مكان بدل ما أحطه في variable.

## ملحوظات لنفسي
- `console.log(a, b, c)`: أقدر أطبع كذا حاجة مرة واحدة، مفيدة جدًا.
- `2 ** 3` = 8، ومش `^`.
- كل comparison بيطلّع true/false، وده اللي هنستخدمه في الـ if بعدين.
- `x++` = `x = x + 1`.
