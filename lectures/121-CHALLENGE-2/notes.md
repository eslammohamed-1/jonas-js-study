# 121 — CHALLENGE #2 (Football Betting App — كمّلة)

نفس الـ `game` object بتاع Challenge #1.
جوناس قال إنه **صعب شوية عن قصد** — "وإلا كان اسمه coding copy and paste". جرّب الـ problem solving framework، وGoogle وMDN مسموحين.

## المطلوب
1. loop على `game.scored` واطبع كل لاعب برقم الجول:
   `Goal 1: Lewandowski` … `Goal 4: Hummels`
2. loop تحسب **متوسط الـ odds** وتطبعه — من الـ object نفسه مباشرة (من غير ما تفُكه لمتغيرات الأول)
3. اطبع الـ 3 odds بشكل منسّق:
   ```
   Odd of victory Bayern Munich: 1.33
   Odd of draw: 3.25
   Odd of victory Borrussia Dortmund: 6.5
   ```
   **ممنوع hard-code لأسماء الفرق** — هاتها من `game` (إلا draw). Hint: `odds` و `game` ليهم **نفس أسماء الـ properties** (`team1`, `team2`).
4. **Bonus** (صعب): object اسمه `scores` فيه اسم كل لاعب جاب جول كـ property وعدد الجول كـ value:
   `{ Gnarby: 1, Hummels: 1, Lewandowski: 2 }`
   جوناس **محلّهوش في الفيديو** — الحل في الـ final code بتاع السكشن على GitHub.

## حل جوناس

### 1 — for-of + entries + destructuring
```js
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);
```
- محتاج الـ index عشان رقم الجول → `.entries()`
- `i + 1` عشان يبدأ من 1
- (طلعله error "game before initialization" — الـ game object كان تحت، نقله فوق الكود.)

### 2 — Object.values + متوسط
```js
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average); // ≈ 3.69
```
- عايز القيم بس → `Object.values`
- `/=` جديدة: `average = average / odds.length`
- 🐞 الغلطة اللي وقع فيها: قسم على الـ array نفسها بدل `odds.length` → طلع NaN. Debug: طبع average قبل القسمة.

### 3 — Object.entries + ternary + bracket notation
```js
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}
```
- عايز الاسم والقيمة → `Object.entries`
- في الـ array destructuring **أنا اللي بسمّي** (`team`, `odd`) — مش لازم يطابق أسماء properties
- الحتة الذكية: `game[team]` — `team` قيمته `'team1'` أو `'team2'` → فبقرا نفس الاسم من `game` → `'Bayern Munich'`

## التقنيات المستخدمة
- for-of مع `.entries()` على array + destructuring
- `Object.values` لحساب متوسط
- `Object.entries` على object + destructuring
- Operator `/=`
- Ternary + bracket notation بمتغير (`game[team]`)

## ملحوظات لنفسي
- تاني: array → `arr.entries()` / object → `Object.entries(obj)`. جوناس كررها عشان مهمة.
- خلي بالك: `average /= odds` ❌ → `average /= odds.length` ✅
- كنت فاكر إني محتاج أكتب اسم الفريق بإيدي، طلع إن نفس الـ key بيفتح الـ object التاني.
- الـ bonus: هبص على حل جوناس في الـ final code.
