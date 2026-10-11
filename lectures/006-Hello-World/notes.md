# 006 — Hello World!

## الفكرة
أول سطر JavaScript. هنكتبه في الـ console بتاع Chrome DevTools عشان نبدأ بسرعة، والفيديو الجاي هننقل للـ editor.

## أهم الحاجات
### أفتح الـ Console إزاي (3 طرق)
1. **Cmd + Option + J** على Mac، و**Ctrl + Alt + J** على Windows.
2. كليك يمين ← **Inspect** ← tab الـ **Console**.
3. منيو Chrome ← **View ← Developer ← JavaScript Console**.

- الـ console بيخليني أكتب JavaScript وأجرّبه على طول، ومفيد في التطوير، زي إني أصلّح errors.
- بس مش بنكتب applications حقيقية فيه.
- أكبّر الخط بـ Cmd + plus.

### أول سطر
```js
alert("Hello world!");
```
- `alert` دي function، والـ "Hello world!" دي string (يعني text).
- مفيش مسافة بين `alert` والقوس.
- أول ما أدوس Enter الكود بيتنفّذ على طول، وبيطلع popup فيه الكلام.

### تجربة سريعة بـ variable وif
```js
let js = "amazing";
if (js === "amazing") alert("JavaScript is FUN!");
```
- عرّفنا `js` بقيمة "amazing"، ولو `js` بيساوي "amazing" يطلع الـ alert.
- غيّرنا القيمة:
```js
js = "boring";
if (js === "amazing") alert("JavaScript is FUN!"); // مفيش حاجة هتطلع
```
- مطلعش حاجة عشان الشرط مبقاش true.
- جوناس قال متشغلش بالك بفهمها دلوقتي، هنشرح كل ده بعدين.

### الـ Console كـ calculator
```js
40 + 8 + 23 - 10; // 61
```

### حركة مفيدة
- **سهم لفوق** في الـ console بيرجّعلي الأوامر اللي كتبتها قبل كده، من غير ما أنسخ وألزق.

## ملحوظات لنفسي
- Cmd + Option + J، هستخدمه كتير.
- السهم لفوق بيوفّر وقت لما أعيد تشغيل نفس الكود.
- الـ console للتجربة بس، الكود الحقيقي بيتكتب في فايل.
