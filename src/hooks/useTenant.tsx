import { createContext, useContext, type ReactNode } from "react";
import type { Tenant } from "../types/tenant";

const demoTenant: Tenant = {
  id: "demo-tenant",
  businessName: "Acme Retail",
  industry: "Retail",
  country: "IN",
  timezone: "Asia/Kolkata",
};

const TenantContext = createContext<Tenant>(demoTenant);

export function TenantProvider({
  tenant = demoTenant,
  children,
}: {
  tenant?: Tenant;
  children: ReactNode;
}) {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
}

export function useTenant(): Tenant {
  return useContext(TenantContext);
}
