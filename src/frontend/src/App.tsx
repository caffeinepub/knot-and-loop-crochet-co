import { StripeSetup } from "@/components/StripeSetup";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { InternetIdentityProvider } from "@/hooks/useInternetIdentity";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Orders } from "@/pages/Orders";
import { PaymentFailure } from "@/pages/PaymentFailure";
import { PaymentSuccess } from "@/pages/PaymentSuccess";
import { Shop } from "@/pages/Shop";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ── Root layout ──
const rootRoute = createRootRoute({
  component: () => (
    <InternetIdentityProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Outlet />
              </div>
              <Footer />
            </div>
            <Toaster richColors position="top-right" />
            <StripeSetup />
          </CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </InternetIdentityProvider>
  ),
});

// ── Routes ──
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: Shop,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: PaymentSuccess,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: PaymentFailure,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  aboutRoute,
  contactRoute,
  ordersRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
