// Type declaration for Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayCheckoutOptions {
  productName: string;
  priceInPaise: number;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
}

const RAZORPAY_KEY_ID = "rzp_test_placeholder";
const SDK_URL = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpaySDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${SDK_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Failed to load Razorpay SDK")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

export async function openRazorpayCheckout(
  options: RazorpayCheckoutOptions,
): Promise<void> {
  await loadRazorpaySDK();

  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY_ID,
    amount: options.priceInPaise,
    currency: "INR",
    name: "Knot and Loop Crochet Co",
    description: options.description ?? options.productName,
    prefill: options.prefill ?? {},
    theme: {
      color: "#C17C5A",
    },
    handler: (response: RazorpayResponse) => {
      options.onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        if (options.onDismiss) {
          options.onDismiss();
        }
      },
    },
  });

  rzp.open();
}
