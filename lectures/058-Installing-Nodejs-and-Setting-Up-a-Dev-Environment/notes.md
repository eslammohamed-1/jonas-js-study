# 058 — Installing Node.js and Setting Up a Dev Environment

## الفكرة
لحد دلوقتي كنت بعمل save وبعدين **reload للبراوزر بإيدي**. مفيش developer محترف بيعمل كده. الحل: **Live Server** — الصفحة بتعمل reload لوحدها أول ما أغيّر الكود.
فيه طريقتين: **extension في VS Code** (الأسهل)، أو **Node.js + npm package** (الأكثر احترافية، وجوناس هيستخدمها في باقي الكورس).

## أهم الحاجات

### الطريقة 1: Live Server extension
1. Extensions → أدور على **Live Server** → Install.
2. هيظهر زرار **Go Live** تحت.
3. أدوس عليه → يفتح tab جديدة في البراوزر على عنوان local.
4. أفتح الـ console (Inspect) → أغيّر الكود وأعمل save (`Cmd + S`) → الـ output يتحدث **من غير reload**.
```js
console.log(calcAge(1991)); // أغيّر الرقم وأعمل save → يتحدث لوحده
```
- لو دي شغالة معايا ومش عاوز تعقيد → أقدر أكمل الكورس بيها عادي وأعدّي باقي الفيديو.

### الطريقة 2: Node.js + live-server (npm)
**Node.js** = JavaScript runtime أقدر أسطبه على جهازي. بيخليني:
- أشغّل JavaScript **برّه البراوزر**.
- أشغّل **development tools** زي Live Server.

الخطوات:
1. أدور على Node.js → Download → النسخة **LTS** لنظامي (Windows/Mac/Linux) → أسطبها.
2. أفتح الـ **terminal** اللي جوه VS Code: من المنيو → **New Terminal**.
   - `Cmd/Ctrl + K` → يمسح الـ terminal.
3. أتأكد إن Node اتسطب:
```bash
node -v
```
أي رقم يطلع = تمام.
4. أسطب live-server:
```bash
npm install live-server -g
# على الماك غالبًا محتاج sudo:
sudo npm install live-server -g
```
   - **npm** = Node Package Manager → برنامج بينزّل tools.
   - `install` → أسطب.
   - `live-server` → اسم الـ tool.
   - `-g` → **globally**، يعني متاح في أي مكان على الجهاز.
   - على الماك هيطلب الـ password، ومش هيظهر وأنا بكتبه — **ده مقصود**، أكتبه وأدوس Enter.
   - على Windows **مش محتاج sudo** (ومش هتشتغل لو استخدمتها).
   - جوناس طلعله errors وهو بيسطب بس قال إنها مش مهمة.
5. أشغله:
```bash
live-server
```

### إزاي live-server بيشتغل
- بيفتح tab في البراوزر الـ default، مربوطة بـ **الفولدر الحالي** في الـ terminal (هنا developer-skills).
- لما يفتح فولدر في البراوزر → بيفتح **`index.html` تلقائيًا**. وده سبب إن كل فولدر فيه `index.html`.
- أول ما فتح طلع error صغير في الـ console، راح لما عمل reload.
- **أي ملف يتغير في الفولدر** (JS أو حتى HTML) → reload لوحده. والـ terminal بيكتب إن فيه change اتعملت detect.
- لو قفلت لوحة الـ terminal، السيرفر **لسه شغال** في الخلفية. أرجعله من New Terminal → المنيو → أختار الأول اللي اسمه **node**.

## الفرق بين…
| | Live Server extension | Node.js + live-server |
|---|---|---|
| السهولة | أسهل (زرار Go Live) | محتاج terminal وتسطيب |
| الاحترافية | كويس | ده الـ workflow الحقيقي |
| جوناس بيستخدم | لأ | ✅ في باقي الكورس |
| لازم؟ | — | لأ، الـ extension كفاية |

## غلطات لازم أخلي بالي منها
- `-g` مهمة، من غيرها مش هيبقى متاح في كل حتة.
- متقلقش لو الـ password مش بيظهر وإنت بتكتبه.
- live-server بيفتح الفولدر **اللي الـ terminal واقف فيه** — لازم أكون في فولدر المشروع.
- قفل لوحة الـ terminal ≠ قفل السيرفر.
- لو التسطيب فشل خالص، **متقفش عند الفيديو ده** — الكورس يتكمل من غيره.

## ملحوظات لنفسي
- أنا شغال على Antigravity: الأسهل `npx live-server` أو extension الـ Live Server.
- `index.html` اسم مهم — هو اللي بيتفتح لوحده.
- Node.js مش بس لـ live-server، ده اللي هيشغّل كل الـ tools بعدين.
- خلاص بطّل reload بإيدي 😅.
