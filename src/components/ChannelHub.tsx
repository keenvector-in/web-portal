import { AtSign, BellRing, Hash, Mail, Megaphone, MessageCircle, MessageSquare, Users } from "@keenvector/kvcl";

// Hero flow diagram, read left to right: Customers → the channels they use →
// KeenVector, where everything lands in one inbox and campaigns + team alerts go
// back out. Laid out as a CSS grid with straight bus-style connectors instead of
// a node graph, so the eye follows one direction and nothing crosses. Dashes on
// the connectors march toward KeenVector; still under prefers-reduced-motion.

const channels = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, tone: "text-accent-400", ring: "ring-accent-400/30" },
  { id: "instagram", label: "Instagram", icon: AtSign, tone: "text-pink-400", ring: "ring-pink-400/30" },
  { id: "sms", label: "SMS", icon: MessageSquare, tone: "text-sky-400", ring: "ring-sky-400/30" },
  { id: "email", label: "Email", icon: Mail, tone: "text-amber-400", ring: "ring-amber-400/30" },
] as const;

const alertTargets = [
  { id: "slack", icon: Hash, tone: "text-fuchsia-400", label: "Slack" },
  { id: "email", icon: Mail, tone: "text-amber-400", label: "Email" },
  { id: "sms", icon: MessageSquare, tone: "text-sky-400", label: "SMS" },
  { id: "whatsapp", icon: MessageCircle, tone: "text-accent-400", label: "WhatsApp" },
] as const;

const chip = "glass glass-hover flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-ink-100";
const iconWrap = "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-950 ring-1";

export function ChannelHub({ className = "" }: { className?: string }) {
  const rows = channels.length;
  return (
    <div
      className={`hub-grid relative grid items-center gap-y-2.5 ${className}`}
      style={{ gridTemplateColumns: "auto 2.5rem auto 3rem auto", gridTemplateRows: `repeat(${rows}, auto)` }}
    >
      {/* Customers */}
      <div className="relative" style={{ gridRow: `1 / span ${rows}` }}>
        <div className={chip}>
          <span className={`${iconWrap} ring-brand-400/40`}>
            <Users className="h-4 w-4 text-brand-300" />
          </span>
          Customers
        </div>
        <span aria-hidden className="hub-flow absolute left-full top-1/2 h-px w-10 -translate-y-1/2" />
      </div>

      {/* Bus + channels + bus, one row per channel */}
      {channels.map((c, i) => (
        <Bus key={`l-${c.id}`} row={i + 1} col={2} rows={rows} side="right" />
      ))}
      {channels.map((c, i) => (
        <div key={c.id} className={chip} style={{ gridColumn: 3, gridRow: i + 1 }}>
          <span className={`${iconWrap} ${c.ring}`}>
            <c.icon className={`h-4 w-4 ${c.tone}`} />
          </span>
          {c.label}
        </div>
      ))}
      {channels.map((c, i) => (
        <Bus key={`r-${c.id}`} row={i + 1} col={4} rows={rows} side="left" />
      ))}

      {/* KeenVector */}
      <div className="relative" style={{ gridColumn: 5, gridRow: `1 / span ${rows}` }}>
        <span aria-hidden className="hub-flow absolute right-full top-1/2 h-px w-12 -translate-y-1/2" />
        <div className="gradient-ring glass relative isolate w-64 rounded-2xl p-4 [--ring-width:1px]">
          <div className="flex items-center gap-3">
            <img src="/brand/logo-mark.svg" alt="" className="h-10 w-10" />
            <div>
              <div className="font-display text-[15px] font-semibold text-white">KeenVector</div>
              <div className="text-xs text-ink-400">One shared inbox</div>
            </div>
          </div>
          <div className="my-3 h-px bg-white/10" />
          <div className="flex items-center justify-between text-[13px] text-ink-200">
            <span className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-brand-300" /> Campaigns
            </span>
            <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-medium text-brand-300">Outbound</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[13px] text-ink-200">
            <span className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-rose-400" /> Team alerts
            </span>
            <span className="flex items-center gap-1">
              {alertTargets.map((a) => (
                <span key={a.id} title={a.label} className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-900 ring-1 ring-white/10">
                  <a.icon className={`h-3.5 w-3.5 ${a.tone}`} />
                </span>
              ))}
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold leading-none text-white">3</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// One cell of a vertical "bus": a vertical segment (trimmed at the first and
// last row) plus a horizontal stub toward the channel on `side`.
function Bus({ row, col, rows, side }: { row: number; col: number; rows: number; side: "left" | "right" }) {
  const top = row === 1 ? "50%" : "0";
  const bottom = row === rows ? "50%" : "0";
  return (
    <div aria-hidden className="relative h-full min-h-11" style={{ gridColumn: col, gridRow: row }}>
      <span className="absolute left-1/2 w-px bg-brand-400/40" style={{ top, bottom }} />
      <span className={`hub-flow absolute top-1/2 h-px w-1/2 -translate-y-1/2 ${side === "right" ? "left-1/2" : "right-1/2"}`} />
    </div>
  );
}
