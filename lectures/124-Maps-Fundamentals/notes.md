# 124 — Maps: Fundamentals

## الفكرة
الـ data structure الجديدة التانية من ES6. **أهم من الـ Sets بكتير.**
Map = بتربط (map) **values بـ keys** — key-value pairs زي الـ objects.

**الفرق الكبير:** في الـ Map الـ **keys ممكن تبقى أي نوع**.
- Object → الـ keys دايمًا strings تقريبًا
- Map → number, boolean, object, array, حتى map تانية

## إنشاء + `set`
```js
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); // بيرجّع الـ map كلها
```
- أسهل طريقة: map فاضية وبعدين `set(key, value)` (شبه `add` في الـ sets)
- `set` بيعدّل الـ map **وكمان بيرجّعها** → فأقدر أعمل **chaining**:

```js
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
```

## `get`
```js
console.log(rest.get('name'));  // 'Classico Italiano'
console.log(rest.get(true));    // 'We are open :D'
console.log(rest.get(1));       // 'Firenze, Italy'

console.log(rest.get('true'));  // undefined ← نوع الـ key فارق!
console.log(rest.get('1'));     // undefined
```

### الحركة الذكية بالـ boolean keys
```js
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// 21 → 'We are open :D'
// 8  → 'We are closed :('
```
الشرط بيطلع true/false → والـ true/false نفسهم keys في الـ map.
بس جوناس قال: **ذكية بس مش readable — متكترش منها.**

## باقي الـ methods
```js
rest.has('categories'); // true
rest.delete(2);         // اتقفل فرع لشبونة
rest.size;              // 7
rest.clear();           // يمسح كله → size 0
```
مقارنة بالـ objects:
- object فيه `delete` operator بس **بطيء** ومش مُستحسن
- object فيه `hasOwnProperty` (في سكشن الـ OOP)

فيه تشابه بين Maps و Sets عشان الاتنين نزلوا في ES6.

## Arrays / Objects كـ keys
```js
rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // undefined ❌
```
ليه؟ الـ `[1, 2]` التانية **object تاني في الـ heap** — مش نفس الـ reference (primitives vs objects من السكشن اللي فات).

الصح:
```js
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // 'Test' ✅
```

### DOM elements كـ keys
DOM elements = objects من نوع خاص → ينفع:
```js
rest.set(document.querySelector('h1'), 'Heading');
```
في الـ console لما بعمل hover على الـ key بيعلّم الـ h1 في الصفحة 🤯 — بيفتح الباب لحاجات advanced.

## ملحوظات لنفسي
- كنت فاكر إن `rest.get([1,2])` هيرجّع 'Test'، طلع لأ — لازم **نفس الـ array في الـ memory**.
- خلي بالك من نوع الـ key: `1` ≠ `'1'` و `true` ≠ `'true'`.
- `set` بيرجّع الـ map → chaining.
- `size` زي الـ Set (مش length).
