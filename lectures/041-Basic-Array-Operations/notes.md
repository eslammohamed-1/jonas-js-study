# 041 — Basic Array Operations (Methods)

## الفكرة
JS فيها built-in functions بنطبّقها على الـ arrays على طول، اسمها **methods**، واعتبرها array operations. فيه سيكشن كامل للـ arrays بعدين، وهنا أساسيات لازم أعرفها: أضيف وأشيل وأدوّر.

## أهم الحاجات
```js
const friends = ['Michael', 'Steven', 'Peter'];
```

### `push`: أضيف في الآخر
```js
const newLength = friends.push('Jay');
console.log(friends);   // ['Michael', 'Steven', 'Peter', 'Jay']
console.log(newLength); // 4
```
- `push` method، يعني تقنيًا **function**، والـ `()` بتوضح ده. والـ `.` معناها إننا بنناديها على الـ friends array نفسها (attached ليها). ليه ده بيشتغل كده هنعرفه بعدين.
- بتعمل **mutate** للـ array الأصلية، والـ length بقى 4.
- **بترجّع الـ length الجديد.** غالبًا مش بنخزّنه، بس لو محتاجه مش لازم أحسبه لوحدي.

### `unshift`: أضيف في الأول
```js
friends.unshift('John');
console.log(friends); // ['John', 'Michael', 'Steven', 'Peter', 'Jay']
```
- برضه بترجّع الـ length الجديد.

### `pop`: أشيل آخر element
```js
friends.pop(); // Last
const popped = friends.pop();
console.log(popped);  // Peter
console.log(friends); // ['John', 'Michael', 'Steven']
```
- عكس push. **مش محتاجة argument**، لأن مفيش معلومة محتاجها عشان أشيل الأخير.
- **بترجّع الـ element اللي اتشال** (مش الـ length). أول pop شال Jay، والتانية شالت Peter.

### `shift`: أشيل أول element
```js
friends.shift(); // First
console.log(friends); // ['Michael', 'Steven']
```
- جوناس كتب `unshift` بالغلط، فطبعًا مشالش حاجة. الـ remove اسمها **shift**.
- من غير argument، وبترجّع الـ element اللي اتشال.

### `indexOf`: فين الـ element؟
```js
console.log(friends.indexOf('Steven')); // 1
console.log(friends.indexOf('Bob'));    // -1
```
- بترجّع الـ index، ولو مش موجود ترجّع **-1**.

### `includes` (ES6): موجود ولا لأ؟
```js
friends.push(23);
console.log(friends.includes('Steven')); // true
console.log(friends.includes('Bob'));    // false
console.log(friends.includes(23));       // true
```
- أحدث من indexOf وجوناس شايفها أفيد. بترجّع **true/false**.
- **بتستخدم strict equality**، يعني من غير type coercion: لو push(23) وسألت عن `'23'` يطلع **false**.

### `includes` مع if
```js
if (friends.includes('Steven')) {
  console.log('You have a friend called Steven');
}
```
- بترجّع boolean، فمثالية للـ conditionals، ودي أشهر استخدام ليها.
- مع 'Peter' مطبعش حاجة لأننا شلناه.

## الفرق بين…
| Method | بتعمل إيه | بترجّع |
|---|---|---|
| `push(x)` | تضيف في الآخر | الـ length الجديد |
| `unshift(x)` | تضيف في الأول | الـ length الجديد |
| `pop()` | تشيل الأخير | الـ element اللي اتشال |
| `shift()` | تشيل الأول | الـ element اللي اتشال |
| `indexOf(x)` | تدوّر | الـ index أو -1 |
| `includes(x)` | تدوّر (strict) | true / false |

## غلطات لازم أخلي بالي منها
- أتلخبط بين `shift` و`unshift`. الـ **un**shift بتضيف، والـ shift بتشيل.
- أفتكر إن pop بترجّع الـ length. هي بترجّع الـ element.
- `includes('23')` على رقم 23 هتطلع false (strict).
- الـ methods دي بتغيّر الـ array الأصلية.

## ملحوظات لنفسي
- الإضافة بترجّع length، والشيل بيرجّع الـ element.
- `includes` أوضح من `indexOf !== -1` في الشروط.
- unshift وshift = البداية، push وpop = النهاية.
