import { Badge, Button } from "@keenvector/kvcl";
import { useState } from "react";
import { Seo } from "../../components/Seo";
import { conversations, messagesByConversation } from "../../services/mock/inbox";

const statusTone = { open: "accent", pending: "warning", closed: "neutral" } as const;

export function InboxPage() {
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const active = conversations.find((c) => c.id === activeId);
  const messages = activeId ? messagesByConversation[activeId] ?? [] : [];

  return (
    <>
      <Seo title="Inbox" description="Customer conversations across every channel." />
      <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr_260px]">
        <div className="overflow-y-auto rounded-2xl border border-white/10">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveId(conversation.id)}
              className={`flex w-full flex-col gap-1 border-b border-white/5 p-4 text-left transition-colors ${
                conversation.id === activeId ? "bg-white/5" : "hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{conversation.customerName}</span>
                <span className="text-xs text-ink-500">{conversation.timestamp}</span>
              </div>
              <p className="truncate text-xs text-ink-400">{conversation.lastMessage}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone={statusTone[conversation.status]} className="text-[10px]">
                  {conversation.status}
                </Badge>
                {conversation.unread ? <span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> : null}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  message.from === "agent"
                    ? "ml-auto bg-brand-600 text-white"
                    : "bg-white/5 text-ink-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <button className="rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-white/5" type="button">
              Attach
            </button>
            <button className="rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-white/5" type="button">
              Template
            </button>
            <button className="rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-white/5" type="button">
              AI assist
            </button>
            <input
              type="text"
              placeholder="Write a message…"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <Button size="md">Send</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-4">
          {active ? (
            <>
              <h3 className="font-display text-sm font-semibold text-white">{active.customerName}</h3>
              <p className="mt-1 text-xs text-ink-400">Status: {active.status}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="md" className="flex-1">
                  Assign
                </Button>
                <Button variant="ghost" size="md" className="flex-1">
                  Close
                </Button>
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-ink-500">Tags</p>
              <p className="mt-1 text-sm text-ink-300">No tags yet</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-500">Notes</p>
              <p className="mt-1 text-sm text-ink-300">No notes yet</p>
            </>
          ) : (
            <p className="text-sm text-ink-400">Select a conversation to see customer details.</p>
          )}
        </div>
      </div>
    </>
  );
}
