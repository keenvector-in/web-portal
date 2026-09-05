import { Badge, Button, Card } from "@keenvector/kvcl";
import { useEffect, useState } from "react";
import { Seo } from "../../components/Seo";
import {
  whatsAppOnboardingService,
  type WhatsAppConnectionStatus,
} from "../../services/whatsapp/WhatsAppOnboardingService";

const stateCopy = {
  available: { label: "Ready to connect", tone: "accent" as const },
  coming_soon: { label: "Coming soon", tone: "neutral" as const },
  configuration_required: { label: "Configuration required", tone: "warning" as const },
};

export function WhatsAppSettings() {
  const [status, setStatus] = useState<WhatsAppConnectionStatus>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    whatsAppOnboardingService.getConnectionStatus().then(setStatus);
  }, []);

  const connected = Boolean(status?.phoneNumber);

  async function handleConnect() {
    setBusy(true);
    setError(undefined);
    try {
      const next = await whatsAppOnboardingService.startSignup();
      setStatus(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect WhatsApp. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDisconnect() {
    setBusy(true);
    setError(undefined);
    try {
      await whatsAppOnboardingService.disconnect();
      setStatus(await whatsAppOnboardingService.getConnectionStatus());
    } catch {
      setError("Could not disconnect right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Seo title="WhatsApp connection" description="Manage your WhatsApp Business connection." />
      <h1 className="mb-6 font-display text-2xl font-bold text-white">WhatsApp connection</h1>
      <Card className="max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Connection status</h2>
          {status ? (
            <Badge tone={connected ? "accent" : stateCopy[status.state].tone}>
              {connected ? "Connected" : stateCopy[status.state].label}
            </Badge>
          ) : null}
        </div>
        {connected ? (
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-400">Phone number</dt>
              <dd className="text-white">{status?.phoneNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Business account</dt>
              <dd className="text-white">{status?.businessAccountId}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-ink-400">
            No WhatsApp Business account connected yet.
          </p>
        )}
        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        <div className="mt-6 flex gap-3">
          {connected ? (
            <>
              <Button variant="secondary" onClick={handleConnect} disabled={busy}>
                {busy ? "Reconnecting…" : "Reconnect"}
              </Button>
              <Button variant="ghost" onClick={handleDisconnect} disabled={busy}>
                {busy ? "Disconnecting…" : "Disconnect"}
              </Button>
            </>
          ) : (
            <Button onClick={handleConnect} disabled={busy || status?.state !== "available"}>
              {busy ? "Connecting…" : "Connect WhatsApp"}
            </Button>
          )}
        </div>
      </Card>
    </>
  );
}
