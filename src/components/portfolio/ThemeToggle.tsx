import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const initial: "light" | "dark" = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#881144]/20 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] text-[#800021] dark:text-foreground transition-all duration-300 hover:scale-110 hover:border-[#C24366]/40 hover:bg-[#881144]/10 dark:hover:bg-[#881144]/15 hover:text-[#881144] dark:hover:text-white shadow-sm dark:shadow-none hover:shadow-[0_0_15px_rgba(194,67,102,0.3)] backdrop-blur-md cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[#ec8298]" />
      ) : (
        <Moon className="h-4 w-4 text-[#800021]" />
      )}
    </button>
  );
}