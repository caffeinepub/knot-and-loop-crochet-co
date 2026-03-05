import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetProducts } from "@/hooks/useQueries";
import { productImages } from "@/lib/productImages";
import { sampleProducts } from "@/lib/products";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Droplets,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

// ── Review helpers ──
interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

function getReviewsKey(productId: string) {
  return `knl_reviews_${productId}`;
}

function loadReviews(productId: string): Review[] {
  try {
    const raw = localStorage.getItem(getReviewsKey(productId));
    if (!raw) return [];
    return JSON.parse(raw) as Review[];
  } catch {
    return [];
  }
}

function saveReviews(productId: string, reviews: Review[]) {
  localStorage.setItem(getReviewsKey(productId), JSON.stringify(reviews));
}

// ── Star display ──
function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${
            s <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </span>
  );
}

// ── Star selector input ──
function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          data-ocid={`product_detail.star_${s}`}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          className="p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label={`Rate ${s} star${s !== 1 ? "s" : ""}`}
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              s <= (hover || value)
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </span>
  );
}

const careInstructions = [
  "Hand wash in cold water with mild detergent",
  "Lay flat to dry — never tumble dry or hang",
  "Do not wring or twist to remove water",
  "Keep away from direct sunlight to preserve colour",
  "Store folded in a cool, dry place",
];

