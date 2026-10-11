# 014 — Operator Precedence

## الفكرة
JS عندها ترتيب محدد للـ operators: مين يتنفذ الأول (precedence)، وكل واحد بيتنفذ من الشمال لليمين ولا العكس (associativity). وده اللي بيخلي `now - 1991 > now - 2018` يشتغل صح.

## أهم الحاجات
### ليه المقارنة بتشتغل؟
```js
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018); // true
```
- الطرح بيتنفذ **قبل** المقارنة لأن precedence بتاعه أعلى.

### جدول MDN
- أدوّر على: **MDN operator precedence** (اللينك اللي بيبدأ بـ developer.mozilla.org).
- MDN = Mozilla Developer Network، documentation مشهورة جدًا وهنستخدمها كتير.
- في الجدول:
  - grouping `( )` ← أعلى حاجة (21)
  - الطرح ← 14، والمقارنة `>` ← 12، فالطرح الأول
  - الـ assignment ← من أقل حاجة (3)
- **مش لازم أحفظ الأرقام**، محدش حافظها. المهم الفكرة العامة: الـ math قبل الـ comparison مثلًا.
- الجدول كمان بيقول كل operator ماشي left-to-right ولا right-to-left.

### Left to right
```js
console.log(25 - 10 - 5); // 10
```
- أغلب الـ math operators من الشمال لليمين. لو كانت من اليمين كانت هتبقى `5 - 10 - 25`، وده حاجة تانية خالص.
- الـ exponentiation `**` استثناء، بيتنفذ من اليمين للشمال.

### Right to left: الـ assignment
```js
let x, y; // تعريف variableين في سطر واحد، وهما الاتنين undefined
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y); // 10 10
```
خطوة بخطوة:
1. الطرح الأول (precedence أعلى) ← `x = y = 10`
2. الـ `=` من اليمين للشمال ← `y = 10`
3. وبعدين ← `x = 10`

- لو الـ assignment كان من الشمال لليمين، كان `x = y` الأول، وy لسه undefined، فالنتيجة تبقى غلط. عشان كده لازم يبقى right to left، ومنطقي.

### الأقواس (grouping) ليها أعلى precedence
```js
const averageAge = ageJonas + ageSarah / 2;   // ❌ 55.5
const averageAge = (ageJonas + ageSarah) / 2; // ✅
console.log(ageJonas, ageSarah, averageAge);
```
- `/` precedence بتاعها (15) أعلى من `+` (14)، فـ ageSarah اتقسمت الأول وبعدين اتجمع عليها ageJonas.
- 55.5 مش منطقي، إزاي المتوسط أكبر من واحد من الرقمين؟
- الأقواس زي الرياضيات في المدرسة: اللي جواها بيتنفذ الأول.
- وجوناس افتكرنا بالأسماء الـ descriptive، زي `averageAge`.

## الفرق بين…
| Left to right | Right to left |
|---|---|
| أغلب الـ math (`- + * /`) | الـ assignment `=` |
| `25 - 10 - 5 = 10` | `**` |

## غلطات لازم أخلي بالي منها
- المتوسط من غير أقواس: `a + b / 2` غلط، الصح `(a + b) / 2`.
- أفتكر إن كل حاجة ماشية من الشمال لليمين.

## ملحوظات لنفسي
- مش هحفظ الجدول. لو شاكك أحط أقواس وخلاص.
- `let x, y;` ← أقدر أعرّف كذا variable في سطر واحد.
- `x = y = 10` شغالة عشان الـ `=` من اليمين للشمال.
- MDN هو المرجع، هرجعله كتير.
