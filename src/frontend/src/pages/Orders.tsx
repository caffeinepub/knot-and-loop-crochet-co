import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@tanstack/react-router";
import { LogIn, PackageSearch, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function Orders() {
  const { isLoggedIn, isInitializing, openLoginModal, principal } = useAuth();

  const shortPrincipal = principal
    ? `${principal.slice(0, 8)}…${principal.slice(-4)}`
    : null;

  return (
    <main
      className="min-h-[80vh] flex items-center justify-center px-4 py-16"
      data-ocid="orders.page"
    >
      <div className="max-w-md w-full">
        {isInitializing ? (
          /* Loading skeleton */
          <div
            className="flex flex-col items-center gap-4"
            data-ocid="orders.loading_state"
          >
            <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
            <div className="h-6 w-48 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-64 rounded-full bg-muted animate-pulse" />
          </div>
        ) : !isLoggedIn ? (
          /* Not logged in state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <PackageSearch className="w-11 h-11 text-primary" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              My Orders
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
              Sign in to view your order history and track your handmade crochet
              pieces.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={openLoginModal}
                data-ocid="orders.login_button"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-warm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to View Orders
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border hover:bg-muted px-8"
              >
                <Link to="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Shop
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Logged in — order history placeholder */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              My Orders
            </h1>
            {shortPrincipal && (
              <p className="text-xs text-muted-foreground mb-8 font-mono">
                {shortPrincipal}
              </p>
            )}

            {/* Empty state */}
            <div
              className="rounded-2xl border border-border bg-card p-10 flex flex-col items-center gap-5"
              data-ocid="orders.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <PackageSearch className="w-9 h-9 text-muted-foreground" />
              </div>

              <div>
                <p className="font-display text-lg font-semibold text-foreground mb-1">
                  No orders yet
                </p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Orders you place while signed in will appear here. Start
                  shopping for something handcrafted!
                </p>
              </div>

              <div className="w-full bg-muted/50 rounded-xl p-4 border border-border/50 text-left space-y-2">
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                  Coming soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Order history, tracking, and re-order functionality will be
                  available shortly.
                </p>
              </div>

              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-warm"
              >
                <Link to="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