export function ProductDetail() {
  const { productId } = useParams({ strict: false }) as {
    productId?: string;
  };
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { data: backendProducts } = useGetProducts();

  const allProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : sampleProducts;

  const product = useMemo(
    () => allProducts.find((p) => p.id.toString() === productId) ?? null,
    [allProducts, productId],
  );

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    if (productId) setReviews(loadReviews(productId));
  }, [productId]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  }, [reviews]);

  // Review form
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewErrors, setReviewErrors] = useState<{
    name?: string;
    comment?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`"${product.name}" added to cart!`, { duration: 2500 });
  };

  const handleBuyNow = () => {
    if (!product) return;
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

  const handleShareWhatsApp = () => {
    if (!product) return;
    const text = `Check out ${product.name} at Knot and Loop Crochet Co! 🧶 A beautiful handmade crochet piece.`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; comment?: string } = {};
    if (!reviewName.trim()) errs.name = "Your name is required";
    if (!reviewComment.trim()) errs.comment = "Please write a comment";
    setReviewErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    if (productId) saveReviews(productId, updated);
    setReviewName("");
    setReviewRating(5);
    setReviewComment("");
    setReviewErrors({});
    setSubmitting(false);
    toast.success("Thank you for your review!", { duration: 2500 });
  };

  if (!product) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-9 h-9 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Product not found
          </h1>
          <p className="text-muted-foreground mb-6">
            This product doesn't exist or has been removed.
          </p>
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground"
          >
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </motion.div>
      </main>
    );
  }

  const imgSrc = productImages[product.name];
  const idStr = product.id.toString();
  const wishlisted = isWishlisted(idStr);

  return (
    <main className="min-h-screen" data-ocid="product_detail.page">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" data-ocid="product_detail.home_link">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/shop" data-ocid="product_detail.shop_link">
                    Shop
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-medium truncate max-w-[200px]">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            data-ocid="product_detail.back_button"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-warm-lg">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-20 h-20 text-primary/30" />
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  type="button"
                  data-ocid="product_detail.wishlist_toggle"
                  onClick={() => toggleWishlist(idStr)}
                  className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
                    wishlisted
                      ? "bg-red-50 text-red-500 border border-red-200"
                      : "bg-white/90 text-foreground/60 border border-border/60 backdrop-blur-sm"
                  }`}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-red-500" : ""}`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Right — details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category & name */}
              <div>
                <Badge
                  variant="secondary"
                  className="mb-3 bg-secondary/20 text-secondary-foreground border-0"
                >
                  {product.category}
                </Badge>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <StarDisplay rating={avgRating} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {avgRating.toFixed(1)} ({reviews.length} review
                      {reviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="font-display text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 pt-2"
                data-ocid="product_detail.actions"
              >
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  data-ocid="product_detail.add_to_cart_button"
                  className="flex-1 rounded-full border-primary text-primary hover:bg-primary/10 font-semibold"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  data-ocid="product_detail.buy_now_button"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold shadow-warm"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* Share on WhatsApp */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                data-ocid="product_detail.share_whatsapp_button"
                className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-[#20BD5A] font-medium transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                Share on WhatsApp
                <Share2 className="w-3.5 h-3.5 opacity-60" />
              </button>

              <Separator className="bg-border/60" />

              {/* Care instructions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    Care Instructions
                  </h2>
                </div>
                <ul className="space-y-1.5">
                  {careInstructions.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Reviews section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
            data-ocid="product_detail.reviews_section"
          >
            <Separator className="mb-10 bg-border/60" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
              {/* Existing reviews */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Customer Reviews
                  </h2>
                  {reviews.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0"
                    >
                      {reviews.length}
                    </Badge>
                  )}
                </div>

                {reviews.length > 0 && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <span className="font-display text-4xl font-bold text-primary">
                      {avgRating.toFixed(1)}
                    </span>
                    <div>
                      <StarDisplay rating={avgRating} size="md" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on {reviews.length} review
                        {reviews.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {reviews.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      data-ocid="product_detail.reviews_empty_state"
                      className="py-12 text-center border border-dashed border-border rounded-2xl"
                    >
                      <Star className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        No reviews yet — be the first to share your thoughts!
                      </p>
                    </motion.div>
                  ) : (
                    <div
                      className="space-y-4"
                      data-ocid="product_detail.reviews_list"
                    >
                      {reviews.map((review, i) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                          data-ocid={`product_detail.review.${i + 1}`}
                          className="bg-card border border-border rounded-2xl p-5 shadow-warm"
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary">
                                  {review.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {review.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {review.date}
                                </p>
                              </div>
                            </div>
                            <StarDisplay rating={review.rating} />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Review form */}
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-5">
                  Write a Review
                </h3>
                <form
                  onSubmit={handleReviewSubmit}
                  noValidate
                  className="bg-card border border-border rounded-2xl p-6 shadow-warm space-y-4"
                  data-ocid="product_detail.review_form"
                >
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="review-name"
                      className="text-sm font-semibold text-foreground"
                    >
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="review-name"
                      type="text"
                      value={reviewName}
                      onChange={(e) => {
                        setReviewName(e.target.value);
                        if (reviewErrors.name)
                          setReviewErrors((p) => ({ ...p, name: undefined }));
                      }}
                      placeholder="e.g. Priya S."
                      autoComplete="name"
                      className={`rounded-xl h-11 border-border/80 focus:border-primary ${reviewErrors.name ? "border-destructive" : ""}`}
                      data-ocid="product_detail.review_name_input"
                    />
                    {reviewErrors.name && (
                      <p className="text-xs text-destructive" role="alert">
                        {reviewErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-foreground">
                      Rating <span className="text-destructive">*</span>
                    </Label>
                    <StarSelector
                      value={reviewRating}
                      onChange={setReviewRating}
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="review-comment"
                      className="text-sm font-semibold text-foreground"
                    >
                      Your Review <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="review-comment"
                      value={reviewComment}
                      onChange={(e) => {
                        setReviewComment(e.target.value);
                        if (reviewErrors.comment)
                          setReviewErrors((p) => ({
                            ...p,
                            comment: undefined,
                          }));
                      }}
                      placeholder="Tell others what you loved about this product..."
                      rows={4}
                      className={`rounded-xl border-border/80 focus:border-primary resize-none ${reviewErrors.comment ? "border-destructive" : ""}`}
                      data-ocid="product_detail.review_textarea"
                    />
                    {reviewErrors.comment && (
                      <p className="text-xs text-destructive" role="alert">
                        {reviewErrors.comment}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-warm"
                    data-ocid="product_detail.review_submit_button"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
