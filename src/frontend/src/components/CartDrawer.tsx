import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { productImages } from "@/lib/productImages";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
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
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
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
              onClick={() => {
                onOpenChange(false);
                navigate({ to: "/shop" });
              }}
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
                Payment via WhatsApp after checkout.
              </p>

              <Separator />

              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98] min-h-[52px]"
                onClick={handleCheckout}
                data-ocid="cart.checkout_button"
                style={{ touchAction: "manipulation" }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
