# 016 — CHALLENGE #1: Video Solution

## الفكرة
أول coding challenge. مارك وجون بيقارنوا الـ BMI بتاعهم، والهدف إني أتمرن على الـ variables والـ math operators والـ comparison.

## المطلوب
- BMI = `mass / height ** 2` = `mass / (height * height)` (الوزن بالكيلو والطول بالمتر).
1. أخزّن الوزن والطول لمارك وجون في variables.
2. أحسب الـ BMI بتاع الاتنين (ممكن بالمعادلتين).
3. أعمل boolean variable اسمه `markHigherBMI` يقول هل BMI مارك أعلى من جون.

- **TEST DATA 1:** مارك 78 kg و1.69 m، جون 92 kg و1.95 m.
- **TEST DATA 2:** مارك 95 kg و1.88 m، جون 85 kg و1.76 m.

## حل جوناس
```js
// TEST DATA 1
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// TEST DATA 2
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;           // المعادلة الأولى
const BMIJohn = massJohn / (heightJohn * heightJohn); // المعادلة التانية
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);
```

### النتايج
- **Data 1:** مارك حوالي 27 وجون حوالي 24 ← `markHigherBMI = true`.
- **Data 2:** مارك حوالي 26.8 وجون حوالي 27، قريبين جدًا ← `false`.

### إزاي غيّر الـ test data
- عمل comment على الـ data الأولى (Cmd + /)، وكتب الـ data التانية، والباقي زي ما هو.
- ده جمال الـ variables: بغيّر القيمة في مكان واحد والتغيير بيوصل لكل الكود.

## التقنيات المستخدمة
- `const` للقيم، لأنه عارف إنها مش هتتغير في البرنامج، حتى الوزن. const by default.
- أسماء descriptive، زي `massMark` و`heightJohn`.
- `**` للأُس، والأقواس للضرب.
- comparison operator `>` بيطلّع boolean ويتخزن في variable، زي `isFullAge` في محاضرة 13.

## غلطات لازم أخلي بالي منها
- جوناس نفسه نسي `.log` وكتب `console(...)` فطلع error، فبص على الـ console.
- لو مستخدم أسماء variables تانية أو عملت log للحساب على طول من غير variables، مش مشكلة. المهم النتايج تطلع صح.

## ملحوظات لنفسي
- لو مش لاقي نفس الأرقام، أراجع الكود حتة حتة.
- جوناس قال: من غير تكرار وتمرين مستحيل تتعلم برمجة.
- أحل الـ challenge بنفسي الأول، وبعدين أقارن بحله.
