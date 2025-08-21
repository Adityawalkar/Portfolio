import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Download,
  Briefcase,
  Code,
  Layers,
  ExternalLink,
  Sun,
  Moon,
  User2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Gauge,
  Award,
  BookOpen,
  Medal,
} from "lucide-react";

/**
 * Aditya Walkar — Data Scientist Portfolio (single-file React)
 * ----------------------------------------------------------------
 * This is the FULL portfolio with your previous layout + photo +
 * recruiter highlights + projects + skills + contact, and now also
 * the new Certifications + Organizations & Awards sections.
 *
 * ✅ Keeps robust public-path photo loader (no import errors)
 * ✅ Keeps emerald checklist skills & impact-driven projects
 * ✅ Adds Certifications & Organizations/Awards into nav + page
 *
 * Dependencies: tailwindcss, framer-motion, lucide-react
 */

// ---------- utils & theme ----------
const cx = (...c) => c.filter(Boolean).join(" ");

function useTheme() {
  const [theme, setTheme] = useState(() =>
    (typeof window !== "undefined" && localStorage.getItem("theme")) || "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

const ACCENT = {
  light: {
    btn: "bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500",
    textGrad: "bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700",
    ring: "ring-1 ring-cyan-200/60",
    blob1: "bg-teal-300/40",
    blob2: "bg-blue-300/40",
  },
  dark: {
    btn: "bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400",
    textGrad: "bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200",
    ring: "ring-1 ring-cyan-500/40",
    blob1: "bg-teal-500/20",
    blob2: "bg-blue-500/20",
  },
};

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4">{children}</div>
);

const SectionTitle = ({ id, icon, title, subtitle }) => (
  <div id={id} className="mb-8">
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <Sparkles className="h-5 w-5 text-cyan-400" />
    </div>
    {subtitle && (
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{subtitle}</p>
    )}
  </div>
);

function StatCard({ icon, label, value, sub }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm"
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
          <p className="text-xl font-semibold tracking-tight">{value}</p>
        </div>
      </div>
      {sub && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{sub}</p>}
    </motion.div>
  );
}

