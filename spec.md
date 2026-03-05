# Knot and Loop Crochet Co

## Current State
- Cart checkout goes to `/payment` (Stripe payment method selection) → `/billing` (Stripe redirect)
- Individual product "Buy Now" goes to `/razorpay-billing` (collects billing details, opens Razorpay modal)
- StripeSetup component floats on every page
- CartDrawer footer says "Secured by Stripe"
- Razorpay is already wired for single-product Buy Now flow

## Requested Changes (Diff)

### Add
- New page `CartRazorpayBilling` at `/cart-razorpay-billing`: collects name, email, phone for the full cart, then opens Razorpay checkout with the cart total in INR (paise), on success navigates to `/thank-you` with orderId/paymentId/amount params
- Cart total passed to Razorpay as sum of all cart items × quantities converted to paise

### Modify
- `CartDrawer`: change `handleCheckout` to navigate to `/cart-razorpay-billing` instead of `/payment`; update footer copy from "Secured by Stripe" to "Secured by Razorpay"
- `App.tsx`: add route for `/cart-razorpay-billing`; remove `<StripeSetup />` component
- Keep existing `/payment`, `/billing`, and StripeSetup files in place (just stop rendering StripeSetup and don't use those routes from cart)

### Remove
- Nothing deleted from disk, just stop routing to Stripe from cart checkout

## Implementation Plan
1. Create `src/frontend/src/pages/CartRazorpayBilling.tsx` — collects billing details for cart, computes total from cart context, opens Razorpay, navigates to thank-you on success
2. Update `CartDrawer.tsx` — navigate to `/cart-razorpay-billing` on checkout, update footer text
3. Update `App.tsx` — add cartRazorpayBillingRoute, remove `<StripeSetup />` render
