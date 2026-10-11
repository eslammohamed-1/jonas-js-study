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

// كل السكاشن من 1 لـ 9 (نوتات بس للمحاضرات غير 108/110/111)
// files = الملفات الموجودة للمحاضرة (لو مش مكتوبة يبقى الأربعة)
// الترانسكريبت على الماك بس (~/Documents/jonas-js-course/lectures/<slug>/transcript.md) — مش بيترفع
// SECTION9 فوق = محاضرات الخطة والتقدم (108–132)، و106 (المقدمة) متضافة للسكشن بس
const notesOnly = (n, title, slug, extra) => ({ n, title, slug, files: ['notes'], ...extra });

window.SECTIONS = [
  {
    id: 's1',
    name: "Section 1 — Welcome, Welcome, Welcome!",
    short: "Welcome",
    lectures: [
      notesOnly(1, "Course Structure and Projects", '001-Course-Structure-and-Projects'),
      notesOnly(3, "Watch Before You Start!", '003-Watch-Before-You-Start'),
      notesOnly(4, "Setting Up Our Code Editor", '004-Setting-Up-Our-Code-Editor'),
    ],
  },
  {
    id: 's2',
    name: "Section 2 — JavaScript Fundamentals – Part 1",
    short: "Fundamentals 1",
    lectures: [
      notesOnly(5, "Section Intro (JavaScript Fundamentals – Part 1)", '005-Section-Intro'),
      notesOnly(6, "Hello World!", '006-Hello-World'),
      notesOnly(7, "A Brief Introduction to JavaScript", '007-A-Brief-Introduction-to-JavaScript'),
      notesOnly(8, "Linking a JavaScript File", '008-Linking-a-JavaScript-File'),
      notesOnly(9, "Values and Variables", '009-Values-and-Variables'),
      notesOnly(11, "Data Types", '011-Data-Types'),
      notesOnly(12, "let, const and var", '012-let-const-and-var'),
      notesOnly(13, "Basic Operators", '013-Basic-Operators'),
      notesOnly(14, "Operator Precedence", '014-Operator-Precedence'),
      notesOnly(16, "CHALLENGE #1: Video Solution", '016-CHALLENGE-1', { challenge: true }),
      notesOnly(17, "Strings and Template Literals", '017-Strings-and-Template-Literals'),
      notesOnly(18, "Taking Decisions: if / else Statements", '018-Taking-Decisions-if-else'),
      notesOnly(19, "CHALLENGE #2: Video Solution", '019-CHALLENGE-2', { challenge: true }),
      notesOnly(20, "Type Conversion and Coercion", '020-Type-Conversion-and-Coercion'),
      notesOnly(21, "Truthy and Falsy Values", '021-Truthy-and-Falsy-Values'),
      notesOnly(22, "Equality Operators: == vs. ===", '022-Equality-Operators'),
      notesOnly(23, "Boolean Logic", '023-Boolean-Logic'),
      notesOnly(24, "Logical Operators", '024-Logical-Operators'),
      notesOnly(25, "CHALLENGE #3: Video Solution", '025-CHALLENGE-3', { challenge: true }),
      notesOnly(26, "The switch Statement", '026-The-switch-Statement'),
      notesOnly(27, "Statements and Expressions", '027-Statements-and-Expressions'),
      notesOnly(28, "The Conditional (Ternary) Operator", '028-The-Conditional-Ternary-Operator'),
      notesOnly(29, "CHALLENGE #4: Video Solution", '029-CHALLENGE-4', { challenge: true }),
      notesOnly(30, "JavaScript Releases: ES5, ES6+ and ESNext", '030-JavaScript-Releases-ES5-ES6-and-ESNext'),
    ],
  },
  {
    id: 's3',
    name: "Section 3 — JavaScript Fundamentals – Part 2",
    short: "Fundamentals 2",
    lectures: [
      notesOnly(32, "Section Intro (JavaScript Fundamentals – Part 2)", '032-Section-Intro'),
      notesOnly(33, "Activating Strict Mode", '033-Activating-Strict-Mode'),
      notesOnly(34, "Functions", '034-Functions'),
      notesOnly(35, "Function Declarations vs. Expressions", '035-Function-Declarations-vs-Expressions'),
      notesOnly(36, "Arrow Functions", '036-Arrow-Functions'),
      notesOnly(37, "Functions Calling Other Functions", '037-Functions-Calling-Other-Functions'),
      notesOnly(38, "Reviewing Functions", '038-Reviewing-Functions'),
      notesOnly(39, "CHALLENGE #1: Video Solution", '039-CHALLENGE-1', { challenge: true }),
      notesOnly(40, "Introduction to Arrays", '040-Introduction-to-Arrays'),
      notesOnly(41, "Basic Array Operations (Methods)", '041-Basic-Array-Operations'),
      notesOnly(42, "CHALLENGE #2: Video Solution", '042-CHALLENGE-2', { challenge: true }),
      notesOnly(43, "Introduction to Objects", '043-Introduction-to-Objects'),
      notesOnly(44, "Dot vs. Bracket Notation", '044-Dot-vs-Bracket-Notation'),
      notesOnly(45, "Object Methods", '045-Object-Methods'),
      notesOnly(46, "CHALLENGE #3: Video Solution", '046-CHALLENGE-3', { challenge: true }),
      notesOnly(47, "Iteration: The for Loop", '047-The-for-Loop'),
      notesOnly(48, "Looping Arrays, Breaking and Continuing", '048-Looping-Arrays-Breaking-and-Continuing'),
      notesOnly(49, "Looping Backwards and Loops in Loops", '049-Looping-Backwards-and-Loops-in-Loops'),
      notesOnly(50, "The while Loop", '050-The-while-Loop'),
      notesOnly(51, "CHALLENGE #4: Video Solution", '051-CHALLENGE-4', { challenge: true }),
    ],
  },
  {
    id: 's4',
    name: "Section 4 — How to Navigate This Course",
    short: "Navigate",
    lectures: [
      notesOnly(53, "Pathways and Section Roadmaps", '053-Pathways-and-Section-Roadmaps'),
    ],
  },
  {
    id: 's5',
    name: "Section 5 — Developer Skills & Editor Setup",
    short: "Dev Skills",
    lectures: [
      notesOnly(55, "Section Intro (Developer Skills & Editor Setup)", '055-Section-Intro'),
      notesOnly(57, "Setting up Prettier and VS Code", '057-Setting-up-Prettier-and-VS-Code'),
      notesOnly(58, "Installing Node.js and Setting Up a Dev Environment", '058-Installing-Nodejs-and-Setting-Up-a-Dev-Environment'),
      notesOnly(59, "Learning How to Code", '059-Learning-How-to-Code'),
      notesOnly(60, "How to Think Like a Developer: Become a Problem Solver!", '060-How-to-Think-Like-a-Developer-Become-a-Problem-Solver'),
      notesOnly(61, "Using Google, StackOverflow and MDN", '061-Using-Google-StackOverflow-and-MDN'),
      notesOnly(62, "Debugging (Fixing Errors)", '062-Debugging-Fixing-Errors'),
      notesOnly(63, "Debugging with the Console and Breakpoints", '063-Debugging-with-the-Console-and-Breakpoints'),
      notesOnly(64, "CHALLENGE #1 (Developer Skills)", '064-CHALLENGE-1', { challenge: true }),
      notesOnly(65, "The Rise of AI Tools (ChatGPT, Copilot, Cursor AI, etc.)", '065-The-Rise-of-AI-Tools-ChatGPT-Copilot-Cursor-AI-etc'),
      notesOnly(66, "Solving CHALLENGE #2 With AI", '066-Solving-CHALLENGE-2-With-AI', { challenge: true }),
    ],
  },
  {
    id: 's6',
    name: "Section 6 — HTML & CSS Crash Course",
    short: "HTML & CSS",
    lectures: [
      notesOnly(67, "Section Intro (HTML & CSS Crash Course)", '067-Section-Intro'),
      notesOnly(68, "Basic HTML Structure and Elements", '068-Basic-HTML-Structure-and-Elements'),
      notesOnly(69, "Attributes, Classes and IDs", '069-Attributes-Classes-and-IDs'),
      notesOnly(70, "Basic Styling with CSS", '070-Basic-Styling-with-CSS'),
      notesOnly(71, "Introduction to the CSS Box Model", '071-Introduction-to-the-CSS-Box-Model'),
    ],
  },
  {
    id: 's7',
    name: "Section 7 — JavaScript in the Browser: DOM and Events Fundamentals",
    short: "DOM & Events",
    lectures: [
      notesOnly(72, "Section Intro (JavaScript in the Browser: DOM and Events)", '072-Section-Intro'),
      notesOnly(74, "PROJECT #1: Guess My Number!", '074-PROJECT-1-Guess-My-Number'),
      notesOnly(75, "What's the DOM and DOM Manipulation", '075-Whats-the-DOM-and-DOM-Manipulation'),
      notesOnly(76, "Selecting and Manipulating Elements", '076-Selecting-and-Manipulating-Elements'),
      notesOnly(77, "Handling Click Events", '077-Handling-Click-Events'),
      notesOnly(78, "Implementing the Game Logic", '078-Implementing-the-Game-Logic'),
      notesOnly(79, "Manipulating CSS Styles", '079-Manipulating-CSS-Styles'),
      notesOnly(80, "CHALLENGE #1 (Guess My Number: Again! button)", '080-CHALLENGE-1', { challenge: true }),
      notesOnly(81, "Implementing Highscores", '081-Implementing-Highscores'),
      notesOnly(82, "Refactoring Our Code: The DRY Principle", '082-Refactoring-Our-Code-The-DRY-Principle'),
      notesOnly(83, "PROJECT #2: Modal Window", '083-PROJECT-2-Modal-Window'),
      notesOnly(84, "Working With Classes", '084-Working-With-Classes'),
      notesOnly(85, "Handling an \"Esc\" Keypress Event", '085-Handling-an-Esc-Keypress-Event'),
      notesOnly(86, "PROJECT #3: Pig Game", '086-PROJECT-3-Pig-Game'),
      notesOnly(87, "Rolling the Dice", '087-Rolling-the-Dice'),
      notesOnly(88, "Switching the Active Player", '088-Switching-the-Active-Player'),
      notesOnly(89, "Holding Current Score", '089-Holding-Current-Score'),
      notesOnly(90, "Resetting the Game", '090-Resetting-the-Game'),
    ],
  },
  {
    id: 's8',
    name: "Section 8 — How JavaScript Works Behind the Scenes",
    short: "Behind the Scenes",
    lectures: [
      notesOnly(91, "Section Intro (How JavaScript Works Behind the Scenes)", '091-Section-Intro'),
      notesOnly(93, "An High-Level Overview of JavaScript", '093-An-High-Level-Overview-of-JavaScript'),
      notesOnly(94, "The JavaScript Engine and Runtime", '094-The-JavaScript-Engine-and-Runtime'),
      notesOnly(95, "Execution Contexts and The Call Stack", '095-Execution-Contexts-and-The-Call-Stack'),
      notesOnly(96, "Scope and The Scope Chain", '096-Scope-and-The-Scope-Chain'),
      notesOnly(97, "Scoping in Practice", '097-Scoping-in-Practice'),
      notesOnly(98, "Variable Environment: Hoisting and The TDZ", '098-Variable-Environment-Hoisting-and-The-TDZ'),
      notesOnly(99, "Hoisting and TDZ in Practice", '099-Hoisting-and-TDZ-in-Practice'),
      notesOnly(100, "The this Keyword", '100-The-this-Keyword'),
      notesOnly(101, "The this Keyword in Practice", '101-The-this-Keyword-in-Practice'),
      notesOnly(102, "Regular Functions vs. Arrow Functions", '102-Regular-Functions-vs-Arrow-Functions'),
      notesOnly(103, "Memory Management: Primitives vs. Objects", '103-Memory-Management-Primitives-vs-Objects'),
      notesOnly(104, "Object References in Practice (Shallow vs. Deep Copies)", '104-Object-References-in-Practice-Shallow-vs-Deep-Copies'),
      notesOnly(105, "Memory Management: Garbage Collection", '105-Memory-Management-Garbage-Collection'),
    ],
  },
  {
    id: 's9',
    name: "Section 9 — Data Structures, Modern Operators and Strings",
    short: "Section 9",
    lectures: [notesOnly(106, "Section Intro (Data Structures, Modern Operators and Strings)", '106-Section-Intro'), ...window.SECTION9],
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
