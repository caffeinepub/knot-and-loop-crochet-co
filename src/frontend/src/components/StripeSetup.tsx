import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function StripeSetup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [secretKey, setSecretKey] = useState("");
  const [countriesInput, setCountriesInput] = useState("US,IN,GB,CA,AU");

  const { data: isStripeConfigured, isLoading: isCheckingStripe } = useQuery({
    queryKey: ["isStripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).isStripeConfigured();
    },
    enabled: !!actor,
  });

  const { data: isAdmin } = useQuery({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).isCallerAdmin();
    },
    enabled: !!actor,
  });

  const configureMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const countries = countriesInput
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean);
      await (actor as any).setStripeConfiguration(secretKey, countries);
    },
    onSuccess: () => {
      toast.success("Stripe configured successfully!");
      queryClient.invalidateQueries({ queryKey: ["isStripeConfigured"] });
      setSecretKey("");
    },
    onError: (err) => {
      toast.error("Failed to configure Stripe", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    },
  });

  // Don't render for non-admins or while loading
  if (isCheckingStripe || !isAdmin) return null;

  // If already configured, show a small badge
  if (isStripeConfigured) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-warm text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="font-medium">Stripe Configured</span>
        </div>
      </div>
    );
  }

  // Show setup form for unconfigured admin
  return (
    <div className="fixed bottom-4 right-4 z-50 w-[360px]">
      <div className="bg-card border border-border rounded-2xl shadow-warm-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Set Up Payments
            </h3>
            <p className="text-xs text-muted-foreground">
              Connect Stripe to accept orders
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="stripe-secret-key"
              className="text-sm font-medium text-foreground"
            >
              Stripe Secret Key
            </Label>
            <Input
              id="stripe-secret-key"
              type="password"
              placeholder="sk_live_..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="rounded-xl border-border focus-visible:ring-primary text-sm"
              data-ocid="stripe_setup.input"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Find this in your Stripe Dashboard → API keys
            </p>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="stripe-countries"
              className="text-sm font-medium text-foreground"
            >
              Allowed Countries
            </Label>
            <Input
              id="stripe-countries"
              type="text"
              placeholder="US,IN,GB,CA,AU"
              value={countriesInput}
              onChange={(e) => setCountriesInput(e.target.value)}
              className="rounded-xl border-border focus-visible:ring-primary text-sm"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated ISO country codes
            </p>
          </div>

          <Button
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => configureMutation.mutate()}
            disabled={!secretKey.trim() || configureMutation.isPending}
            data-ocid="stripe_setup.submit_button"
          >
            {configureMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              "Save Stripe Configuration"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
