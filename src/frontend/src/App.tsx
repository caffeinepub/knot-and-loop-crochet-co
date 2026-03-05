import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { InternetIdentityProvider } from "@/hooks/useInternetIdentity";
import { About } from "@/pages/About";
import { Billing } from "@/pages/Billing";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { Home } from "@/pages/Home";
import { OrderConfirmation } from "@/pages/OrderConfirmation";
import { Orders } from "@/pages/Orders";
import { PaymentFailure } from "@/pages/PaymentFailure";
import { PaymentMethod } from "@/pages/PaymentMethod";
import { PaymentSuccess } from "@/pages/PaymentSuccess";
import { ProductDetail } from "@/pages/ProductDetail";
import { ReturnsPolicy } from "@/pages/ReturnsPolicy";
import { Shop } from "@/pages/Shop";
import { ThankYou } from "@/pages/ThankYou";
import { TrackOrder } from "@/pages/TrackOrder";
import { Wishlist } from "@/pages/Wishlist";
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
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1">
                  <Outlet />
                </div>
                <Footer />
              </div>
              <Toaster richColors position="top-right" />
            </WishlistProvider>
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

const paymentMethodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentMethod,
});

const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/billing",
  component: Billing,
});

const thankYouRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/thank-you",
  component: ThankYou,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmation,
});

// ── New routes ──
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetail,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FAQ,
});

const returnsPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/returns",
  component: ReturnsPolicy,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: Wishlist,
});

const trackOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track-order",
  component: TrackOrder,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  aboutRoute,
  contactRoute,
  ordersRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  paymentMethodRoute,
  billingRoute,
  thankYouRoute,
  orderConfirmationRoute,
  productDetailRoute,
  faqRoute,
  returnsPolicyRoute,
  wishlistRoute,
  trackOrderRoute,
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
