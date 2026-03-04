# Knot and Loop Crochet Co

## Current State

- Multi-page React frontend: Home, Shop, About, Contact, PaymentSuccess, PaymentFailure
- Backend has basic Product data (id, name, price, description, category) — read-only, no user data stored
- Stripe component integrated but no user accounts
- Cart context in frontend, currency context for region-based pricing
- No login/signup, no user database, no order history

## Requested Changes (Diff)

### Add
- User login and signup (email + password via authorization component)
- User profile stored in backend: name, email, address
- Orders stored in backend: order ID, user principal, items, total, status, timestamp
- After successful Stripe payment, save order to backend
- Order history page for logged-in users
- Login/Signup page and modal accessible from navbar
- Protected routes: order history requires login

### Modify
- Navbar: add Login/Signup button when logged out, show user name + logout when logged in
- Cart checkout: if not logged in, prompt to login before checkout
- Payment success page: save order to backend after successful payment

### Remove
- Nothing removed

## Implementation Plan

1. Backend: Add User type (principal, name, email, address), Order type (id, userPrincipal, items, total, currency, status, createdAt)
2. Backend: Add functions — registerUser, getUser, updateUser, createOrder, getMyOrders, getAllOrders (admin)
3. Select components: authorization, stripe
4. Frontend: Add AuthContext using authorization component
5. Frontend: Add LoginModal / SignupModal components
6. Frontend: Update Navbar with auth state (login button / user menu)
7. Frontend: Add OrderHistory page
8. Frontend: Update PaymentSuccess to save order after payment
9. Frontend: Add route for /orders (protected)
10. Frontend: Cart checkout flow prompts login if not authenticated
