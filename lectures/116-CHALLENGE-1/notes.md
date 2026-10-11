# 116 — CHALLENGE #1 (Football Betting App)

## الداتا
object جاي من web service عن ماتش (موجود في الـ Challenge PDF / الـ final code):
```js
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    ['Neuer', 'Pavard', /* ... */ ],      // 11 لاعب — Bayern
    ['Burki', 'Schulz', /* ... */ ],      // 11 لاعب — Dortmund
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: { team1: 1.33, x: 3.25, team2: 6.5 },
};
```

## المطلوب (7 حاجات)
1. array لكل فريق: `players1` و `players2`
2. أول لاعب = goalkeeper. لـ Bayern: متغير `gk` و array `fieldPlayers` فيها الـ 10 الباقيين
3. `allPlayers` فيها لاعيبة الفريقين
4. Bayern عملت 3 تبديلات → `players1Final` = الأصليين + 'Thiago', 'Coutinho', 'Perisic'
5. من `game.odds` اعمل 3 متغيرات: `team1` و `draw` و `team2`
6. function اسمها `printGoals` بتاخد **عدد أي** من أسماء لاعيبة (مش array)، تطبع كل لاعب + عدد الجول الكلي. جرّب بـ 'Davies', 'Muller', 'Lewandowski', 'Kimmich' وبعدين بـ `game.scored`
7. اطبع مين الأقرب يكسب (الـ odds الأقل) **من غير if/else ومن غير ternary**

## حل جوناس

### 1 — destructuring للـ array الكبيرة
```js
const [players1, players2] = game.players;
```

### 2 — rest
"الباقي" = فكّر في الـ rest على طول.
```js
const [gk, ...fieldPlayers] = players1;
```

### 3 — spread
```js
const allPlayers = [...players1, ...players2]; // 22 لاعب
```

### 4 — spread + عناصر جديدة
```js
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
```

### 5 — nested destructuring + rename
```js
const {
  odds: { team1, x: draw, team2 },
} = game;
```
`odds:` بيدخل جوّا الـ object، و `x: draw` بيغيّر الاسم.
(كان ممكن `= game.odds` على طول، بس عملها nested كتحدي.)

### 6 — rest parameters + spread في الـ call
```js
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich'); // 4 goals
printGoals('Davies', 'Muller');                           // 2 goals
printGoals(...game.scored);                               // 4 goals ✅
```
لو بعت `printGoals(game.scored)` من غير spread → "1 goals" لأنها argument واحد (array جوّا array).
(طباعة كل لاعب لوحده جوناس سابها — عملناها كتير قبل كده.)

### 7 — short circuiting بـ `&&`
```js
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
```
ليه `&&` مش `||`؟ عايز التاني يتنفّذ **لما الشرط true** — و`&&` بيكمّل لما الأول truthy. `||` كان هيقف عند true.
لو الـ odds اتقلبت، السطر الأول مش بيطبع حاجة → فلازم السطر التاني للحالة العكس.

## التقنيات المستخدمة
- Array destructuring (حتى لـ array of arrays)
- Rest pattern في الـ destructuring
- Spread لدمج arrays وإضافة عناصر
- Nested object destructuring + rename بالـ `:`
- Rest parameters + spread عند النداء
- Short circuiting بـ `&&` بدل if

## ملحوظات لنفسي
- "remaining" في السؤال = rest.
- خلي بالك: `printGoals(game.scored)` ≠ `printGoals(...game.scored)`.
- الـ `:` في الـ nested destructuring هي أكتر حتة بتلخبط (جوناس قالها كمان).
