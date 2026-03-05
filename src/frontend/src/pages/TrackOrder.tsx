import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Clock,
  Package,
  PackageSearch,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "917358160547";

const steps = [
  {
    id: 1,
    icon: CheckCircle2,
    label: "Order Placed",
    desc: "We've received your order",
    done: true,
  },
  {
    id: 2,
    icon: Clock,
    label: "Preparing Your Order",
    desc: "We're handcrafting your item with love",
    active: true,
  },
  {
    id: 3,
    icon: Truck,
    label: "Dispatched",
    desc: "Your order is on its way",
    done: false,
  },
  {
    id: 4,
    icon: Package,
    label: "Delivered",
    desc: "Delivered to your doorstep",
    done: false,
  },
];

export function TrackOrder() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [queryType, setQueryType] = useState<"order" | "phone">("order");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
  };

  const whatsappMessage = `Hi! I'd like to track my order. ${queryType === "order" ? `Order ID: ${query}` : `Phone: ${query}`}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen" data-ocid="track_order.page">
      {/* Header */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <PackageSearch className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Track Your Order
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Where's My Order?
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Enter your Order ID or phone number to see the status of your
              handmade crochet order.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="container mx-auto max-w-2xl space-y-10">
          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-8 shadow-warm"
          >
            {/* Toggle */}
            <div
              className="flex gap-1 p-1 bg-muted rounded-xl mb-6 w-fit"
              aria-label="Search by"
            >
              <button
                type="button"
                data-ocid="track_order.order_tab"
                onClick={() => setQueryType("order")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  queryType === "order"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Order ID
              </button>
              <button
                type="button"
                data-ocid="track_order.phone_tab"
                onClick={() => setQueryType("phone")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  queryType === "phone"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Phone Number
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="track-query"
                  className="text-sm font-semibold text-foreground"
                >
                  {queryType === "order"
                    ? "Order ID"
                    : "Phone Number (used at checkout)"}
                </Label>
                <Input
                  id="track-query"
                  type={queryType === "phone" ? "tel" : "text"}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    queryType === "order"
                      ? "e.g. KNL-2024-001"
                      : "e.g. +91 98765 43210"
                  }
                  autoComplete={queryType === "phone" ? "tel" : "off"}
                  className="rounded-xl h-12 text-base border-border/80 focus:border-primary"
                  data-ocid="track_order.input"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm"
                data-ocid="track_order.submit_button"
              >
                <PackageSearch className="w-4 h-4 mr-2" />
                Track My Order
              </Button>
            </form>
          </motion.div>

          {/* Order status (shown after search) */}
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-warm"
              data-ocid="track_order.result_panel"
            >
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  Order Status
                </h2>
                <p className="text-sm text-muted-foreground">
                  {queryType === "order"
                    ? `Order #${query}`
                    : `Phone: ${query}`}
                </p>
              </div>

              {/* Stepper */}
              <div className="relative">
                {/* Connector line */}
                <div
                  className="absolute left-5 top-5 bottom-5 w-0.5 bg-border"
                  aria-hidden="true"
                />

                <ol className="space-y-8 relative">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.li
                        key={step.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.1 }}
                        data-ocid={`track_order.step.${i + 1}`}
                        className="flex items-start gap-5"
                      >
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${
                            step.active
                              ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20"
                              : step.done
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-background border-border text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="pt-1.5">
                          <p
                            className={`text-sm font-semibold ${
                              step.active
                                ? "text-primary"
                                : step.done
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                            {step.active && (
                              <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Current Status
                              </span>
                            )}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${
                              step.active || step.done
                                ? "text-muted-foreground"
                                : "text-muted-foreground/50"
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </motion.div>
          )}

          {/* WhatsApp note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: searched ? 0.5 : 0.2 }}
            className="bg-gradient-to-br from-[#25D366]/8 to-[#20BD5A]/5 border border-[#25D366]/20 rounded-3xl p-6 text-center"
          >
            <p className="text-sm font-semibold text-foreground mb-1">
              For live order updates
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Contact us directly on WhatsApp: +91 73581 60547
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="track_order.whatsapp_button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <SiWhatsapp className="w-4 h-4" />
              Get Live Updates on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
