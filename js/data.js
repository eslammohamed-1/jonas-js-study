// ============================================================
//  بيانات الموقع — عشان تضيف محاضرة جديدة:
//  1) اعمل فولدر جديد في lectures/ بنفس التسمية (مثلًا 112-Rest-Pattern)
//     وحط فيه notes.md و explanation.md و exercises.md و solutions.md
//  2) في SECTION9 تحت، حط slug للمحاضرة دي.
//     (محاضرة من سكشن تاني: ضيفها في SECTIONS، ولو فيها نوتات بس استخدم notesOnly)
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
// 112–132: نوتات بس (files: ['notes']) — الترانسكريبت على الماك بس، مش بيترفع
window.SECTION9 = [
  { n: 108, title: 'Destructuring Arrays', slug: '108-Destructuring-Arrays' },
  { n: 110, title: 'Destructuring Objects', slug: '110-Destructuring-Objects' },
  { n: 111, title: 'The Spread Operator (...)', slug: '111-The-Spread-Operator' },
  { n: 112, title: 'Rest Pattern and Parameters', slug: '112-Rest-Pattern-and-Parameters', files: ['notes'] },
  { n: 113, title: 'Short Circuiting (&& and ||)', slug: '113-Short-Circuiting', files: ['notes'] },
  { n: 114, title: 'The Nullish Coalescing Operator (??)', slug: '114-The-Nullish-Coalescing-Operator', files: ['notes'] },
  { n: 115, title: 'Logical Assignment Operators', slug: '115-Logical-Assignment-Operators', files: ['notes'] },
  { n: 116, title: 'Coding Challenge #1', slug: '116-CHALLENGE-1', files: ['notes'], challenge: true },
  { n: 117, title: 'Looping Arrays: The for-of Loop', slug: '117-Looping-Arrays-The-for-of-Loop', files: ['notes'] },
  { n: 118, title: 'Enhanced Object Literals', slug: '118-Enhanced-Object-Literals', files: ['notes'] },
  { n: 119, title: 'Optional Chaining (?.)', slug: '119-Optional-Chaining', files: ['notes'] },
  { n: 120, title: 'Looping Objects: Keys, Values, and Entries', slug: '120-Looping-Objects-Keys-Values-and-Entries', files: ['notes'] },
  { n: 121, title: 'Coding Challenge #2', slug: '121-CHALLENGE-2', files: ['notes'], challenge: true },
  { n: 122, title: 'Sets', slug: '122-Sets', files: ['notes'] },
  { n: 123, title: 'New Operations to Make Sets Useful!', slug: '123-New-Operations-to-Make-Sets-Useful', files: ['notes'] },
  { n: 124, title: 'Maps: Fundamentals', slug: '124-Maps-Fundamentals', files: ['notes'] },
  { n: 125, title: 'Maps: Iteration', slug: '125-Maps-Iteration', files: ['notes'] },
  { n: 126, title: 'Summary: Which Data Structure to Use?', slug: '126-Summary-Which-Data-Structure-to-Use', files: ['notes'] },
  { n: 127, title: 'Coding Challenge #3', slug: '127-CHALLENGE-3', files: ['notes'], challenge: true },
  { n: 128, title: 'Working With Strings - Part 1', slug: '128-Working-With-Strings-Part-1', files: ['notes'] },
  { n: 129, title: 'Working With Strings - Part 2', slug: '129-Working-With-Strings-Part-2', files: ['notes'] },
  { n: 130, title: 'Working With Strings - Part 3', slug: '130-Working-With-Strings-Part-3', files: ['notes'] },
  { n: 131, title: 'Coding Challenge #4', slug: '131-CHALLENGE-4', files: ['notes'], challenge: true },
  { n: 132, title: 'String Methods Practice', slug: '132-String-Methods-Practice', files: ['notes'] },
];

// سكاشن الأساسيات: نوتات بس (معمولة من الهاندبوكس بتاعتي على Drive)
// files = الملفات الموجودة للمحاضرة (لو مش مكتوبة يبقى الأربعة)
// transcript: false = مفيش ترانسكريبت محفوظ عندي على الجهاز
const notesOnly = (n, title, slug) => ({ n, title, slug, files: ['notes'], transcript: false });

window.SECTIONS = [
  {
    id: 's2',
    name: 'Section 2 — JavaScript Fundamentals – Part 1',
    short: 'Fundamentals 1',
    lectures: [
      notesOnly(9, 'Values and Variables', '009-Values-and-Variables'),
      notesOnly(11, 'Data Types', '011-Data-Types'),
      notesOnly(13, 'Basic Operators', '013-Basic-Operators'),
      notesOnly(18, 'Taking Decisions: if / else Statements', '018-Taking-Decisions-if-else'),
      notesOnly(20, 'Type Conversion and Coercion', '020-Type-Conversion-and-Coercion'),
      notesOnly(21, 'Truthy and Falsy Values', '021-Truthy-and-Falsy-Values'),
    ],
  },
  {
    id: 's3',
    name: 'Section 3 — JavaScript Fundamentals – Part 2',
    short: 'Fundamentals 2',
    lectures: [
      notesOnly(33, 'Activating Strict Mode', '033-Activating-Strict-Mode'),
      notesOnly(34, 'Functions', '034-Functions'),
      notesOnly(35, 'Function Declarations vs. Expressions', '035-Function-Declarations-vs-Expressions'),
      notesOnly(36, 'Arrow Functions', '036-Arrow-Functions'),
      notesOnly(37, 'Functions Calling Other Functions', '037-Functions-Calling-Other-Functions'),
      notesOnly(40, 'Introduction to Arrays', '040-Introduction-to-Arrays'),
      notesOnly(41, 'Basic Array Operations (Methods)', '041-Basic-Array-Operations'),
      notesOnly(43, 'Introduction to Objects', '043-Introduction-to-Objects'),
      notesOnly(44, 'Dot vs. Bracket Notation', '044-Dot-vs-Bracket-Notation'),
      notesOnly(45, 'Object Methods', '045-Object-Methods'),
      notesOnly(47, 'Iteration: The for Loop', '047-The-for-Loop'),
    ],
  },
  {
    id: 's9',
    name: 'Section 9 — Data Structures, Modern Operators and Strings',
    short: 'Section 9',
    lectures: window.SECTION9,
  },
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
