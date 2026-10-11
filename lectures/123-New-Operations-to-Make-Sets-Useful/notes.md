# 123 — New Operations to Make Sets Useful!

## الفكرة
لحد **ES2025** الـ Sets كان ليها 4 methods بس (`has`, `add`, `delete`, `clear`) → مكانتش مفيدة أوي (جوناس قال إنه عمره ما استخدمها شخصيًا 😅).
**ES2025** ضاف **7 methods جداد** → بقت مفيدة أكتر، خصوصًا مع الـ arrays، وبقت زي الـ sets في اللغات التانية.

⚠️ محتاج browser حديث (وقت التسجيل كانت في آخر إصدارات بس). وVS Code autocomplete لسه مش عارفها — اكتبها بإيدك.

الداتا (من الـ starter files):
```js
const italianFoods = new Set([
  'pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil',
]);

const mexicanFoods = new Set([
  'tortillas', 'beans', 'rice', 'tomatoes', 'avocado', 'garlic',
]);
```

## 1) `intersection` — المشترك بين الاتنين
```js
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('Intersection:', commonFoods); // Set {'tomatoes', 'garlic'}
console.log([...commonFoods]);             // ['tomatoes', 'garlic']
```
- **الترتيب مش فارق** (`mexicanFoods.intersection(italianFoods)` نفس النتيجة)
- بيرجّع **set جديدة**
- مفيد جدًا مع الـ arrays: array → `new Set(arr)` → intersection → `[...]`. قبل كده كنا بنعمل حلول custom بـ filter وكده.

## 2) `union` — كل العناصر من غير تكرار
```js
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion); // 10 عناصر — tomatoes و garlic مرة واحدة
```
الترتيب مش فارق.

### طريقة تانية (من غير union)
```js
console.log([...italianFoods, ...mexicanFoods]);           // فيها duplicates ❌
console.log(new Set([...italianFoods, ...mexicanFoods]));  // ✅ زي الـ union
console.log([...new Set([...italianFoods, ...mexicanFoods])]); // array من 10
```
شكلها بيلخبط شوية، بس شغالة — وممكن أعملها function لو هكررها.
(جوناس قال إن union مش أكتر واحدة مفيدة.)

## 3) `difference` — اللي في الأولى ومش في التانية
```js
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian', uniqueItalianFoods);
// {'pasta', 'gnocchi', 'olive oil', 'basil'}

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican', uniqueMexicanFoods);
// {'tortillas', 'beans', 'rice', 'avocado'}
```
⚠️ هنا **الترتيب فارق!** بيشيل المشترك من الـ set الأولى.

## 4) `symmetricDifference` — في واحدة بس، مش في الاتنين
```js
const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianAndMexicanFoods); // 8 عناصر (4 + 4)
```
= **عكس الـ intersection**. الترتيب مش فارق.

## Venn diagram (من MDN)
دي عمليات رياضية على الـ sets (اللي اتعلمناها في المدرسة):
- intersection = الحتة المشتركة في النص
- union = الدايرتين كلهم
- difference = دايرة واحدة من غير النص
- symmetric difference = الدايرتين من غير النص

## 5–7) Methods بترجّع Boolean
`isSubsetOf` و `isSupersetOf` و `isDisjointFrom` — بيشوفوا set جوّا set تانية ولا لأ.
جوناس جرّب واحدة بس:
```js
console.log(italianFoods.isDisjointFrom(mexicanFoods)); // false
```
`isDisjointFrom` = هل الاتنين **مختلفين خالص** (مفيش ولا عنصر مشترك)؟ هنا فيه مشترك → false.
مفيد مع if أو ternary. الباقيين في الـ docs.

## ملحوظات لنفسي
| Method | الترتيب فارق؟ | بيرجّع |
|---|---|---|
| `intersection` | لأ | Set |
| `union` | لأ | Set |
| `difference` | **أيوه** | Set |
| `symmetricDifference` | لأ | Set |
| `isSubsetOf` / `isSupersetOf` / `isDisjointFrom` | — | boolean |

- كنت فاكر إن الـ Sets ملهاش لازمة، طلع مع الحاجات دي بقت مفيدة جدًا للـ arrays.
- خلي بالك: النتيجة **Set** مش array → `[...result]` لو عايز array.
- محتاج browser جديد — ES2025.
