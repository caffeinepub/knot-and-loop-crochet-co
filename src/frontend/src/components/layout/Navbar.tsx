import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/", ocid: "nav.home_link" },
  { label: "Shop", to: "/shop", ocid: "nav.shop_link" },
  { label: "About", to: "/about", ocid: "nav.about_link" },
  { label: "Contact", to: "/contact", ocid: "nav.contact_link" },
];

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.home_link"
        >
          <span className="font-display text-xl font-bold text-primary leading-none tracking-tight group-hover:opacity-80 transition-opacity">
            Knot & Loop
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-muted rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Cart + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="nav.cart_button"
            className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <ShoppingBag className="w-5 h-5 text-foreground/80" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </button>

          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden border-t border-border bg-background"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      data-ocid={link.ocid}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-muted text-primary"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
