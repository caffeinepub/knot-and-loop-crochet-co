import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "917358160547";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: [
      "At Knot and Loop Crochet Co, every item is handmade with care and love. We want you to be completely happy with your purchase. If something isn't right, we're here to help.",
      "We accept returns and exchanges within 7 days of the delivery date. Please read the eligibility criteria below before reaching out to us.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: [
      "To be eligible for a return or exchange, the item must:",
      "• Be returned within 7 days of delivery",
      "• Be unused, unworn, and in its original condition",
      "• Include all original packaging if applicable",
      "• Not have been altered, washed, or damaged after delivery",
      "",
      "The following are NOT eligible for returns:",
      "• Custom-made or personalised orders",
      "• Items damaged due to misuse or improper care",
      "• Items purchased during clearance or final sale",
    ],
  },
  {
    id: "how-to-request",
    title: "How to Request a Return or Exchange",
    content: [
      "To initiate a return or exchange, please follow these steps:",
      "1. Contact us on WhatsApp at +91 73581 60547 within 7 days of receiving your order",
      "2. Share your order details and a description (and photos if possible) of the issue",
      "3. Our team will review your request and respond within 24 hours",
      "4. If approved, we'll provide you with instructions on how to ship the item back to us",
      "",
      "Please do not ship items back before receiving approval — we may not be able to process unapproved returns.",
    ],
  },
  {
    id: "exchange",
    title: "Exchange Process",
    content: [
      "If you'd like to exchange an item for a different colour, size, or product:",
      "• Reach out to us on WhatsApp with your preference",
      "• We'll check availability and confirm the exchange details",
      "• Once we receive the returned item and verify its condition, we'll dispatch the replacement",
      "",
      "Shipping costs for exchanges are borne by the customer, except in cases where the original item arrived damaged or incorrect.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    content: [
      "If a return is approved and a refund is applicable, it will be processed within 5–7 business days after we receive and inspect the returned item.",
      "Refunds will be issued via the same payment method used for the original purchase (UPI / bank transfer).",
      "Original shipping charges are non-refundable.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "For any questions about returns, exchanges, or your order, please don't hesitate to reach out:",
      "📱 WhatsApp: +91 73581 60547",
      "📍 India",
      "",
      "We're a small handmade business and we genuinely care about every customer. We'll always do our best to make things right!",
    ],
  },
];

export function ReturnsPolicy() {
  return (
    <main className="min-h-screen" data-ocid="returns.page">
      {/* Header */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <RefreshCcw className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Returns &amp; Exchanges
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Returns Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Your satisfaction matters to us. Here's everything you need to
              know about our return and exchange process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/shop"
              data-ocid="returns.back_link"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Shop
            </Link>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Buyer Protection
              </p>
              <p className="text-xs text-muted-foreground">
                7-day return window · Handmade quality guarantee
              </p>
            </div>
          </motion.div>

          {/* Policy sections */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                data-ocid={`returns.section.${i + 1}`}
              >
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.content.map((line, j) => (
                    <p
                      key={`${section.id}-${j}`}
                      className={`text-sm leading-relaxed ${
                        line === ""
                          ? "h-2"
                          : line.startsWith("•") || line.match(/^\d\./)
                            ? "text-foreground pl-4"
                            : "text-muted-foreground"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {i < sections.length - 1 && (
                  <Separator className="mt-10 bg-border/60" />
                )}
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-14 bg-gradient-to-br from-[#25D366]/8 to-[#20BD5A]/5 rounded-3xl p-8 border border-[#25D366]/20 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Need help with a return?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The fastest way to sort it out is a quick WhatsApp message. We
              respond within 24 hours!
            </p>
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full px-8 shadow-sm hover:shadow-md"
              data-ocid="returns.whatsapp_button"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to request a return or exchange for my order.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                Contact Us on WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <Link
              to="/faq"
              data-ocid="returns.faq_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              FAQ
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/shop"
              data-ocid="returns.shop_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Continue Shopping
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/contact"
              data-ocid="returns.contact_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
