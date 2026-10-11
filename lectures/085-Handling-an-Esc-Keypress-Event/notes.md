# 085 — Handling an "Esc" Keypress Event

## الفكرة
الطريقة التالتة لقفل الـ modal: **زرار Esc**. بنتعلم **keyboard events**، وإن الـ keyboard events **global** فبنسمعها على **`document`**، وإزاي نقرا **الـ event object** (`e.key`)، ونتشيك على class بـ **`classList.contains`**.

## أهم الحاجات

### Keyboard events = global events
- برضه بـ `addEventListener` — الـ key press مجرد نوع event تاني.
- مش بتحصل على **element معين** → بنسمعها على **الـ document كله**:
```js
document.addEventListener('keydown', function () {
  console.log('A key was pressed');
});
```
- `document` = نفس اللي بنستخدم معاه `querySelector` — object كبير فيه methods كتير منها `addEventListener`.
- listener على الـ document = بيسمع الـ events **في أي حتة** في الصفحة.

### أنواع keyboard events (3)
| الـ event | بيحصل إمتى |
|---|---|
| `keyup` | لما أرفع صباعي من على الزرار |
| `keypress` | بيتكرر طول ما صباعي على الزرار |
| `keydown` | **أول ما أدوس** — **وده اللي بنستخدمه عادة** |

- الـ handler المرة دي مكتوب **مباشرة** (مش function منفصلة).
- أي زرار (Q, 3, P, Enter, Esc…) → نفس الرسالة. بس احنا عاوزين **Esc بس**.

### الـ Event Object
- كل ما event يحصل → JavaScript **بيعمل object** فيه كل المعلومات عن الـ event، وأقدر أوصله **جوه الـ handler**.
- لحد دلوقتي كنا بنسمع للـ event ونتفاعل بس، عمرنا ما بصينا عليه.
- إزاي؟ أدّي الـ function **parameter** — اسمه `e` (event)، وممكن أي اسم.
- JS **بينادي الـ function** لما الـ keydown يحصل و**يبعتلها الـ event object كـ argument**. (وده شغال لأننا مش بنادي الـ function بنفسنا — بنعرّفها بس.) الميكانيزم ده هيتشرح أكتر بعدين.
```js
document.addEventListener('keydown', function (e) {
  console.log(e); // KeyboardEvent {key: 'Enter', ...}
});
```
- اسمه **KeyboardEvent** — object عادي شبه اللي بنعمله بإيدينا (property: value).
- المهم الـ property **`key`**: Enter، Escape، " " (space)، q، z، Control، Shift…
```js
console.log(e.key); // Escape
```

### نتشيك Esc
```js
if (e.key === 'Escape') {
  console.log('Esc was pressed');
}
```

### نقفل بس لو الـ modal مفتوح → `classList.contains`
- الـ modal **مستخبي** لو عليه class `hidden`. ظاهر = **مفيهوش** `hidden` → دي الحالة اللي نقفل فيها.
- `contains` = التالتة بعد `add` و`remove`.
- نقلب النتيجة بـ **`!`** — "لو الـ modal **مش** فيه hidden → اقفله".
```js
if (e.key === 'Escape') {
  if (!modal.classList.contains('hidden')) {
    closeModal(); // هنا لازم أناديها بـ ()
  }
}
```
- ⚠️ هنا **بنادي** `closeModal()` فعلًا بالقوسين — لأننا جوه handler بيتنفذ، وعاوزين الكود يحصل دلوقتي. (عكس `addEventListener('click', closeModal)` اللي بنبعت فيها الـ function بس.)
- وشال `console.log('Button clicked')` القديم (اللي كان في line 9).

### دمج الـ ifs بـ `&&`
- "لو Esc **و** لو الـ modal مش hidden" → شرط واحد:
```js
document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
```
- الـ modal بقى **feature complete** زي الـ demo ✅.

### الكود النهائي للمشروع
```js
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
```
- المشروع الجاي (Pig Game) = practice project يثبّت كل اللي فات — جوناس بيقول إنه أكتر حاجة exciting لحد دلوقتي.

## الفرق بين…
| | `closeModal` | `closeModal()` |
|---|---|---|
| فين | argument لـ addEventListener | جوه handler بيتنفذ |
| المعنى | "ناديها بعدين" | "نفّذها دلوقتي" |

| | click event | keyboard event |
|---|---|---|
| بنسمعه على | element معين | `document` (global) |

## غلطات لازم أخلي بالي منها
- `'Esc'` بدل `'Escape'` → مش هيتطابق.
- أنسى الـ parameter `e` وأحاول أقرا `e.key` → error.
- أنسى الـ `!` قبل `contains` → هيحاول يقفل وهو مقفول أصلًا.
- أحط الـ keydown على زرار بدل document.

## ملحوظات لنفسي
- `keydown` هو الافتراضي.
- كل event بيجيب معاه object — `e` — فيه كل التفاصيل.
- `classList`: add / remove / **contains**.
- `if (a) { if (b) ... }` = `if (a && b)` → أقصر وبيتقري زي جملة.
- أطبع `e` كله مرة عشان أشوف فيه إيه قبل ما أختار الـ property.
