# 035 — Function Declarations vs. Expressions

## الفكرة
فيه طريقتين أكتب بيهم function، والاتنين بيشتغلوا بنفس الطريقة لما أناديهم:

```js
// Function Declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

// Function Expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age1 = calcAge1(1991);
const age2 = calcAge2(1991);
console.log(age1, age2); // 46 46
```

## أهم الحاجات

### Declaration
- بتبدأ بـ `function` + اسم.
- مش محتاج أخزن في متغير وسيط: `return 2037 - birthYear;` على طول.

### Expression
- function **من غير اسم** (anonymous) متخزنة في متغير.
- اسمها expression لأنها بتطلّع **value**.
- آخرها `;` لأنها assignment.

### الـ functions مجرد values
```js
const x = 10;
const calcAge = function (birthYear) { return 2037 - birthYear; };
```
عشان كده أقدر أحطها في متغير (وبعدين في object أو أبعتها لـ function تانية).

### الفرق العملي: أنادي قبل التعريف
```js
const age1 = calcAge1(1991); // ✅ شغال مع declaration (hoisting)
function calcAge1(birthYear) { return 2037 - birthYear; }

const age2 = calcAge2(1991); // ❌ ReferenceError: Cannot access 'calcAge2' before initialization
const calcAge2 = function (birthYear) { return 2037 - birthYear; };
```

## ملحوظات لنفسي
- جوناس بيفضّل **expressions**: بتجبرني أعرّف الأول وبعدين أنادي، فالكود يبقى مترتب.
- بس الاتنين مقبولين، المهم أفهم الفرق.
- **Parameter** في التعريف، **argument** وأنا بنادي.
- hoisting هيتشرح بالتفصيل في سكشن Behind the Scenes.
