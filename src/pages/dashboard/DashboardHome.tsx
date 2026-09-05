import { Badge, Card } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";
import { useTenant } from "../../hooks/useTenant";
import { dashboardMetrics } from "../../services/mock/dashboard";

export function DashboardHome() {
  const tenant = useTenant();

  return (
    <>
      <Seo title="Dashboard" description="KeenVector dashboard overview." />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">
          Welcome back, {tenant.businessName}
        </h1>
        <Badge tone="warning">Demo data</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
              {metric.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-white">{metric.value}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
