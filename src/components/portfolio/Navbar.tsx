import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import mkFavicon from "@/assets/mk_favicon.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-2.5 transition-all duration-300 ${
            scrolled
              ? "dark:bg-[#0e0408]/85 bg-white/85 backdrop-blur-2xl dark:border-white/[0.1] border-[#881144]/15 dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-[0_12px_32px_rgba(136,17,68,0.08)]"
              : "dark:bg-[#0e0408]/55 bg-white/55 backdrop-blur-xl dark:border-white/[0.06] border-[#881144]/10 shadow-[0_8px_32px_rgba(136,17,68,0.05)]"
          }`}
        >
          <a
            href="#home"
            className="group flex items-center font-display text-lg font-bold tracking-tight transition-transform hover:scale-105"
            aria-label="Muthukumaran Portfolio - Home"
          >
            <img
              src={mkFavicon}
              alt="MK Logo"
              className="h-8 w-8 rounded-xl object-contain shadow-sm ring-1 ring-[#881144]/20 dark:ring-white/10 transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-2 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  className="text-xs sm:text-sm font-display font-semibold text-foreground/80 dark:hover:text-white hover:text-[#800021] transition-all duration-300 block dark:border-white/[0.05] border-[#881144]/10 hover:border-[#C24366]/40 px-3.5 py-1.5 rounded-full dark:bg-white/[0.02] bg-black/[0.02] hover:bg-[#881144]/10 hover:shadow-[0_0_15px_rgba(194,67,102,0.25)]"
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {l.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Right Action Area */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="#contact"
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] px-5 py-2 text-xs sm:text-sm font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,67,102,0.6)] hover:scale-105"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl dark:bg-white/[0.04] bg-black/[0.04] dark:border-white/[0.1] border-[#881144]/15 hover:border-[#C24366]/50 text-foreground transition-all hover:scale-105 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-5 flex flex-col justify-center items-center">
                <span
                  className={`absolute block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                    open ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                    open ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl p-4 md:hidden dark:bg-[#0e0408]/95 bg-white/95 backdrop-blur-2xl dark:border-white/[0.1] border-[#881144]/15 dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-2xl"
            >
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-sm font-display font-semibold text-foreground/90 dark:hover:text-white hover:text-[#800021] transition-all duration-300 dark:border-white/[0.05] border-[#881144]/10 hover:border-[#C24366]/40 px-4 py-2.5 rounded-xl dark:bg-white/[0.02] bg-black/[0.02] hover:bg-[#881144]/10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] py-3 text-sm font-display font-bold text-white shadow-[0_0_20px_rgba(136,17,68,0.4)] transition-transform hover:scale-102 cursor-pointer"
                  >
                    Hire Me
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}