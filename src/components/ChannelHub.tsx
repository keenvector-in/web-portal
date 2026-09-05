import { AtSign, Mail, MessageCircle } from "lucide-react";

// Hub-and-spoke diagram: WhatsApp, Instagram and Email as channel nodes, each linked
// to a central KeenVector node — literal illustration of "connect once, message
// everywhere" rather than an abstract network. Signal dots travel each spoke on a
// loop; everything pauses under prefers-reduced-motion.

// Spokes sit 120° apart on a circle around the hub so all three read as one
// balanced constellation instead of two nodes clustering near the top with the
// third stranded far below.
const spokes = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, x: 50, y: 15, ring: "ring-accent-400/40", tone: "text-accent-400" },
  { id: "instagram", label: "Instagram", icon: AtSign, x: 80, y: 68, ring: "ring-pink-400/40", tone: "text-pink-400" },
  { id: "email", label: "Email", icon: Mail, x: 20, y: 68, ring: "ring-amber-400/40", tone: "text-amber-400" },
] as const;

const center = { x: 50, y: 50 };

export function ChannelHub({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="55%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <style>
          {`
            @keyframes hub-travel {
              0% { offset-distance: 0%; opacity: 0; }
              12% { opacity: 1; }
              88% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            .hub-signal {
              animation: hub-travel 2.8s linear infinite;
              animation-delay: calc(var(--i, 0) * 0.6s);
            }
            @keyframes hub-pulse-ring {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.7; }
            }
            .hub-core {
              animation: hub-pulse-ring 2.6s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .hub-signal { animation: none; opacity: 0; }
              .hub-core { animation: none; }
            }
          `}
        </style>

        {spokes.map((s) => (
          <line
            key={`line-${s.id}`}
            x1={center.x}
            y1={center.y}
            x2={s.x}
            y2={s.y}
            stroke="url(#hub-line)"
            strokeWidth="0.6"
            strokeOpacity="0.55"
          />
        ))}
        {spokes.map((s, i) => (
          <circle
            key={`signal-${s.id}`}
            r="1"
            fill="#5eead4"
            className="hub-signal"
            style={{
              offsetPath: `path('M${center.x} ${center.y} L${s.x} ${s.y}')`,
              // @ts-expect-error -- custom property used for animation-delay stagger
              "--i": i,
            }}
          />
        ))}
        <circle cx={center.x} cy={center.y} r="14" fill="url(#hub-line)" opacity="0.18" className="hub-core" />
      </svg>

      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        style={{ left: `${center.x}%`, top: `${center.y}%` }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-logo-from via-logo-via to-logo-to shadow-card ring-4 ring-white/10">
          <span className="font-display text-xs font-bold text-white">KV</span>
        </div>
        <span className="text-[10px] font-medium text-ink-300">KeenVector</span>
      </div>

      {spokes.map((s) => (
        <div
          key={s.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900 shadow-soft ring-2 ${s.ring}`}>
            <s.icon className={`h-5 w-5 ${s.tone}`} />
          </div>
          <span className="text-[10px] font-medium text-ink-400">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
