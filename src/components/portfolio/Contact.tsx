import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Send,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./Section";
import emailjs from "@emailjs/browser";

// EmailJS Credentials configured from user settings
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_zex0m8x";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_7iz8jvr";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "uPFpz5aPO1wo1u7tP";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          subject: formData.subject || "New inquiry from portfolio",
          title: formData.subject || "New inquiry from portfolio",
          message: formData.message,
          to_name: "Muthukumaran",
        },
        EMAILJS_PUBLIC_KEY,
      );

      setSent(true);
      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully. I will get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setSent(false);
        setStatusMessage(null);
      }, 6000);
    } catch (error: unknown) {
      console.error("EmailJS Submission Error:", error);
      const err = error as { text?: string; message?: string } | undefined;
      const errDetail =
        err?.text || err?.message || "Failed to send message. Please try again or email directly.";
      setStatusMessage({
        type: "error",
        text: `Message failed to send: ${errDetail}`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Let's build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
                something premium
              </span>
            </>
          }
          description="Have a project, internship, or freelance gig in mind? My inbox is open."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          {/* Left Column: Direct Info & Socials */}
          <div className="space-y-4">
            {/* Email Card */}
            <a
              href="mailto:sureshmuthu1212@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-5 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#C24366]/40 hover:bg-white dark:hover:bg-[#14060c]/90 hover:shadow-[0_8px_30px_rgba(136,17,68,0.15)] dark:hover:shadow-[0_8px_30px_rgba(136,17,68,0.2)] hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#800021] to-[#881144] text-white shadow-[0_0_15px_rgba(136,17,68,0.4)] dark:shadow-[0_0_15px_rgba(136,17,68,0.5)] transition-transform duration-300 group-hover:scale-105">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366] uppercase tracking-wider">
                  Email
                </div>
                <div className="text-sm font-semibold text-[#22060f] dark:text-white mt-0.5 group-hover:text-[#881144] dark:group-hover:text-[#f9dbdb] transition-colors">
                  sureshmuthu1212@gmail.com
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/917402200654"
              className="group flex items-center gap-4 rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-5 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-[#14060c]/90 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  WhatsApp
                </div>
                <div className="text-sm font-semibold text-[#22060f] dark:text-white mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-200 transition-colors">
                  7402200654
                </div>
              </div>
            </a>

            {/* Social Follow Card */}
            <div className="rounded-2xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/85 dark:bg-[#14060c]/70 p-5 backdrop-blur-xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <div className="mb-3.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Follow
              </div>
              <div className="flex gap-3">
                {[
                  { Icon: Github, href: "https://github.com/muthu22222/Muthuport" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/muthu-mk/" },
                  { Icon: Instagram, href: "https://www.instagram.com/frozynnnn/" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#881144]/20 dark:border-white/[0.1] bg-[#881144]/5 dark:bg-white/[0.04] text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:shadow-[0_0_15px_rgba(194,67,102,0.3)] hover:scale-105"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#881144]/15 dark:border-white/[0.08] bg-white/90 dark:bg-[#14060c]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#881144]/20 dark:border-white/[0.08] bg-white dark:bg-black/40 px-4 py-3 text-sm text-[#22060f] dark:text-white placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-[#881144] dark:focus:border-[#C24366] focus:ring-2 focus:ring-[#881144]/15 dark:focus:ring-[#C24366]/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-[#881144]/20 dark:border-white/[0.08] bg-white dark:bg-black/40 px-4 py-3 text-sm text-[#22060f] dark:text-white placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-[#881144] dark:focus:border-[#C24366] focus:ring-2 focus:ring-[#881144]/15 dark:focus:ring-[#C24366]/20"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Subject
              </label>
              <input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-[#881144]/20 dark:border-white/[0.08] bg-white dark:bg-black/40 px-4 py-3 text-sm text-[#22060f] dark:text-white placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-[#881144] dark:focus:border-[#C24366] focus:ring-2 focus:ring-[#881144]/15 dark:focus:ring-[#C24366]/20"
                placeholder="Project, internship, or collab"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-[#881144]/20 dark:border-white/[0.08] bg-white dark:bg-black/40 px-4 py-3 text-sm text-[#22060f] dark:text-white placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-[#881144] dark:focus:border-[#C24366] focus:ring-2 focus:ring-[#881144]/15 dark:focus:ring-[#C24366]/20"
                placeholder="Tell me about your idea..."
              />
            </div>

            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 rounded-xl p-3.5 text-xs font-medium ${
                  statusMessage.type === "success"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-6 py-3.5 text-sm font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,67,102,0.65)] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {sending ? (
                "Sending message..."
              ) : sent ? (
                "Message sent ✓"
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
