# 044 — Dot vs. Bracket Notation

## الفكرة
فيه طريقتين أقرا وأكتب بيهم properties في الـ object:

```js
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
};

console.log(jonas.lastName);    // dot notation
console.log(jonas['lastName']); // bracket notation ← الاسم كـ string
```

## أهم الحاجات

### bracket بتاخد أي expression
```js
const nameKey = 'Name';
console.log(jonas['first' + nameKey]); // Jonas
console.log(jonas['last' + nameKey]);  // Schmedtmann

jonas.'first' + nameKey; // ❌ SyntaxError، الـ dot محتاجة الاسم الحقيقي
```
**القاعدة:** لو الاسم لازم يتحسب → bracket. غير كده → dot (أنضف).

### مثال prompt
```js
const interestedIn = prompt(
  'What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends'
);

console.log(jonas.interestedIn);  // undefined ← بيدوّر على property اسمها interestedIn حرفيًا
console.log(jonas[interestedIn]); // teacher (لو كتبت job)

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}
```
property مش موجودة = `undefined` (falsy)، فأقدر أعمل عليها if.

### أضيف property أو أعدّلها
```js
jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
jonas.job = 'programmer';
```

### الـ `.` و `[]` operators (من الشمال لليمين)
```js
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
);
// Jonas has 3 friends, and his best friend is called Michael
```

## ملحوظات لنفسي
- `jonas.lastname` (n صغيرة) = `undefined`، الأسماء case sensitive.
- bracket = `jonas['job']` بـ quotes، أو `jonas[variable]` من غير quotes.
- الاتنين بيعملوا نفس الحاجة، الفرق إن bracket بتقبل expression.
