import { Link, Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 py-12">
      <Link to="/" className="mb-8">
        <Logo />
      </Link>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
