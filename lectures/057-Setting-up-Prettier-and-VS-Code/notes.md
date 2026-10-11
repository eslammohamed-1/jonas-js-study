# 057 — Setting up Prettier and VS Code

## الفكرة
بنظبط VS Code عشان الكتابة تبقى أسهل في باقي الكورس: **Prettier** يظبط شكل الكود لوحده، و**snippet** يكتب `console.log` بدالي، وشوية extensions جوناس بيستخدمها.

الـ starter files بتاعة السيكشن (فولدر Developer-Skills) فيها `index.html` مربوط بـ `script.js`، والـ script فيه `'use strict';` بس — **من دلوقتي strict mode في كل الـ scripts**.

## أهم الحاجات

### 1) Prettier — إيه هو؟
- **opinionated code formatter**: عنده رأي ثابت في شكل الكود "الصح"، وأنا بقبل رأيه.
- ميزته: الكود بتاعي يبقى consistent، وشبه كود جوناس في الفيديو بالظبط، وشبه كود الناس التانية.
- جوناس شايف إن الـ opinionated ده **حاجة كويسة**: مش محتاج آخد قرار في شكل الكود.
- مش بيأثر على **شغل** الكود خالص، بيغيّر **شكله** بس. فلو مشتغلش معايا عادي أكمل الكورس.

### 2) تسطيب وتشغيل Prettier
1. Extensions → أدور على **Prettier** → Install (وممكن أعمل reload لـ VS Code).
2. Preferences → Settings → أدور على **Default Formatter** → أختار `esbenp.prettier-vscode`.
3. أتأكد إن **Format On Save** متعلّم عليه ✅.

### 3) Prettier بيعمل إيه لما أعمل save؟
جربناه بـ variable وحوالينه سطور فاضية:
```js
const x = '23';
```
بعد الـ save:
- شال السطور الفاضية الزيادة.
- حوّل الـ single quotes لـ **double quotes** (ده الـ default).
- زوّد سطر فاضي في آخر الملف.

ومثال الـ if/else: ناس بتكتب `if(...)` من غير مسافة وناس بمسافة. Prettier بيحط المسافة **غصب عني** — لو شلتها وعملت save ترجع تاني.

### 4) تعديل إعدادات Prettier بـ `.prettierrc`
- Prettier فيه options (من الـ Docs → Configuring Prettier → Options): عرض السطر، tabs ولا spaces، semicolons، quotes…
- أسهل طريقة: أعمل ملف اسمه **`.prettierrc`** في فولدر المشروع.
- شكله زي object بس **مش JavaScript**.

جوناس بيغيّر حاجتين دايمًا:
```json
{
  "singleQuote": true,
  "arrowParens": "avoid"
}
```
- `singleQuote: true` → يستخدم `'` بدل `"`.
- `arrowParens: "avoid"` → لو arrow function فيها **parameter واحد** ميحطلوش أقواس.

مثال الـ arrow function:
```js
const calcAge = birthYear => 2037 - birthYear;
// من غير arrowParens: avoid كان هيحولها لـ (birthYear) => ...
```

### 5) User Snippet لـ `console.log`
- كتابة `console.log` كل شوية مملة → نعمل snippet.
- Preferences → **User Snippets** → **New Global Snippets File** → أي اسم (جوناس سماه `jonas`).
- فيه example snippet جاهز متعلّق عليه comment → أشيل الـ comment (`Cmd + /`) وأعدّل:
  - الـ scope: javascript, typescript.
  - الـ **prefix: `cl`** → ده اللي بيشغّل الـ snippet.
  - الـ body: `console.log();` بس، وشال السطر التاني.
```json
"Print to console": {
  "scope": "javascript,typescript",
  "prefix": "cl",
  "body": ["console.log();"],
  "description": "Log output to console"
}
```
- دلوقتي أكتب `cl` + Enter → يطلع `console.log()`.
- ليه شال `$1` (اللي بيحط الـ cursor جوه القوسين)؟ لأنه لما بيستخدمه، الـ **autocomplete بتاع VS Code بيبطل يشتغل** (جربها بمتغير اسمه `xyzabc` وكتب `xyz` ومطلعش اقتراح).

### 6) الـ extensions اللي جوناس بيستخدمها
- أول اتنين للـ HTML (هيشرحهم السيكشن الجاي).
- **ESLint** → هنستخدمه بعدين.
- **Image Preview** → مفيد للـ HTML.
- **Monokai Pro** → الثيم.
- **Prettier**.
- **Settings Sync** → يزامن الإعدادات بين أكتر من جهاز/حساب.
- **TODO Highlight** → بيلوّن كلمات في الـ comments زي `BUG` (أحمر) و`FIXME`. الألوان بتتظبط في الـ settings بصيغة **JSON** (Preferences → Settings → أيقونة فتح الـ JSON).

## الفرق بين…
| | من غير `.prettierrc` | مع إعدادات جوناس |
|---|---|---|
| Quotes | `"double"` | `'single'` |
| arrow بـ parameter واحد | `(birthYear) => …` | `birthYear => …` |

## غلطات لازم أخلي بالي منها
- لو Prettier مش شغال: أتأكد من الـ Default Formatter **و** Format On Save الاتنين.
- `.prettierrc` لازم يبقى في **فولدر المشروع** نفسه، وبنقطة في الأول.
- الـ `.prettierrc` مش JS object — مفيش comments ولا single quotes جواه.
- متحطش `$1` في الـ snippet عشان الـ autocomplete ميبوظش.

## ملحوظات لنفسي
- كنت فاكر إن Prettier بيغيّر في الكود نفسه، طلع بيغيّر الشكل بس.
- `cl` + Enter بدل ما أكتب console.log كل مرة — أعملها عندي في Antigravity.
- الإعدادين اللي لازم أحطهم في أي مشروع: `singleQuote` و`arrowParens: avoid`.
- TODO Highlight حلو عشان أعلّم أماكن الـ BUG وأرجعلها.
