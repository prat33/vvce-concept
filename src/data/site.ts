/* Content harvested from vvce.ac.in — real figures, nothing invented.
   Where the college publishes no number, the field is null and the UI omits it. */

export const college = {
  name: "Vidyavardhaka College of Engineering",
  short: "VVCE",
  parent: "Vidyavardhaka Sangha ®, Mysore",
  established: 1997,
  city: "Mysuru",
  state: "Karnataka",
  affiliation: "Affiliated to VTU, Belagavi",
  status: "Autonomous Institute",
  phone: "0821-427 6286",
};

export const codes = [
  { label: "CET", value: "E071" },
  { label: "COMED-K", value: "E147" },
  { label: "PGCET (MBA)", value: "B315" },
  { label: "PGCET (MTech)", value: "T886" },
  { label: "PGCET (MCA)", value: "C613" },
  { label: "Working Professional", value: "E722" },
];

export const accreditations = [
  { name: "NAAC “A” Grade", img: "/img/acc-naac-a-grade.webp", note: "Accredited" },
  { name: "NBA", img: "/img/acc-nba-acc.webp", note: "All UG branches" },
  { name: "Autonomous", img: "/img/acc-autonomous.webp", note: "Autonomous Institute" },
  { name: "VTU", img: "/img/acc-vtu-logo.webp", note: "Affiliated, Belagavi" },
  { name: "AICTE", img: "/img/acc-aicte-logo.webp", note: "Approved, New Delhi" },
];

export const rankings = [
  { rank: "38th", scope: "in India", body: "IIRF Engineering Colleges Survey 2024" },
  { rank: "9th", scope: "Outstanding Colleges of Excellence", body: "CSR Engineering Colleges Survey" },
  { rank: "4th", scope: "Top Engg. Colleges by State", body: "CSR Engineering Colleges Survey" },
  { rank: "71st", scope: "Top 100 Overall", body: "DQ-CMR Best Tech Schools Survey" },
  { rank: "74th", scope: "Top 100 Private Institutes", body: "Outlook-ICARE Rankings" },
  { rank: "AAA+", scope: "Rated", body: "Careers360" },
];

export const stats = [
  { value: "250+", label: "Qualified faculty" },
  { value: "250+", label: "Companies visited" },
  { value: "1997", label: "Established" },
  { value: "₹43.1L", label: "Highest package" },
];

export type Dept = {
  slug: string;
  name: string;
  abbr: string;
  level: "UG" | "PG";
  intake: number | null;
  duration: number;
  highest: string | null;
  median: string | null;
  highestNote?: string;
  careers: string[];
  intro: string;
  image: string;
};

