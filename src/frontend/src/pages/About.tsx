import { Heart, Leaf, Package } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Heart,
    title: "Handmade with Heart",
    desc: "Every single piece is crafted by hand, stitch by stitch. No machines, no shortcuts — just time, care, and love woven into every loop.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Yarns",
    desc: "We choose natural, responsibly-sourced yarns — cotton, linen, and organic fibres that feel good and tread lightly on the earth.",
  },
  {
    icon: Package,
    title: "Made to Order",
    desc: "Nothing is mass-produced here. Your piece is made fresh when you order it, so it arrives exactly as it was meant to — unique.",
  },
];

export function About() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-muted/50 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.62 0.14 47 / 0.6) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, oklch(0.72 0.08 155 / 0.5) 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 max-w-4xl py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            A little love story between a person, some yarn, and a crochet hook.
          </motion.p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              What we stand for
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our values are stitched into everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-warm hover:shadow-warm-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="py-24 px-4">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-3xl sm:text-4xl font-light italic text-primary leading-tight text-balance">
            "Every loop tells a story."
          </p>
          <footer className="mt-5 text-sm text-muted-foreground">
            — Knot &amp; Loop Crochet Co
          </footer>
        </motion.blockquote>
      </section>
    </main>
  );
}
