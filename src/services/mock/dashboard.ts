export interface DashboardMetric {
  label: string;
  value: string;
}

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total contacts", value: "1,284" },
  { label: "Conversations", value: "342" },
  { label: "Open conversations", value: "18" },
  { label: "Messages sent", value: "9,610" },
];
