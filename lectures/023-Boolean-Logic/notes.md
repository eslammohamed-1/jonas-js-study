# 023 — Boolean Logic

## الفكرة
Boolean logic فرع في computer science بيستخدم true وfalse عشان يحل مشاكل منطقية معقدة، باستخدام logical operators بتجمع القيم دي (زي الـ arithmetic operators مع الأرقام). هنا هنشوف أبسط 3: **AND** و**OR** و**NOT**. ودي مش خاصة بـ JS، دي في البرمجة كلها.

## أهم الحاجات
### المثال
- **A:** سارة معاها رخصة. **B:** سارة نظرها كويس.
- كل واحدة ممكن تبقى true أو false.

### AND
- A AND B = سارة معاها رخصة **و**نظرها كويس.
- **truth table:** كل variable ليه قيمتين، فعندي 4 احتمالات:

| A | B | A AND B |
|---|---|---|
| true | true | **true** |
| true | false | false |
| false | true | false |
| false | false | false |

- true **بس** لو الاتنين true. لو واحد false، النتيجة false.
- بتتعمم لأكتر من اتنين: A AND B AND C تبقى true لو كلهم true، ولو واحد false تبقى false على طول.

### OR
- A OR B = معاها رخصة **أو** نظرها كويس.

| A | B | A OR B |
|---|---|---|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | **false** |

- يكفي واحد بس يبقى true عشان النتيجة تبقى true.
- ومع أكتر من variable: يكفي واحد true.

### NOT
- بيشتغل على **value واحدة** بس، ومش بيجمع حاجة. بيعكسها: true تبقى false، وfalse تبقى true.

### مثال عملي: age = 16
- **A:** `age >= 20` ← false
- **B:** `age < 30` ← true

| العملية | التعويض | النتيجة |
|---|---|---|
| `!A` | !false | **true** |
| `A AND B` | false AND true | **false** |
| `A OR B` | false OR true | **true** |
| `!A AND B` | true AND true | **true** |
| `A OR !B` | false OR false | **false** |

- **الـ NOT ليه precedence أعلى من AND وOR**، فالقيم بتتعكس الأول وبعدين بتتجمع.
- في `A OR !B`: الـ !B = false، فـ false OR false = false. ودي الطريقة الوحيدة اللي الـ OR يطلع فيها false: كلهم false.

## الفرق بين…
| AND | OR |
|---|---|
| لازم **كله** true | يكفي **واحد** true |
| واحد false يبقى false | false بس لو كله false |

## غلطات لازم أخلي بالي منها
- أنسى إن الـ NOT بيتنفذ الأول قبل AND وOR.
- أفتكر إن OR معناها "واحد بس". هي true برضه لو الاتنين true.

## ملحوظات لنفسي
- AND = كله لازم، وOR = واحد يكفي، وNOT = اعكس.
- جوناس قال بعد شوية تمرين مش هحتاج truth tables، هتبقى intuitive.
- لو اتلخبطت، أعوّض بالقيم خطوة خطوة زي الجدول.
