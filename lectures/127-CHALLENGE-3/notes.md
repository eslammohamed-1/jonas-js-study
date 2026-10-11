# 127 — CHALLENGE #3 (Football Betting App — الـ events)

## الداتا
Map فيها أحداث الماتش: الـ **key = الدقيقة**، الـ **value = الحدث** (جول، تبديل...).
الماتش 90 دقيقة + وقت بدل ضايع (فممكن يعدّي 90 شوية).
```js
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
```

## المطلوب
1. array اسمها `events` فيها الأحداث المختلفة (**من غير تكرار**)
2. الكارت الأصفر في الدقيقة 64 طلع ظالم → امسحه
3. اطبع: `"An event happened, on average, every 9 minutes"` (احسب الـ 9 — الماتش 90 دقيقة)
4. loop على الأحداث واطبعها، وعلّم كل واحد في **الشوط الأول ولا التاني** (التاني = بعد الدقيقة 45):
   `[FIRST HALF] 17: ⚽️ GOAL`

جوناس قال إنه أسهل من اللي قبله.

## حل جوناس

### 1 — values → Set → array
```js
const events = [...new Set(gameEvents.values())];
console.log(events);
// ['⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card']
```
القيم = `gameEvents.values()` → unique = Set (ده الاستخدام الأساسي ليها) → array بالـ spread.

### 2 — delete بالـ key
```js
gameEvents.delete(64);
```

### 3 — المتوسط بـ size
```js
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
```
- عدد الأحداث = `gameEvents.size`
- 🐞 الأول قسم `size / 90` → رقم غريب. الصح العكس: **90 / عدد الأحداث**.

#### Bonus: المدة الحقيقية (92 دقيقة)
```js
const time = [...gameEvents.keys()].pop();
console.log(time); // 92
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
```
- آخر key = آخر دقيقة → keys → array → `pop()`
- افتكر: `pop()` مش بس بيمسح آخر عنصر، **بيرجّعه كمان**.

### 4 — loop على الـ map + ternary
```js
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}
```
سمّى المتغيرات `min` و `event` بدل key/value عشان الكود يتقري أسهل.

## التقنيات المستخدمة
- `map.values()` + `new Set` + spread → unique array
- `map.delete(key)`
- `map.size`
- `map.keys()` + spread + `pop()` عشان آخر key
- for-of على map مباشرة + destructuring
- Ternary

## ملحوظات لنفسي
- خلي بالك من القسمة: المتوسط = الوقت ÷ العدد، مش العكس.
- `[...map.keys()].pop()` → حركة حلوة عشان آخر key.
- كنت فاكر إن pop للمسح وبس، طلع بيرجّع العنصر — مفيد هنا.
