import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Cpu,
  Megaphone,
  BarChart3,
  Award,
  X,
  Download,
  Github,
  CheckCircle2,
  Sparkles,
  Bot,
  Eye,
} from "lucide-react";
import { SectionHeader } from "./Section";
import { downloadFile } from "@/lib/utils";

import certClaude101 from "@/assets/cert_claude_101.png";
import certAiFluency from "@/assets/cert_ai_fluency.png";
import certOracle from "@/assets/cert_oracle.jpg";
import certNptel from "@/assets/cert_nptel.jpg";
import certAccenture from "@/assets/cert_accenture.jpg";
import certHp from "@/assets/cert_hp.jpg";

interface CertificateItem {
  id: string;
  title: string;
  org: string;
  desc: string;
  category: "ai" | "cloud" | "analytics";
  secondaryCategory?: "ai" | "cloud" | "analytics";
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  accentGlow: string;
  iconColor: string;
  badgeText: string;
  tagColor: string;
  featured?: boolean;
}

const items: CertificateItem[] = [
  {
    id: "claude-101",
    title: "Claude 101",
    org: "Anthropic",
    desc: "Certified mastery of Anthropic's Claude foundation model ecosystem, prompt engineering architectures, system prompt design, and context window optimization.",
    category: "ai",
    skills: ["Claude 3.5", "Prompt Engineering", "LLM Workflows", "Context Optimization"],
    icon: Bot,
    image: certClaude101,
    accentGlow: "rgba(217, 119, 6, 0.22)",
    iconColor: "text-amber-500 dark:text-amber-400",
    badgeText: "Anthropic Certified",
    tagColor: "border-amber-500/30 text-amber-600 dark:text-amber-300 bg-amber-500/10",
    featured: true,
  },
  {
    id: "ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    org: "Anthropic · UCC & HEA",
    desc: "Comprehensive generative AI credential validating multi-modal prompt design, human-AI collaboration principles, enterprise AI frameworks, and ethical deployment.",
    category: "ai",
    skills: ["Generative AI", "AI Frameworks", "Multi-modal Reasoning", "AI Ethics"],
    icon: Sparkles,
    image: certAiFluency,
    accentGlow: "rgba(132, 204, 22, 0.22)",
    iconColor: "text-emerald-500 dark:text-lime-400",
    badgeText: "Frameworks & Foundations",
    tagColor: "border-lime-500/30 text-emerald-600 dark:text-lime-300 bg-lime-500/10",
    featured: true,
  },
  {
    id: "oracle-ai",
    title: "Oracle Certified Foundations Associate",
    org: "Oracle Cloud Infrastructure",
    desc: "Official 2025 Certified AI Foundations Associate credential, validating proficiency in machine learning models, cloud computing infrastructure, and Oracle AI services.",
    category: "cloud",
    secondaryCategory: "ai",
    skills: ["Oracle Cloud", "Machine Learning", "AI Infrastructure", "OCI Architecture"],
    icon: Cpu,
    image: certOracle,
    accentGlow: "rgba(245, 158, 11, 0.2)",
    iconColor: "text-amber-500 dark:text-amber-400",
    badgeText: "Official OCI Credential",
    tagColor: "border-amber-500/30 text-amber-600 dark:text-amber-300 bg-amber-500/10",
  },
  {
    id: "nptel-dbms",
    title: "Database Management System",
    org: "NPTEL · IIT Kharagpur (Swayam)",
    desc: "Successfully completed the rigorous 8-week proctored exam and coursework covering relational schema design, SQL optimization, and ACID transaction architectures.",
    category: "cloud",
    skills: ["Relational Model", "Advanced SQL", "Indexing & ACID", "Schema Architecture"],
    icon: Database,
    image: certNptel,
    accentGlow: "rgba(59, 130, 246, 0.2)",
    iconColor: "text-blue-500 dark:text-blue-400",
    badgeText: "IIT Kharagpur Proctored",
    tagColor: "border-blue-500/30 text-blue-600 dark:text-blue-300 bg-blue-500/10",
  },
  {
    id: "accenture-analytics",
    title: "Digital Skills: Web Analytics",
    org: "Accenture",
    desc: "Mastered fundamental analytics methodologies, measuring digital channel reach, descriptive/prescriptive insights, and building business measurement frameworks.",
    category: "analytics",
    skills: ["Web Analytics", "Channel Tracking", "KPI Frameworks", "Data-Driven Strategy"],
    icon: BarChart3,
    image: certAccenture,
    accentGlow: "rgba(194, 67, 102, 0.25)",
    iconColor: "text-[#881144] dark:text-[#ec8298]",
    badgeText: "Accenture Verified",
    tagColor: "border-[#C24366]/30 text-[#881144] dark:text-[#ec8298] bg-[#C24366]/10",
  },
  {
    id: "hp-marketing",
    title: "Social Media Marketing",
    org: "HP LIFE Foundation",
    desc: "Completed the HP LIFE professional program specializing in digital campaign strategy, audience segmentation, and content engagement analytics for organic growth.",
    category: "analytics",
    skills: ["Digital Marketing", "Content Strategy", "Audience Targeting", "Campaign ROI"],
    icon: Megaphone,
    image: certHp,
    accentGlow: "rgba(6, 182, 212, 0.2)",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    badgeText: "HP LIFE Program",
    tagColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-300 bg-cyan-500/10",
  },
];

