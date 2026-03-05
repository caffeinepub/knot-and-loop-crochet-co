import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { SiWhatsapp } from "react-icons/si";

const OWNER_WHATSAPP = "917358160547";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface BillingDetails {
  name: string;
  email: string;
  phone: string;
}

interface OrderConfirmationData {
  items: OrderItem[];
  total: number;
  currency: string;
  billingDetails?: BillingDetails;
}

function useOrderData(): OrderConfirmationData | null {
  return useMemo(() => {
    try {
      const raw = sessionStorage.getItem("orderConfirmationData");
      if (!raw) return null;
      return JSON.parse(raw) as OrderConfirmationData;
    } catch {
      return null;
    }
  }, []);
}

export function OrderConfirmation() {
  const { formatPrice } = useCurrency();
  const orderData = useOrderData();
  const notifiedRef = useRef(false);

  // Build customer→owner notification message
  const ownerNotificationMessage = useMemo(() => {
    if (!orderData) return "";
    const b = orderData.billingDetails;
    const lines: string[] = ["🛍️ *New Order - Knot and Loop Crochet Co*", ""];
    if (b) {
      lines.push(`👤 *Customer:* ${b.name}`);
      lines.push(`📧 *Email:* ${b.email}`);
      lines.push(`📞 *Phone:* ${b.phone}`);
      lines.push("");
    }
    lines.push("*Items Ordered:*");
    for (const item of orderData.items) {
      lines.push(
        `• ${item.name} ×${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
      );
    }
    lines.push("");
    lines.push(`💰 *Total: ${formatPrice(orderData.total)}*`);
    lines.push("");
    lines.push("Please process this order at your earliest convenience.");
    return lines.join("\n");
  }, [orderData, formatPrice]);

  // Auto-open WhatsApp to notify the owner once when the page loads
  useEffect(() => {
    if (!orderData || notifiedRef.current) return;
    notifiedRef.current = true;
    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(ownerNotificationMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [orderData, ownerNotificationMessage]);

  // Customer→owner message (for the manual CTA button)
  const whatsappMessage = useMemo(() => {
    if (!orderData) return "";
    const lines: string[] = [
      "Hi! I'd like to complete payment for my order from Knot and Loop Crochet Co:",
      "",
    ];
    for (const item of orderData.items) {
      lines.push(
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`,
      );
    }
    lines.push("");
    lines.push(`Total: ${formatPrice(orderData.total)}`);
    lines.push("");
    lines.push("Please let me know how to proceed!");
    return lines.join("\n");
  }, [orderData, formatPrice]);

  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main
      className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-muted/30"
      data-ocid="order_confirmation.page"
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
              {orderData?.billingDetails?.name
                ? `Thank you, ${orderData.billingDetails.name.split(" ")[0]}!`
                : "Thank You for\nYour Order!"}
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your order has been placed and we've been notified on WhatsApp.
              Click below to contact us directly and complete your payment.
            </p>
          </div>

          {/* Order Summary Card */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="bg-card rounded-2xl border border-border shadow-warm p-6 text-left mt-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-display font-semibold text-base text-foreground">
                  Order Summary
                </h2>
              </div>

              <ul className="space-y-3 divide-y divide-border/60">
                {orderData.items.map((item, idx) => (
                  <li
                    key={`${item.name}-${idx}`}
                    className="flex items-center justify-between gap-2 pt-3 first:pt-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground font-medium truncate">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        ×{item.quantity}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-foreground tabular-nums whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-lg font-bold text-primary">
                  {formatPrice(orderData.total)}
                </span>
              </div>
            </motion.div>
          )}

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.44 }}
            className="bg-green-50 rounded-2xl p-5 border border-green-100 text-left space-y-3"
          >
            <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
              <SiWhatsapp className="w-4 h-4 text-green-600 flex-shrink-0" />
              We've been notified — complete your payment via WhatsApp
            </p>
            <p className="text-sm text-green-700 leading-relaxed">
              We've received your order details on WhatsApp. Click the button
              below to chat with us directly and complete your payment. We'll
              get it ready for dispatch with love! 🧶
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.54 }}
            className="flex flex-col gap-3 pt-2"
          >
            {/* WhatsApp button — primary CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full rounded-full py-4 px-8 bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white font-semibold text-base shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
              data-ocid="order_confirmation.whatsapp_button"
            >
              <SiWhatsapp className="w-5 h-5" />
              Contact us on WhatsApp to Pay
            </a>

            {/* Continue shopping — secondary */}
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border hover:bg-muted px-8"
              data-ocid="order_confirmation.secondary_button"
            >
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
