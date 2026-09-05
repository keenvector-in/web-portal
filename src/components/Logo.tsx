export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/logo-lockup-dark.svg"
      alt="KeenVector"
      className={`h-6 w-auto ${className}`}
    />
  );
}
