export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/logo-lockup-dark.svg"
      alt="KeenVector"
      className={`h-8 w-auto ${className}`}
    />
  );
}
