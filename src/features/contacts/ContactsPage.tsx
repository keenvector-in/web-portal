import { Badge, Button, Input } from "@keenvector/kvcl";
import { useMemo, useState } from "react";
import { Seo } from "../../components/Seo";
import { contacts } from "../../services/mock/contacts";

export function ContactsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <>
      <Seo title="Contacts" description="Organize contacts and customer information." />
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-white">Contacts</h1>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Import</Button>
          <Button>Add contact</Button>
        </div>
      </div>
      <div className="mb-4 max-w-xs">
        <Input
          label="Search"
          placeholder="Search contacts…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last interaction</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-400">
                  No contacts match "{search}".
                </td>
              </tr>
            ) : (
              filtered.map((contact) => (
                <tr key={contact.id} className="border-b border-white/5 text-ink-200">
                  <td className="px-4 py-3 font-medium text-white">{contact.name}</td>
                  <td className="px-4 py-3">{contact.phone}</td>
                  <td className="px-4 py-3">{contact.email}</td>
                  <td className="px-4 py-3">{contact.source}</td>
                  <td className="px-4 py-3">
                    <Badge tone={contact.status === "active" ? "accent" : "neutral"}>
                      {contact.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-ink-400">{contact.lastInteraction}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
