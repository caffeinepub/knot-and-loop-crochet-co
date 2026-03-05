import type { Product } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Zap } from "lucide-react";
import { motion } from "motion/react";
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

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`"${product.name}" added to cart!`, {
      duration: 2500,
    });
  };

  const handleBuyNow = () => {
    navigate({
      to: "/razorpay-billing",
      search: {
        productName: product.name,
        price: String(product.price),
        description: product.description,
      },
    });
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
      {/* Image */}
      <div
        className={`relative overflow-hidden aspect-square bg-gradient-to-br ${gradientClass}`}
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
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-foreground leading-snug">
            {product.name}
          </h3>
          <Badge
            variant="secondary"
            className="shrink-0 text-xs bg-secondary/20 text-secondary-foreground border-0"
          >
            {product.category}
          </Badge>
        </div>

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
