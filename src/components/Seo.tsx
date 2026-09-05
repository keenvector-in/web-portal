import { useEffect } from "react";
import { site } from "../config/site";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
  }, [title, description]);

  return null;
}
