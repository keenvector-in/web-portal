import { Badge } from "@keenvector/kvcl";
import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { dashboardNav } from "../config/site";
import { TenantProvider, useTenant } from "../hooks/useTenant";
import { env } from "../config/env";

function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-ink-900 md:flex">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-brand-500/15 text-brand-200" : "text-ink-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      {env.isDev ? (
        <div className="px-3 pb-4">
          <Badge tone="warning" className="w-full justify-center">
            Demo data
          </Badge>
        </div>
      ) : null}
    </aside>
  );
}

function Topbar() {
  const tenant = useTenant();
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-ink-950 px-6">
      <span className="text-sm font-medium text-ink-200">{tenant.businessName}</span>
    </header>
  );
}

export function DashboardLayout() {
  return (
    <TenantProvider>
      <div className="flex min-h-screen bg-ink-950">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TenantProvider>
  );
}
