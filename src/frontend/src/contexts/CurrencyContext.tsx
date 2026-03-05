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

// Approximate INR exchange rates (base currency: INR)
const INR_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  CAD: 0.0163,
  AUD: 0.0184,
  JPY: 1.79,
  CNY: 0.0868,
  BRL: 0.0596,
  MXN: 0.205,
  SGD: 0.0161,
  AED: 0.044,
  SAR: 0.045,
  ZAR: 0.223,
  KRW: 15.87,
  IDR: 186.9,
  MYR: 0.0563,
  THB: 0.421,
  PKR: 3.33,
  BDT: 1.32,
  LKR: 3.77,
  NPR: 1.59,
  NGN: 18.57,
  GHS: 0.189,
  KES: 1.55,
  EGP: 0.581,
  TRY: 0.389,
  RUB: 1.08,
  CHF: 0.0107,
  SEK: 0.125,
  NOK: 0.127,
  DKK: 0.0824,
  PLN: 0.0476,
  CZK: 0.274,
  HUF: 4.25,
  RON: 0.0548,
  ILS: 0.0448,
  CLP: 11.26,
  COP: 47.1,
  PEN: 0.0446,
  ARS: 10.24,
  VND: 293.6,
  PHP: 0.677,
  NZD: 0.0197,
  HKD: 0.0937,
  TWD: 0.385,
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
  const [currencyCode, setCurrencyCode] = useState<string>("INR");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCountry().then((country) => {
      const code = COUNTRY_CURRENCY[country] ?? "USD";
      setCurrencyCode(code);
      setIsLoading(false);
    });
  }, []);

  const formatPrice = (inrPrice: number): string => {
    const rate = INR_RATES[currencyCode] ?? INR_RATES.USD ?? 0.012;
    const localPrice = inrPrice * rate;

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
