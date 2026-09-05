import { Button, Card, Input } from "@keenvector/kvcl";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "../../components/Seo";
import { login } from "../../services/api/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(undefined);
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch {
      setError("We couldn't sign you in with those details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo title="Log in" description="Log in to your KeenVector account." />
      <Card>
        <h1 className="font-display text-2xl font-bold text-white">Log in</h1>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Log in"}
          </Button>
        </form>
        <div className="mt-6 flex items-center justify-between text-sm text-ink-400">
          <Link to="/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-white">
            Create an account
          </Link>
        </div>
      </Card>
    </>
  );
}
