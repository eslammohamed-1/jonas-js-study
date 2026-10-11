# 063 — Debugging with the Console and Breakpoints

## الفكرة
تطبيق عملي لعملية الـ debugging: الأول bug بسيط نلاقيه بالـ **console**، وبعدين bug أكبر جوه loop نلاقيه بالـ **debugger** في Chrome (breakpoints)، وفي الآخر الـ **`debugger` statement**.

## أهم الحاجات

### الـ bug الأول: تحويل لـ Kelvin
- لسه في الـ Smart Thermometer. Kelvin = الحرارة المطلقة، والتحويل: **Celsius + 273**.
- الـ function مش بتاخد arguments؛ القيمة جاية من `prompt` (بنتخيله الـ sensor).
- عملنا object للـ measurement (من زمان مستخدمناش objects).

```js
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: prompt('Degrees celsius:'),
  };

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENTIFY
console.log(measureKelvin());
```
- دخلت `10` → طلع **`10273`** بدل `283`. → ده كان **A) Identify**.

### B) Find — بالـ console
- الـ bug في `kelvin` وهو جاي من `measurement.value` → نبدأ نبص عليها:
```js
console.log(measurement.value); // 10 — شكلها طبيعي!
```
- حاجة جانبية: فيه غير `console.log`:
```js
console.warn(measurement.value);  // شكلها warning (أصفر)
console.error(measurement.value); // شكلها error (أحمر)
```
مجرد formatting بس.
- نبص على الـ **object كله** (جوناس قال إنه كان هيعمل كده من الأول، بس بيورينا التفكير خطوة خطوة):
```js
console.log(measurement); // value: "10" ← string!
```
- **المشكلة**: `prompt` **دايمًا بيرجّع string** مهما كتبت. و`+` لما يشوف string بيحوّل الاتنين لـ string ويعمل **concatenation** → `'10' + 273 = '10273'`.
- طريقة تانية حلوة لعرض الـ objects:
```js
console.table(measurement); // جدول منظم — مفيد مع الـ objects الكبيرة
```

### C) Fix
```js
// C) FIX
value: Number(prompt('Degrees celsius:')),
```
→ `283` ✅

### الـ Debugger في Chrome (Sources tab)
- DevTools → **Sources** (أول مرة نستخدمه) → `script.js`.
- **breakpoint**: أدوس في الشريط اللي على شمال رقم السطر → **نقطة حمرا**.
- أعمل reload → التنفيذ **يقف (freeze)** عند السطر ده، وأشوف قيم **كل المتغيرات** في اللحظة دي.
- الأزرار:
  - **Resume script execution** → يكمّل لحد الـ breakpoint الجاي (وهنا وقف يستنى الـ prompt الأول، دخلت 10).
  - **Step** → ينفّذ **سطر واحد** في المرة.
  - الـ 3 أزرار التانيين — نتجاهلهم دلوقتي ونجربهم بعدين.
- عند الـ breakpoint: `kelvin` لسه `undefined` (لسه متحسبش)، و`measurement.value` = 10. أقدر أعمل hover على المتغيرات أشوف قيمتها.
- Step → `kelvin = 283` → السطر الأخير بيورّي return value = 283.
- لما خرجنا من الـ function دخل في كود تبع **Live Server** — عادي، نقفله ونعمل Resume.
- مش intuitive أوي → **أجرب بنفسي في الأزرار**.
- **لازم أشيل الـ breakpoint** (أدوس على النقطة الحمرا تاني)، وإلا التنفيذ هيقف عندها كل مرة.

بعد كده علّق الـ prompt وحط القيمة يدوي عشان ميزعجش:
```js
// value: Number(prompt('Degrees celsius:')),
value: 10,
```

### الـ bug الأكبر: max/min بيبدأوا من 0
- نسخنا `calcTempAmplitudeNew` وسميناها `calcTempAmplitudeBug` (وكل حاجة New → Bug).
- قبل الـ bug: `[3, 5, 1]` و`[9, 4, 5]` → max 9, min 1, amplitude **8** ✅.
- الغلطة "المنطقية": زي ما بدأنا الـ sum بـ 0، نبدأ الـ max والـ min بـ 0 — تبان معقولة!
```js
// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0; // ← الـ bug

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBug); // 9 ❌ (المفروض 8) — min طلع 0
```

### Find بالـ debugger (جوه الـ loop)
- الـ debugger **مفيد جدًا جوه الـ loops**.
- breakpoint عند سطور حساب الـ max/min → reload:
  - `temps` اتحسبت خلاص، `max = 0`, `min = 0`.
  - curTemp = 3 → max يبقى 3 ✅.
  - حط breakpoint كمان عشان يقف في كل iteration. i=1: curTemp = 5 → max = 5.
  - curTemp = **1**: هل 1 < 0؟ **لأ** → min فاضل 0. ← **ده الـ bug**.
- الـ starting value (0) **أصغر من كل القيم**، فمستحيل أي رقم يبقى هو الـ min.
- في الآخر شاف الـ loop وهي بتخلص: `temps.length = 6` و`i = 6` → 6 مش أقل من 6 → خرج.
- return value = 9 (بسبب الـ bug).
- (الحل طبعًا اللي عملناه قبل كده: البداية بـ `temps[0]`.)

### الـ `debugger` statement
- بدل ما أروح Sources وأحط breakpoint بإيدي:
```js
debugger;
```
- لما البراوزر يشوفها → **يفتح الـ debugger لوحده** ويقف عند السطر ده كأنه breakpoint.
- أشيلها بعد ما أخلص وأعمل save/reload.

## الفرق بين…
| | Console | Debugger (breakpoints) |
|---|---|---|
| مناسب لـ | bugs صغيرة وكود بسيط | كود معقد / loops |
| بيوريني | اللي أنا طبعته بس | كل المتغيرات في لحظة معينة |
| التحكم | مفيش | أوقف وأمشي سطر سطر |

| | `console.log` | `console.warn` | `console.error` | `console.table` |
|---|---|---|---|---|
| الشكل | عادي | warning | error | جدول للـ object |

## غلطات لازم أخلي بالي منها
- `prompt` بيرجّع **string دايمًا** → لازم `Number(...)`.
- `string + number` = concatenation مش جمع.
- لو بطبع property واحدة ممكن متشوفش المشكلة — اطبع الـ object كله.
- max/min ميبدأوش من 0 — يبدأوا من **أول عنصر**.
- أنسى أشيل الـ breakpoint أو `debugger;` → التنفيذ يفضل يقف.

## ملحوظات لنفسي
- كنت فاكر إن البداية بـ 0 زي الـ sum صح، طلع غلط مع الـ min (ومع الـ max لو كل القيم سالبة).
- `console.table` هستخدمها مع الـ objects الكبيرة.
- مراحل الـ debugging في الكود: `// A) IDENTIFY` → `// B) FIND` → `// C) FIX`.
- لازم أجرب الـ Sources tab بإيدي مرة على كودي، مش أتفرج بس.
- `debugger;` أسرع من إني أدور على السطر في Sources.
