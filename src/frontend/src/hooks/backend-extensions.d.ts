/**
 * Augments backendInterface and Backend with authorization and Stripe methods
 * provided by the Caffeine authorization and stripe components.
 *
 * These methods exist at runtime (the ICP actor proxy forwards them to the canister)
 * but are not yet reflected in the auto-generated backend.ts.
 *
 * Placed in hooks/ so the augmentation path "../backend" matches
 * exactly what useActor.ts imports from.
 */

// This export makes this file a module, which is required for declare module augmentations.
export {};

declare module "../backend" {
  interface backendInterface {
    // Authorization
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    getCallerUserRole(): Promise<
      { admin: null } | { user: null } | { guest: null }
    >;

    // Stripe
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(
      secretKey: string,
      allowedCountries: string[],
    ): Promise<void>;
    createCheckoutSession(
      items: Array<{
        currency: string;
        productName: string;
        productDescription: string;
        priceInCents: bigint;
        quantity: bigint;
      }>,
      successUrl: string,
      cancelUrl: string,
    ): Promise<string>;
  }

  // Backend class must also satisfy the extended interface (checked in config.ts)
  interface Backend {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    getCallerUserRole(): Promise<
      { admin: null } | { user: null } | { guest: null }
    >;
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(
      secretKey: string,
      allowedCountries: string[],
    ): Promise<void>;
    createCheckoutSession(
      items: Array<{
        currency: string;
        productName: string;
        productDescription: string;
        priceInCents: bigint;
        quantity: bigint;
      }>,
      successUrl: string,
      cancelUrl: string,
    ): Promise<string>;
  }
}