export const departments: Dept[] = [
  {
    slug: "computer-science-engineering",
    name: "Computer Science & Engineering",
    abbr: "CSE",
    level: "UG",
    intake: 540,
    duration: 4,
    highest: "27 LPA",
    median: "6 LPA",
    careers: ["AI Engineer", "Data Scientist", "ML Scientist", "Software Developer", "Cloud Architect"],
    intro:
      "Master programming, algorithms and cutting-edge technologies. Work across artificial intelligence, cybersecurity, data science and software development, and graduate ready to shape how technology is built across industries.",
    image: "/img/campus-hero.webp",
  },
  {
    slug: "computer-science-engineering-ai-ml",
    name: "Computer Science & Engineering (AI & ML)",
    abbr: "AI & ML",
    level: "UG",
    intake: 180,
    duration: 4,
    highest: "17.5 LPA",
    median: "7.5 LPA",
    careers: ["Machine Learning Engineer", "AI Research Scientist", "Data Scientist", "Deep Learning Engineer"],
    intro:
      "Explore intelligent systems, data-driven algorithms and the technologies behind them — deep learning, natural language processing, computer vision and robotics — and build the automation that industries now run on.",
    image: "/img/campus-1.webp",
  },
  {
    slug: "information-science-engineering",
    name: "Information Science & Engineering",
    abbr: "ISE",
    level: "UG",
    intake: null,
    duration: 4,
    highest: "24 LPA",
    median: "6 LPA",
    highestNote: "Zscaler, 2023–24",
    careers: [
      "Software Developer",
      "Data Scientist",
      "Cybersecurity Specialist",
      "QA Engineer",
      "Blockchain Developer",
      "ML Engineer",
    ],
    intro:
      "Computer science, software engineering and data management alongside AI, machine learning and cybersecurity. The curriculum blends theory with practical work, preparing students for the breadth of the technology industry.",
    image: "/img/campus-3.webp",
  },
  {
    slug: "electronics-communication-engineering",
    name: "Electronics & Communication Engineering",
    abbr: "ECE",
    level: "UG",
    intake: 300,
    duration: 4,
    highest: "10 LPA",
    median: "4.5 LPA",
    careers: [
      "Electronics Engineer",
      "Embedded Systems Engineer",
      "Signal Processing Engineer",
      "VLSI Design Engineer",
      "IoT Engineer",
      "RF Engineer",
    ],
    intro:
      "Electronics, communication systems and the technologies built on them. Work across IoT, robotics, signal processing and telecommunications, from circuit level through to deployed systems.",
    image: "/img/facility-2.webp",
  },
  {
    slug: "electrical-electronics-engineering",
    name: "Electrical & Electronics Engineering",
    abbr: "EEE",
    level: "UG",
    intake: 60,
    duration: 4,
    highest: "13.2 LPA",
    median: "3.92 LPA",
    careers: [
      "Power Systems Engineer",
      "Control Systems Engineer",
      "Electrical Design Engineer",
      "Renewable Energy Engineer",
      "Automation Engineer",
      "Electronics Engineer",
    ],
    intro:
      "Electrical systems, electronics and emerging technology together — power systems, automation, renewable energy and electronic design, with the lab work to back the theory.",
    image: "/img/main-block.webp",
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    abbr: "Mech",
    level: "UG",
    intake: 120,
    duration: 4,
    highest: "43.1 LPA",
    median: "3.8 LPA",
    highestNote: "SPIRE LLC, Dubai, UAE",
    careers: ["Design Engineer", "Manufacturing Engineer", "Automotive Engineer", "Thermal Engineer"],
    intro:
      "Core mechanical principles alongside advanced technology and hands-on work, across design, manufacturing, automation and sustainable engineering.",
    image: "/img/campus-3.webp",
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    abbr: "Civil",
    level: "UG",
    intake: 60,
    duration: 4,
    highest: "13.2 LPA",
    median: "4 LPA",
    careers: [
      "Structural Engineer",
      "Construction Manager",
      "Transportation Engineer",
      "Geotechnical Engineer",
      "Environmental Engineer",
      "Urban Planner",
    ],
    intro:
      "Planning, designing and constructing the infrastructure people live in — with the technical depth and sustainable practice needed to build things that last.",
    image: "/img/facility-2.webp",
  },
  {
    slug: "business-administration",
    name: "Business Administration (MBA)",
    abbr: "MBA",
    level: "PG",
    intake: 180,
    duration: 2,
    highest: "9 LPA",
    median: "5.6 LPA",
    careers: [
      "Marketing Manager",
      "Financial Analyst",
      "HR Manager",
      "Operations Manager",
      "Business Analyst",
      "Consultant",
    ],
    intro:
      "A two-year postgraduate programme across finance, marketing, human resources and operations, taught with the case work and industry contact that management practice demands.",
    image: "/img/campus-1.webp",
  },
  {
    slug: "computer-applications",
    name: "Computer Applications (MCA)",
    abbr: "MCA",
    level: "PG",
    intake: 120,
    duration: 2,
    highest: null,
    median: null,
    careers: ["Software Developer", "Systems Analyst", "Application Developer", "Database Administrator"],
    intro:
      "A postgraduate programme in computer applications covering software development, systems design and modern application architecture, for graduates moving into professional software work.",
    image: "/img/campus-hero.webp",
  },
];

export type Placement = { name: string; branch: string; company: string; lpa: number };

