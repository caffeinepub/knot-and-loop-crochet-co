import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export function PaymentSuccess() {
  const { clearCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearCart]);

  return (
    <main
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
      data-ocid="payment_success.page"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Thank you for your purchase! Your handmade crochet pieces are on
            their way to being lovingly prepared for you.
          </p>

          <div className="bg-muted/50 rounded-2xl p-5 border border-border mt-6 text-left space-y-2">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              Payment received &amp; confirmed
            </p>
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              Your order is being handcrafted with care
            </p>
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              We'll be in touch with shipping details
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-warm"
            >
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            {isLoggedIn && (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary/40 text-primary hover:bg-primary/10 px-8 font-semibold"
              >
                <Link to="/orders">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  View My Orders
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border hover:bg-muted px-8"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
