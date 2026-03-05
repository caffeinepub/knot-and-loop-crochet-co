import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Home, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function ThankYou() {
  const search = useSearch({ strict: false }) as {
    orderId?: string;
    paymentId?: string;
    productName?: string;
    amount?: string;
  };

  const orderId = search.orderId ?? "N/A";
  const paymentId = search.paymentId ?? "N/A";
  const productName = search.productName ?? "Your item";
  const amount = search.amount ? `$${Number(search.amount).toFixed(2)}` : "—";

  return (
    <main
      className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-muted/30"
      data-ocid="thank_you.page"
    >
      <div className="max-w-lg w-full text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <CheckCircle2 className="w-14 h-14 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="space-y-5"
        >
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Thank You for
              <br />
              Your Order!
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your payment was successful. Your handmade crochet item is being
              lovingly prepared for you.
            </p>
          </div>

          {/* Order details card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="bg-card rounded-2xl border border-border shadow-warm p-6 text-left space-y-4 mt-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-4.5 h-4.5 text-primary" />
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Order Confirmation
              </h2>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="flex justify-between items-start gap-2 pt-2 first:pt-0">
                <span className="text-sm text-muted-foreground">Product</span>
                <span className="text-sm font-semibold text-foreground text-right max-w-[60%] line-clamp-2">
                  {productName}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2 pt-3">
                <span className="text-sm text-muted-foreground">
                  Amount Paid
                </span>
                <span className="text-sm font-bold text-primary">{amount}</span>
              </div>
              {paymentId !== "N/A" && (
                <div className="flex justify-between items-center gap-2 pt-3">
                  <span className="text-sm text-muted-foreground">
                    Payment ID
                  </span>
                  <span className="text-xs font-mono text-foreground/80 truncate max-w-[55%]">
                    {paymentId}
                  </span>
                </div>
              )}
              {orderId !== "N/A" && (
                <div className="flex justify-between items-center gap-2 pt-3">
                  <span className="text-sm text-muted-foreground">
                    Order ID
                  </span>
                  <span className="text-xs font-mono text-foreground/80 truncate max-w-[55%]">
                    {orderId}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Status checklist */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.44 }}
            className="bg-green-50 rounded-2xl p-5 border border-green-100 text-left space-y-2"
          >
            {[
              "Payment received & confirmed",
              "Your item is being handcrafted with care",
              "We'll be in touch with shipping details",
            ].map((item) => (
              <p
                key={item}
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                {item}
              </p>
            ))}
          </motion.div>

          {/* Note */}
          <p className="text-xs text-muted-foreground/70 leading-relaxed px-4">
            A confirmation has been noted. We'll be in touch with shipping
            details soon.
          </p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.54 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
          >
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-warm"
              data-ocid="thank_you.primary_button"
            >
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border hover:bg-muted px-8"
              data-ocid="thank_you.secondary_button"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
