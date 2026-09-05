import { Card } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";

export function PlaceholderSettings({ title }: { title: string }) {
  return (
    <>
      <Seo title={title} description={`${title} for your KeenVector account.`} />
      <h1 className="mb-6 font-display text-2xl font-bold text-white">{title}</h1>
      <Card>
        <p className="text-sm text-ink-400">
          {title} isn't built yet — this is a placeholder so navigation isn't a dead end.
        </p>
      </Card>
    </>
  );
}
