import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  ShoppingBag,
  Smartphone,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";

// ── Step indicator (3 steps) ──
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

// ── Payment method definitions ──
interface PaymentOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  badgeColor: string;
  badgeText: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "upi",
    label: "UPI",
    description: "Instant payment via any UPI app",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    badgeColor: "bg-green-100 text-green-700",
    badgeText: "Instant",
  },
  {
    id: "googlepay",
    label: "Google Pay",
    description: "Fast checkout with your Google account",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-label="Google Pay"
        role="img"
      >
        <circle cx="12" cy="12" r="12" fill="#f8f9fa" />
        <text
          x="4"
          y="16"
          fontFamily="Arial"
          fontSize="9"
          fontWeight="700"
          fill="#4285F4"
        >
          G
        </text>
        <text
          x="10"
          y="16"
          fontFamily="Arial"
          fontSize="8"
          fontWeight="500"
          fill="#5F6368"
        >
          Pay
        </text>
      </svg>
    ),
    badgeColor: "bg-blue-100 text-blue-700",
    badgeText: "Google",
  },
  {
    id: "phonepe",
    label: "PhonePe",
    description: "Pay with your PhonePe wallet",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-label="PhonePe"
        role="img"
        fill="none"
      >
        <circle cx="12" cy="12" r="12" fill="#5f259f" />
        <text
          x="4"
          y="16"
          fontFamily="Arial"
          fontSize="9"
          fontWeight="700"
          fill="white"
        >
          Pe
        </text>
      </svg>
    ),
    badgeColor: "bg-purple-100 text-purple-700",
    badgeText: "PhonePe",
  },
  {
    id: "paytm",
    label: "Paytm",
    description: "Pay via Paytm wallet or UPI",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-label="Paytm"
        role="img"
        fill="none"
      >
        <circle cx="12" cy="12" r="12" fill="#00b9f1" />
        <text
          x="3"
          y="16"
          fontFamily="Arial"
          fontSize="7"
          fontWeight="700"
          fill="white"
        >
          Paytm
        </text>
      </svg>
    ),
    badgeColor: "bg-sky-100 text-sky-700",
    badgeText: "Paytm",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Pay securely with Visa, Mastercard, or Amex",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    badgeColor: "bg-primary/10 text-primary",
    badgeText: "Cards",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "Pay directly from your bank account",
    icon: <Wifi className="w-6 h-6 text-primary" />,
    badgeColor: "bg-green-100 text-green-700",
    badgeText: "All Banks",
  },
];

// ── Order summary for buynow mode ──
function BuyNowSummary({
  productName,
  price,
}: {
  productName: string;
  price: number;
}) {
  const imgSrc = productImages[productName];
  return (
    <div className="bg-card rounded-2xl border border-border shadow-warm p-6 sticky top-6">
      <h2 className="font-display text-lg font-bold text-foreground mb-4">
        Order Summary
      </h2>
      <div className="flex items-center gap-3 py-4 border-y border-border/60">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {productName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Qty: 1</p>
        </div>
        <span className="font-display text-base font-bold text-primary whitespace-nowrap shrink-0">
          ₹{price.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between items-center py-4">
        <span className="text-sm font-semibold text-foreground">Total</span>
        <span className="font-display text-xl font-bold text-primary">
          ₹{price.toFixed(2)}
        </span>
      </div>
      <SecuredBadge />
    </div>
  );
}

// ── Order summary for cart mode ──
function CartSummary() {
  const { items, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-card rounded-2xl border border-border shadow-warm p-6 sticky top-6">
      <h2 className="font-display text-lg font-bold text-foreground mb-4">
        Order Summary
      </h2>
      <div className="divide-y divide-border/60 border-y border-border/60 mb-4">
        {items.map((item) => {
          const imgSrc = productImages[item.product.name];
          return (
            <div
              key={item.product.id.toString()}
              className="flex items-center gap-3 py-3"
            >
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold text-primary whitespace-nowrap shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center py-3">
        <span className="text-sm font-semibold text-foreground">Total</span>
        <span className="font-display text-xl font-bold text-primary">
          {formatPrice(totalPrice)}
        </span>
      </div>
      <SecuredBadge />
    </div>
  );
}

function SecuredBadge() {
  return (
    <div className="flex items-center gap-2 bg-muted/40 rounded-xl px-4 py-3 mt-1">
      <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground font-medium">
        Secured by{" "}
        <span className="text-foreground font-semibold">Razorpay</span>
      </span>
      <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto shrink-0" />
    </div>
  );
}

// ── Main page ──
export function PaymentSelect() {
  const search = useSearch({ strict: false }) as {
    mode?: string;
    productName?: string;
    price?: string;
    description?: string;
  };
  const navigate = useNavigate();

  const mode = search.mode ?? "buynow";
  const productName = search.productName ?? "Crochet Item";
  const price = Number.parseFloat(search.price ?? "0");
  const description = search.description ?? productName;

  const handleSelect = (methodId: string) => {
    sessionStorage.setItem("selectedPaymentMethod", methodId);

    if (mode === "cart") {
      navigate({ to: "/payment" });
    } else {
      navigate({
        to: "/payment",
        search: {
          mode: "buynow",
          productName,
          price: String(price),
          description,
        },
      });
    }
  };

  const handleBack = () => {
    if (mode === "cart") {
      window.history.back();
    } else {
      navigate({ to: "/shop" });
    }
  };

  return (
    <main
      className="min-h-[90vh] bg-background px-4 py-12"
      data-ocid="payment_select.page"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            data-ocid="payment_select.back_button"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {mode === "cart" ? "Back to Cart" : "Back to Shop"}
          </button>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StepIndicator currentStep={1} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Payment method selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl border border-border shadow-warm p-6 sm:p-8">
              <div className="mb-6">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Choose Payment Method
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Select how you'd like to pay. You'll enter your billing
                  details next.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentOptions.map((option, idx) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.35 }}
                    onClick={() => handleSelect(option.id)}
                    className="group text-left w-full bg-background border-2 border-border rounded-2xl p-4 transition-all duration-200 hover:border-primary hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                    data-ocid={`payment_select.method.${idx + 1}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        {option.icon}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="font-display font-bold text-foreground text-sm leading-tight mb-0.5">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${option.badgeColor}`}
                      >
                        {option.badgeText}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-primary rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="mt-5 text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                Your payment information is secured with SSL encryption
              </p>
            </div>
          </motion.div>

          {/* Right: Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="lg:col-span-2"
          >
            {mode === "cart" ? (
              <CartSummary />
            ) : (
              <BuyNowSummary productName={productName} price={price} />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
