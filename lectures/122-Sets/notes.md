# 122 — Sets

## الفكرة
JS زمان كان فيها data structures قليلة: objects و arrays بس.
**ES6** ضاف اتنين: **Sets** و **Maps** (موجودين في لغات تانية من زمان).

**Set = مجموعة قيم unique** → مفيهاش duplicates أبدًا.

## إنشاء Set
```js
const ordersSet = new Set([
  'Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza',
]);
console.log(ordersSet);
// Set(3) {'Pasta', 'Pizza', 'Risotto'}
```
- لازم أبعت **iterable** (غالبًا array)
- ينفع أنواع داتا مختلفة مع بعض
- الـ duplicates راحت 🎉
- شكلها شبه الـ array (قيم من غير key-value) وهي **iterable** زيها
- بس مختلفة: (1) العناصر unique (2) **الترتيب مالوش لازمة**

```js
console.log(new Set('Jonas')); // Set(5) {'J', 'o', 'n', 'a', 's'}
console.log(new Set());        // Set فاضية
```

## التعامل معاها
```js
ordersSet.size;              // 3   ← size مش length!
ordersSet.has('Pizza');      // true
ordersSet.has('Bread');      // false   (زي includes في الـ arrays)
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); // التانية اتجاهلت
ordersSet.delete('Risotto');
// ordersSet.clear();        // يمسح كله — مش مهمة أوي
```
`size` مفيدة: مثلًا الشيف يعرف هيطبخ كام **نوع** أكلة مختلف.
الأسماء واضحة ومباشرة عشان دي feature حديثة. والمسح من array أعقد من كده (هنشوفه بعدين).

### ❌ مفيش indexes
```js
console.log(ordersSet[0]); // undefined — أي رقم
```
مفيش طريقة أطلّع بيها قيمة من set. ومنطقي: لو كله unique والترتيب مش مهم → كل اللي محتاجه أعرف القيمة **موجودة ولا لأ** → `has`.
عايز أخزن بترتيب وأرجع أجيب؟ → **array**.

### Loop
```js
for (const order of ordersSet) console.log(order);
```

## الاستخدام الأساسي: أشيل الـ duplicates من array
```js
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique); // ['Waiter', 'Chef', 'Manager']
```
Set → array سهل بالـ spread (عشان الاتنين iterables).

لو عايز **العدد** بس:
```js
console.log(new Set(staff).size); // 3
console.log(new Set('jonasschmedtmann').size); // 11 حرف مختلف
```

## الخلاصة
- Sets **مش بديل** للـ arrays.
- بترتيب + ممكن duplicates + عايز تعدّل في الداتا (array methods) → **array**
- عايز unique values → **Set**
- Sets أقل أهمية بكتير من الـ arrays.

## ملحوظات لنفسي
- خلي بالك: `.size` مش `.length`.
- كنت فاكر إن `set[0]` هيجيب أول عنصر، طلع undefined — مفيش indexes خالص.
- `[...new Set(arr)]` = أشهر سطر في الدرس.
- `new Set('...')` على string بيقسمها حروف.
