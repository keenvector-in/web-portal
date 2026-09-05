import { Button, Card, Container, Input } from "@keenvector/kvcl";
import { useState, type FormEvent } from "react";
import { Seo } from "../../components/Seo";
import { submitContact } from "../../services/api/contact";
import { directContacts, site } from "../../config/site";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = { name: "", businessName: "", email: "", phone: "", message: "" };

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!form.businessName.trim()) errors.businessName = "Enter your business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.message.trim()) errors.message = "Tell us what you need help with.";
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitContact(form);
      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Container className="max-w-lg py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Message sent</h1>
        <p className="mt-4 text-ink-300">
          Thanks for reaching out — we'll get back to you at the email you provided.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Seo title="Contact" description={`Get in touch with the ${site.name} team.`} />
      <Container className="max-w-lg py-20">
        <h1 className="font-display text-4xl font-bold text-white">Contact us</h1>
        <p className="mt-4 text-ink-300">
          Questions about the product, pricing, or your data? Send us a message.
        </p>
        <Card className="mt-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
              label="Phone (optional)"
              type="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              autoComplete="tel"
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-ink-200">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                className={`rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                  errors.message ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : null}
            </div>
            {status === "error" ? (
              <p className="text-sm text-red-400">
                Something went wrong sending your message. Please try again in a moment.
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
        <div className="mt-8 space-y-1.5 text-sm text-ink-400">
          <p>Or reach us directly:</p>
          {directContacts.map((c) => (
            <p key={c.email}>
              {c.label}:{" "}
              <a href={`mailto:${c.email}`} className="text-brand-300 hover:underline">
                {c.email}
              </a>
            </p>
          ))}
        </div>
      </Container>
    </>
  );
}
