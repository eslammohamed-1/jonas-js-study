# 029 — CHALLENGE #4: Video Solution

## الفكرة
ستيفن عاوز tip calculator بسيط. تمرين على الـ ternary operator والـ logical operators والـ template literals.

## المطلوب
- القاعدة: الـ tip **15%** لو الـ bill بين 50 و300، وغير كده **20%**.
1. أحسب الـ tip في variable اسمه `tip`، **من غير if/else** (ممكن أبدأ بـ if/else وأحوّلها ternary).
2. أطبع: `'The bill was 275, the tip was 41.25, and the total value 316.25'`.

- **TEST DATA:** 275 و40 و430.
- HINT: 20% = `* 0.2`. والقيمة بين 50 و300 يعني `>= 50 && <= 300`.

## حل جوناس
```js
const bill = 275;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
```
- "بين 50 و300" = أقل من أو يساوي 300 **و**أكبر من أو يساوي 50.
- 15% = `15 / 100` = `0.15`.
- في الـ template literal: `${bill + tip}` expression بالـ `+`.

### جوناس جرّب الـ condition في الـ console
| bill | الشرط | tip | total |
|---|---|---|---|
| 275 | true && true = **true** | 41.25 | 316.25 |
| 40 | true && false = **false** | 8 | 48 |
| 430 | false = **false** | 86 | 516 |

- مع 40: هي أقل من 300 بس كمان أقل من 50، فـ true && false = false، فالـ tip = 40 × 0.2 = 8.
- الـ console شايف الـ variables، فكتب `bill` فيه وطلعله 40.

## التقنيات المستخدمة
- ternary عشان أعمل variable بشرط.
- `&&` عشان أعمل range check.
- template literal فيه expressions.
- اختبار الـ condition لوحده في الـ console.

## غلطات لازم أخلي بالي منها
- أكتب الـ range بـ `||` بدل `&&`، فيبقى أي رقم تقريبًا داخل.
- أنسى الـ `=` في `>=` و`<=`، فـ 50 و300 نفسهم يطلعوا برّه.
- أنسى الـ `{ }` في `${}` (جوناس نسيها في الأول).

## ملحوظات لنفسي
- حل جوناس موجود في فولدر final في الـ repo لو حبيت أقارن.
- لو مش متأكد من شرط مركّب، أكتبه في الـ console وأشوف بيطلع true ولا false.
- ده آخر جزء coding في السيكشن.
