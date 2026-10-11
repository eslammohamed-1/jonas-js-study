# 044 — Dot vs. Bracket Notation

## الفكرة
إزاي أجيب data من object وأغيّرها بطريقتين: **dot notation** و**bracket notation**، وإمتى لازم أستخدم الـ brackets.

## أهم الحاجات
```js
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);
```
- في الـ console الـ properties بتطلع **مترتبة أبجديًا**. ده دليل إن الترتيب مش مهم، لأننا بنجيب بالاسم.

### Dot notation
```js
console.log(jonas.lastName); // Schmedtmann
```
- الـ `.` نفسها **operator**: بتروح للـ object وتجيب الـ property بالاسم ده.

### Bracket notation
```js
console.log(jonas['lastName']); // Schmedtmann
```
- زي الـ array، بس جوه الـ brackets **string** فيها اسم الـ property.

### الفرق الكبير: الـ brackets بتاخد أي expression
```js
const nameKey = 'Name';
console.log(jonas['first' + nameKey]); // Jonas
console.log(jonas['last' + nameKey]);  // Schmedtmann

// console.log(jonas.'last' + nameKey) // ❌ Unexpected string
```
- الجزء المتكرر "Name" في variable، وبنبني اسم الـ property بالـ concatenation. JS بتحسب الـ `+` الأول ويطلع 'firstName'، وبعدين تجيب الـ property.
- ده بيحصل في الشغل أكتر ما أتخيل.
- مع الـ dot **لازم الاسم الحقيقي** زي ما هو في الـ object، مش **computed property name**.

### أستخدم أنهي واحدة؟
- **لو محتاج أحسب اسم الـ property الأول** ← bracket.
- **غير كده** ← dot، لأنها أنضف وأسهل.

### مثال prompt: المستخدم يختار
```js
const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');

console.log(jonas.interestedIn); // undefined ❌
console.log(jonas[interestedIn]); // ✅ teacher لو كتب job
```
- `prompt` built-in function بتفتح popup فيه input وبترجّع string.
- `jonas.interestedIn` بتدوّر على property اسمها حرفيًا "interestedIn"، ومش موجودة.
- **لما أحاول أوصل لـ property مش موجودة في object، النتيجة `undefined`.**
- مع الـ brackets، JS بتبدّل `interestedIn` بقيمته ('job') وبعدين تدوّر.
- لو كتب location ← undefined برضه، لأنها مش موجودة.

### أتعامل مع property مش موجودة
```js
if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}
```
- `undefined` **falsy**، فلو مش موجودة يروح للـ else.
- لو موجودة (string مش فاضية أو رقم مش 0) تبقى truthy.
- جوناس قال لو property قيمتها فاضية أو 0 هتروح للـ else، بس مش هنهتم بالحالة دي هنا.
- حرّك السطر بـ Option + ↓.

### أضيف properties
```js
jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);
```
- بالطريقتين، ومع الـ brackets أقدر أحط أي expression برضه.

### Challenge صغير
> "Jonas has 3 friends, and his best friend is called Michael" ← من غير hard coding

```js
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);
```
- `jonas.friends` array، و`.length` **property موجودة في كل الـ arrays** أوتوماتيك. دلوقتي فاهم إنها مجرد property.
- `jonas.friends[0]` أول element (افترضنا إنه الـ best friend). يعني الـ arrays فيها bracket notation برضه.
- جوناس قال عنده أكتر من 3 صحاب 😄.

### ليه `jonas.friends.length` شغالة؟ (precedence)
- في جدول MDN: الـ dot اسمها **member access**، والـ brackets **computed member access** (computed لأني بحسب الاسم).
- الاتنين **precedence عالي جدًا** و**left to right**.
- فـ `jonas.friends` بتتنفذ الأول وتبقى الـ array، وبعدين `.length` أو `[0]` على الـ array دي.
- مفيش سحر، فيه قواعد لكل حاجة، ومش لازم أحفظها.

## الفرق بين…
| Dot `.` | Brackets `[ ]` |
|---|---|
| `jonas.lastName` | `jonas['lastName']` |
| الاسم الحقيقي بس | أي expression (computed) |
| أنضف، الافتراضي | لما الاسم بيتحسب أو جاي من variable |
| member access | computed member access |

## غلطات لازم أخلي بالي منها
- `jonas.interestedIn` وأنا قصدي قيمة الـ variable، فهتطلع undefined.
- `jonas[lastName]` من غير quotes، كده JS هتدوّر على variable اسمه lastName.
- `jonas.'last' + nameKey` بتطلّع Unexpected string.
- property مش موجودة مش بتعمل error، بترجّع undefined بهدوء.
- (من نوتتي القديمة) الأسماء case sensitive، يعني `jonas.lastname` بالـ n الصغيرة هترجّع undefined.

## ملحوظات لنفسي
- الافتراضي dot، ولو الاسم في variable أو بيتحسب يبقى brackets.
- property مش موجودة = undefined = falsy، وده أقدر أستخدمه في if.
- `obj.arr.length` و`obj.arr[0]` بيتنفذوا من الشمال لليمين.
