import type { Product } from "@/backend.d";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProducts } from "@/hooks/useQueries";
import { PackageSearch } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Bags",
  "Pouches",
  "Scarves",
  "Accessories",
] as const;
type Category = (typeof CATEGORIES)[number];

const tabOcids: Record<Category, string> = {
  All: "shop.all_tab",
  Bags: "shop.bags_tab",
  Pouches: "shop.pouches_tab",
  Scarves: "shop.scarves_tab",
  Accessories: "shop.accessories_tab",
};

// Fallback sample products
const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    name: "Sunburst Market Bag",
    description:
      "A roomy hand-crocheted market tote in warm terracotta tones, sturdy enough for farmers' markets.",
    category: "Bags",
    price: 1.0,
  },
  {
    id: BigInt(2),
    name: "Coastal Weave Tote",
    description:
      "A breezy open-weave tote in mustard yellow — perfect for the beach or brunch.",
    category: "Bags",
    price: 1.0,
  },
  {
    id: BigInt(3),
    name: "Lavender Mini Crossbody",
    description:
      "A cute little crossbody in soft lavender with a braided strap and tassel detail.",
    category: "Bags",
    price: 1.0,
  },
  {
    id: BigInt(4),
    name: "Sage Coin Pouch",
    description:
      "A compact zippered pouch in sage green with a wrist loop — great for essentials.",
    category: "Pouches",
    price: 1.0,
  },
  {
    id: BigInt(5),
    name: "Terracotta Card Wallet",
    description:
      "A slim hand-stitched card wallet in terracotta, holds cards and cash effortlessly.",
    category: "Pouches",
    price: 1.0,
  },
  {
    id: BigInt(8),
    name: "Stripe Weekend Scarf",
    description:
      "Cozy terracotta and cream striped scarf with generous fringe at both ends.",
    category: "Scarves",
    price: 1.0,
  },
  {
    id: BigInt(9),
    name: "Sage Wrap Scarf",
    description:
      "An oversized sage green wrap scarf that doubles as a shawl for chilly evenings.",
    category: "Scarves",
    price: 1.0,
  },
  {
    id: BigInt(10),
    name: "Blossom Crochet Pouch",
    description:
      "A sweet pastel crochet pouch with a zipper and decorative stitch pattern — great for makeup or trinkets.",
    category: "Accessories",
    price: 1.0,
  },
  {
    id: BigInt(11),
    name: "Petal Crochet Hairband",
    description:
      "A stretchy crochet hairband in blush pink with a delicate flower detail — handmade and hair-friendly.",
    category: "Accessories",
    price: 1.0,
  },
  {
    id: BigInt(12),
    name: "Boho Crochet Dreamcatcher",
    description:
      "A handcrafted crochet dreamcatcher in terracotta and sage, with feathers and an intricate yarn web — perfect wall decor.",
    category: "Accessories",
    price: 1.0,
  },
  {
    id: BigInt(13),
    name: "Mini Crochet Keychain",
    description:
      "A tiny crochet charm keychain in mustard yellow — a cute handmade accent for your keys or bag.",
    category: "Accessories",
    price: 1.0,
  },
];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { data: products, isLoading } = useGetProducts();

  const allProducts =
    products && products.length > 0 ? products : sampleProducts;

  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
              The Shop
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg">
              Browse our collection of handmade crochet pieces, each one unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs + grid */}
      <section className="py-10 px-4 container mx-auto max-w-6xl">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={tabOcids[cat]}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-warm"
                  : "bg-card text-foreground/70 border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div
            data-ocid="shop.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map((k) => (
              <div key={k} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl w-full" />
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-9 w-full rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div data-ocid="shop.empty_state" className="text-center py-24 px-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
              <PackageSearch className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No items in this category yet
            </h3>
            <p className="text-muted-foreground text-sm">
              Check back soon — we're always making new things!
            </p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
