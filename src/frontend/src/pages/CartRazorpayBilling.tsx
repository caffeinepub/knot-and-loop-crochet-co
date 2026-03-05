import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── 3-step indicator ──
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Payment", "Billing Details", "Order Confirmation"];
  return (
    <ol className="flex items-center gap-0 mb-8">
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
                className={`h-0.5 w-10 sm:w-16 mx-2 mb-5 rounded-full transition-all duration-300 ${
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

const PAYMENT_BADGES = [
  { label: "UPI", color: "bg-violet-100 text-violet-700" },
  { label: "Google Pay", color: "bg-blue-100 text-blue-700" },
  { label: "PhonePe", color: "bg-purple-100 text-purple-700" },
  { label: "Paytm", color: "bg-sky-100 text-sky-700" },
  { label: "Cards", color: "bg-primary/10 text-primary" },
  { label: "Net Banking", color: "bg-green-100 text-green-700" },
];

export function CartRazorpayBilling() {
  const { items, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/shop" });
    }
  }, [items.length, navigate]);

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Full name is required.";
    if (!email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const productName = "Knot and Loop Crochet Co - Cart";
    const description = `${items.length} item(s) from Knot and Loop Crochet Co`;

    try {
      await openRazorpayCheckout({
        productName,
        priceInPaise: Math.round(totalPrice * 100),
        description,
        prefill: { name, email, contact: phone },
        onSuccess: (response) => {
          clearCart();
          const params = new URLSearchParams({
            orderId: response.razorpay_order_id ?? "N/A",
            paymentId: response.razorpay_payment_id,
            productName: "Cart Order",
            amount: String(totalPrice),
          });
          navigate({ to: `/thank-you?${params.toString()}` });
        },
        onDismiss: () => {
          toast.info("Payment cancelled.", { duration: 2000 });
          setLoading(false);
        },
      });
    } catch {
      toast.error("Could not open payment. Please try again.", {
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-[90vh] bg-background px-4 py-12"
      data-ocid="cart_razorpay_billing.page"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/payment-select", search: { mode: "cart" } })
            }
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            data-ocid="cart_razorpay_billing.back_button"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Payment Method
          </button>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StepIndicator currentStep={2} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Left: Billing form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl border border-border shadow-warm p-6 sm:p-8">
              <div className="mb-6">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Your Details
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Enter your details to continue to payment
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="billing-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="billing-name"
                    type="text"
                    placeholder="Aarav Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    data-ocid="cart_razorpay_billing.name_input"
                    className={`rounded-xl h-11 ${errors.name ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p
                      className="text-xs text-destructive mt-1 flex items-center gap-1"
                      data-ocid="cart_razorpay_billing.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="billing-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="billing-email"
                    type="email"
                    placeholder="aarav@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    data-ocid="cart_razorpay_billing.email_input"
                    className={`rounded-xl h-11 ${errors.email ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p
                      className="text-xs text-destructive mt-1 flex items-center gap-1"
                      data-ocid="cart_razorpay_billing.error_state"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="billing-phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="billing-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone)
                        setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    data-ocid="cart_razorpay_billing.phone_input"
                    className={`rounded-xl h-11 ${errors.phone ? "border-destructive ring-destructive/20 ring-2" : ""}`}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p
                      className="text-xs text-destructive mt-1 flex items-center gap-1"
                      data-ocid="cart_razorpay_billing.error_state"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  data-ocid="cart_razorpay_billing.submit_button"
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-warm transition-transform duration-150 active:scale-[0.98] mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Opening Payment…
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Continue to Payment →
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* ── Right: Order summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-2xl border border-border shadow-warm p-6 sticky top-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-4">
                Order Summary
              </h2>

              {/* Cart items */}
              <div className="divide-y divide-border/60 border-y border-border/60 mb-4">
                {items.map((item) => {
                  const imgSrc = productImages[item.product.name];
                  return (
                    <div
                      key={item.product.id.toString()}
                      className="flex items-center gap-3 py-3"
                    >
                      {/* Thumbnail */}
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {/* Name + qty */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      {/* Line price */}
                      <span className="text-sm font-semibold text-primary whitespace-nowrap shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-semibold text-foreground">
                  Total
                </span>
                <span className="font-display text-xl font-bold text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Secured by Razorpay */}
              <div className="flex items-center gap-2 bg-muted/40 rounded-xl px-4 py-3 mt-1 mb-4">
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground font-medium">
                  Secured by{" "}
                  <span className="text-foreground font-semibold">
                    Razorpay
                  </span>
                </span>
                <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto shrink-0" />
              </div>

              {/* Payment method badges */}
              <div>
                <p className="text-xs text-muted-foreground mb-2.5 font-medium uppercase tracking-wide">
                  Accepted Payments
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PAYMENT_BADGES.map((badge) => (
                    <span
                      key={badge.label}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
