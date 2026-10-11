# 114 — The Nullish Coalescing Operator (??)

## الفكرة
اسمه غريب بس فكرته بسيطة: زي `||` تقريبًا بالظبط، بس **بيحل مشكلة الـ 0** من المحاضرة اللي فاتت.
اتضاف في **ES2020**.

```js
restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests); // 10 ❌

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 0 ✅
```
ولو شيلت numGuests خالص (undefined) → `??` يرجّع 10 (الـ default) ✅

## ليه بيشتغل؟
`??` بيشتغل بفكرة **nullish values** مش falsy values.

**Nullish = `null` و `undefined` بس.** خلاص.
- 0 → مش nullish
- `''` → مش nullish

يعني بالنسبة لـ `??` كأن الـ 0 والـ string الفاضي truthy.

- الأول **مش** null/undefined → يرجّعه على طول (short circuit)
- الأول null/undefined → يروح للتاني ويرجّعه

| القيمة الأولى | `x \|\| 10` | `x ?? 10` |
|---|---|---|
| `0` | 10 | **0** |
| `''` | 10 | **''** |
| `undefined` | 10 | 10 |
| `null` | 10 | 10 |
| `23` | 23 | 23 |

## ملحوظات لنفسي
- كنت فاكر إن `??` حاجة مختلفة خالص، طلع هو `||` بس بيعتبر "الفاضي" = null/undefined بس.
- لو الـ 0 أو `''` قيمة حقيقية عندي → استخدم `??` مش `||`.
- جوناس قال إنه هيبان مفيد أكتر لما نشتغل في البروجكت.
