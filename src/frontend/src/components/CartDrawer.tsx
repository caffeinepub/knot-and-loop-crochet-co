import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
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
  const { isLoggedIn, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    onOpenChange(false);
    navigate({ to: "/billing" });
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
                          className="flex items-center gap-1.5"
                          data-ocid={`cart.quantity_input.${ocidIndex}`}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            style={{ touchAction: "manipulation" }}
                            className="h-8 w-8 rounded-lg border-border/80 hover:bg-muted flex-shrink-0"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </Button>
                          <span className="w-7 text-center text-sm font-semibold text-foreground tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            style={{ touchAction: "manipulation" }}
                            className="h-8 w-8 rounded-lg border-border/80 hover:bg-muted flex-shrink-0"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
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
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98] min-h-[52px]"
                onClick={handleCheckout}
                data-ocid="cart.checkout_button"
                style={{ touchAction: "manipulation" }}
              >
                Checkout
              </Button>

              {/* Payment methods */}
              <div
                className="flex flex-col items-center gap-2 pt-1"
                data-ocid="cart.payment_methods"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  We accept
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {/* Visa */}
                  <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-sm">
                    <svg
                      viewBox="0 0 48 16"
                      height="10"
                      aria-label="Visa"
                      role="img"
                    >
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
                  <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-sm">
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
                  {/* American Express */}
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded bg-[#007BC1] border border-[#0070b0]/40 shadow-sm">
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
                  {/* Apple Pay */}
                  <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-black border border-black/20 shadow-sm">
                    <svg
                      viewBox="0 0 52 22"
                      height="13"
                      aria-label="Apple Pay"
                      role="img"
                    >
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
                  {/* Google Pay */}
                  <span className="inline-flex items-center justify-center h-6 px-2 rounded bg-white border border-border/60 shadow-sm gap-0.5">
                    <svg
                      viewBox="0 0 41 17"
                      height="11"
                      aria-label="Google Pay"
                      role="img"
                    >
                      <text
                        x="0"
                        y="13"
                        fontFamily="Arial, sans-serif"
                        fontWeight="500"
                        fontSize="12"
                        fill="#5F6368"
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
                  {/* UPI */}
                  <span className="inline-flex items-center justify-center h-6 px-2.5 rounded bg-white border border-border/60 shadow-sm">
                    <svg
                      viewBox="0 0 38 16"
                      height="11"
                      aria-label="UPI"
                      role="img"
                    >
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
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