// ---------- resilient photo loader ----------
const PROFILE_PIC_CANDIDATES = [
  "/profile.png",
  "/profile.jpg",
  "/linked-in%20photo.png",
  "/linked-in photo.png",
  "/linked-in-photo.png",
  "/linked_in_photo.png",
];
const PLACEHOLDER_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#06b6d4'/>
        <stop offset='100%' stop-color='#3b82f6'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <circle cx='256' cy='200' r='80' fill='white' fill-opacity='0.85'/>
    <rect x='128' y='308' width='256' height='120' rx='60' fill='white' fill-opacity='0.85'/>
  </svg>`);
function ProfileImage({ alt, className }) {
  const [idx, setIdx] = useState(0);
  const src = PROFILE_PIC_CANDIDATES[idx] || PLACEHOLDER_DATA_URL;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIdx((i) => Math.min(i + 1, PROFILE_PIC_CANDIDATES.length))}
    />
  );
}

// ---------- content ----------
const DATA = {
  name: "Aditya Walkar",
  role: "Data Scientist",
  location: "Mountain View, CA",
  email: "walkar.adityaa@gmail.com",
  phone: "+1 (216) 550-5251",
  years: "3+ years",
  addressLine: "Mountain View, CA, USA",
  links: {
    linkedin: "https://www.linkedin.com/in/aditya-walkar-164118299/",
    github: "https://github.com/your-username", // TODO: replace
    resume: "/Aditya-Walkar-Resume.pdf",
  },
  about:
    "Data professional with 3+ years across software engineering, analytics, and ML. I build predictive models, automate pipelines, and deliver measurable product impact (engagement, retention, and operational efficiency). Passionate about production-grade ML, cloud, and decision intelligence.",
  profile: [
    ["Profile", "Data Science & Analytics"],
    ["Education", "M.S. Information Systems (Data Analytics) — CSU"],
    ["Languages", "English, Hindi"],
    ["BI Tools", "Power BI, Tableau"],
    ["Other Skills", "AWS, BigQuery, MySQL, Git, Agile"],
    ["Interests", "Aviation, Fitness, Tech Content"],
  ],
  skills: [
    {
      group: "Programming & ML",
      items: [
        "Python (Pandas, NumPy, scikit-learn)",
        "XGBoost",
        "Random Forest",
        "Logistic Regression",
        "Feature Engineering",
        "Predictive Modeling",
        "AWS SageMaker",
      ],
    },
    {
      group: "Data Processing",
      items: ["SQL", "MySQL", "BigQuery", "ETL Pipelines", "Data Wrangling"],
    },
    {
      group: "Visualization & BI",
      items: ["Tableau", "Power BI", "Matplotlib", "seaborn", "Excel Dashboards"],
    },
    {
      group: "Cloud & Big Data",
      items: ["AWS (Cloud Practitioner)", "Google Cloud Fundamentals"],
    },
    {
      group: "Collaboration Tools",
      items: ["Git", "GitHub", "Business Storytelling", "Stakeholder Communication"],
    },
  ],
  projects: [
    {
      title: "Employee Attrition Prediction (Salifort Motors)",
      tech: "Random Forest, Logistic Regression, SHAP",
      impact: "Reduced voluntary churn risk via early detection; enabled retention actions.",
      blurb:
        "Built Random Forest & Logistic Regression models to score churn risk; surfaced drivers and actions for retention.",
      links: { code: "#", demo: "#" },
    },
    {
      title: "User Churn Forecasting (Waze)",
      tech: "XGBoost, Feature Engineering, Imbalance handling",
      impact: "Doubled recall vs. baseline logistic regression for at‑risk users.",
      blurb: "Engineered temporal/engagement features; recall improved 2× vs baseline.",
      links: { code: "#", demo: "#" },
    },
    {
      title: "TikTok Moderation Classifier",
      tech: "sklearn, ROC/PR tuning",
      impact: "Achieved 99.5% recall on harmful content; high-signal moderation feed.",
      blurb:
        "High-recall harmful-content detector on 3.8k+ videos; optimized for imbalance; recall 99.5%.",
      links: { code: "#", demo: "#" },
    },
    {
      title: "NYC Taxi Fare & Tipping Prediction",
      tech: "Regression, Classification, Feature Selection",
      impact: "R² 0.87 on fare; F1 0.72 on tipping; informed pricing and incentives.",
      blurb: "Regression (R²=0.87, RMSE=3.8) + tipping classifier (F1=0.72)",
      links: { code: "#", demo: "#" },
    },
  ],
  experience: [
    {
      company: "Centers at CSU",
      title: "Operations Supervisor",
      period: "May 2024 – May 2025 | Cleveland, OH",
      bullets: [
        "Automated scheduling & reporting, cutting manual work by 40%.",
        "Led staff training & compliance; improved operational reliability.",
      ],
    },
    {
      company: "Muscle Shastra",
      title: "Co‑Founder",
      period: "Sep 2022 – Jul 2023 | Mumbai, India",
      bullets: [
        "Built analytics dashboards; scaled reach to 25k+ followers <12 months.",
        "Shipped 50+ mobile‑first UX iterations to lift retention.",
      ],
    },
    {
      company: "Protto",
      title: "Software Engineer",
      period: "Oct 2019 – May 2022 | Mumbai, India",
      bullets: [
        "Partnered with DS to ship recsys boosting engagement by 4 min/session.",
        "Analytics‑driven UI increased retention 15%; scaled to 50k+ MAU.",
      ],
    },
  ],
  education: [
    { school: "Cleveland State University", degree: "M.S. in Information Systems (Data Analytics)", year: "2025", place: "Cleveland, OH" },
    { school: "Vidyalankar Institute of Technology", degree: "B.E. in Information Technology", year: "2019", place: "Mumbai, India" },
  ],
  // NEW content from resume
  certifications: [
    { name: "Google Advanced Data Analytics Professional Certificate", issuer: "Google/Coursera", year: "2025", url: null },
    { name: "AWS Machine Learning Foundations", issuer: "AWS", year: "2025", url: null },
    { name: "AWS Cloud Practitioner Essentials", issuer: "AWS", year: "2025", url: null },
    { name: "Cisco: Data Analytics Essentials", issuer: "Cisco", year: "—", url: null },
    { name: "Microsoft: Design & Manage Analytics Solutions Using Power BI", issuer: "Microsoft", year: "—", url: null },
  ],
  organizations: [
    {
      org: "Graduate Council",
      role: "Board Member",
      details: "08/2024 – 05/2025 | Cleveland, Ohio",
    },
    {
      org: "Graduate Professional Student Association (GPSA)",
      role: "President",
      details: "06/2024 – 05/2025 | Cleveland, Ohio",
    },
  ],
  awards: [
    "Heritage Award of Academic Excellence, CSU (2025)",
    "CSU Rec Excellence Scholarship (2025)",
    "Student Leader Scholarship, CSU (2025)",
  ],
};

// ---------- component ----------
export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const accent = theme === "dark" ? ACCENT.dark : ACCENT.light;

  const nav = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#resume", label: "Resume" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#certifications", label: "Certifications" },
      { href: "#orgs", label: "Organizations & Awards" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white via-white to-cyan-50/40 dark:from-neutral-950 dark:via-neutral-950 dark:to-cyan-950/20 text-neutral-900 dark:text-neutral-100">
      {/* backdrop blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={cx("absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl opacity-30", accent.blob1)} />
        <div className={cx("absolute top-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-25", accent.blob2)} />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight">
              <span className={cx("bg-clip-text text-transparent", accent.textGrad)}>{DATA.name}</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="hover:underline underline-offset-4">
                  {n.label}
                </a>
              ))}
              <a
                href={DATA.links.resume}
                className={cx("rounded-full px-3 py-1.5 text-white shadow hover:opacity-90", accent.btn)}
              >
                <Download className="inline h-4 w-4 mr-1" /> CV
              </a>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </nav>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section id="home" className="py-16 md:py-24 relative">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm tracking-wide uppercase text-neutral-500 dark:text-neutral-400">Hello!</p>
              <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">
                I’m <span className={cx("bg-clip-text text-transparent", accent.textGrad)}>{DATA.name}</span>
              </h1>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-300">{DATA.role}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1", accent.ring)}>
                  <MapPin className="h-4 w-4" /> {DATA.location}
                </span>
                <span className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1", accent.ring)}>
                  <User2 className="h-4 w-4" /> {DATA.years} experience
                </span>
              </div>
              <p className="mt-6 text-neutral-700 dark:text-neutral-200 max-w-2xl">{DATA.about}</p>
              <div className="mt-6 flex items-center gap-3">
                <a href={DATA.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                <a href={DATA.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"><Github className="h-4 w-4" /> GitHub</a>
                <a href={DATA.links.resume} className={cx("inline-flex items-center gap-2 rounded-full px-4 py-2 text-white hover:opacity-90", accent.btn)}><Download className="h-4 w-4" /> Download CV</a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <ProfileImage
                alt="Aditya Walkar"
                className="w-64 h-64 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="about" icon={<User2 className="h-6 w-6" />} title="About Me" />
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-neutral-700 dark:text-neutral-300">{DATA.about}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {DATA.profile.map(([k, v]) => (
                <motion.li key={k} whileHover={{ y: -2 }} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 bg-white/60 dark:bg-neutral-900/60">
                  <span className="font-medium">{k}: </span>{v}
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* RESUME */}
      <section id="resume" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="resume" icon={<Briefcase className="h-6 w-6" />} title="Resume" subtitle="Experience & Education" />
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-4">Experience</h3>
              <ul className="relative pl-6">
                <span className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/70 via-cyan-400/50 to-blue-400/70" />
                {DATA.experience.map((e, idx) => (
                  <li key={idx} className="mb-8">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500" />
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{e.period}</p>
                    </div>
                    <h4 className="mt-1 font-semibold">{e.title} — {e.company}</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                      {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Education</h3>
              <div className="grid gap-4">
                {DATA.education.map((ed) => (
                  <motion.div key={ed.school} whileHover={{ y: -3 }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
                    <h4 className="font-semibold">{ed.school}</h4>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{ed.degree}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{ed.place} — {ed.year}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* RECRUITER HIGHLIGHTS */}
      <section className="py-10 border-t border-neutral-200/70 dark:border-neutral-800/70 bg-white/40 dark:bg-neutral-900/30">
        <Container>
          <div className="grid sm:grid-cols-3 gap-4">
            <StatCard icon={<Gauge className="h-5 w-5 text-cyan-500" />} label="Experience" value="3+ Years" sub="Software, analytics, & ML" />
            <StatCard icon={<TrendingUp className="h-5 w-5 text-teal-500" />} label="ML Projects" value="4 Featured" sub="Churn, NLP safety, forecasting" />
            <StatCard icon={<Award className="h-5 w-5 text-blue-500" />} label="Cloud" value="AWS & GCP" sub="SageMaker • BigQuery" />
          </div>
        </Container>
      </section>

      {/* PROJECTS (Tech + Impact rows) */}
      <section id="projects" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="projects" icon={<Code className="h-6 w-6" />} title="Projects" subtitle="A selection of work in ML, Analytics, and BI" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects.map((p) => (
              <motion.article key={p.title} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm flex flex-col">
                <h3 className="font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 flex-1">{p.blurb}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-start gap-2"><Code className="h-4 w-4 text-cyan-500 mt-0.5" /><span className="text-neutral-700 dark:text-neutral-300"><strong>Tech:</strong> {p.tech}</span></div>
                  <div className="flex items-start gap-2"><TrendingUp className="h-4 w-4 text-teal-500 mt-0.5" /><span className="text-neutral-700 dark:text-neutral-300"><strong>Impact:</strong> {p.impact}</span></div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  {p.links?.demo && p.links.demo !== "#" && (
                    <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-80"><ExternalLink className="h-4 w-4" /> Demo</a>
                  )}
                  {p.links?.code && p.links.code !== "#" && (
                    <a href={p.links.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-80"><Code className="h-4 w-4" /> Code</a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS (checklist tiles) */}
      <section id="skills" className="relative py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="skills" icon={<Layers className="h-6 w-6" />} title="Skills" subtitle="Grouped from Resume — clear & scannable" />
          <div className="grid md:grid-cols-2 gap-6">
            {DATA.skills.map((grp) => (
              <motion.div
                key={grp.group}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm"
              >
                <h3 className="font-semibold mb-3">{grp.group}</h3>
                <ul className="space-y-2">
                  {grp.items.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="certifications" icon={<BookOpen className="h-6 w-6" />} title="Certifications" />
          <ul className="grid sm:grid-cols-2 gap-4 text-sm">
            {DATA.certifications.map((c) => (
              <motion.li
                key={c.name}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/70 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Award className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{c.issuer}{c.year && ` • ${c.year}`}</p>
                  </div>
                </div>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer" className="text-xs underline underline-offset-4 shrink-0">Verify</a>
                ) : (
                  <span className="text-xs text-neutral-400 shrink-0">add link</span>
                )}
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ORGANIZATIONS & AWARDS */}
      <section id="orgs" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="orgs" icon={<Medal className="h-6 w-6" />} title="Organizations & Awards" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Organizations</h3>
              <ul className="space-y-4 text-sm">
                {DATA.organizations.map((o, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/70 shadow-sm"
                  >
                    <h4 className="font-medium">{o.role}</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">{o.org}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{o.details}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Awards</h3>
              <ul className="space-y-3 text-sm">
                {DATA.awards.map((a, i) => (
                  <motion.li key={i} whileHover={{ x: 2 }} className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-cyan-500" /> {a}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-12 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <Container>
          <SectionTitle id="contact" icon={<Mail className="h-6 w-6" />} title="Contact Me" subtitle="Below are the details to reach out to me" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{DATA.addressLine}</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{DATA.phone}</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
              <h4 className="font-semibold mb-1">Email</h4>
              <a className="text-sm underline underline-offset-4" href={`mailto:${DATA.email}`}>{DATA.email}</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <a href={DATA.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={DATA.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"><Github className="h-4 w-4" /> GitHub</a>
            <a href={DATA.links.resume} className={cx("inline-flex items-center gap-2 rounded-full px-4 py-2 text-white hover:opacity-90", accent.btn)}><Download className="h-4 w-4" /> Download Resume</a>
          </div>
          <p className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-500">Inspired by Rahul Padwani’s layout; rebuilt in React + Tailwind with recruiter‑friendly UI.</p>
        </Container>
      </section>

      <footer className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/70 dark:border-neutral-800/70">
        © {new Date().getFullYear()} {DATA.name}. Built with React, Tailwind, framer-motion & lucide.
      </footer>
    </div>
  );
}

/*
  Minimal test notes (add to your test suite):
  - render(<Portfolio />)
  - expect(screen.getByText('Certifications')).toBeInTheDocument()
  - expect(screen.getByText('Organizations & Awards')).toBeInTheDocument()
  - expect(screen.getByText('Projects')).toBeInTheDocument()
  - expect(screen.getByText('Skills')).toBeInTheDocument()
*/
