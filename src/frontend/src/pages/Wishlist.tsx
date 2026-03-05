import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetProducts } from "@/hooks/useQueries";
import { sampleProducts } from "@/lib/products";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function Wishlist() {
  const { wishlist, wishlistCount } = useWishlist();
  const { data: backendProducts } = useGetProducts();

  const allProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : sampleProducts;

  const wishlisted = allProducts.filter((p) =>
    wishlist.includes(p.id.toString()),
  );

  return (
    <main className="min-h-screen" data-ocid="wishlist.page">
      {/* Header */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary fill-primary/30" />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-1">
                {wishlistCount > 0
                  ? `${wishlistCount} item${wishlistCount !== 1 ? "s" : ""} saved`
                  : "Items you love, saved for later"}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {wishlistCount === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              data-ocid="wishlist.empty_state"
              className="text-center py-24 px-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-24 h-24 rounded-full bg-primary/8 border-2 border-primary/15 flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-10 h-10 text-primary/50" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
                Browse our shop and tap the heart icon on any product to save it
                here for later.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-warm"
                data-ocid="wishlist.shop_button"
              >
                <Link to="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse the Shop
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                data-ocid="wishlist.list"
              >
                <AnimatePresence>
                  {wishlisted.map((product, i) => (
                    <motion.div
                      key={product.id.toString()}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                      <ProductCard product={product} index={i + 1} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mt-10"
              >
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                  data-ocid="wishlist.continue_shopping_button"
                >
                  <Link to="/shop">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
