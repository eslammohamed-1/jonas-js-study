# 115 — Logical Assignment Operators

## الفكرة
3 operators جداد من **ES2021** — أحدث من `??` كمان:
`||=` و `??=` و `&&=`
هما اختصار لـ `x = x || value` وأخواتها.

الداتا اللي جوناس اشتغل عليها (كأنها جاية من API):
```js
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
```
عايزين نحط default لـ numGuests للمطاعم اللي معندهاش.

## 1) `||=` — OR assignment
الطريقة القديمة بالـ OR:
```js
rest1.numGuests = rest1.numGuests || 10; // 20
rest2.numGuests = rest2.numGuests || 10; // 10
```
نفس الحاجة أقصر:
```js
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;
```
➡️ **بيحط القيمة لو المتغير حاليًا falsy.**

### ⚠️ نفس مشكلة الـ 0
```js
const rest1 = { name: 'Capri', numGuests: 0 };
rest1.numGuests ||= 10; // 10 ❌ — 0 falsy
```

## 2) `??=` — Nullish assignment
```js
rest1.numGuests ??= 10; // 0 ✅
rest2.numGuests ??= 10; // 10 (كانت undefined)
```
➡️ **بيحط القيمة لو المتغير حاليًا nullish** (null أو undefined).

## 3) `&&=` — AND assignment
المثال: عايز أخفي اسم الـ owner (anonymize) **لو موجود**.

بالـ AND العادي:
```js
rest2.owner = rest2.owner && '<ANONYMOUS>'; // '<ANONYMOUS>'
rest1.owner = rest1.owner && '<ANONYMOUS>'; // undefined 😕
```
مشكلة: rest1 ماكانش عنده owner → بقى عنده `owner: undefined` (اتضافت property مالهاش لازمة).

بالـ `&&=`:
```js
rest1.owner &&= '<ANONYMOUS>'; // ولا حاجة حصلت — rest1 زي ما هو
rest2.owner &&= '<ANONYMOUS>'; // '<ANONYMOUS>'
```
➡️ **بيحط القيمة لو المتغير حاليًا truthy.** والنتيجة أنضف — مفيش undefined property.

## الخلاصة
| Operator | بيحط القيمة لو المتغير... |
|---|---|
| `a \|\|= b` | falsy |
| `a ??= b` | nullish (null / undefined) |
| `a &&= b` | truthy |

## ملحوظات لنفسي
- كنت فاكر إن `&&=` هيعمل زي `x = x && y` بالظبط، طلع **أحسن**: لو الـ property مش موجودة مش بيضيفها بـ undefined.
- لو 0 قيمة صح عندي → `??=` مش `||=`.
- `&&=` = "لو فيه قيمة، غيّرها".
- خلي بالك وأنا بكتب: `rest1.numGuests` مش `rest1` بس (جوناس نفسه نسي وطلعله error 😅).
