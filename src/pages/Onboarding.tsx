import { Badge, Button, Card, Container, Input, useNavigate } from "@keenvector/kvcl";
import { useEffect, useState, type FormEvent } from "react";import { Seo } from "../components/Seo";
import { whatsAppOnboardingService, type WhatsAppConnectionState } from "../services/whatsapp/WhatsAppOnboardingService";

interface BusinessProfile {
  businessName: string;
  industry: string;
  website: string;
  country: string;
  timezone: string;
}

const emptyProfile: BusinessProfile = {
  businessName: "",
  industry: "",
  website: "",
  country: "",
  timezone: "",
};

const stateCopy: Record<WhatsAppConnectionState, { label: string; tone: "accent" | "neutral" | "warning" }> = {
  available: { label: "Ready to connect", tone: "accent" },
  coming_soon: { label: "Coming soon", tone: "neutral" },
  configuration_required: { label: "Configuration required", tone: "warning" },
};

function BusinessProfileStep({ onNext }: { onNext: (profile: BusinessProfile) => void }) {
  const [form, setForm] = useState<BusinessProfile>(emptyProfile);

  function update<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNext(form);
  }

  return (
    <Card>
      <h2 className="font-display text-xl font-semibold text-white">Business profile</h2>
      <p className="mt-1 text-sm text-ink-400">Tell us a little about your business.</p>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Business name"
          required
          value={form.businessName}
          onChange={(event) => update("businessName", event.target.value)}
        />
        <Input
          label="Industry"
          value={form.industry}
          onChange={(event) => update("industry", event.target.value)}
        />
        <Input
          label="Website"
          type="url"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Country"
            required
            value={form.country}
            onChange={(event) => update("country", event.target.value)}
          />
          <Input
            label="Timezone"
            required
            value={form.timezone}
            onChange={(event) => update("timezone", event.target.value)}
            placeholder="Asia/Kolkata"
          />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Card>
  );
}

function ConnectWhatsAppStep({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<WhatsAppConnectionState>();
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    whatsAppOnboardingService.getConnectionStatus().then((status) => setState(status.state));
  }, []);

  async function handleConnect() {
    setConnecting(true);
    await whatsAppOnboardingService.startSignup();
    setConnecting(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-white">Connect your WhatsApp Business account</h2>
        {state ? <Badge tone={stateCopy[state].tone}>{stateCopy[state].label}</Badge> : null}
      </div>
      <p className="mt-2 text-sm text-ink-400">
        This connects your number through Meta's own signup flow — KeenVector never sees or
        stores your Meta credentials.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleConnect} disabled={connecting || state !== "available"} className="flex-1">
          {connecting ? "Connecting…" : "Connect WhatsApp"}
        </Button>
        <Button variant="secondary" onClick={onDone} className="flex-1">
          Skip for now
        </Button>
      </div>
    </Card>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <>
      <Seo title="Onboarding" description="Set up your KeenVector business account." />
      <Container className="max-w-lg py-20">
        <div className="mb-8 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span className={step === 1 ? "text-brand-300" : ""}>1. Business profile</span>
          <span>—</span>
          <span className={step === 2 ? "text-brand-300" : ""}>2. Connect WhatsApp</span>
        </div>
        {step === 1 ? (
          <BusinessProfileStep onNext={() => setStep(2)} />
        ) : (
          <ConnectWhatsAppStep onDone={() => navigate("/dashboard")} />
        )}
      </Container>
    </>
  );
}
