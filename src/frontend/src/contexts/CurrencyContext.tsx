import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrencyContextValue {
  formatPrice: (usdPrice: number) => string;
  currencyCode: string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

// Approximate USD exchange rates (updated periodically — good enough for display)
const USD_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149.5,
  CNY: 7.24,
  BRL: 4.97,
  MXN: 17.1,
  SGD: 1.34,
  AED: 3.67,
  SAR: 3.75,
  ZAR: 18.6,
  KRW: 1325,
  IDR: 15600,
  MYR: 4.7,
  THB: 35.1,
  PKR: 278,
  BDT: 110,
  LKR: 315,
  NPR: 133,
  NGN: 1550,
  GHS: 15.8,
  KES: 129,
  EGP: 48.5,
  TRY: 32.5,
  RUB: 90,
  CHF: 0.89,
  SEK: 10.4,
  NOK: 10.6,
  DKK: 6.88,
  PLN: 3.97,
  CZK: 22.9,
  HUF: 355,
  RON: 4.57,
  ILS: 3.74,
  CLP: 940,
  COP: 3930,
  PEN: 3.72,
  ARS: 855,
  VND: 24500,
  PHP: 56.5,
  NZD: 1.64,
  HKD: 7.82,
  TWD: 32.1,
};

// Country -> currency code
const COUNTRY_CURRENCY: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  MX: "MXN",
  BR: "BRL",
  AR: "ARS",
  CL: "CLP",
  CO: "COP",
  PE: "PEN",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  PT: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  GR: "EUR",
  FI: "EUR",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  CH: "CHF",
  PL: "PLN",
  CZ: "CZK",
  HU: "HUF",
  RO: "RON",
  RU: "RUB",
  TR: "TRY",
  IL: "ILS",
  SA: "SAR",
  AE: "AED",
  EG: "EGP",
  NG: "NGN",
  GH: "GHS",
  KE: "KES",
  ZA: "ZAR",
  IN: "INR",
  PK: "PKR",
  BD: "BDT",
  LK: "LKR",
  NP: "NPR",
  CN: "CNY",
  JP: "JPY",
  KR: "KRW",
  SG: "SGD",
  MY: "MYR",
  TH: "THB",
  ID: "IDR",
  PH: "PHP",
  VN: "VND",
  AU: "AUD",
  NZ: "NZD",
  HK: "HKD",
  TW: "TWD",
};

async function detectCountry(): Promise<string> {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error("ipapi failed");
    const data = await res.json();
    return data.country_code ?? "US";
  } catch {
    // Fallback: try browser locale
    const locale = navigator.language || "en-US";
    const parts = locale.split("-");
    if (parts.length >= 2) return parts[parts.length - 1].toUpperCase();
    return "US";
  }
}

function getCurrencySymbol(code: string): string {
  try {
    const formatted = new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(0);
    // Extract just the symbol (remove digits and spaces)
    return formatted.replace(/[\d\s,.\u00A0]/g, "").trim();
  } catch {
    return code;
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCountry().then((country) => {
      const code = COUNTRY_CURRENCY[country] ?? "USD";
      setCurrencyCode(code);
      setIsLoading(false);
    });
  }, []);

  const formatPrice = (usdPrice: number): string => {
    const rate = USD_RATES[currencyCode] ?? 1;
    const localPrice = usdPrice * rate;

    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: localPrice >= 100 ? 0 : 2,
        maximumFractionDigits: localPrice >= 100 ? 0 : 2,
      }).format(localPrice);
    } catch {
      const symbol = getCurrencySymbol(currencyCode);
      return `${symbol}${localPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ formatPrice, currencyCode, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
