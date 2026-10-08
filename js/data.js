// ============================================================
//  بيانات الموقع — عشان تضيف محاضرة جديدة:
//  1) اعمل فولدر جديد في lectures/ بنفس التسمية (مثلًا 112-Rest-Pattern)
//     وحط فيه notes.md و explanation.md و exercises.md و solutions.md
//  2) في SECTION9 تحت، حط slug للمحاضرة دي.
// ============================================================

window.COURSE = {
  title: 'The Complete JavaScript Course',
  author: 'Jonas Schmedtmann',
  udemy: 'https://www.udemy.com/course/the-complete-javascript-course/',
  github: 'https://github.com/jonasschmedtmann/complete-javascript-course',
  totalLectures: 345,
};

// محاضرات Section 9: Data Structures, Modern Operators and Strings
// slug = اسم الفولدر في lectures/ (لو المحاضرة ليها ماتريال على الموقع)
window.SECTION9 = [
  { n: 108, title: 'Destructuring Arrays', slug: '108-Destructuring-Arrays' },
  { n: 110, title: 'Destructuring Objects', slug: '110-Destructuring-Objects' },
  { n: 111, title: 'The Spread Operator (...)', slug: '111-The-Spread-Operator' },
  { n: 112, title: 'Rest Pattern and Parameters' },
  { n: 113, title: 'Short Circuiting (&& and ||)' },
  { n: 114, title: 'The Nullish Coalescing Operator (??)' },
  { n: 115, title: 'Logical Assignment Operators' },
  { n: 116, title: 'Coding Challenge #1', challenge: true },
  { n: 117, title: 'Looping Arrays: The for-of Loop' },
  { n: 118, title: 'Enhanced Object Literals' },
  { n: 119, title: 'Optional Chaining (?.)' },
  { n: 120, title: 'Looping Objects: Keys, Values, and Entries' },
  { n: 121, title: 'Coding Challenge #2', challenge: true },
  { n: 122, title: 'Sets' },
  { n: 123, title: 'New Operations to Make Sets Useful!' },
  { n: 124, title: 'Maps: Fundamentals' },
  { n: 125, title: 'Maps: Iteration' },
  { n: 126, title: 'Summary: Which Data Structure to Use?' },
  { n: 127, title: 'Coding Challenge #3', challenge: true },
  { n: 128, title: 'Working With Strings - Part 1' },
  { n: 129, title: 'Working With Strings - Part 2' },
  { n: 130, title: 'Working With Strings - Part 3' },
  { n: 131, title: 'Coding Challenge #4', challenge: true },
  { n: 132, title: 'String Methods Practice' },
];

// المحاضرات اللي خلصت فعلًا (بتتعلّم done أول مرة تفتح الموقع)
window.DEFAULT_DONE = [108, 110, 111];

// الجدول الأسبوعي
window.WEEK = [
  { day: 'الأحد', type: 'code', what: 'برمجة', when: 'بالليل', dur: '1.5 ساعة أو أكتر' },
  { day: 'الإتنين', type: 'masters', what: 'الماجستير', when: '', dur: '' },
  { day: 'التلات', type: 'philo', what: 'حصص فلسفة / علم نفس', when: '', dur: '' },
  { day: 'الأربع', type: 'philo', what: 'حصص فلسفة / علم نفس', when: '', dur: '' },
  { day: 'الخميس', type: 'code', what: 'برمجة', when: 'بالليل', dur: '1.5 ساعة أو أكتر' },
  { day: 'الجمعة', type: 'code', what: 'برمجة', when: 'الصبح', dur: 'ساعتين' },
  { day: 'السبت', type: 'rest', what: 'راحة', when: '', dur: '' },
];

// قعدات Section 9
window.SITTINGS = [
  { date: '2026-10-08', day: 'الخميس', slot: 'بالليل', from: 108, to: 111 },
  { date: '2026-10-09', day: 'الجمعة', slot: 'الصبح · ساعتين', from: 112, to: 121 },
  { date: '2026-10-11', day: 'الأحد', slot: 'بالليل', from: 122, to: 127 },
  { date: '2026-10-15', day: 'الخميس', slot: 'بالليل', from: 128, to: 132 },
];

// بعد Section 9 (تواريخ تقديرية، بتتزحزح حسب الوقت)
window.ROADMAP = [
  { id: 's9', name: 'Section 9 — Data Structures, Modern Operators & Strings', when: 'لحد 15 أكتوبر' },
  { id: 's10', name: 'Section 10 — A Closer Look at Functions', when: '16 – 25 أكتوبر تقريبًا' },
  { id: 's11', name: 'Section 11 — Working With Arrays (Bankist)', when: '29 أكتوبر – 8 نوفمبر تقريبًا' },
  { id: 's13', name: 'Section 13 — Advanced DOM and Events', when: '12 – 20 نوفمبر تقريبًا' },
  { id: 's14', name: 'Section 14 — OOP With JavaScript', when: '22 نوفمبر – 4 ديسمبر تقريبًا' },
  { id: 's16', name: 'Section 16 — Asynchronous JavaScript', when: '6 – 13 ديسمبر تقريبًا' },
  { id: 'mini', name: 'ميني بروجكت بإيدي (أطبّق كل اللي فات)', when: '17 – 20 ديسمبر تقريبًا' },
  { id: 'big', name: 'بعد كده: Mapty و Forkify وباقي الكورس', when: 'الهدف: أخلص الكورس آخر ديسمبر' },
];