const categoryTabs = [
  { id: "all", label: "All Credentials" },
  { id: "ai", label: "AI & LLMs" },
  { id: "cloud", label: "Cloud & Databases" },
  { id: "analytics", label: "Analytics & Strategy" },
];

export function Certificates() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = items.filter((it) => {
    if (activeTab === "all") return true;
    if (activeTab === "ai") return it.category === "ai" || it.secondaryCategory === "ai";
    if (activeTab === "cloud") return it.category === "cloud" || it.secondaryCategory === "cloud";
    if (activeTab === "analytics") return it.category === "analytics";
    return true;
  });

  return (
    <section id="certificates" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Continuous Learning & Credentials"
          title={
            <>
              Courses and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                Certification
              </span>
            </>
          }
          description="Formally verified proficiencies across frontier generative AI, cloud infrastructure, database systems, and data analytics."
        />

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categoryTabs.map((tab) => {
            const count =
              tab.id === "all"
                ? items.length
                : items.filter(
                    (it) =>
                      it.category === tab.id ||
                      it.secondaryCategory === tab.id
                  ).length;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-display font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] text-white shadow-[0_0_20px_rgba(136,17,68,0.35)] scale-105"
                    : "border border-[#881144]/15 dark:border-white/[0.08] bg-white/70 dark:bg-[#14060c]/60 text-foreground/80 hover:border-[#C24366]/40 hover:bg-[#881144]/10 dark:hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#881144]/10 dark:bg-white/[0.06] text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Credentials Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredItems.map((it, i) => (
              <motion.div
                layout
                key={it.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/75 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#C24366]/40 hover:shadow-[0_12px_40px_rgba(136,17,68,0.2)] dark:hover:shadow-[0_12px_40px_rgba(136,17,68,0.3)]"
              >
                {/* Dynamic Accent Corner Glow */}
                <div
                  className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                  style={{ background: it.accentGlow }}
                />

                {/* Certificate Preview Thumbnail Banner */}
                <div
                  onClick={() => setSelectedCert(it)}
                  className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#881144]/10 dark:border-white/[0.06] bg-[#0e0408]/90 cursor-pointer"
                >
                  <img
                    src={it.image}
                    alt={`${it.title} Certificate`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-3.5 py-1.5 text-xs font-display font-bold text-white shadow-lg backdrop-blur-md">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Quick Preview</span>
                    </span>
                  </div>

                  {/* Top-Right Verified Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md shadow-md">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Issuer Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-md shadow-sm ${it.tagColor}`}
                    >
                      {it.badgeText}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Header Icon + Organization */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border border-[#881144]/15 dark:border-white/[0.08] bg-[#881144]/5 dark:bg-white/[0.03] shadow-sm backdrop-blur-md ${it.iconColor}`}
                        >
                          <it.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                          {it.org}
                        </span>
                      </div>
                    </div>

                    {/* Course / Cert Title */}
                    <h3 className="mt-3 font-display text-lg font-bold text-[#22060f] dark:text-white group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors leading-snug">
                      {it.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                      {it.desc}
                    </p>

                    {/* Skills pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {it.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-[#881144]/10 dark:border-white/[0.06] bg-[#881144]/[0.03] dark:bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-foreground/80 dark:text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: View & Download */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#881144]/10 dark:border-white/[0.06] pt-4">
                    <button
                      onClick={() => setSelectedCert(it)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#881144]/20 dark:border-white/[0.1] bg-[#881144]/5 dark:bg-white/[0.03] px-3.5 py-1.5 text-xs font-display font-semibold text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:scale-105 cursor-pointer backdrop-blur-md"
                    >
                      <Award className="h-3.5 w-3.5 text-[#881144] dark:text-[#ec8298]" />
                      <span>View Credential</span>
                    </button>

                    <button
                      onClick={() =>
                        downloadFile(
                          it.image,
                          `Muthukumaran_${it.title.replace(/[^a-zA-Z0-9]/g, "_")}_Certificate.png`
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#881144]/15 dark:border-white/[0.08] text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-[#C24366]/50 hover:bg-[#881144]/10 hover:scale-110 cursor-pointer"
                      title="Download Certificate"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View my works CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-center text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#881144]/25 dark:border-[#C24366]/40 bg-white/90 dark:bg-[#14060c]/80 p-8 sm:p-10 max-w-xl w-full backdrop-blur-2xl shadow-xl dark:shadow-[0_0_50px_rgba(136,17,68,0.2)]">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#C24366]/15 dark:bg-[#C24366]/20 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#800021]/20 dark:bg-[#800021]/30 blur-3xl" />

            <h4 className="font-display text-lg sm:text-xl font-bold text-[#22060f] dark:text-white uppercase tracking-wider">
              Explore Live Solutions
            </h4>
            <p className="mt-2.5 text-sm font-normal text-muted-foreground leading-relaxed">
              Discover my open-source repositories, AI tool integrations, and full-stack enterprise codebases on GitHub.
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="https://github.com/muthu22222?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-6 py-3 text-sm font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(194,67,102,0.65)] pointer-events-auto"
              >
                <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Lightbox Modal for Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-3xl overflow-hidden rounded-3xl border border-[#C24366]/40 bg-[#0e0408] p-4 sm:p-6 shadow-[0_0_60px_rgba(136,17,68,0.45)] cursor-default flex flex-col"
            >
              {/* Modal Header */}
              <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f9dbdb] via-[#ec8298] to-[#C24366]">
                      {selectedCert.org}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      downloadFile(
                        selectedCert.image,
                        `Muthukumaran_${selectedCert.title.replace(/[^a-zA-Z0-9]/g, "_")}_Certificate.png`
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-[#14060c]/80 px-3.5 py-1.5 text-xs font-display font-semibold text-white hover:border-[#C24366]/50 hover:bg-[#881144]/30 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                    title="Download Certificate"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#14060c]/80 text-foreground hover:text-[#ec8298] hover:border-[#C24366]/50 hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08] flex items-center justify-center p-1 sm:p-2 max-h-[68vh]">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} Certificate`}
                  className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-2">
                <span>Awarded to: <strong className="text-white font-medium">Muthu Kumaran</strong></span>
                <span className="text-[11px]">Click outside or press Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}