import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ── Step indicator ──
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Cart", "Billing Details", "Order Confirmation"];
  return (
    <ol className="flex items-center gap-0">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <li key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : isDone
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 sm:w-20 mx-2 mb-5 rounded-full transition-all duration-300 ${
                  isDone ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ── Order summary ──
interface OrderSummaryProps {
  isBuyNow: boolean;
  buyNowProductName: string;
  buyNowPrice: number;
  buyNowDescription: string;
}

function OrderSummary({
  isBuyNow,
  buyNowProductName,
  buyNowPrice,
  buyNowDescription,
}: OrderSummaryProps) {
  const { items, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  if (isBuyNow) {
    const imgSrc = productImages[buyNowProductName];
    return (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-warm">
        <div className="px-5 py-4 border-b border-border/60">
          <h2 className="font-display text-base font-bold text-foreground">
            Order Summary
          </h2>
        </div>
        <ul className="divide-y divide-border/50">
          <li className="flex items-center gap-3 px-5 py-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={buyNowProductName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {buyNowProductName}
              </p>
              {buyNowDescription && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {buyNowDescription}
                </p>
              )}
              <p className="text-xs text-muted-foreground">Qty: 1</p>
            </div>
            <span className="text-sm font-semibold text-foreground tabular-nums">
              {formatPrice(buyNowPrice)}
            </span>
          </li>
        </ul>
        <div className="px-5 py-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Total
            </span>
            <span className="font-display text-lg font-bold text-primary">
              {formatPrice(buyNowPrice)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-warm">
      <div className="px-5 py-4 border-b border-border/60">
        <h2 className="font-display text-base font-bold text-foreground">
          Order Summary
        </h2>
      </div>
      <ul className="divide-y divide-border/50">
        {items.map((item) => {
          const imgSrc = productImages[item.product.name];
          return (
            <li
              key={item.product.id.toString()}
              className="flex items-center gap-3 px-5 py-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="px-5 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Total
          </span>
          <span className="font-display text-lg font-bold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──
export function Billing() {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  // Read optional buy-now params from URL
  const search = useSearch({ strict: false }) as {
    mode?: string;
    productName?: string;
    price?: string;
    description?: string;
  };

  const isBuyNow = search.mode === "buynow";
  const buyNowProductName = search.productName ?? "";
  const buyNowPrice = Number.parseFloat(search.price ?? "0");
  const buyNowDescription = search.description ?? "";

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Redirect if cart is empty (only in cart mode)
  useEffect(() => {
    if (!isBuyNow && items.length === 0) {
      navigate({ to: "/shop" });
    }
  }, [isBuyNow, items.length, navigate]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+\d\s\-().]{7,}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const billingDetails = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    if (isBuyNow) {
      const orderData = {
        items: [{ name: buyNowProductName, quantity: 1, price: buyNowPrice }],
        total: buyNowPrice,
        currency: "INR",
        billingDetails,
      };
      sessionStorage.setItem(
        "orderConfirmationData",
        JSON.stringify(orderData),
      );
    } else {
      const orderData = {
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: totalPrice,
        currency: "INR",
        billingDetails,
      };
      sessionStorage.setItem(
        "orderConfirmationData",
        JSON.stringify(orderData),
      );
    }

    navigate({ to: "/order-confirmation" });
  };

  if (!isBuyNow && items.length === 0) return null;

  return (
    <main
      className="min-h-screen bg-background py-10 px-4"
      data-ocid="billing.page"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Back link */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          data-ocid="billing.back_button"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator currentStep={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Left: billing form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Billing Details
                </h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  We'll use these details to confirm your order via WhatsApp.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="space-y-1.5"
              >
                <Label
                  htmlFor="billing-name"
                  className="text-sm font-semibold text-foreground"
                >
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="billing-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={`rounded-xl h-11 text-base border-border/80 focus:border-primary transition-colors ${
                    errors.name
                      ? "border-destructive focus:border-destructive"
                      : ""
                  }`}
                  data-ocid="billing.name_input"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16, duration: 0.35 }}
                className="space-y-1.5"
              >
                <Label
                  htmlFor="billing-email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="billing-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`rounded-xl h-11 text-base border-border/80 focus:border-primary transition-colors ${
                    errors.email
                      ? "border-destructive focus:border-destructive"
                      : ""
                  }`}
                  data-ocid="billing.email_input"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22, duration: 0.35 }}
                className="space-y-1.5"
              >
                <Label
                  htmlFor="billing-phone"
                  className="text-sm font-semibold text-foreground"
                >
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="billing-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className={`rounded-xl h-11 text-base border-border/80 focus:border-primary transition-colors ${
                    errors.phone
                      ? "border-destructive focus:border-destructive"
                      : ""
                  }`}
                  data-ocid="billing.phone_input"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1" role="alert">
                    {errors.phone}
                  </p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98]"
                  data-ocid="billing.submit_button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue to Order Confirmation
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground">
                We'll contact you on WhatsApp to confirm your order and complete
                payment.
              </p>
            </form>
          </motion.div>

          {/* Right: order summary */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="lg:sticky lg:top-8 self-start"
          >
            <OrderSummary
              isBuyNow={isBuyNow}
              buyNowProductName={buyNowProductName}
              buyNowPrice={buyNowPrice}
              buyNowDescription={buyNowDescription}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
