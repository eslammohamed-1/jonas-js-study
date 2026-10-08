(() => {
  'use strict';

  // ============ أدوات صغيرة ============
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $('#app');
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const S9 = window.SECTION9;
  const byN = Object.fromEntries(S9.map((l) => [l.n, l]));
  const withMaterial = S9.filter((l) => l.slug);

  const TABS = [
    { id: 'notes', label: 'نوتات', icon: '📝' },
    { id: 'explanation', label: 'شرح', icon: '📖' },
    { id: 'exercises', label: 'تدريبات', icon: '💪' },
    { id: 'solutions', label: 'حلول', icon: '✅' },
    { id: 'transcript', label: 'ترانسكريبت', icon: '🎧' },
  ];

  const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const fmtDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]}`;
  };
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  // ============ التقدم (localStorage) ============
  const KEY = 'jjs-progress-v1';
  function load() {
    let s;
    try {
      s = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {}
    if (!s || typeof s !== 'object') s = {};
    s.lectures = s.lectures || {};
    s.ex = s.ex || {};
    s.exTotal = s.exTotal || {};
    s.roadmap = s.roadmap || {};
    s.code = s.code || {};
    if (!s.seeded) {
      (window.DEFAULT_DONE || []).forEach((n) => (s.lectures[n] = true));
      s.seeded = 1;
    }
    return s;
  }
  let state = load();
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      toast('مقدرتش أحفظ التقدم على الجهاز ده');
    }
  };
  save();

  const isDone = (n) => !!state.lectures[n];
  const setDone = (n, v) => {
    if (v) state.lectures[n] = true;
    else delete state.lectures[n];
    save();
  };
  const exMap = (n) => (state.ex[n] = state.ex[n] || {});
  const exDoneCount = (n) => Object.values(state.ex[n] || {}).filter(Boolean).length;
  const s9Done = () => S9.filter((l) => isDone(l.n)).length;
  const sittingLectures = (s) => S9.filter((l) => l.n >= s.from && l.n <= s.to);

  // ============ Markdown ============
  marked.setOptions({ gfm: true, breaks: false });
  const md = (text) => DOMPurify.sanitize(marked.parse(text));
  const mdInline = (text) => DOMPurify.sanitize(marked.parseInline(text));
  const stripH1 = (text) => text.replace(/^# .*\n?/m, '').trim();

  function enhance(el) {
    $$('pre code', el).forEach((code) => {
      if (!/language-/.test(code.className)) code.classList.add('language-plaintext');
      try {
        hljs.highlightElement(code);
      } catch (e) {}
      const pre = code.parentElement;
      pre.setAttribute('dir', 'ltr');
      if (!pre.querySelector('.copy-btn')) {
        const b = document.createElement('button');
        b.className = 'copy-btn';
        b.type = 'button';
        b.textContent = 'نسخ';
        b.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(code.innerText);
            b.textContent = 'اتنسخ ✓';
          } catch (e) {
            b.textContent = 'مقدرتش';
          }
          setTimeout(() => (b.textContent = 'نسخ'), 1400);
        });
        pre.appendChild(b);
      }
    });
    $$('table', el).forEach((t) => {
      if (t.parentElement.classList.contains('table-wrap')) return;
      const w = document.createElement('div');
      w.className = 'table-wrap';
      t.replaceWith(w);
      w.appendChild(t);
    });
    $$('a[href^="http"]', el).forEach((a) => {
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  const cache = new Map();
  async function fetchText(url) {
    if (cache.has(url)) return cache.get(url);
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const t = await res.text();
    cache.set(url, t);
    return t;
  }
  const mdPath = (lec, file) => `lectures/${lec.slug}/${file}.md`;

  // تقسيم الماركداون على عناوين ## (مع تجاهل اللي جوّا ```)
  function splitH2(text) {
    const intro = [];
    const sections = [];
    let cur = null;
    let fence = false;
    for (const line of text.split('\n')) {
      if (/^\s*```/.test(line)) fence = !fence;
      if (!fence && /^## /.test(line)) {
        cur = { title: line.slice(3).trim(), body: [] };
        sections.push(cur);
        continue;
      }
      (cur ? cur.body : intro).push(line);
    }
    const clean = (arr) => arr.join('\n').replace(/(\n\s*-{3,}\s*)+$/, '').trim();
    return { intro: clean(intro), sections: sections.map((s) => ({ title: s.title, body: clean(s.body) })) };
  }

  // ============ الراوتر ============
  let lastPage = '';
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const page = parts.slice(0, 2).join('/');
    if (page !== lastPage) window.scrollTo(0, 0);
    lastPage = page;
    $$('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === (parts[0] || 'home')));
    if (!parts.length) return renderHome();
    if (parts[0] === 'plan') return renderPlan();
    if (parts[0] === 'progress') return renderProgress();
    if (parts[0] === 'lecture') return renderLecture(Number(parts[1]), parts[2] || 'notes');
    app.innerHTML = `<div class="card"><h2>الصفحة دي مش موجودة</h2><p><a href="#/">ارجع للرئيسية</a></p></div>`;
  }

  const progressBar = (done, total) => {
    const pct = total ? Math.round((done / total) * 100) : 0;
    return `<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>`;
  };

  function nextSitting() {
    return window.SITTINGS.find((s) => sittingLectures(s).some((l) => !isDone(l.n)));
  }

  // ============ الرئيسية ============
  function renderHome() {
    document.title = 'مذاكرة جوناس JS';
    const done = s9Done();
    const total = S9.length;
    const exTotalDone = withMaterial.reduce((a, l) => a + exDoneCount(l.n), 0);
    const exTotalAll = withMaterial.reduce((a, l) => a + (state.exTotal[l.n] || 8), 0);
    const ns = nextSitting();
    const upcoming = S9.filter((l) => !isDone(l.n)).slice(0, 6);

    app.innerHTML = `
      <section class="hero">
        <h1>أهلًا يا إسلام 👋</h1>
        <p class="muted">كورس جوناس JavaScript — كل محاضرة فيها النوتات والشرح والتدريبات، والخطة بتاعتك جنبها.</p>
        <div class="stats">
          <div class="stat"><b>${done}/${total}</b><span>محاضرات Section 9</span>${progressBar(done, total)}</div>
          <div class="stat"><b>${exTotalDone}/${exTotalAll}</b><span>تمارين خلصتها</span>${progressBar(exTotalDone, exTotalAll)}</div>
        </div>
      </section>

      ${
        ns
          ? `<a class="card next-card" href="#/plan">
              <div class="tag">القعدة الجاية 👈</div>
              <h2>${ns.day} ${fmtDate(ns.date)} <span class="muted small">· ${esc(ns.slot)}</span></h2>
              <p>محاضرات ${ns.from}–${ns.to}: ${sittingLectures(ns)
                .filter((l) => !isDone(l.n))
                .slice(0, 3)
                .map((l) => `<bdi>${esc(l.title)}</bdi>`)
                .join('، ')}${sittingLectures(ns).filter((l) => !isDone(l.n)).length > 3 ? '…' : ''}</p>
              <span class="link">افتح الخطة ←</span>
            </a>`
          : `<a class="card next-card" href="#/plan"><div class="tag">🎉</div><h2>خلصت Section 9!</h2><span class="link">شوف اللي بعده في الخطة ←</span></a>`
      }

      <h2 class="section-title">المحاضرات اللي ليها ماتريال</h2>
      <div class="grid">
        ${withMaterial
          .map((l) => {
            const exd = exDoneCount(l.n);
            const ext = state.exTotal[l.n] || 8;
            return `<a class="card lec-card ${isDone(l.n) ? 'is-done' : ''}" href="#/lecture/${l.n}">
              <div class="lec-num">${l.n}</div>
              <div class="lec-body">
                <h3>${esc(l.title)}</h3>
                <div class="muted small">${isDone(l.n) ? '✅ خلصتها' : '⏳ لسه'} · تمارين ${exd}/${ext}</div>
                ${progressBar(exd, ext)}
              </div>
            </a>`;
          })
          .join('')}
      </div>

      <h2 class="section-title">الجاي في Section 9</h2>
      <div class="card">
        <ul class="up-list">
          ${upcoming
            .map(
              (l) =>
                `<li><span class="num">${l.n}</span> ${esc(l.title)} ${l.challenge ? '<span class="pill">Challenge</span>' : ''}</li>`
            )
            .join('') || '<li>مفيش، كله خلص 🎉</li>'}
        </ul>
        <p class="muted small">النوتات والتدريبات بتاعة كل محاضرة بتتضاف هنا بعد ما تخلصها وتبعت الترانسكريبت.</p>
      </div>
    `;
  }

  // ============ الخطة ============
  function renderPlan() {
    document.title = 'الخطة — مذاكرة جوناس JS';
    const today = todayISO();
    const dow = new Date().getDay(); // 0 = الأحد
    const ns = nextSitting();
    const allS9 = s9Done() === S9.length;

    const sittingHTML = window.SITTINGS.map((s) => {
      const lecs = sittingLectures(s);
      const d = lecs.filter((l) => isDone(l.n)).length;
      let badge;
      if (d === lecs.length) badge = '<span class="badge ok">خلصت ✅</span>';
      else if (s === ns && s.date < today) badge = '<span class="badge warn">متأخرة شوية — كمّلها</span>';
      else if (s === ns) badge = '<span class="badge next">الجاية 👈</span>';
      else if (s.date < today) badge = '<span class="badge warn">فاتت — زحزحها</span>';
      else badge = '<span class="badge">لسه</span>';
      return `<div class="card sitting ${s === ns ? 'is-next' : ''}">
        <div class="sit-head">
          <div><h3>${s.day} ${fmtDate(s.date)}</h3><div class="muted small">${esc(s.slot)} · محاضرات ${s.from}–${s.to} · ${d}/${lecs.length}</div></div>
          ${badge}
        </div>
        ${progressBar(d, lecs.length)}
        <ul class="check-list">
          ${lecs
            .map(
              (l) => `<li>
                <label class="check"><input type="checkbox" data-lec="${l.n}" ${isDone(l.n) ? 'checked' : ''}/>
                <span><span class="num">${l.n}</span> ${esc(l.title)} ${l.challenge ? '<span class="pill">Challenge</span>' : ''}</span></label>
                ${l.slug ? `<a class="small" href="#/lecture/${l.n}">افتح ←</a>` : ''}
              </li>`
            )
            .join('')}
        </ul>
      </div>`;
    }).join('');

    app.innerHTML = `
      <section class="hero">
        <h1>📅 الخطة</h1>
        <p class="muted">الهدف: أخلص الكورس آخر ديسمبر. البرمجة 3 أيام في الأسبوع، والباقي للماجستير والحصص والراحة.</p>
      </section>

      <h2 class="section-title">الأسبوع بتاعي</h2>
      <div class="week">
        ${window.WEEK.map(
          (w, i) => `<div class="day ${w.type} ${i === dow ? 'today' : ''}">
            <div class="d-name">${w.day}${i === dow ? ' <span class="pill">النهارده</span>' : ''}</div>
            <div class="d-what">${esc(w.what)}</div>
            ${w.when || w.dur ? `<div class="muted small">${esc([w.when, w.dur].filter(Boolean).join(' · '))}</div>` : ''}
          </div>`
        ).join('')}
      </div>

      <h2 class="section-title">قعدات Section 9 <span class="muted small">(${s9Done()}/${S9.length})</span></h2>
      ${sittingHTML}
      <p class="muted small">لو قعدة فاتت أو مخلصتش، كمّل من مكان ما وقفت في القعدة اللي بعدها، المهم الترتيب مش التاريخ بالظبط.</p>

      <h2 class="section-title">بعد Section 9</h2>
      <div class="card">
        <ol class="roadmap">
          ${window.ROADMAP.map((r) => {
            const checked = r.id === 's9' ? allS9 : !!state.roadmap[r.id];
            return `<li class="${checked ? 'is-done' : ''}">
              <label class="check"><input type="checkbox" data-road="${r.id}" ${checked ? 'checked' : ''} ${r.id === 's9' ? 'disabled' : ''}/>
              <span><b>${esc(r.name)}</b><br><span class="muted small">${esc(r.when)}</span></span></label>
            </li>`;
          }).join('')}
        </ol>
        <p class="muted small">التواريخ دي تقديرية. Section 9 بتتعلّم لوحدها لما تخلص كل محاضراتها.</p>
      </div>

      <h2 class="section-title">إزاي أذاكر كل محاضرة</h2>
      <div class="card">
        <ol>
          <li>أتفرج على المحاضرة وأكتب الكود مع جوناس في <code>starter/script.js</code>.</li>
          <li>أقرا النوتات.</li>
          <li>أحل التدريبات (هنا في الموقع أو في <code>script.js</code>).</li>
          <li>أقارن بالحل، واللي وقفت فيه أرجعله في الشرح.</li>
          <li>أعلّم المحاضرة إنها خلصت ✅ وأبعت الترانسكريبت عشان تتعملها نوتات.</li>
        </ol>
      </div>
    `;

    $$('input[data-lec]', app).forEach((cb) =>
      cb.addEventListener('change', () => {
        setDone(Number(cb.dataset.lec), cb.checked);
        renderPlan();
      })
    );
    $$('input[data-road]', app).forEach((cb) =>
      cb.addEventListener('change', () => {
        state.roadmap[cb.dataset.road] = cb.checked;
        save();
        renderPlan();
      })
    );
  }

  // ============ نقل التقدم ============
  function renderProgress() {
    document.title = 'نقل التقدم — مذاكرة جوناس JS';
    app.innerHTML = `
      <section class="hero"><h1>🔁 نقل التقدم لجهاز تاني</h1>
      <p class="muted">التقدم محفوظ في المتصفح ده بس. عشان تنقله من الماك للموبايل (أو العكس): انسخ الكود من هنا، وعلى الجهاز التاني الزقه في نفس الصفحة واضغط استيراد.</p></section>
      <div class="card">
        <h3>1) انسخ من الجهاز ده</h3>
        <textarea id="exportBox" dir="ltr" readonly rows="4"></textarea>
        <button class="btn" id="copyExport">نسخ الكود</button>
      </div>
      <div class="card">
        <h3>2) الزق هنا على الجهاز التاني</h3>
        <textarea id="importBox" dir="ltr" rows="4" placeholder="الزق الكود هنا"></textarea>
        <button class="btn" id="doImport">استيراد</button>
      </div>
      <div class="card danger-zone">
        <h3>ابدأ من الأول</h3>
        <p class="muted small">بيمسح كل التقدم والكود المحفوظ على الجهاز ده.</p>
        <button class="btn ghost" id="doReset">امسح التقدم</button>
      </div>`;
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    $('#exportBox').value = data;
    $('#copyExport').onclick = async () => {
      try {
        await navigator.clipboard.writeText(data);
        toast('اتنسخ ✓');
      } catch (e) {
        $('#exportBox').select();
        toast('حدد الكود وانسخه يدوي');
      }
    };
    $('#doImport').onclick = () => {
      try {
        const obj = JSON.parse(decodeURIComponent(escape(atob($('#importBox').value.trim()))));
        if (!obj || typeof obj !== 'object' || !obj.lectures) throw new Error();
        localStorage.setItem(KEY, JSON.stringify(obj));
        state = load();
        toast('تم الاستيراد ✓');
        location.hash = '#/';
      } catch (e) {
        toast('الكود ده مش مظبوط');
      }
    };
    $('#doReset').onclick = () => {
      if (!confirm('متأكد؟ هيتمسح كل التقدم على الجهاز ده.')) return;
      localStorage.removeItem(KEY);
      state = load();
      save();
      toast('اتمسح');
      location.hash = '#/';
    };
  }

  // ============ صفحة المحاضرة ============
  function renderLecture(n, tab) {
    const lec = byN[n];
    if (!lec) {
      app.innerHTML = `<div class="card"><h2>المحاضرة ${esc(n)} مش موجودة</h2><p><a href="#/">ارجع للرئيسية</a></p></div>`;
      return;
    }
    document.title = `${lec.n} — ${lec.title}`;
    if (!TABS.some((t) => t.id === tab)) tab = 'notes';
    const idx = withMaterial.indexOf(lec);
    const prev = withMaterial[idx - 1];
    const next = withMaterial[idx + 1];

    app.innerHTML = `
      <nav class="crumbs"><a href="#/">الرئيسية</a> ‹ Section 9 ‹ محاضرة ${lec.n}</nav>
      <section class="lec-head">
        <div>
          <div class="muted small">محاضرة ${lec.n}</div>
          <h1 dir="ltr" class="lec-title">${esc(lec.title)}</h1>
        </div>
        <button class="btn ${isDone(lec.n) ? 'ok' : ''}" id="doneBtn">${isDone(lec.n) ? '✅ خلصتها' : 'علّمها إنها خلصت'}</button>
      </section>
      ${
        lec.slug
          ? `<nav class="tabs" role="tablist">
              ${TABS.map(
                (t) =>
                  `<a role="tab" href="#/lecture/${lec.n}/${t.id}" class="${t.id === tab ? 'active' : ''}" aria-selected="${t.id === tab}"><span>${t.icon}</span> ${t.label}</a>`
              ).join('')}
            </nav>
            <div id="tabContent" class="tab-content"><p class="loading">بيحمّل…</p></div>`
          : `<div class="card"><p>المحاضرة دي لسه مفيهاش نوتات ولا تدريبات. أول ما تخلصها وتبعت الترانسكريبت هتتضاف هنا.</p></div>`
      }
      <nav class="pager">
        ${prev ? `<a class="btn ghost" href="#/lecture/${prev.n}/${tab}">→ ${prev.n}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/lecture/${next.n}/${tab}">${next.n} ←</a>` : '<span></span>'}
      </nav>`;

    $('#doneBtn').onclick = () => {
      setDone(lec.n, !isDone(lec.n));
      toast(isDone(lec.n) ? 'برافو! اتعلّمت إنها خلصت ✅' : 'اتشال العلامة');
      renderLecture(n, tab);
    };
    if (!lec.slug) return;
    const box = $('#tabContent');
    const fail = (e) => {
      box.innerHTML = `<div class="card"><p>مقدرتش أحمّل الملف 😕</p><p class="muted small" dir="ltr">${esc(e.message)}</p></div>`;
    };
    const renderers = { notes: renderDoc, explanation: renderDoc, exercises: renderExercises, solutions: renderSolutions, transcript: renderTranscript };
    Promise.resolve(renderers[tab](lec, box, tab)).catch(fail);
  }

  async function renderDoc(lec, box, file) {
    const text = await fetchText(mdPath(lec, file));
    box.innerHTML = `<article class="md card">${md(stripH1(text))}</article>`;
    const art = $('article', box);
    enhance(art);
    if (file === 'explanation') {
      const hs = $$('h2', art);
      if (hs.length > 2) {
        const toc = document.createElement('details');
        toc.className = 'toc';
        toc.innerHTML = `<summary>المحتويات (${hs.length})</summary><ol>${hs
          .map((h, i) => `<li><a href="#" data-h="${i}">${esc(h.textContent)}</a></li>`)
          .join('')}</ol>`;
        art.prepend(toc);
        $$('a[data-h]', toc).forEach((a) =>
          a.addEventListener('click', (e) => {
            e.preventDefault();
            hs[a.dataset.h].scrollIntoView({ behavior: 'smooth', block: 'start' });
          })
        );
      }
    }
  }

  function renderTranscript(lec, box) {
    box.innerHTML = `<div class="card notice">
      <h3>🎧 الترانسكريبت على جهازك بس</h3>
      <p>الترانسكريبت كلام جوناس من الكورس على Udemy، وحقوقه ليه، فمش بيترفع على الموقع ده عشان هو public.</p>
      <p>هتلاقيه على الماك هنا:</p>
      <pre dir="ltr"><code>~/Documents/jonas-js-course/lectures/${esc(lec.slug)}/transcript.md</code></pre>
      <p>أو تفتح المحاضرة نفسها على <a href="${window.COURSE.udemy}" target="_blank" rel="noopener">Udemy</a> وتشغّل الـ Transcript من تحت الفيديو.</p>
    </div>`;
  }

  async function renderSolutions(lec, box) {
    const text = await fetchText(mdPath(lec, 'solutions'));
    const key = `jjs-sol-${lec.n}`;
    const show = () => {
      box.innerHTML = `<article class="md card">${md(stripH1(text))}</article>`;
      enhance($('article', box));
    };
    if (sessionStorage.getItem(key)) return show();
    box.innerHTML = `<div class="card notice center">
      <h3>✋ استنى</h3>
      <p>الحلول دي بعد ما تجرّب بنفسك بس. ولو عايز حل تمرين واحد، افتحه من تاب <a href="#/lecture/${lec.n}/exercises">التدريبات</a> بزرار «أظهر الحل».</p>
      <button class="btn" id="revealAll">جرّبت، وريني كل الحلول</button>
    </div>`;
    $('#revealAll').onclick = () => {
      sessionStorage.setItem(key, '1');
      show();
    };
  }

  const LEVELS = { '🟢': ['سهل', 'green'], '🟡': ['متوسط', 'yellow'], '🔴': ['أصعب', 'red'] };

  async function renderExercises(lec, box) {
    const [exText, solText] = await Promise.all([fetchText(mdPath(lec, 'exercises')), fetchText(mdPath(lec, 'solutions'))]);
    const ex = splitH2(exText);
    const sol = splitH2(solText);
    const sols = {};
    sol.sections.forEach((s) => {
      const m = s.title.match(/تمرين\s*(\d+)/);
      if (m) sols[m[1]] = s.body;
    });
    const items = ex.sections
      .map((s) => {
        const m = s.title.match(/^تمرين\s*(\d+)/);
        if (!m) return null;
        let level = null;
        let title = s.title;
        for (const k of Object.keys(LEVELS)) {
          if (title.includes(k)) {
            level = LEVELS[k];
            title = title.replace(k, '').replace(/\s{2,}/g, ' ');
          }
        }
        return { num: m[1], title, level, body: s.body };
      })
      .filter(Boolean);
    state.exTotal[lec.n] = items.length;
    save();
    const done = exMap(lec.n);

    const head = () => {
      const d = items.filter((it) => done[it.num]).length;
      return `<div class="ex-progress"><b>خلصت ${d} من ${items.length}</b>${progressBar(d, items.length)}</div>`;
    };

    box.innerHTML = `
      <div class="card sticky-progress" id="exHead">${head()}</div>
      <article class="md card intro">${md(stripH1(ex.intro))}
        <p class="muted small">💡 تقدر تحل هنا على طول بزرار «جرّب هنا»: <code>restaurant</code> و<code>flights</code> و<code>italianFoods</code> و<code>mexicanFoods</code> متعرّفين جاهزين زي الـ starter. الكود اللي بتكتبه بيتحفظ على الجهاز.</p>
      </article>
      ${items
        .map((it) => {
          const codeKey = `${lec.n}-${it.num}`;
          const hasCode = !!state.code[codeKey];
          return `<article class="card ex-card ${done[it.num] ? 'is-done' : ''}" data-num="${it.num}">
            <header class="ex-head">
              <label class="check"><input type="checkbox" ${done[it.num] ? 'checked' : ''} aria-label="خلصت التمرين"/>
              <span class="ex-title">${mdInline(it.title)}</span></label>
              ${it.level ? `<span class="lvl ${it.level[1]}">${it.level[0]}</span>` : ''}
            </header>
            <div class="md">${md(it.body)}</div>
            <div class="ex-actions">
              <button class="btn ghost" data-act="play" type="button">💻 ${hasCode ? 'كودك (محفوظ)' : 'جرّب هنا'}</button>
              ${sols[it.num] ? `<button class="btn ghost" data-act="sol" type="button">👀 أظهر الحل</button>` : ''}
            </div>
            <div class="playground" hidden>
              <textarea dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="// اكتب حلك هنا وبعدين ▶ شغّل&#10;console.log(restaurant.mainMenu);"></textarea>
              <div class="pg-bar">
                <button class="btn" data-act="run" type="button">▶ شغّل</button>
                <button class="btn ghost" data-act="clear" type="button">امسح الناتج</button>
              </div>
              <div class="pg-out" dir="ltr" aria-live="polite"></div>
            </div>
            <div class="solution md" hidden></div>
          </article>`;
        })
        .join('')}
    `;
    enhance(box);

    $$('.ex-card', box).forEach((card) => {
      const num = card.dataset.num;
      const codeKey = `${lec.n}-${num}`;
      const cb = $('.ex-head input', card);
      cb.addEventListener('change', () => {
        done[num] = cb.checked;
        if (!cb.checked) delete done[num];
        save();
        card.classList.toggle('is-done', cb.checked);
        $('#exHead').innerHTML = head();
        if (cb.checked) toast('عاش 💪');
      });

      const solBtn = $('[data-act="sol"]', card);
      const solBox = $('.solution', card);
      if (solBtn)
        solBtn.addEventListener('click', () => {
          if (!solBox.dataset.ready) {
            solBox.innerHTML = `<div class="sol-label">الحل</div>${md(sols[num])}`;
            enhance(solBox);
            solBox.dataset.ready = '1';
          }
          solBox.hidden = !solBox.hidden;
          solBtn.textContent = solBox.hidden ? '👀 أظهر الحل' : '🙈 اخفي الحل';
        });

      const pg = $('.playground', card);
      const ta = $('textarea', pg);
      const out = $('.pg-out', pg);
      ta.value = state.code[codeKey] || '';
      $('[data-act="play"]', card).addEventListener('click', () => {
        pg.hidden = !pg.hidden;
        if (!pg.hidden) {
          autoGrow(ta);
          ta.focus({ preventScroll: true });
        }
      });
      let t;
      ta.addEventListener('input', () => {
        autoGrow(ta);
        clearTimeout(t);
        t = setTimeout(() => {
          if (ta.value.trim()) state.code[codeKey] = ta.value;
          else delete state.code[codeKey];
          save();
        }, 400);
      });
      ta.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          const s = ta.selectionStart;
          ta.setRangeText('  ', s, ta.selectionEnd, 'end');
          ta.dispatchEvent(new Event('input'));
        }
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          runCode(ta.value, out);
        }
      });
      $('[data-act="run"]', pg).addEventListener('click', () => runCode(ta.value, out));
      $('[data-act="clear"]', pg).addEventListener('click', () => (out.innerHTML = ''));
    });
  }

  function autoGrow(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(140, ta.scrollHeight + 4) + 'px';
  }

  // ============ تشغيل الكود (iframe معزول) ============
  // بيانات الـ starter من كورس جوناس (Section 9) عشان التمارين تشتغل
  const PRELUDE = `
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const italianFoods = new Set(['pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil']);
const mexicanFoods = new Set(['tortillas', 'beans', 'rice', 'tomatoes', 'avocado', 'garlic']);
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: { open: 12, close: 22 },
    fri: { open: 11, close: 23 },
    sat: { open: 0, close: 24 },
  },
};`;

  const BRIDGE = `(function(){
  var ID = '__ID__';
  function fmt(v, d) {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    var t = typeof v;
    if (t === 'string') return d ? JSON.stringify(v) : v;
    if (t === 'number' || t === 'boolean' || t === 'bigint') return String(v);
    if (t === 'symbol') return v.toString();
    if (t === 'function') return 'ƒ ' + (v.name || 'anonymous') + '()';
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (d > 3) return Array.isArray(v) ? '[…]' : '{…}';
    if (Array.isArray(v)) { var a = []; for (var i = 0; i < v.length; i++) a.push(i in v ? fmt(v[i], d + 1) : 'empty'); return '[' + a.join(', ') + ']'; }
    if (v instanceof Set) return 'Set(' + v.size + ') {' + Array.from(v).map(function (x) { return fmt(x, d + 1); }).join(', ') + '}';
    if (v instanceof Map) return 'Map(' + v.size + ') {' + Array.from(v).map(function (e) { return fmt(e[0], d + 1) + ' => ' + fmt(e[1], d + 1); }).join(', ') + '}';
    try { return '{' + Object.keys(v).map(function (k) { return k + ': ' + fmt(v[k], d + 1); }).join(', ') + '}'; } catch (e) { return String(v); }
  }
  function send(type, args) {
    var text = Array.prototype.map.call(args, function (x) { return fmt(x, 0); }).join(' ');
    parent.postMessage({ __jjs: ID, type: type, text: text }, '*');
  }
  ['log', 'info', 'warn', 'error', 'table', 'dir'].forEach(function (k) { console[k] = function () { send(k, arguments); }; });
  window.onerror = function (msg) { send('error', [String(msg).replace(/^Uncaught /, '')]); return true; };
  window.addEventListener('unhandledrejection', function (e) { send('error', ['Uncaught (in promise) ' + (e.reason && e.reason.message || e.reason)]); });
})();`;

  let runSeq = 0;
  let current = null;
  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || !current || d.__jjs !== current.id) return;
    if (d.type === 'done') return finishRun();
    current.got = true;
    const line = document.createElement('div');
    line.className = `ln ${d.type}`;
    line.textContent = d.text;
    current.out.appendChild(line);
  });
  function finishRun() {
    if (!current) return;
    clearTimeout(current.timer);
    if (!current.got) {
      const line = document.createElement('div');
      line.className = 'ln muted';
      line.textContent = '(مفيش ناتج — استخدم console.log)';
      current.out.appendChild(line);
    }
    current.frame.remove();
    current = null;
  }
  function runCode(code, out) {
    if (current) finishRun();
    out.innerHTML = '';
    const id = `r${++runSeq}${Math.random().toString(36).slice(2, 7)}`;
    const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts allow-modals');
    frame.className = 'runner';
    frame.srcdoc =
      `<!doctype html><meta charset="utf-8"><script>${BRIDGE.replace('__ID__', id)}<\/script>` +
      `<script>'use strict';${PRELUDE}<\/script>` +
      `<script>'use strict';\n${safe(code)}\n<\/script>` +
      `<script>parent.postMessage({__jjs:'${id}',type:'done'},'*');<\/script>`;
    current = { id, out, frame, got: false };
    current.timer = setTimeout(() => {
      if (current && current.id === id) {
        const line = document.createElement('div');
        line.className = 'ln warn';
        line.textContent = '⏱ الكود أخد وقت طويل، اتوقف.';
        out.appendChild(line);
        finishRun();
      }
    }, 5000);
    document.body.appendChild(frame);
  }

  // ============ الثيم ============
  const HL = {
    light: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css',
    dark: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css',
  };
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    $('#hljs-theme').href = HL[t];
    $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(document.documentElement.dataset.theme || 'light');
  $('#themeBtn').addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('jjs-theme', t);
    applyTheme(t);
  });

  window.addEventListener('hashchange', route);
  route();
})();
