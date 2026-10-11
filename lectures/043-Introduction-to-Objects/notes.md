# 043 — Introduction to Objects

## الفكرة
Data structure تانية بعد الـ arrays: الـ **objects**. في الـ array مقدرش أدّي كل element اسم، فبوصله برقم ترتيبه بس. الـ object بيحل ده بـ **key-value pairs**: كل value ليها اسم.

## أهم الحاجات
### المشكلة في الـ array
```js
const jonasArray = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];
```
- عادي أكتب الـ array على كذا سطر، وأحيانًا بيدّي overview أوضح، بس أفتكر الـ `,` بعد كل element.
- أنا عارف إن أول واحد first name والتاني last name وهكذا، بس **مفيش طريقة أسمّيهم**، فلازم أوصلهم بالـ index.

### الـ Object
```js
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
```
- **curly braces `{ }`** بدل الـ square brackets.
- `{ }` شفناها قبل كده كـ code block (if، switch، function body). **هنا حاجة مختلفة**: بتعرّف object جديد.
- كل pair: **key** (زي اسم variable) + `:` + **value** من أي type. وبين الـ pairs `,` زي الـ array.
- الـ value ممكن تبقى أي expression، زي `2037 - 1991` اللي بتتحسب وتتحط في age.
- كده الـ object فيه 5 key-value pairs.

### Properties
- كل key اسمه **property**، فبنقول إن `jonas` عنده 5 properties: property firstName قيمتها 'Jonas'، وهكذا.

### Object Literal Syntax
- الـ objects غالبًا **أهم concept في JS كلها**، وفيه طرق كتير نعملها بيها.
- الكتابة بالـ `{ }` كده هي **أسهل طريقة**، واسمها **object literal syntax** لأننا بنكتب محتوى الـ object كله حرفيًا.

### Array ولا Object؟
- الاتنين بيجمّعوا variables تبع بعض.
- **الفرق الكبير:** في الـ object **ترتيب القيم مش مهم خالص** وأنا بجيبها. في الـ array الترتيب هو كل حاجة، لأني بوصل بالـ index بس.
- فأستخدم:
  - **arrays** للـ data المرتّبة (ordered).
  - **objects** للـ data غير المرتّبة (unstructured) اللي عاوز أسمّيها وأجيبها بالاسم.
- إزاي أجيب data من object؟ دي المحاضرة الجاية.

## الفرق بين…
| Array | Object |
|---|---|
| `[ ]` | `{ }` |
| بالـ index (ترتيب) | بالاسم (key) |
| الترتيب مهم | الترتيب مش مهم |
| ordered data | unstructured / named data |

## غلطات لازم أخلي بالي منها
- أنسى الـ `,` بين الـ properties، فيطلع SyntaxError.
- أكتب `=` بدل `:` بين الـ key والـ value.
- أتلخبط بين `{ }` الـ object و`{ }` الـ code block. (من نوتتي القديمة: بعد `=` يبقى object، وبعد if أو function يبقى block.)

## ملحوظات لنفسي
- object = key: value، وكل key = property.
- الترتيب مهم في الـ array ومش مهم في الـ object. ده أهم فرق.
- أغلب الـ data في الشغل (API responses) objects، فلازم أبقى مرتاح معاها.
