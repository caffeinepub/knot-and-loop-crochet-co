import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProducts } from "@/hooks/useQueries";
import { sampleProducts } from "@/lib/products";
import { PackageSearch, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = ["All", "Bags", "Pouches", "Accessories"] as const;
type Category = (typeof CATEGORIES)[number];

const tabOcids: Record<Category, string> = {
  All: "shop.all_tab",
  Bags: "shop.bags_tab",
  Pouches: "shop.pouches_tab",
  Accessories: "shop.accessories_tab",
};

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products, isLoading } = useGetProducts();

  const allProducts =
    products && products.length > 0 ? products : sampleProducts;

  // Filter by category then by search
  const filtered = allProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const hasSearch = searchQuery.trim().length > 0;

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
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mb-6 max-w-lg"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            className="pl-10 pr-10 rounded-full h-11 border-border/80 focus:border-primary bg-card"
            data-ocid="shop.search_input"
          />
          {hasSearch && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Clear search"
              data-ocid="shop.clear_search_button"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </motion.div>

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

        {/* Search feedback */}
        {hasSearch && !isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-6"
          >
            {filtered.length > 0
              ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${searchQuery}"`
              : null}
          </motion.p>
        )}

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
              {hasSearch
                ? `No results for "${searchQuery}"`
                : "No items in this category yet"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {hasSearch
                ? "Try a different search term or browse all categories."
                : "Check back soon — we're always making new things!"}
            </p>
            {hasSearch && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm text-primary hover:underline underline-offset-2"
                data-ocid="shop.clear_search_link"
              >
                Clear search
              </button>
            )}
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
