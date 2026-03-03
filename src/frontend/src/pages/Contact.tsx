import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export function Contact() {
  return (
    <main className="min-h-screen">
      {/* ── Header ── */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block mb-4 text-sm font-medium tracking-widest uppercase text-primary bg-primary/10 rounded-full px-4 py-1.5"
          >
            Get in touch ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Say Hello
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed"
          >
            We'd love to hear from you! Reach out on Instagram or WhatsApp for
            custom orders, questions, or just to chat about crochet.
          </motion.p>
        </div>
      </section>

      {/* ── Contact buttons ── */}
      <section className="py-20 px-4 container mx-auto max-w-2xl">
        <div className="flex flex-col gap-5">
          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/knotandloopcrochet2?igsh=MjFoemJzeGNjN200"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.instagram_button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-5 rounded-2xl p-6 border shadow-warm hover:shadow-warm-lg transition-shadow duration-300 text-left group"
            style={{
              background:
                "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <SiInstagram className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-display text-xl font-bold text-white leading-tight">
                Instagram
              </p>
              <p className="text-white/80 text-sm mt-0.5">
                @knotandloopcrochet2
              </p>
              <p className="text-white/70 text-xs mt-1">
                Shop drops, behind-the-scenes, and custom order inspo
              </p>
            </div>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white/70 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-5 rounded-2xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-shadow duration-300 text-left group"
            style={{ backgroundColor: "#25D366" }}
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <SiWhatsapp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-display text-xl font-bold text-white leading-tight">
                WhatsApp
              </p>
              <p className="text-white/80 text-sm mt-0.5">+1 (234) 567 890</p>
              <p className="text-white/70 text-xs mt-1">
                Custom orders, sizing, and quick questions
              </p>
            </div>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white/70 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        </div>

        {/* Business hours note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted rounded-xl px-5 py-3.5"
        >
          <Clock className="w-4 h-4 shrink-0 text-primary" />
          <span>We typically respond within 24 hours.</span>
        </motion.div>

        {/* Decorative crochet pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-2xl sm:text-3xl font-light italic text-primary/60 text-balance">
            "We can't wait to hear from you."
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-border" />
            <span className="text-primary text-xl">✦</span>
            <div className="h-px w-16 bg-border" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
