import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  identity: ReturnType<typeof useInternetIdentity>["identity"];
  isLoggedIn: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: () => void;
  logout: () => void;
  principal: string | null;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isLoggedIn = useMemo(() => {
    if (!identity) return false;
    return !identity.getPrincipal().isAnonymous();
  }, [identity]);

  const principal = useMemo(() => {
    if (!isLoggedIn || !identity) return null;
    return identity.getPrincipal().toString();
  }, [isLoggedIn, identity]);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const value: AuthContextValue = {
    identity,
    isLoggedIn,
    isInitializing,
    isLoggingIn,
    login,
    logout: clear,
    principal,
    openLoginModal,
    closeLoginModal,
    loginModalOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
