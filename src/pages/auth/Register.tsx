import { Button, Card, Input } from "@keenvector/kvcl";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "../../components/Seo";
import { register } from "../../services/api/auth";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const emptyForm: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!form.businessName.trim()) errors.businessName = "Enter your business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Enter a phone number.";
  if (form.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords don't match.";
  return errors;
}

export function Register() {
  const navigate = useNavigate();
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
      await register(form);
      navigate("/onboarding");
    } catch {
      setFormError("We couldn't create your account. Please try again.");
    } finally {
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
            label="Name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            error={errors.name}
            autoComplete="name"
          />
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
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            error={errors.phone}
            autoComplete="tel"
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
