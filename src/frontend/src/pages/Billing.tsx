import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";
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

// ── Payment method badge ──
function PaymentMethodBadge({ methodId }: { methodId: string }) {
  const map: Record<string, { label: string; icon: React.ReactNode }> = {
    card: {
      label: "Credit / Debit Card",
      icon: <CreditCard className="w-4 h-4 text-primary" />,
    },
    upi: {
      label: "UPI",
      icon: <Smartphone className="w-4 h-4 text-primary" />,
    },
    googlepay: {
      label: "Google Pay",
      icon: (
        <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
          <text
            x="0"
            y="12"
            fontFamily="Arial"
            fontSize="10"
            fontWeight="700"
            fill="#4285F4"
          >
            G
          </text>
        </svg>
      ),
    },
    applepay: {
      label: "Apple Pay",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
        </svg>
      ),
    },
  };

  const info = map[methodId] ?? { label: methodId, icon: null };
  return (
    <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-3 py-1.5 text-sm font-medium text-foreground">
      {info.icon}
      {info.label}
    </div>
  );
}

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
export function Billing() {
  const navigate = useNavigate();
  const { items } = useCart();
  const createCheckoutSession = useCreateCheckoutSession();

  const selectedPaymentMethod =
    sessionStorage.getItem("selectedPaymentMethod") ?? "card";

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/shop" });
    }
  }, [items.length, navigate]);

  const handleProceed = async () => {
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
      toast.error("Checkout failed. Please try again.", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    }
  };

  if (items.length === 0) return null;

  const isPending = createCheckoutSession.isPending;

  return (
    <main
      className="min-h-screen bg-background py-10 px-4"
      data-ocid="billing.page"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate({ to: "/payment" })}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          data-ocid="billing.back_button"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator currentStep={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Left: confirm & pay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Review & Pay
            </h1>
            <p className="text-muted-foreground text-sm mb-7">
              Confirm your order and proceed to secure payment.
            </p>

            {/* Selected payment method */}
            <div className="flex items-center gap-2 mb-8 p-4 bg-card border border-border rounded-2xl">
              <span className="text-sm text-muted-foreground">Paying via</span>
              <PaymentMethodBadge methodId={selectedPaymentMethod} />
            </div>

            {/* Error state */}
            {createCheckoutSession.isError && (
              <div
                className="rounded-xl bg-destructive/8 border border-destructive/20 px-4 py-3 text-sm text-destructive mb-6"
                data-ocid="billing.error_state"
              >
                <p className="font-medium">Payment failed</p>
                <p className="text-xs mt-0.5 opacity-80">
                  {createCheckoutSession.error instanceof Error
                    ? createCheckoutSession.error.message
                    : "Please try again or use a different payment method."}
                </p>
              </div>
            )}

            {/* Proceed button */}
            <Button
              type="button"
              disabled={isPending}
              onClick={handleProceed}
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98]"
              data-ocid="billing.submit_button"
            >
              {isPending ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="billing.loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to payment…
                </span>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                  Continue to Stripe Payment
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Secured by Stripe · SSL encrypted
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
