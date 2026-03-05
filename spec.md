# Knot and Loop Crochet Co

## Current State

The site has two checkout entry points:
- **Buy Now** on ProductCard → `/razorpay-billing` (collects billing details first, then opens Razorpay modal)
- **Cart Checkout** button → `/cart-razorpay-billing` (collects billing details first, then opens Razorpay modal)

Both flows go: Product/Cart → Billing Details → Razorpay Payment → Thank You

There is also an unused `/payment` (PaymentMethod) route that was previously used with Stripe and redirects to Stripe, not Razorpay.

## Requested Changes (Diff)

### Add
- New `/payment-select` page: Payment method selection step (UPI, Google Pay, PhonePe, Paytm, Cards, Net Banking) — does NOT trigger any payment, just stores selected method and navigates to billing
- Pass selected payment method + product/cart context from payment-select → billing pages via sessionStorage or URL params

### Modify
- **ProductCard** `handleBuyNow`: navigate to `/payment-select?mode=buynow&productName=...&price=...&description=...` instead of `/razorpay-billing`
- **CartDrawer** `handleCheckout`: navigate to `/payment-select?mode=cart` instead of `/cart-razorpay-billing`
- **RazorpayBilling** (Buy Now billing): update step indicator to show 3 steps — "Payment Method" (done), "Billing Details" (active), "Order Confirmation" (pending). Back button goes back to `/payment-select`
- **CartRazorpayBilling** (Cart billing): same step indicator update. Back button goes to `/payment-select?mode=cart`
- **ThankYou** page: label it clearly as "Order Confirmation" — already works as confirmation page, no structural changes needed
- **App.tsx**: add `/payment-select` route

### Remove
- The old `/payment` (PaymentMethod.tsx Stripe-based) route is now replaced. Keep the file but it won't be linked from any flow.

## Implementation Plan

1. Create new `PaymentSelect` page at `/payment-select`:
   - Reads `mode` (buynow | cart), `productName`, `price`, `description` from URL search params
   - Shows payment method cards (UPI, Google Pay, PhonePe, Paytm, Cards, Net Banking) — all Razorpay-supported
   - On select: store chosen method in sessionStorage, navigate to `/razorpay-billing` (buynow) or `/cart-razorpay-billing` (cart), passing original params
   - Step indicator: Step 1 Payment (active), Step 2 Billing, Step 3 Confirmation

2. Update `RazorpayBilling.tsx`:
   - 3-step indicator: Payment Method (done/checkmark), Billing Details (active), Order Confirmation (pending)
   - Back button navigates to `/payment-select` with original params restored

3. Update `CartRazorpayBilling.tsx`:
   - 3-step indicator: Payment Method (done/checkmark), Billing Details (active), Order Confirmation (pending)
   - Back button navigates to `/payment-select?mode=cart`

4. Update `ProductCard.tsx`:
   - `handleBuyNow` → navigate to `/payment-select` with `mode=buynow` and product params

5. Update `CartDrawer.tsx`:
   - `handleCheckout` → navigate to `/payment-select?mode=cart`

6. Update `App.tsx`:
   - Add `paymentSelectRoute` for `/payment-select` with `PaymentSelect` component

7. ThankYou page already serves as Order Confirmation — no changes needed.
