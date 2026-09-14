import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "917402200654";
  const waLink = `https://wa.me/${phoneNumber}?text=Hi%20Muthukumaran,%20I'd%20love%20to%20chat%20about%20a%20project!`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 flex w-68 flex-col gap-3 rounded-2xl border border-[#881144]/15 dark:border-white/[0.1] bg-white/95 dark:bg-[#14060c]/95 p-4 text-left shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 font-display text-base font-bold text-white shadow-md">
                  M
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#14060c] bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-[#22060f] dark:text-white">Muthukumaran</div>
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Online
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#881144]/10 dark:border-white/[0.06] bg-[#881144]/5 dark:bg-white/[0.03] p-3 text-xs font-normal text-muted-foreground leading-relaxed">
              Hey there! 👋 Need a beautiful modern website or UI design? Drop me a message!
            </div>

            <div className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-2.5 text-xs font-display font-bold text-white shadow-[0_4px_15px_rgba(16,185,129,0.35)] transition-transform hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Start Chat</span>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Pulsing Trigger Bubble */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.45)] outline-none transition-all hover:scale-110 active:scale-95"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Soft Ripple Ring */}
        <div
          className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-25"
          style={{ animationDuration: "2.5s" }}
        />

        {/* WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current relative z-10 drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0a11.948 11.948 0 018.495 3.519 11.938 11.938 0 013.51 8.493c-.005 6.63-5.379 12.001-12.005 12.001-2.001 0-3.97-.497-5.713-1.446L0 24zm6.59-4.846c1.6.95 2.733 1.483 4.854 1.485 5.617 0 10.185-4.571 10.188-10.19a9.124 9.124 0 00-2.69-6.491 9.117 9.117 0 00-6.49-2.69c-5.623 0-10.193 4.573-10.197 10.193-.001 2.016.511 3.23 1.483 4.861L1.95 22.102l4.697-1.229zM15.427 13.585c-.328-.164-1.94-.959-2.24-1.07-.3-.109-.52-.164-.738.164-.219.329-.85 1.07-1.041 1.289-.193.22-.385.246-.713.082a9.012 9.012 0 01-2.645-1.633c-.767-.684-1.285-1.53-1.436-1.79-.15-.262-.016-.403.116-.533.118-.118.262-.301.393-.453.13-.15.174-.246.262-.411.087-.164.043-.301-.021-.411-.065-.11-.52-1.26-.713-1.72-.187-.45-.378-.39-.52-.397-.132-.007-.284-.007-.436-.007s-.397.055-.604.274c-.208.22-.793.774-.793 1.89s.81 2.19.923 2.344c.114.155 1.595 2.435 3.864 3.414.54.233.96.372 1.288.476.543.172 1.037.148 1.427.09.435-.065 1.94-.794 2.213-1.562.274-.768.274-1.426.192-1.563-.08-.137-.3-.219-.628-.383z" />
        </svg>
      </motion.a>
    </div>
  );
}
