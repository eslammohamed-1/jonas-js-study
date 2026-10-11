# 132 — String Methods Practice

ناس كتير طلبوا تمارين strings أكتر، فده تمرين زيادة.

## المشكلة
string "مكركب" (كأنه جاي من web API) في الـ starter files:
```js
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
```
عايزه يطلع كده (4 أسطر، متحاذيين ناحية اليمين):
```text
🔴 Delayed Departure FAO TXL (11h25)
             Arrival BRU FAO (11h45)
  🔴 Delayed Arrival HEL FAO (12h05)
           Departure FAO LIS (12h30)
```
(أول كود مطار = from، التاني = to.)

## التفكير
- 4 أسطر = 4 رحلات، والـ `+` هو الفاصل بينهم → `split('+')`
- سطر لكل رحلة → loop
- جوّا كل رحلة الـ `;` بيفصل 4 معلومات: type ; from ; to ; time

## الحل خطوة بخطوة
```js
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}
```

### كل حتة اتعملت إزاي
1. **time** — `time.replace(':', 'h')` → `11h25` (أسهل واحدة)
2. **type** — `type.replaceAll('_', ' ')` → شال الـ underscores
   - `replaceAll` من **ES2021** — أول مرة تشتغل فعلًا في الفيديوهات (كانت بتطلّع error قبل كده)
   - المسافة اللي بتطلع في الأول (من أول `_`) مش مشكلة — هتتظبط مع الـ padding
3. **🔴 لو متأخرة** — `type.startsWith('_Delayed') ? '🔴' : ''`
   - 🐞 الأول كتب `startsWith('Delayed')` → مشتغلش. ليه؟ الـ type بيبدأ بـ **`_Delayed`**. طبع الـ type عشان يكتشف.
4. **airport codes** — أول 3 حروف + uppercase: `str.slice(0, 3).toUpperCase()` (الأرقام اللي بعدها ملهاش لازمة)
   - refactor لـ arrow function صغيرة `getCode`
   - اتعرّفت **بره الـ loop** — وإلا هتتعرّف من أول وجديد في كل لفة على الفاضي
5. **المحاذاة** — `.padStart(36)` على الـ template literal كله
   - الـ default character = مسافة
   - الرقم جه بـ trial and error: 50 كتير، 20 قليل... **36** تمام
   - كده كل سطر بالظبط 36 حرف

## الـ methods اللي اتمرّنت عليها
`split` (مرتين) · destructuring · `replace` · `replaceAll` · `startsWith` + ternary · `slice` · `toUpperCase` · `padStart` · arrow function

## ملحوظات لنفسي
- خلي بالك من الـ underscore في الأول: `'_Delayed'` مش `'Delayed'`.
- الـ functions الصغيرة المساعدة → **بره الـ loop**.
- `padStart` على الـ template literal كله مباشرة بعد الـ backtick.
- لما مش متأكد ليه مش شغال → `console.log` للقيمة نفسها.
- كنت فاكر إن الـ string ده محتاج regex أو حاجة معقدة، طلع split + split + destructuring.
