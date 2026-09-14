import { Github, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { Icon: Github, href: "https://github.com/muthu22222/Muthuport" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/muthu-mk/" },
  { Icon: Instagram, href: "https://www.instagram.com/frozynnnn/" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[#881144]/15 dark:border-white/[0.08] bg-white/70 dark:bg-[#0a0205]/85 py-12 backdrop-blur-md">
      {/* Subtle Ambient Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-20 w-80 rounded-full bg-[#881144]/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#800021] via-[#881144] to-[#C24366] dark:from-[#f9dbdb] dark:via-[#ec8298] dark:to-[#C24366]">
            Muthukumaran
          </span>{" "}
          · Built with React & Tailwind CSS
        </div>

        <div className="flex gap-3">
          {socialLinks.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#881144]/15 dark:border-white/[0.08] bg-[#881144]/5 dark:bg-white/[0.03] text-[#800021] dark:text-foreground transition-all duration-300 hover:border-[#C24366]/50 hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white hover:shadow-[0_0_15px_rgba(194,67,102,0.35)] hover:scale-105"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}