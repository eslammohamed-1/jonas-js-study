# 068 — Basic HTML Structure and Elements

## الفكرة
أساسيات HTML: الـ structure بتاع أي صفحة (`html` / `head` / `body`) والـ elements (headings, paragraphs). السيكشن من غير starter files — بنعمل كل حاجة من الصفر في فولدر اسمه `html-css`.

## أهم الحاجات

### HTML = إيه؟
- **HyperText Markup Language** → بنوصف بيها **محتوى** صفحة الويب.
- الصفحة مكونة من **elements**، وكل element ليه **opening tag** و**closing tag** (نفس الاسم بـ `/`).
- `index.html` = اسم الملف الرئيسي في أي مشروع دايمًا.

### الـ structure
```html
<html>
  <head>
    <title>Learning HTML & CSS</title>
  </head>
  <body>
    <h1>JavaScript is fun, but so is HTML & CSS!</h1>
    <p>You can learn JavaScript without HTML and CSS, but for DOM manipulation it's useful to have some basic ideas of HTML & CSS.</p>
    <p>Just another paragraph</p>
    <h2>Another heading</h2>
  </body>
</html>
```
- `html` = الـ element الرئيسي؛ أي document بيبدأ وبيخلص بيه.
- `head` = **settings الصفحة / وصفها**: الـ `title` (اللي بيظهر في تاب Chrome)، الـ CSS، الـ favicon (الأيقونة الصغيرة في التاب).
- `body` = اللي **بيظهر فعلًا** على الصفحة.

### Elements
- `h1` … `h6` → headings بمستويات. البراوزر بيدي كل واحد style تلقائي (h1 أكبر وأتقل، h6 حتى أصغر من الـ paragraph).
- `p` → paragraph.
- كل element ليه غرض (heading، paragraph…).

### Preview بـ live-server
- terminal (`Ctrl + backtick` أو من المنيو New Terminal) → `Cmd/Ctrl + K` يمسحه → `live-server`.
- لو live-server مش شغال → افتح ملف الـ HTML نفسه في البراوزر عادي.

### Extensions مفيدة للـ HTML
- **Auto Rename Tag** → أغيّر الـ opening tag (h2 → h6) يتغير الـ closing لوحده.
- **Auto Close Tag** → يقفل الـ tag لوحده.

### الـ shortcut السحري: `!` + Tab
- بيكتب الـ boilerplate كله:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learning HTML & CSS</title>
  </head>
  <body></body>
</html>
```
- `<!DOCTYPE html>` → بيعرّف الـ document إنه **HTML5**.
- `lang="en"` → بيقول للبراوزر اللغة إنجليزي.
- الـ meta tags مهمة بس مش هنشرحها دلوقتي.
- نقل المحتوى جوه الـ structure ده لأنه أكمل.
- `Cmd/Ctrl + B` → يخفي/يظهر الـ sidebar في VS Code.

## غلطات لازم أخلي بالي منها
- أحط محتوى مرئي في `head` → مكانه `body`.
- أنسى الـ closing tag.

## ملحوظات لنفسي
- `!` + Tab = أسرع بداية لأي صفحة.
- head = settings، body = content.
