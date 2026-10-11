# 026 — The switch Statement

## الفكرة
`switch` طريقة بديلة لـ if/else طويلة، لما كل اللي عاوزه إني أقارن **قيمة واحدة** بكذا اختيار. المثال: لكل يوم في الأسبوع activity.

## أهم الحاجات
### hard coding
- إحنا بنكتب القيم بإيدينا (`const day = 'monday'`). في app حقيقي أغلب الـ data بتيجي من الـ user input، بس دلوقتي بنتعلم فعادي.

### الـ Syntax
```js
const day = 'friday';

switch (day) {
  case 'monday': // day === 'monday'
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'tuesday':
    console.log('Prepare theory videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend :D');
    break;
  default:
    console.log('Not a valid day!');
}
```
- `switch (day)`: ده اللي هقارنه بكل الاختيارات.
- `case 'monday':` بـ **colon `:`** مش semicolon.
- بعد الـ case أقدر أكتب **كذا سطر من غير `{ }`**.
- الـ syntax غريب شوية ومش شبه أي حاجة تانية في JS، بس هو كده.
- **المقارنة strict**، يعني `case 'monday'` = `day === 'monday'`.

### نفس الكود لأكتر من قيمة
```js
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
```
- أكتب case ورا case، والكود يتنفذ للاتنين. **من غير logical operators.**

### `default`
- بيتنفذ لو كل الـ cases فشلت، زي الـ else في آخر if/else.
- جوناس كتب Thursday غلط، فالقيمة مكانتش مطابقة لأي case، فدخل الـ default ("Not a valid day!").

### ⚠️ ليه `break` مهم؟
- جوناس شال الـ `break` بتاع monday، وطبع "Plan course structure" و"Go to coding meetup" **و**"Prepare theory videos".
- من غير break، الكود **بيكمّل يتنفذ** في الـ case اللي بعده لحد ما يقابل break.
- فلازم break بعد كل block عشان يقف.

### switch للـ equality بس
- اتعمل للمقارنة بالمساواة، مش لـ `>` و`<`. ممكن بـ workarounds، بس ده مش هدفه.

### نفس اللوجيك بـ if/else (تمرين من جوناس)
```js
if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}
```
- wednesday وthursday بقوا `||` مش `&&`، لأن مستحيل اليوم يبقى الاتنين في نفس الوقت.
- مفيش break هنا، لأن JS بتنفّذ block واحد بس من الـ if/else.
- فيه تكرار كتير لـ `day ===` وأقواس كتير، وده اللي الـ switch بيحاول يتجنبه.
- جرّبهم الاتنين مع 'monday' و'friday'، ونفس النتيجة طلعت مرتين.

### رأي جوناس
- الـ switch بيتكتب فيه كود أكتر شوية، بس **أسهل في القراية**.
- الـ switch استخدامه بيقل، بس لسه ليه مكان، وفي المثال ده جوناس بيفضّله.
- في الآخر دي personal preference، وكويس أبدأ ألاقي style بتاعي.

## الفرق بين…
| switch | if/else |
|---|---|
| قيمة واحدة ضد كذا اختيار | أي شروط |
| strict equality بس | `>` `<` `&&` أي حاجة |
| محتاج `break` | مش محتاج |
| قيمتين لنفس الكود: case ورا case | `\|\|` |
| `default` | `else` |

## غلطات لازم أخلي بالي منها
- أنسى `break`، فالكود يكمّل للـ case اللي بعده.
- أكتب `;` بدل `:` بعد الـ case.
- غلطة إملائية أو حرف capital في الـ string، فمش هيطابق لأن المقارنة strict، ويروح للـ default.
- أترجم "أربع أو خميس" بـ `&&` بدل `||`.

## ملحوظات لنفسي
- switch = سلسلة `===` على قيمة واحدة.
- break في آخر كل case، إلا لو قاصد أجمع cases.
- لو بقارن بـ `>` أو `<` يبقى if/else.
