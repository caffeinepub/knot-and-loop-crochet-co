import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCreateCheckoutSession } from "@/hooks/useCreateCheckoutSession";
import { productImages } from "@/lib/productImages";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Step indicator ──
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Cart", "Payment Method", "Billing"];
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

// ── Payment method option ──
interface PaymentOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  badges: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Pay securely with Visa, Mastercard, or Amex",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    badges: (
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Visa */}
        <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-xs">
          <svg viewBox="0 0 48 16" height="10" aria-label="Visa" role="img">
            <text
              x="0"
              y="13"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="14"
              fill="#1A1F71"
              letterSpacing="-0.5"
            >
              VISA
            </text>
          </svg>
        </span>
        {/* Mastercard */}
        <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-xs">
          <svg
            viewBox="0 0 38 24"
            height="14"
            aria-label="Mastercard"
            role="img"
          >
            <circle cx="13" cy="12" r="10" fill="#EB001B" />
            <circle cx="25" cy="12" r="10" fill="#F79E1B" />
            <path
              d="M19 5.2a10 10 0 0 1 0 13.6A10 10 0 0 1 19 5.2z"
              fill="#FF5F00"
            />
          </svg>
        </span>
        {/* Amex */}
        <span className="inline-flex items-center justify-center h-6 px-2.5 rounded bg-[#007BC1] border border-[#0070b0]/40 shadow-xs">
          <svg
            viewBox="0 0 48 14"
            height="9"
            aria-label="American Express"
            role="img"
          >
            <text
              x="0"
              y="11"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="11"
              fill="white"
              letterSpacing="0.3"
            >
              AMEX
            </text>
          </svg>
        </span>
      </div>
    ),
  },
  {
    id: "upi",
    label: "UPI",
    description: "Instant payment via any UPI app",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    badges: (
      <span className="inline-flex items-center justify-center h-6 px-2.5 rounded bg-white border border-border/60 shadow-xs">
        <svg viewBox="0 0 38 16" height="11" aria-label="UPI" role="img">
          <rect width="38" height="16" rx="2" fill="white" />
          <text
            x="3"
            y="12"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="10"
            fill="#097939"
            letterSpacing="0.5"
          >
            UPI
          </text>
          <path
            d="M28 3 L35 8 L28 13"
            stroke="#FF6B35"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
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
        <path
          d="M11.99 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z"
          fill="#fff"
        />
        <path
          d="M11.99 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.92 10.35h-5.9V8.16h5.9c.11.63.18 1.29.18 1.95 0 .08 0 .16-.01.24h-.17z"
          fill="#5F6368"
          opacity=".2"
        />
        <text
          x="3"
          y="16"
          fontFamily="Arial"
          fontSize="9"
          fontWeight="700"
          fill="#4285F4"
        >
          G
        </text>
        <text
          x="9"
          y="16"
          fontFamily="Arial"
          fontSize="9"
          fontWeight="500"
          fill="#5F6368"
        >
          Pay
        </text>
      </svg>
    ),
    badges: (
      <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-xs gap-0.5">
        <svg viewBox="0 0 41 17" height="11" aria-label="Google Pay" role="img">
          <text
            x="0"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="500"
            fontSize="12"
            fill="#4285F4"
            letterSpacing="-0.2"
          >
            G
          </text>
          <text
            x="8"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="12"
            fill="#5F6368"
            letterSpacing="-0.2"
          >
            Pay
          </text>
        </svg>
      </span>
    ),
  },
  {
    id: "applepay",
    label: "Apple Pay",
    description: "Touch ID or Face ID for instant payment",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-label="Apple"
        role="img"
        fill="currentColor"
      >
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
      </svg>
    ),
    badges: (
      <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-black border border-black/20 shadow-xs">
        <svg viewBox="0 0 52 22" height="13" aria-label="Apple Pay" role="img">
          <path
            d="M10.5 4.5C11.2 3.6 11.7 2.4 11.5 1.2 10.4 1.3 9.1 2 8.3 2.9 7.6 3.7 7 5 7.2 6.1 8.4 6.2 9.7 5.4 10.5 4.5z"
            fill="white"
          />
          <path
            d="M11.5 6.3c-1.7-.1-3.2 1-4 1-.8 0-2-.9-3.3-.9C2.5 6.5 1 7.6.3 9.2c-1.4 2.4-.4 6 1 7.9.7.9 1.5 2 2.6 2 1 0 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7s1.8-1 2.5-2c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.1 0-2 1.6-2.9 1.7-3-.9-1.3-2.3-1.4-2.7-1.4z"
            fill="white"
          />
          <text
            x="17"
            y="16"
            fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="500"
            fontSize="13"
            fill="white"
            letterSpacing="-0.3"
          >
            Pay
          </text>
        </svg>
      </span>
    ),
  },
];

// ── Order summary ──
function OrderSummary() {
  const { items, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

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
export function PaymentMethod() {
  const navigate = useNavigate();
  const { items } = useCart();
  const createCheckoutSession = useCreateCheckoutSession();
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null);

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/shop" });
    }
  }, [items.length, navigate]);

  const handleSelect = async (methodId: string) => {
    sessionStorage.setItem("selectedPaymentMethod", methodId);
    setLoadingMethod(methodId);

    const shoppingItems = items.map((item) => ({
      currency: "usd",
      productName: item.product.name,
      productDescription: item.product.description,
      priceInCents: BigInt(Math.round(item.product.price * 100)),
      quantity: BigInt(item.quantity),
    }));

    try {
      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      window.location.href = session.url;
    } catch (err) {
      setLoadingMethod(null);
      toast.error("Checkout failed. Please try again.", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    }
  };

  if (items.length === 0) return null;

  const isLoading = loadingMethod !== null;

  return (
    <main
      className="min-h-screen bg-background py-10 px-4"
      data-ocid="payment_method.page"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Back link */}
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group disabled:opacity-50 disabled:pointer-events-none"
          data-ocid="payment_method.back_button"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Cart
        </button>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator currentStep={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Left: payment options */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Choose Payment Method
            </h1>
            <p className="text-muted-foreground text-sm mb-7">
              Select how you'd like to pay and you'll be redirected to complete
              your payment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentOptions.map((option, idx) => {
                const isThisLoading = loadingMethod === option.id;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.35 }}
                    onClick={() => !isLoading && handleSelect(option.id)}
                    disabled={isLoading}
                    className={`group text-left w-full bg-card border-2 rounded-2xl p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] ${
                      isThisLoading
                        ? "border-primary shadow-warm scale-[0.99]"
                        : isLoading
                          ? "border-border opacity-50 cursor-not-allowed"
                          : "border-border hover:border-primary hover:shadow-warm"
                    }`}
                    data-ocid={`payment_method.card.${idx + 1}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isThisLoading ? "bg-primary/15" : "bg-primary/10 group-hover:bg-primary/15"}`}
                      >
                        {isThisLoading ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : (
                          option.icon
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="font-display font-bold text-foreground text-sm leading-tight mb-0.5">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {isThisLoading
                            ? "Redirecting to payment…"
                            : option.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {option.badges}
                      {isThisLoading ? (
                        <Loader2 className="w-4 h-4 text-primary animate-spin ml-2 flex-shrink-0" />
                      ) : (
                        <ArrowLeft className="w-4 h-4 text-primary rotate-180 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-muted-foreground flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-label="Secure"
                role="img"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your payment information is secured with SSL encryption
            </p>
          </motion.div>

          {/* Right: order summary */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="lg:sticky lg:top-8 self-start"
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
