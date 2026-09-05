import { Button } from "@keenvector/kvcl";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page doesn't exist." />
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-display text-6xl font-bold text-white">404</p>
        <p className="mt-4 text-ink-300">This page doesn't exist, or has moved.</p>
        <Button as={Link} to="/" className="mt-8">
          Back to home
        </Button>
      </div>
    </>
  );
}
