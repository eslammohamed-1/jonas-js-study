# 043 — Introduction to Objects

## الفكرة
في الـ array بوصل للحاجة بالترتيب (`jonasArray[3]`)، فلازم أفتكر كل index معناه إيه.
الـ **object** بيدّي كل قيمة **اسم** (key)، وده اسمه **key-value pair** أو **property**.

```js
const jonasArray = ['Jonas', 'Schmedtmann', 2037 - 1991, 'teacher', ['Michael', 'Peter', 'Steven']];

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
};
```

## أهم الحاجات

### object literal syntax
- `{ }` بعد `=` = object، مش code block.
- `key: value` وبعدها **فاصلة** بين كل property والتانية.
- الـ key اسم متغير عادي، والـ value أي نوع: string، رقم، boolean، array، object تاني، أو expression بيتحسب.
- ده 5 properties في الـ jonas object.

### الترتيب مش مهم
- في الـ object بوصل بالاسم، فالترتيب ملوش لازمة.
- الـ console ممكن يعرض الـ properties مترتبة أبجديًا.

### array ولا object؟
| array | object |
|---|---|
| بيانات **مترتبة** (قائمة) | بيانات **ليها أسماء** (unstructured) |
| `weekdays[0]` | `person.firstName` |

## ملحوظات لنفسي
- أهم فرق: الترتيب مهم في الـ arrays ومش مهم في الـ objects.
- نسيان الفاصلة بين الـ properties = SyntaxError.
- `{}` ليها استخدامين: code block (بعد if أو function) و object literal (بعد `=`).
- إزاي أقرا وأعدّل الـ properties: الدرس الجاي.
