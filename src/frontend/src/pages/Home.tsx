import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { sampleProducts } from "@/lib/products";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Leaf, Package, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Sparkles,
    title: "Handmade Quality",
    desc: "Every piece is stitched by hand — no machines, no shortcuts.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    desc: "We use natural, eco-conscious yarns sourced responsibly.",
  },
  {
    icon: Package,
    title: "Made to Order",
    desc: "Each item is crafted fresh for you, exactly as you like it.",
  },
];

export function Home() {
  const navigate = useNavigate();
  // Show all 6 products as featured
  const featuredProducts = sampleProducts.slice(0, 4);
  const moreProducts = sampleProducts.slice(4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero gradient: lighter top/middle for text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #E8D5C4 0%, #DFC4B0 28%, #D9BFA8 55%, #CCA88E 80%, #C4957A 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A342E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-sm font-medium tracking-widest uppercase bg-white/40 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/50"
            style={{ color: "#4A342E" }}
          >
            Handmade with heart ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-5 sm:mb-6"
            style={{ color: "#4A342E" }}
          >
            Knot and Loop
            <br />
            <span className="italic font-light" style={{ color: "#6B3A2A" }}>
              Crochet Co
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl max-w-xl mx-auto mb-7 sm:mb-8 leading-relaxed"
            style={{ color: "#4A342E", opacity: 0.8 }}
          >
            Unique crochet pouches, hairbands &amp; accessories — handcrafted
            just for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              data-ocid="hero.shop_now_button"
              onClick={() => navigate({ to: "/shop" })}
              style={{
                touchAction: "manipulation",
                backgroundColor: "#FFFFFF",
                color: "#4A342E",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              }}
              className="rounded-full px-8 py-5 sm:py-6 text-base font-semibold transition-all duration-300 group min-h-[52px] hover:opacity-90 hover:shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H0Z"
              fill="#F5EFE6"
            />
          </svg>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-12 sm:py-20 px-4 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Handcrafted with Love
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Our Collection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Fresh handmade pieces — each one unique and made to order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i + 1}
            />
          ))}
        </div>
      </section>

      {/* ── More Products ── */}
      <section className="py-12 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              More to Love
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A curated selection of our most-loved handmade pieces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {moreProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i + 5}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              style={{ touchAction: "manipulation" }}
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 transition-all duration-300 min-h-[48px]"
            >
              <Link to="/shop">
                See All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Why Knot & Loop ── */}
      <section className="py-12 sm:py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Why Knot &amp; Loop?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We pour care into every loop so you get something truly special.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-warm text-center hover:shadow-warm-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ── */}
      <section className="py-12 sm:py-20 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-3xl sm:text-5xl font-light italic text-primary leading-tight text-balance">
            &ldquo;Every loop tells a story.&rdquo;
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            — Knot &amp; Loop Crochet Co
          </p>
        </motion.div>
      </section>
    </main>
  );
}
