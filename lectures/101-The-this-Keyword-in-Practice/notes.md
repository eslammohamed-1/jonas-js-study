# 101 — The this Keyword in Practice

## الفكرة
نشوف قواعد `this` بالكود: في الـ global scope، في regular function، في arrow function، في method، وفي **method borrowing**، ولما ناخد الـ method برّه الـ object خالص.

## أهم الحاجات

### 1) `this` في الـ global scope
```js
console.log(this); // window
```
- برّه أي function → `this` = **`window`** (الـ global object).

### 2) Regular function call
```js
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};
calcAge(1991);
```
- `undefined` لأننا في **strict mode** (في sloppy mode كان هيبقى `window`).
- regular function call = function **مش متعلقة بأي object** → **ملهاش owner**.

### 3) Arrow function
```js
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window
};
calcAgeArrow(1980);
```
- ليه `window` هنا و`undefined` في اللي فوق؟ 🤔
- الـ arrow **ملهاش `this` خاص بيها** → بتستخدم الـ **lexical this** = `this` بتاع الـ **parent scope**.
- الـ parent هنا = الـ **global scope** → `this` فيه = `window` (عشان كده جوناس بدأ بـ `console.log(this)` في الـ global).
- الـ regular function **ليها `this` خاص بيها** (وهو undefined)، أما الـ arrow فالـ `this` اللي فيها **مش بتاعها** — بتاع الـ parent.

### 4) Method
```js
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);              // jonas object
    console.log(2037 - this.year);  // 46
  },
};
jonas.calcAge();
```
- method call → `this` = **الـ object اللي بينادي** = `jonas` (الـ **owner** بتاع الـ method).
- use case كبير: نحسب من **الداتا اللي في الـ object نفسه** بدل ما نبعتها تاني كـ argument.

### 5) Method borrowing — `this` = اللي **بينادي**، مش اللي **اتكتب فيه**
```js
const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // method borrowing
matilda.calcAge(); // this = matilda → 20
```
- الـ function = **value** → أقدر أنسخها من object لـ object (من غير ما أناديها).
- ده اسمه **method borrowing** → مكتبتش الـ method مرتين.
- النتيجة 20 (2037 − 2017) والـ `this` المطبوع = `matilda`.
- يعني رغم إن الـ method **مكتوبة جوه `jonas`**، `this` = `matilda` لأن **matilda هي اللي نادتها** → فرق subtle بس مهم جدًا. ده معنى إن `this` **dynamic**.

### 6) ناخد الـ function برّه الـ object خالص
```js
const f = jonas.calcAge; // نسخ من غير نداء
f(); // ❌ TypeError: Cannot read properties of undefined (reading 'year')
```
- `f` = نفس الـ function بتاعة `jonas.calcAge`.
- بس `f()` = **regular function call** — **مفيش owner** → `this` = `undefined` → `undefined.year` → error.

### Event handlers
- اتكلمنا عنهم في السلايد، بس جوناس سايبهم للـ **Advanced DOM section**.

## الفرق بين…
| الكود | `this` |
|---|---|
| `console.log(this)` في global | `window` |
| `calcAge(1991)` regular | `undefined` |
| `calcAgeArrow(1980)` arrow في global | `window` (من الـ parent) |
| `jonas.calcAge()` | `jonas` |
| `matilda.calcAge()` | `matilda` |
| `f()` | `undefined` → error |

## غلطات لازم أخلي بالي منها
- أفتكر إن `this` بيشاور على الـ object اللي الـ method **اتكتبت جواه** — لأ، على اللي **نداها**.
- أنسخ method في variable وأناديها لوحدها → `this` بيضيع ويبقى undefined.
- أستغرب إن arrow في الـ global بتطبع `window` — ده `this` بتاع الـ global.

## ملحوظات لنفسي
- `jonas.calcAge` (من غير `()`) = الـ function كـ value، `jonas.calcAge()` = نداء.
- نفس الـ function بالظبط ادت 3 قيم مختلفة لـ `this` (jonas / matilda / undefined) — حسب **مين نادى**.
- method borrowing = طريقة لإعادة استخدام method من غير تكرار.
