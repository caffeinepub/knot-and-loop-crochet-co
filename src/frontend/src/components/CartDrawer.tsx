import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useActor } from "@/hooks/useActor";
import { useCreateCheckoutSession } from "@/hooks/useCreateCheckoutSession";
import { productImages } from "@/lib/productImages";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  LogIn,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { formatPrice } = useCurrency();
  const { actor } = useActor();
  const { isLoggedIn, openLoginModal } = useAuth();
  const createCheckoutSession = useCreateCheckoutSession();

  const { data: isStripeConfigured } = useQuery({
    queryKey: ["isStripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).isStripeConfigured();
    },
    enabled: !!actor,
  });

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

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

  const isEmpty = items.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] p-0 flex flex-col bg-background"
        data-ocid="cart.drawer"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
            {!isEmpty && (
              <Badge className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </Badge>
            )}
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 hover:bg-muted"
            onClick={() => onOpenChange(false)}
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </Button>
        </SheetHeader>

        {/* Body */}
        {isEmpty ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-16 text-center"
            data-ocid="cart.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-foreground mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground">
                Add something lovely from the shop!
              </p>
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <ul className="space-y-4">
                {items.map((item, index) => {
                  const imgSrc = productImages[item.product.name];
                  const ocidIndex = index + 1;
                  return (
                    <li
                      key={item.product.id.toString()}
                      data-ocid={`cart.item.${ocidIndex}`}
                      className="flex gap-3 items-start p-3 rounded-xl bg-card border border-border/60 hover:border-border transition-colors"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground leading-snug line-clamp-2 mb-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatPrice(item.product.price)} each
                        </p>

                        {/* Quantity controls */}
                        <div
                          className="flex items-center gap-1"
                          data-ocid={`cart.quantity_input.${ocidIndex}`}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-md border-border/80 hover:bg-muted"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold text-foreground tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-md border-border/80 hover:bg-muted"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="font-display text-sm font-bold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name}`}
                          data-ocid={`cart.remove_button.${ocidIndex}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border space-y-4 bg-background">
              {/* Login prompt for non-logged-in users */}
              {!isLoggedIn && (
                <div
                  className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-start gap-3"
                  data-ocid="cart.login_prompt"
                >
                  <LogIn className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Sign in to checkout
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Create an account to complete your purchase.
                    </p>
                    <button
                      type="button"
                      onClick={openLoginModal}
                      data-ocid="cart.login_prompt_button"
                      className="mt-2 text-xs font-semibold text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                    >
                      Sign in now →
                    </button>
                  </div>
                </div>
              )}

              {/* Stripe not configured notice */}
              {isStripeConfigured === false && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                  <p className="font-medium">Stripe Setup Required</p>
                  <p className="text-xs mt-0.5 text-amber-700">
                    Payment processing isn't configured yet. Contact the store
                    owner.
                  </p>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Subtotal
                </span>
                <span className="font-display text-xl font-bold text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Shipping &amp; taxes calculated at checkout
              </p>

              <Separator />

              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98]"
                onClick={handleCheckout}
                disabled={
                  createCheckoutSession.isPending ||
                  isStripeConfigured === false
                }
                data-ocid="cart.checkout_button"
              >
                {createCheckoutSession.isPending ? (
                  <span
                    className="flex items-center gap-2"
                    data-ocid="cart.loading_state"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting to Checkout…
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
                    Checkout with Stripe
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secured by Stripe · SSL encrypted
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
