import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function PaymentFailure() {
  return (
    <main
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
      data-ocid="payment_failure.page"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-8"
        >
          <AlertCircle className="w-12 h-12 text-amber-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
            No worries — your cart is still saved! You can go back and complete
            your purchase whenever you're ready.
          </p>

          <div className="bg-muted/50 rounded-2xl p-5 border border-border mt-6 text-sm text-muted-foreground text-left">
            <p>
              If you experienced any issues during checkout, feel free to reach
              out to us via Instagram or WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-warm"
            >
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Return to Shop
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border hover:bg-muted px-8"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
