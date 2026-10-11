# 045 — Object Methods

## الفكرة
function متخزنة كـ property جوّا object = **method**.
ده شغال لأن الـ function **value** زي أي قيمة، فـ function expression تنفع تبقى value لـ key.

```js
const jonas = {
  firstName: 'Jonas',
  birthYear: 1991,
  job: 'teacher',
  hasDriversLicense: true,

  calcAge: function (birthYear) {
    return 2037 - birthYear;
  },
};

console.log(jonas.calcAge(1991));    // 46
console.log(jonas['calcAge'](1991)); // 46
```

## أهم الحاجات

### لازم expression مش declaration
```js
const jonas = {
  function calcAge() {} // ❌ SyntaxError
};
```

### this
`this` جوّا الـ method = الـ object اللي نادى الـ method (اللي قبل النقطة).
```js
calcAge: function () {
  console.log(this);              // jonas
  return 2037 - this.birthYear;   // مش محتاج أبعت birthYear، موجود في الـ object
},
```
- بعت `birthYear` كـ argument = تكرار، وممكن أبعت رقم غلط.
- `jonas.birthYear` شغالة بس لو غيرت اسم المتغير تبوظ، `this` دايمًا صح (DRY).

### أحسب مرة وأخزن
```js
calcAge: function () {
  this.age = 2037 - this.birthYear; // property جديدة
  return this.age;
},

jonas.calcAge();       // مرة واحدة
console.log(jonas.age); // وبعدين أقرا على طول
```

### Challenge: getSummary
```js
getSummary: function () {
  return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`;
},

console.log(jonas.getSummary());
// Jonas is a 46-year old teacher, and he has a driver's license.
```
method بتنادي method تانية بـ `this.calcAge()`، والـ ternary بيختار `a` أو `no`.

## ملحوظات لنفسي
- الـ arrays objects برضه، عشان كده عندها methods زي `friends.push('Jay')`.
- `this` بيتحدد وقت النداء، مش وقت الكتابة (تفاصيل بعدين).
- عشان كده متستخدمش arrow function هنا، مالهاش `this`.
