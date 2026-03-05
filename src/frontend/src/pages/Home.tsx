import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/useQueries";
import { sampleProducts } from "@/lib/products";
import { Link } from "@tanstack/react-router";
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
  const { data: products, isLoading } = useGetProducts();
  const allProducts =
    products && products.length > 0 ? products : sampleProducts;

  const newArrivals = allProducts.slice(0, 4);
  const favourites = allProducts.slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-crochet-bg.dim_1400x700.jpg')",
          }}
          aria-hidden="true"
        />
        {/* Warm overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.04 45 / 0.70) 0%, oklch(0.62 0.14 47 / 0.45) 60%, oklch(0.76 0.08 10 / 0.35) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-sm font-medium tracking-widest uppercase text-primary-foreground/80 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-primary-foreground/20"
          >
            Handmade with heart ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight text-balance mb-6"
          >
            Handmade with Love,
            <br />
            <span className="italic font-light">Looped with Care</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/85 max-w-xl mx-auto mb-8 leading-relaxed"
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
              asChild
              size="lg"
              data-ocid="hero.shop_now_button"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-semibold shadow-warm-lg hover:shadow-warm transition-all duration-300 group"
            >
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
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
              fill="oklch(0.97 0.012 75)"
            />
          </svg>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-20 px-4 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Just Dropped
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            New Arrivals
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Fresh handmade pieces — just dropped and ready to love.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
              <div
                key={k}
                className="bg-muted rounded-2xl animate-pulse aspect-[3/4]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, i) => (
              <div key={product.id.toString()} className="relative">
                {/* New badge overlay */}
                <div
                  className="absolute top-2.5 left-2.5 z-20 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold tracking-wide shadow-sm">
                    ✦ NEW
                  </span>
                </div>
                <ProductCard product={product} index={i + 1} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Our Favourites ── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our Favourites
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A curated selection of our most-loved handmade pieces.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
                <div
                  key={k}
                  className="bg-muted rounded-2xl animate-pulse aspect-[3/4]"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favourites.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          )}

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
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 transition-all duration-300"
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
      <section className="py-20 bg-muted/50">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-3xl sm:text-5xl font-light italic text-primary leading-tight text-balance">
            "Every loop tells a story."
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            — Knot & Loop Crochet Co
          </p>
        </motion.div>
      </section>
    </main>
  );
}
