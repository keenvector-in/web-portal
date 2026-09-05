import { Badge, Card } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";
import { dashboardMetrics } from "../../services/mock/dashboard";

export function AnalyticsPage() {
  return (
    <>
      <Seo title="Analytics" description="Understand communication activity and engagement." />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <Badge tone="warning">Demo data</Badge>
      </div>
      <Card>
        <p className="text-sm text-ink-400">Messages sent, last 7 days</p>
        <div className="mt-6 flex h-40 items-end gap-3">
          {[42, 58, 39, 71, 65, 80, 74].map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400"
                style={{ height: `${value}%` }}
              />
              <span className="text-[10px] text-ink-500">Day {index + 1}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{metric.label}</p>
            <p className="mt-2 font-display text-xl font-bold text-white">{metric.value}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
