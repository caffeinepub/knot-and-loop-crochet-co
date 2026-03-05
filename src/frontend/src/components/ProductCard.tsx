import type { Product } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { productImages } from "@/lib/productImages";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const categoryGradients: Record<string, string> = {
  Bags: "from-primary/20 to-primary/5",
  Pouches: "from-secondary/20 to-secondary/5",
  Hats: "from-accent/20 to-accent/5",
  Scarves: "from-amber-200/40 to-amber-100/20",
  Accessories: "from-pink-200/30 to-rose-100/20",
};

interface ProductCardProps {
  product: Product;
  index: number;
}

function getAvgRating(productId: string): number | null {
  try {
    const raw = localStorage.getItem(`knl_reviews_${productId}`);
    if (!raw) return null;
    const reviews = JSON.parse(raw) as { rating: number }[];
    if (!reviews.length) return null;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  } catch {
    return null;
  }
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const idStr = product.id.toString();
  const wishlisted = isWishlisted(idStr);

  const [avgRating, setAvgRating] = useState<number | null>(null);
  useEffect(() => {
    setAvgRating(getAvgRating(idStr));
  }, [idStr]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`"${product.name}" added to cart!`, { duration: 2500 });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({
      to: "/billing",
      search: {
        mode: "buynow",
        productName: product.name,
        price: String(product.price),
        description: product.description,
      },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(idStr);
  };

  const imgSrc = productImages[product.name];
  const gradientClass =
    categoryGradients[product.category] ?? "from-muted to-background";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      data-ocid={`shop.product_card.item.${index}`}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-warm hover:shadow-warm-lg transition-shadow duration-300 group flex flex-col"
    >
      {/* Image — clickable to product detail */}
      <Link
        to="/product/$productId"
        params={{ productId: idStr }}
        data-ocid={`shop.product_image_link.${index}`}
        className={`relative overflow-hidden aspect-square bg-gradient-to-br ${gradientClass} block`}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientClass}`}
          >
            <ShoppingBag className="w-12 h-12 text-primary/40" />
          </div>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          data-ocid={`shop.wishlist_toggle.${index}`}
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            wishlisted
              ? "bg-red-50 text-red-500 border border-red-200"
              : "bg-white/90 text-foreground/50 border border-white/60 backdrop-blur-sm"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          {/* Clickable product name */}
          <Link
            to="/product/$productId"
            params={{ productId: idStr }}
            data-ocid={`shop.product_name_link.${index}`}
            className="font-display text-base font-semibold text-foreground leading-snug hover:text-primary transition-colors duration-150"
          >
            {product.name}
          </Link>
          <Badge
            variant="secondary"
            className="shrink-0 text-xs bg-secondary/20 text-secondary-foreground border-0"
          >
            {product.category}
          </Badge>
        </div>

        {/* Star rating (if reviews exist) */}
        {avgRating !== null && (
          <div className="flex items-center gap-1.5 -mt-1">
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${
                    s <= Math.round(avgRating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </span>
            <span className="text-xs text-muted-foreground">
              {avgRating.toFixed(1)}
            </span>
          </div>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-2 border-t border-border/60 space-y-2">
          <span className="font-display text-lg font-bold text-primary block">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              data-ocid={`shop.add_to_cart_button.${index}`}
              className="flex-1 rounded-full border-primary/40 text-primary hover:bg-primary/10 transition-transform duration-150 active:scale-95 text-xs"
            >
              <ShoppingBag className="w-3 h-3 mr-1" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              onClick={handleBuyNow}
              data-ocid={`shop.buy_now_button.${index}`}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-transform duration-150 active:scale-95 text-xs font-semibold shadow-sm"
            >
              <Zap className="w-3 h-3 mr-1" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
