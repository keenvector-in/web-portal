import { Button, Card, Input, Link } from "@keenvector/kvcl";
import { useState, type FormEvent } from "react";
import { Seo } from "../../components/Seo";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Seo title="Reset your password" description="Reset your KeenVector account password." />
      <Card>
        <h1 className="font-display text-2xl font-bold text-white">Reset your password</h1>
        {sent ? (
          <p className="mt-6 text-sm text-ink-300">
            If an account exists for {email}, we've sent password reset instructions.
          </p>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-ink-400">
          <Link to="/login" className="text-brand-300 hover:underline">
            Back to log in
          </Link>
        </p>
      </Card>
    </>
  );
}
