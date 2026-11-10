// ─────────────────────────────────────────────────────────────────────────────
//  ALL THE WORDS ON THE SITE LIVE HERE.
//  Edit this file to change copy, links or numbers – no need to touch components.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Amrith Eshwar T T",
  role: "Software Engineer · AI Engineer",
  // Optional: put your employer here (e.g. "Acme Corp") and it shows up next to your role.
  company: "",
  // Optional: your start date, shown on the role card (e.g. "2025 – Present").
  period: "",
  location: "India",
  links: {
    linkedin: "https://www.linkedin.com/in/amrith-eshwar-t-t-0b60a2317/",
    github: "https://github.com/Amrith1410",
    githubNew: "https://github.com/JnrDevAmi",
    // Optional: add `email: "you@example.com"` and a mail button appears in Contact.
    email: "",
  },
};

export const hero = {
  tagline: "I build AI tools that make real work",
  taglineEm: "easier.",
  typedPrefix: "tools that",
  typed: [
    "automate a small business",
    "help students design real PCBs",
    "review workflows with AI agents",
    "keep friends entertained",
  ],
  lede:
    "Software Engineer working as an AI Engineer. I build practical tools for real people: " +
    "a friend's business, my juniors' projects, and the fun stuff in between.",
};

export const about = {
  title: "Building tools people actually use.",
  paragraphs: [
    "I'm a Software Engineer working as an AI Engineer. I like taking a real problem, turning it into a simple tool and then watching someone actually use it.",
    "I studied B.Tech in Information Technology at the Madras Institute of Technology, Anna University. Most of what I build starts with someone asking “can you make this easier?”: a friend's business, my juniors' projects, or just a fun way to stay in touch while we work.",
  ],
  offClock: ["Sports", "Travelling", "Exploring new tech", "Tech blogs & case studies"],
  principles: [
    {
      ref: "R1",
      title: "Keep it simple.",
      text: "If a tool needs a manual, I'm not done yet. The best ones feel obvious the first time you use them.",
    },
    {
      ref: "R2",
      title: "A person stays in charge.",
      text: "My AI assistants suggest, explain and draft. A human confirms before anything important changes.",
    },
    {
      ref: "R3",
      title: "Private and local by default.",
      text: "Tools that run on your own computer, with small local models when AI is needed. No accounts, no cloud bill.",
    },
  ],
};

export const work = {
  role: "Software Engineer — AI Engineering",
  summary:
    "I design and build AI agents that help engineering teams review and understand their work faster, with a human always making the final call.",
  caseStudy: {
    name: "wfguard",
    kicker: "Built at work",
    tagline: "A complete multi-agent AI system that reviews workflow repositories end to end.",
    problem:
      "When workflow files are updated by copy-and-edit, small mistakes slip in quietly: a flow still points to an old version, a link points to something that doesn't exist, a rule is renamed on one side only. Nothing fails at deploy time. It just behaves wrongly, and the problem shows up weeks later.",
    solution:
      "wfguard is a team of AI agents that reviews the whole repository on every change. They plan the work, call tools to check the code, work out what broke and why, explain each change in plain English and post one clear report for the reviewer. It also runs a nightly health scan and answers questions about any workflow in plain English.",
    points: [
      "Agents that plan, use tools and hand results to each other, from reading the code to writing the report.",
      "Catches broken links, outdated versions and mismatched rules, and explains every change in plain English.",
      "Runs on its own for every code change and as a nightly health scan, and answers questions like “who calls this flow?”.",
    ],
    flow: {
      start: "Code change",
      lead: { name: "Ori", role: "orchestrator" },
      agents: [
        { name: "Cleo", role: "change analyst" },
        { name: "Lin", role: "link inspector" },
        { name: "Ruth", role: "rules auditor" },
        { name: "Ira", role: "impact analyst" },
        { name: "Cass", role: "cleanup scout" },
      ],
      writer: { name: "Rhea", role: "report writer" },
      end: "One review report",
    },
    terminalTitle: "wfguard · example run",
    terminal: [
      { kind: "cmd", text: "wfguard review --change feature/new-checkout" },
      { kind: "agent", who: "ori", text: "scanning the workflow repository", tag: "ok" },
      { kind: "find", who: "lin", check: "broken_link", text: "CheckoutFlow_Sub_2.1 calls PriceCheck_1.0, which doesn't exist" },
      { kind: "find", who: "ruth", check: "rule_mismatch", text: "“approval-step” is used, but only “approvalStep” is defined" },
      { kind: "find", who: "lin", check: "outdated_version", text: "CheckoutFlow_Main_2.1 still calls the old Sub_2.0" },
      { kind: "verdict", who: "rhea", text: "HIGH RISK · 3 problems to fix before merge" },
    ],
    chips: ["Python", "Multi-agent AI", "LLM tool use", "Agent orchestration", "CI/CD"],
  },
};

