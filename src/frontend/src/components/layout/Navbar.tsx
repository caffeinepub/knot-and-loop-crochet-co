import { AuthModal } from "@/components/AuthModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ClipboardList,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
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
  const { isLoggedIn, isInitializing, logout, principal, openLoginModal } =
    useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // Get a short display name from principal
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}…${principal.slice(-3)}`
    : "Me";

  return (
    <>
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

          {/* Cart + Auth + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              type="button"
              data-ocid="nav.cart_button"
              className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
              aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              onClick={() => setCartOpen(true)}
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

            {/* Auth */}
            {isInitializing ? (
              <div className="p-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    data-ocid="nav.user_menu_button"
                    className="flex items-center gap-1.5 rounded-full hover:bg-muted px-2 py-1 transition-colors duration-200"
                    aria-label="User menu"
                  >
                    <Avatar className="w-7 h-7 border-2 border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {shortPrincipal.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 rounded-xl border-border bg-background shadow-warm mt-1"
                >
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs text-muted-foreground">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {shortPrincipal}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/orders"
                      data-ocid="nav.orders_link"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      <ClipboardList className="w-4 h-4 text-muted-foreground" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    data-ocid="nav.logout_button"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                type="button"
                data-ocid="nav.login_button"
                onClick={openLoginModal}
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}

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

                {/* Mobile auth */}
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/orders"
                        data-ocid="nav.orders_link"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        data-ocid="nav.logout_button"
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      type="button"
                      data-ocid="nav.login_button"
                      onClick={() => {
                        openLoginModal();
                        setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal />
    </>
  );
}
