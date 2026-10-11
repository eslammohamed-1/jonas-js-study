# 041 — Basic Array Operations (Methods)

## الفكرة
الـ arrays عندها **methods** جاهزة (functions مربوطة بالـ array) بنناديها بـ `arr.method()`.

```js
const friends = ['Michael', 'Steven', 'Peter'];
```

## أهم الحاجات

### إضافة: push / unshift
```js
const newLength = friends.push('Jay'); // آخر الـ array
console.log(friends);   // ['Michael', 'Steven', 'Peter', 'Jay']
console.log(newLength); // 4 ← بترجّع الطول الجديد

friends.unshift('John'); // أول الـ array، وبترجّع الطول برضه
// ['John', 'Michael', 'Steven', 'Peter', 'Jay']
```

### حذف: pop / shift
```js
const popped = friends.pop(); // بيشيل الأخير
console.log(popped);  // Jay ← بترجّع العنصر اللي اتشال

friends.shift();      // بيشيل الأول (John) وبيرجّعه
console.log(friends); // ['Michael', 'Steven', 'Peter']
```

### بحث: indexOf / includes
```js
friends.indexOf('Steven'); // 1
friends.indexOf('Bob');    // -1 ← مش موجود

friends.includes('Steven'); // true  (ES6)
friends.includes('Bob');    // false
```

### includes بيستخدم strict equality
```js
friends.push(23);
friends.includes('23'); // false ← مفيش coercion
friends.includes(23);   // true
```

### includes مع if
```js
if (friends.includes('Steven')) {
  console.log('You have a friend called Steven');
}
```

## ملحوظات لنفسي
| method | بتعمل | بترجّع |
|---|---|---|
| `push` | تضيف آخر | الطول الجديد |
| `unshift` | تضيف أول | الطول الجديد |
| `pop` | تشيل آخر | العنصر اللي اتشال |
| `shift` | تشيل أول | العنصر اللي اتشال |
| `indexOf` | تدوّر | الـ index أو `-1` |
| `includes` | تدوّر | `true` / `false` |

- الأربعة الأولانيين بيغيّروا الـ array الأصلي (mutation)، وده شغال مع `const`.
