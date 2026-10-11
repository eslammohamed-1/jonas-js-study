# 011 — Data Types

## الفكرة
كل value في JS يا **object** يا **primitive**. فيه 7 primitive types. والمحاضرة فيها كمان dynamic typing والـ comments والـ `typeof`.

## أهم الحاجات
### object ولا primitive
- الـ value بتبقى primitive لو هي مش object. الـ objects هنتعلمها بعدين، فدلوقتي نركّز على الـ primitives.

### الـ 7 Primitive Data Types
1. **Number:** دايمًا floating point، يعني ليها decimals حتى لو مش باينة. `23` هي نفسها `23.0`. مفيش type منفصل للـ integers زي لغات تانية.
2. **String:** sequence of characters، يعني text. لازم بين quotes، single أو double. من غيرها JS هتفتكره اسم variable.
3. **Boolean:** `true` أو `false` بس. بنستخدمه عشان ناخد decisions.
4. **Undefined:** الـ value اللي بياخدها variable اتعمل ولسه متحطش فيه قيمة، زي `let children;`. يعني empty value.
5. **Null:** برضه empty value، بس بيتستخدم في ظروف مختلفة. التفاصيل بعدين.
6. **Symbol (ES2015):** value فريدة ومينفعش تتغير. مش مفيدة لينا دلوقتي.
7. **BigInt (ES2020):** للـ integers الكبيرة أوي اللي الـ Number ميعرفش يمثّلها.

- أهم 3: Number وString وBoolean.

### Dynamic Typing
- مش بقول نوع الـ data وأنا بعمل variable. JS بتحدده لوحدها.
- **الـ value هي اللي ليها type، مش الـ variable.** الـ variable بيخزّن values ليها types.
- أقدر أحط في نفس الـ variable value من نوع تاني، يعني x يبقى number وبعدين string.
- ده مفيد، بس ممكن يعمل bugs صعب ألاقيها.

### Comments
```js
// Variable name conventions  ← single line comment
// console.log(40 + 8 + 23 - 10);  ← عطّلت الكود من غير ما أمسحه

/*
multi
line comment
*/
```
- JS بتتجاهل أي comment.
- بستخدمها أوصف الكود أو أقسّمه sections، أو أعطّل كود من غير ما أمسحه.
- **Cmd/Ctrl + /** بيعمل comment ويشيله.
- جوناس من هنا ورايح هيقفل كود كل محاضرة فاتت جوه multi-line comment عشان يفضل reference.

### Boolean في الكود
```js
let javascriptIsFun = true;
console.log(javascriptIsFun); // true
```
- في الـ console الـ boolean بيطلع بلون مختلف عن الـ string (الـ string أبيض).
- الـ declaration لازم ييجي **قبل** الـ log، لأن JS بتتنفذ من فوق لتحت.

### `typeof`
- operator زي `+` و`-`، وبيرجّع **string** فيها نوع الـ value.
```js
console.log(typeof true);            // boolean
console.log(typeof javascriptIsFun); // boolean
console.log(typeof 23);              // number
console.log(typeof 'Jonas');         // string
```

### الـ String لازم quotes
```js
"Jonas"  // ✅
'Jonas'  // ✅
"Jonas'  // ❌ لازم نفس النوع في الأول والآخر
Jonas    // ❌ ReferenceError: Jonas is not defined
```
- من غير quotes JS بتدوّر على variable اسمه Jonas، ومش موجود.

### Dynamic typing في الكود
```js
let javascriptIsFun = true;
console.log(typeof javascriptIsFun); // boolean

javascriptIsFun = 'YES!'; // من غير let
console.log(typeof javascriptIsFun); // string
```
- أول مرة بعمل الـ variable بـ `let`. لما أغيّر القيمة أكتب الاسم و`=` من غير `let`.
- تشبيه الصندوق: شلت الكتاب من الصندوق وحطيت تليفون.

### Undefined
```js
let year;
console.log(year);        // undefined
console.log(typeof year); // undefined

year = 1991;
console.log(typeof year); // number
```
- **undefined هي الـ value وهي الـ type في نفس الوقت.**

### Bug الـ `typeof null`
```js
console.log(typeof null); // object 🤦
```
- المفروض يرجّع null زي ما `typeof undefined` بترجّع undefined.
- ده bug في JS، ومش هيتصلح عشان legacy reasons. هنرجعله بعدين.

## الفرق بين…
| undefined | null |
|---|---|
| variable اتعمل من غير قيمة | empty value برضه |
| `typeof` ← 'undefined' | `typeof` ← 'object' (bug) |

| أول مرة | تغيير القيمة |
|---|---|
| `let x = 1;` | `x = 2;` من غير let |

## غلطات لازم أخلي بالي منها
- أنسى الـ quotes على الـ string فيطلع ReferenceError. جوناس بيقول دي غلطة المبتدئين كل يوم.
- أكتب `let` تاني وأنا بغيّر قيمة variable موجود.
- أستخدم الـ variable قبل ما أعمله (الكود بيتنفذ من فوق لتحت).
- أصدّق `typeof null` إنه object.

## ملحوظات لنفسي
- كنت فاكر إن الـ variable هو اللي ليه type، وطلع **الـ value**.
- كل الأرقام Number، مفيش int وfloat منفصلين.
- `typeof` بترجّع string، يعني `'number'` مش number.
- Cmd + / للـ comments، هستخدمه كتير.
