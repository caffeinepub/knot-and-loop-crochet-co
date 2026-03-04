import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function AuthModal() {
  const { loginModalOpen, closeLoginModal, login, isLoggingIn, isLoggedIn } =
    useAuth();

  // Auto-close on successful login
  useEffect(() => {
    if (isLoggedIn && loginModalOpen) {
      closeLoginModal();
    }
  }, [isLoggedIn, loginModalOpen, closeLoginModal]);

  return (
    <Dialog open={loginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent
        className="sm:max-w-md rounded-2xl border-border bg-background p-8"
        data-ocid="auth.modal"
      >
        <DialogHeader className="text-center items-center gap-3">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>

          <DialogTitle className="font-display text-2xl font-bold text-foreground text-center">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            Knot & Loop uses secure, passwordless login. No account creation or
            passwords — just one tap to sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Benefits list */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-2.5">
            {[
              "No password to remember",
              "Your account is always secure",
              "Works on all your devices",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {isLoggingIn ? (
            <div
              className="flex flex-col items-center gap-3 py-4"
              data-ocid="auth.loading_state"
            >
              <Loader2 className="w-7 h-7 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Opening login window…
              </p>
            </div>
          ) : (
            <Button
              onClick={login}
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 shadow-warm transition-all duration-200 active:scale-[0.98]"
              data-ocid="auth.login_button"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Sign In Securely
            </Button>
          )}

          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            Powered by{" "}
            <span className="font-medium text-foreground/60">
              Internet Identity
            </span>{" "}
            — decentralized, privacy-first authentication
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
