import { Badge, Menu, NavLink, Outlet } from "@keenvector/kvcl";
import { useState } from "react";
import { Logo } from "../components/Logo";
import { dashboardNav } from "../config/site";
import { TenantProvider, useTenant } from "../hooks/useTenant";
import { env } from "../config/env";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            onClick={onNavigate}
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
    </>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-ink-900 md:flex">
      <SidebarNav />
    </aside>
  );
}

function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-white/5 bg-ink-900">
        <SidebarNav onNavigate={onClose} />
      </aside>
    </div>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const tenant = useTenant();
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-ink-950 px-6">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onOpenMenu}
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-200 hover:bg-white/5 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <span className="text-sm font-medium text-ink-200">{tenant.businessName}</span>
    </header>
  );
}

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <TenantProvider>
      <div className="flex min-h-screen bg-ink-950">
        <Sidebar />
        <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <div className="flex flex-1 flex-col">
          <Topbar onOpenMenu={() => setMobileNavOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TenantProvider>
  );
}
