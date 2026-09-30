import { Card, Link } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";

// No reset backend exists yet, so this page must not claim an email was sent (U-14).
export function ForgotPassword() {
  return (
    <>
      <Seo title="Reset your password" description="Reset your KeenVector account password." />
      <Card>
        <h1 className="font-display text-2xl font-bold text-white">Reset your password</h1>
        <p className="mt-6 text-sm text-ink-300">
          Self-service password reset isn't available yet.{" "}
          <Link to="/contact" className="text-brand-300 hover:underline">
            Contact us
          </Link>{" "}
          from the email address on your account and we'll help you get back in.
        </p>
        <p className="mt-6 text-center text-sm text-ink-400">
          <Link to="/login" className="text-brand-300 hover:underline">
            Back to log in
          </Link>
        </p>
      </Card>
    </>
  );
}
