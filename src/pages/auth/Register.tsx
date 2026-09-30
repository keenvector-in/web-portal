import { Button, Card, Input, Link } from "@keenvector/kvcl";
import { useState, type FormEvent } from "react";import { Seo } from "../../components/Seo";
import { continueToBusinessAdmin, signup } from "../../services/api/auth";
import { ApiRequestError } from "../../services/api/client";

interface FormState {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const emptyForm: FormState = {
  businessName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const businessName = form.businessName.trim();
  if (businessName.length < 2 || businessName.length > 80)
    errors.businessName = "Business name must be 2 to 80 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (form.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords don't match.";
  return errors;
}

export function Register() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError(undefined);
    try {
      const session = await signup({
        business_name: form.businessName.trim(),
        email: form.email,
        password: form.password,
      });
      await continueToBusinessAdmin("access_token" in session ? session : undefined);
    } catch (error) {
      setFormError(
        error instanceof ApiRequestError && error.status > 0
          ? error.message
          : "We couldn't create your account. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo title="Create your account" description="Create a KeenVector account for your business." />
      <Card>
        <h1 className="font-display text-2xl font-bold text-white">Create your account</h1>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <Input
            label="Business name"
            value={form.businessName}
            onChange={(event) => update("businessName", event.target.value)}
            error={errors.businessName}
            autoComplete="organization"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) => update("password", event.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={(event) => update("confirmPassword", event.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
          {formError ? <p className="text-sm text-red-400">{formError}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-400">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-300 hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </>
  );
}
