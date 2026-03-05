import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { HelpCircle, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const faqs = [
  {
    id: "q1",
    question: "Are your products really handmade?",
    answer:
      "Absolutely! Every single item in our shop is crocheted by hand — no machines, no shortcuts. Each piece takes hours of careful work and genuine love. That's what makes every item truly unique; no two pieces are ever exactly the same.",
  },
  {
    id: "q2",
    question: "What materials do you use?",
    answer:
      "We use high-quality cotton, acrylic, and blended yarns sourced from trusted suppliers. Our materials are chosen for their softness, durability, and colorfastness. For bags and accessories, we often use cotton for its natural breathability and strength.",
  },
  {
    id: "q3",
    question: "How do I place an order?",
    answer:
      "Simply browse our shop, add your favourite items to the cart, and proceed to checkout. You'll fill in your billing details and then reach out to us on WhatsApp to complete your payment. It's simple, secure, and personal!",
  },
  {
    id: "q4",
    question: "How does WhatsApp payment work?",
    answer:
      "After you place your order on the website, you'll be redirected to WhatsApp where you can chat with us directly. We'll confirm your order details, share our payment details (UPI / bank transfer), and once payment is received, we'll start crafting your item right away!",
  },
  {
    id: "q5",
    question: "How long does shipping take?",
    answer:
      "For ready-to-ship items, we dispatch within 2–3 business days. For made-to-order or custom items, please allow 5–10 business days for crafting. Delivery typically takes 3–7 business days depending on your location within India.",
  },
  {
    id: "q6",
    question: "What is your return or exchange policy?",
    answer:
      "We accept returns and exchanges within 7 days of delivery, provided the item is unused and in its original condition. Since every item is handmade, we ask that you contact us on WhatsApp before returning. Please visit our Returns Policy page for full details.",
  },
  {
    id: "q7",
    question: "How do I care for my crochet items?",
    answer:
      "We recommend hand-washing your crochet pieces in cold water with a mild detergent. Lay them flat to dry — never hang or tumble dry, as this can stretch or distort the shape. Avoid wringing or twisting. With gentle care, your items will stay beautiful for years.",
  },
  {
    id: "q8",
    question: "Can I request a custom order?",
    answer:
      "Yes, we love making custom pieces! Whether it's a specific colour, size, or design, just reach out to us on WhatsApp with your idea. Custom orders usually take 7–14 days depending on complexity. Extra charges may apply based on the design.",
  },
  {
    id: "q9",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within India only. We're working on expanding our shipping options internationally soon. If you're overseas and really love something, drop us a message on WhatsApp and we'll see what we can do!",
  },
  {
    id: "q10",
    question: "Are the product photos accurate?",
    answer:
      "We try our best to represent our products accurately in photos. However, because these are handmade items, slight variations in colour, texture, and size are natural and expected — and honestly, that's part of their charm! Screen colours may also vary slightly.",
  },
];

export function FAQ() {
  return (
    <main className="min-h-screen" data-ocid="faq.page">
      {/* Header */}
      <section className="bg-muted/50 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Got questions?
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our handmade crochet pieces,
              orders, and more. Can't find what you're looking for? Just ask us
              on WhatsApp!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              data-ocid="faq.list"
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                >
                  <AccordionItem
                    value={faq.id}
                    data-ocid={`faq.item.${i + 1}`}
                    className="bg-card border border-border rounded-2xl px-6 shadow-warm overflow-hidden hover:shadow-warm-lg transition-shadow duration-200"
                  >
                    <AccordionTrigger
                      data-ocid={`faq.toggle.${i + 1}`}
                      className="text-left font-display text-base font-semibold text-foreground py-5 hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary"
                    >
                      <span className="flex items-start gap-3">
                        <MessageCircle className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-gradient-to-br from-primary/8 to-secondary/8 rounded-3xl p-8 border border-primary/10 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <SiWhatsapp className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're just a message away! Reach out on WhatsApp for quick,
              personal answers from the maker herself.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/917358160547"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="faq.whatsapp_button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <SiWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                data-ocid="faq.contact_link"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-background hover:bg-muted text-foreground font-semibold rounded-full transition-all duration-200"
              >
                Visit Contact Page
              </Link>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-2 justify-center"
          >
            <span className="text-sm text-muted-foreground">
              Helpful links:
            </span>
            <Link
              to="/shop"
              data-ocid="faq.shop_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Browse Shop
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/returns"
              data-ocid="faq.returns_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Returns Policy
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/track-order"
              data-ocid="faq.track_link"
              className="text-sm text-primary hover:underline underline-offset-2"
            >
              Track Order
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-4 flex flex-wrap gap-2 justify-center"
          >
            <Badge variant="secondary" className="text-xs">
              {faqs.length} questions answered
            </Badge>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