export const placements: Placement[] = [
  { name: "Nagesh S", branch: "CSE", company: "Juspay", lpa: 27 },
  { name: "Amrutha R", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Keerthana G M", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Surabhi K", branch: "ISE", company: "HPE", lpa: 17.5 },
  { name: "Sathwik Padmanabha", branch: "AI & ML", company: "HPE", lpa: 17.5 },
  { name: "Rachan K A", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Vedanta M S", branch: "AI & ML", company: "HPE", lpa: 17.5 },
  { name: "Rakshitha B J", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Shreya H V", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Srushti G", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Tharun Salgar S", branch: "CSE", company: "HPE", lpa: 17.5 },
  { name: "Varshini N", branch: "ISE", company: "HPE", lpa: 17.5 },
  { name: "Adhrith Rangaprabhu", branch: "AI & ML", company: "Skyhigh Security", lpa: 14 },
  { name: "Akshay S P", branch: "ISE", company: "Skyhigh Security", lpa: 14 },
  { name: "Yashwanth S", branch: "CSE", company: "Skyhigh Security", lpa: 14 },
  { name: "Amit D Jain", branch: "ISE", company: "Epicor Software", lpa: 14 },
  { name: "H Shashank", branch: "CSE", company: "Epicor Software", lpa: 14 },
  { name: "Harshitha S M", branch: "CSE", company: "Epicor Software", lpa: 14 },
  { name: "Hitha D", branch: "CSE", company: "Epicor Software", lpa: 14 },
  { name: "Madhur V", branch: "CSE", company: "Epicor Software", lpa: 14 },
  { name: "Tejus S", branch: "CSE", company: "Skyhigh Security", lpa: 13 },
  { name: "Vijayalakshmi Y", branch: "ISE", company: "Applied Materials", lpa: 11.9 },
  { name: "Amith Urs R", branch: "CSE", company: "Thoughtworks", lpa: 11.1 },
  { name: "M S Dhanush Kumar Aradhya", branch: "CSE", company: "Thoughtworks", lpa: 11.1 },
  { name: "Aisiri B P", branch: "ISE", company: "SAP", lpa: 11 },
  { name: "Nishkala V R", branch: "CSE", company: "AZENTIO", lpa: 10 },
  { name: "Rayeli Shreyas", branch: "AI & ML", company: "AZENTIO", lpa: 10 },
  { name: "Thanushree M B", branch: "AI & ML", company: "AZENTIO", lpa: 10 },
  { name: "Akshay Mohan Y", branch: "Mech", company: "Bacardi India", lpa: 8 },
];

export const recruiters = [
  { name: "Infosys", img: "/img/rec-infosys.webp" },
  { name: "IBM", img: "/img/rec-ibm.webp" },
  { name: "Mphasis", img: "/img/rec-mphasis.webp" },
  { name: "NTT Data", img: "/img/rec-ntt-data.webp" },
  { name: "Brillio", img: "/img/rec-brillio.webp" },
  { name: "KEC", img: "/img/rec-kec.webp" },
];

export const clubs = [
  { name: "FutureX", blurb: "Emerging technology and product building." },
  { name: "Nirmaan", blurb: "Build with nature — sustainable design and construction." },
  { name: "IEEE Student Branch", blurb: "The college's IEEE chapter and its technical programme." },
  { name: "IEEE-ITS Chapter", blurb: "Intelligent transportation systems special interest group." },
  { name: "IEEE PES SBC", blurb: "Power and energy society student branch chapter." },
  { name: "Open Source Lab", blurb: "Open-source contribution, tooling and community work." },
  { name: "Anveshan", blurb: "Student research, enquiry and exploration." },
  { name: "ESPIN", blurb: "Electronics, signals and practical innovation." },
  { name: "Elevate U", blurb: "Personal development, communication and placement readiness." },
  { name: "ASPERA E-Cell", blurb: "Entrepreneurship cell — ventures, pitching and mentorship." },
];

export const admissionSteps = [
  {
    n: "01",
    title: "Check eligibility",
    body: "PUC / 10+2 with Physics and Mathematics as compulsory subjects, plus one of Chemistry, Biotechnology, Biology, Electronics or Computer Science. Minimum aggregate as prescribed by the Karnataka Examinations Authority.",
  },
  {
    n: "02",
    title: "Sit the entrance exam",
    body: "KCET for the state quota, COMED-K for the consortium quota, or PGCET for postgraduate programmes. Use the VVCE codes below when filling your option entry.",
  },
  {
    n: "03",
    title: "Enter options and attend counselling",
    body: "List VVCE against the relevant code during KEA or COMED-K counselling. Seats are allotted by rank and category across the published rounds.",
  },
  {
    n: "04",
    title: "Report and confirm your seat",
    body: "Complete document verification and fee payment at the campus within the window set by the allotting authority to confirm your admission.",
  },
];
