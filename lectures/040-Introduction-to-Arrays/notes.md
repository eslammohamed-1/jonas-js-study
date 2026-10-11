# 040 — Introduction to Arrays

## الفكرة
أول data structure: الـ **array**. حاوية كبيرة بحط فيها values كتير وأرجعلها بعدين، بدل variable لكل value. البرمجة أغلبها data (بنجيبها ونخزّنها ونعالجها ونرجّعها)، والـ data لازم تتخزن في مكان، وده دور الـ data structures. أهم اتنين في JS: **arrays** و**objects**.

## أهم الحاجات
### المشكلة
```js
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';
```
- لو عندي 10 صحاب هعمل 10 variables؟ مش منطقي.

### أعمل array
```js
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
```
- **brackets `[ ]`** والقيم بينها `,`. ودي اسمها **literal syntax**، والأشهر.
- الـ `,` لازم تبقى **برّه** الـ string. غلطة جوناس بيشوفها كتير.

```js
const y = new Array(1991, 1984, 2008, 2020);
```
- طريقة تانية: `Array` function، ولازم معاها **`new`** وإلا مش هتشتغل. أقل استخدامًا.
- الـ array تشيل أي عدد values من أي type.

### أجيب element
```js
console.log(friends[0]); // Michael
console.log(friends[2]); // Peter
```
- الـ arrays **zero-based**: أول element رقمه 0.

### `.length`
```js
console.log(friends.length); // 3
```
- `length` دي **property** (هنتكلم عنها في الـ objects).
- **مش zero-based**، بيرجّع العدد الحقيقي.

### آخر element من غير ما أعد
```js
console.log(friends[friends.length - 1]); // Peter
```
- `-1` عشان الـ length = 3 بس آخر index = 2.
- **جوه `[ ]` أقدر أحط أي expression**. الأول بيتحسب `friends.length - 1` = 2، وبعدين بيجيب friends[2].
- مينفعش statement جوه الـ brackets، وده سبب تاني لأهمية فهم expression vs statement.

### أغيّر element
```js
friends[2] = 'Jay';
console.log(friends); // ['Michael', 'Steven', 'Jay']
```
- أول log كان لسه فيه Peter، لأنه اتنفذ قبل التغيير.

### ⚠️ مش `const`؟
- `friends` معمولة بـ `const` ولسه قدرت أغيّر element. ده مش تناقض؟
- **الـ primitive values بس هي اللي immutable.** الـ array **مش primitive**، فأقدر أعملها mutate دايمًا.
- السبب طريقة تخزين JS للحاجات في الـ memory، وليه محاضرة كاملة في سيكشن الـ behind the scenes.
- اللي مينفعش: أبدّل **الـ array كلها**:
```js
// friends = ['Bob', 'Alice'] // ❌ TypeError: Assignment to constant variable.
```

### Types مختلفة في نفس الـ array
```js
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length); // 5
```
- كل خانة JS مستنية فيها **expression**، فينفع حساب (`2037 - 1991`) أو variable (`firstName`).
- وحتى **array جوه array** (`friends`). في الـ console بتطلع وأقدر أفتحها من المثلث الصغير، ومعاها الـ length بتاعها.
- كده كل data جوناس في data structure واحدة بدل variable لكل حاجة.

### تمرين: calcAge مع array
```js
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];
```
#### اللي مينفعش
```js
console.log(calcAge(years)); // NaN
```
- الـ function مستنية value واحدة، و`2037 - array` مالهاش معنى، فطلعت **NaN**.
- (أول مرة طلع error "Identifier 'years' has already been declared" لأن فيه array تانية بنفس الاسم فوق، فغيّر اسمها لـ y.)
- في الـ console:
  - `years + 10` ← الـ `+` حوّل الـ array لـ string ولزق 10. مالوش معنى.
  - `years - 10` ← NaN.
- الخلاصة: **مقدرش أعمل operations على الـ array كلها**.

#### الصح: على elements منفردة
```js
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);
```

#### أحسن: النتيجة array جديدة
```js
const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
```
- لو بدأت بـ array، غالبًا كويس أخلص بـ array جديدة.
- الـ function call **expression** بيطلّع value، فينفع يبقى element في الـ array. JS بتشغّل الـ calls الأول وبعدين تحط النتايج.

## الفرق بين…
| index | length |
|---|---|
| zero-based (أول واحد 0) | العدد الحقيقي |
| آخر index = length - 1 | `['a','b','c'].length` = 3 |

| مسموح مع const array | مش مسموح |
|---|---|
| `friends[2] = 'Jay'` | `friends = [...]` |

## غلطات لازم أخلي بالي منها
- `friends[3]` على array فيها 3 بس، لأن آخر index هو 2.
- أحط الـ `,` جوه الـ quotes.
- أبعت array كاملة لـ function مستنية رقم، فيطلع NaN.
- `new Array(...)` من غير `new`.
- أفتكر إن const معناها مقدرش أعدّل جوه الـ array.

## ملحوظات لنفسي
- `arr[arr.length - 1]` لآخر element. هستخدمها كتير.
- const array: أقدر أغيّر جواها، بس مقدرش أبدّلها كلها.
- أي expression ينفع جوه `[ ]`، سواء كـ index أو كـ element.
- كنت فاكر إن `years - 10` هيطرح من كل element، وطلع NaN.