/*
  Impact numbers: `ring` shows a single percentage, `bar` shows a before → after jump.
  These are your own figures, shown as approximate. Edit them here any time.
*/
export const projects = [
  {
    id: "pcbforge",
    art: "pcb",
    wide: true,
    kicker: "Project 01 · Built for students",
    title: "PCBForge",
    tagline: "A simple PCB design studio for students.",
    blurb:
      "Plenty of PCB software exists, but most of it is hard for beginners. I built PCBForge to be easier to use and easier to understand, and to guide students as they design. I made it for my ECE and Aero juniors. They used the first version for their projects, then shaped it around what they needed, and ended up building real boards, and much more accurate ones.",
    points: [
      "Place parts, wire them up and let it route the board for you.",
      "An AI assistant guides students step by step, and can run fully offline.",
      "For my Aero junior, I built the PCB right into the drone's body, shaped like the airframe, which cut weight and wiring.",
    ],
    impact: {
      kind: "ring",
      value: 85,
      label: "boost in learning and outcomes",
      note: "for my Aero juniors",
    },
    stack: ["Python", "Local AI (Ollama)", "Claude", "Web app"],
    // Add your PCBForge repo link here – the README only had a placeholder.
    repo: "",
  },
  {
    id: "chat2cart",
    art: "cart",
    kicker: "Project 02 · Small business",
    title: "Chat2Cart",
    tagline: "WhatsApp orders, tracked automatically.",
    blurb:
      "I built Chat2Cart for a friend who runs a brownie business, to make her work easier and quicker. It turns the orders that arrive on WhatsApp into organised, tracked orders, and a small language model running on her own computer automates the rest. My fee: ₹100 and a brownie.",
    points: [
      "Turns a pasted WhatsApp message into a ready order.",
      "Tracks every order from confirmed to packed, and tracks sales too.",
      "Much faster and automated, with a small local AI model to help.",
    ],
    impact: {
      kind: "bar",
      from: 50,
      to: 90,
      label: "growth in her sales",
      note: "approx., before → after",
    },
    stack: ["TypeScript", "React", "Node.js", "SQLite", "Local SLM"],
    repo: "",
  },
  {
    id: "penpalpet",
    art: "pet",
    kicker: "Project 03 · Just for fun",
    title: "Pen-pal Pet",
    tagline: "A tiny pet that carries notes between friends.",
    blurb:
      "A simple, funny way to talk to my friends while we work on something. It's just a bit of time-pass to keep ourselves engaged. Doodle a note, hand it to your pet, and it walks across the screen to your friend's computer.",
    points: [
      "Send doodles and notes to friends on the same Wi-Fi.",
      "Your pet walks off the window and delivers them, then brings the reply back.",
      "Private by design. No server and no sign-up.",
    ],
    stack: ["Electron", "Node.js", "Windows"],
    repo: "https://github.com/JnrDevAmi/Pen_Pal_Pet",
    download: "https://github.com/JnrDevAmi/Pen_Pal_Pet/releases/latest",
  },
];

export const earlier = [
  {
    title: "Hawk Eye Optics",
    text: "Full-stack e-commerce platform with product listings, sign-in, cart and order management.",
    stack: ["Node.js", "Express", "MongoDB", "EJS"],
    image: "optics",
    repo: "https://github.com/Amrith1410/Hawk-Eye-Optics",
  },
  {
    title: "Real-time Chess",
    text: "Live multiplayer chess with spectators and a drag-and-drop board.",
    stack: ["Socket.IO", "chess.js", "Express", "Tailwind"],
    image: "chess",
    repo: "https://github.com/Amrith1410/CHESS-",
  },
  {
    title: "Brain Tumor Detection",
    text: "Web app that predicts tumor types from MRI scans using a trained CNN.",
    stack: ["Python", "TensorFlow", "Flask", "NumPy"],
    image: "brain",
    repo: "https://github.com/Amrith1410/Brain-Tumor-Detection",
  },
  {
    title: "Code Buddy",
    text: "LeetCode-style coding platform with an in-browser editor and problem bank.",
    stack: ["React", "Monaco Editor", "JavaScript"],
    image: "code",
    repo: "https://github.com/Amrith1410/Code-Buddy",
  },
];

export const toolbox = [
  {
    ref: "U1",
    group: "AI & agents",
    parts: ["LLM agents & tool use", "Claude API", "Local models (Ollama, SLMs)", "MCP", "Evals"],
  },
  {
    ref: "U2",
    group: "Backend",
    parts: ["Python", "FastAPI", "Node.js", "TypeScript", "Express", "Flask"],
  },
  {
    ref: "U3",
    group: "Data & ML",
    parts: ["SQLite", "PostgreSQL", "MongoDB", "TensorFlow / Keras", "NumPy"],
  },
  {
    ref: "U4",
    group: "Frontend & desktop",
    parts: ["React", "Vite", "Electron", "Canvas & SVG animation"],
  },
  {
    ref: "U5",
    group: "Quality & delivery",
    parts: ["pytest", "Playwright", "Git", "CI/CD"],
  },
  {
    ref: "U6",
    group: "Languages",
    parts: ["Python", "TypeScript / JavaScript", "C++", "Java"],
  },
];
