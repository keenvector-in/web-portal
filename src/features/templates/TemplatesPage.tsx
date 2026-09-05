import { Badge, Button, Card } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";
import { templates } from "../../services/mock/templates";

const statusTone = {
  approved: "accent",
  pending: "warning",
  rejected: "warning",
  draft: "neutral",
} as const;

export function TemplatesPage() {
  return (
    <>
      <Seo title="Templates" description="Manage reusable business messaging templates." />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Templates</h1>
        <Button>Create template</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id}>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-white">{template.name}</h3>
              <Badge tone={statusTone[template.status]}>{template.status}</Badge>
            </div>
            <p className="mt-1 text-xs text-ink-500">
              {template.category} · {template.language}
            </p>
            <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-ink-300">{template.preview}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
