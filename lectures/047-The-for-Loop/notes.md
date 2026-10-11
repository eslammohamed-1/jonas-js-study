# 047 — Iteration: The for Loop

## الفكرة
الـ loop بيكرر كود من غير ما أنسخه 10 مرات (DRY).
الـ **for loop** بيفضل شغال **طول ما الشرط true**.

```js
// بدل 10 console.log
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}
```

## أهم الحاجات

### التلات أجزاء
```js
for (initialValue; condition; update) { … }
```
1. **counter**: `let rep = 1` بيتنفذ مرة واحدة في الأول.
2. **condition**: `rep <= 10` بيتشيك **قبل** كل لفة. لو false → الـ loop يقف.
3. **update**: `rep++` بيتنفذ **بعد** كل لفة.

الترتيب: init → check → body → update → check → body → …

### `let` مش `const`
لأن الـ counter بيتغير كل لفة.

### أستخدم الـ counter جوّا الكود
template literal بـ `${rep}` → كل سطر رقمه مختلف.
من غيرها هيطبع نفس النص 10 مرات.

### أغيّر البداية والنهاية
```js
for (let rep = 5; rep <= 10; rep++) { … } // من 5
for (let rep = 1; rep <= 30; rep++) { … } // 30 لفة
```

### Infinite loop ⚠️
لو الشرط عمره ما بقى false (نسيت `rep++`، أو بنقّص بدل ما أزوّد) → المتصفح يهنج.

## ملحوظات لنفسي
- الـ counter اللي متعرّف بـ `let` جوّا الـ for مش موجود برّه (block scope).
- لو عرّفت `let i` برّه وعملت `for (i = 1; i <= 3; i++)`، بعد الـ loop `i` = 4 مش 3.
- لو الشرط false من الأول، الـ body مش هيتنفذ ولا مرة.
- `rep++` = `rep = rep + 1`.
