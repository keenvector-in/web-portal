// Decorative hero backdrop: a faint automation pipeline (trigger → condition →
// actions) drawn as rounded nodes and orthogonal connectors. Dashes flow along the
// connectors so the "process" reads as alive; reduced-motion freezes it. Masked to
// stay low-contrast behind the headline.

// Shape vocabulary borrowed from flowcharts: pill = trigger, diamond = condition,
// rounded rect = action, hexagon = wait/delay, circle = end, bubble = message.
type Kind = "trigger" | "cond" | "action" | "delay" | "end" | "message";
type Node = { x: number; y: number; kind: Kind };

// Two small pipelines: one across the top band, one along the bottom, leaving
// the middle band (headline + hub diagram) clear.
const nodes: Node[] = [
  // top band
  { x: 40, y: 70, kind: "trigger" },
  { x: 260, y: 70, kind: "cond" },
  { x: 480, y: 30, kind: "message" },
  { x: 480, y: 110, kind: "delay" },
  { x: 700, y: 70, kind: "action" },
  { x: 920, y: 70, kind: "cond" },
  { x: 1140, y: 30, kind: "message" },
  { x: 1140, y: 110, kind: "action" },
  { x: 1360, y: 70, kind: "end" },
  // bottom band
  { x: 140, y: 430, kind: "trigger" },
  { x: 360, y: 430, kind: "delay" },
  { x: 580, y: 430, kind: "cond" },
  { x: 800, y: 390, kind: "message" },
  { x: 800, y: 470, kind: "action" },
  { x: 1020, y: 430, kind: "action" },
  { x: 1240, y: 430, kind: "delay" },
  { x: 1460, y: 430, kind: "end" },
];

// Orthogonal (elbow) connector between node right-edge and next node left-edge.
const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [5, 6], [5, 7], [6, 8], [7, 8],
  [9, 10], [10, 11], [11, 12], [11, 13], [12, 14], [13, 14], [14, 15], [15, 16],
];
const W = 96;
const H = 32;

function elbow(a: Node, b: Node) {
  const x1 = a.x + W, y1 = a.y + H / 2, x2 = b.x, y2 = b.y + H / 2;
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} H${mx} V${y2} H${x2}`;
}

function Shape({ kind }: { kind: Kind }) {
  const h = H / 2;
  switch (kind) {
    case "cond":
      return <path d={`M${W / 2} 0 L${W} ${h} L${W / 2} ${H} L0 ${h} Z`} />;
    case "delay":
      return <path d={`M12 0 H${W - 12} L${W} ${h} L${W - 12} ${H} H12 L0 ${h} Z`} />;
    case "end":
      return (
        <>
          <circle cx={h} cy={h} r={h} />
          <circle cx={h} cy={h} r={h - 6} fill="currentColor" stroke="none" opacity="0.5" />
        </>
      );
    case "message":
      return <path d={`M8 0 H${W - 8} a8 8 0 0 1 8 8 V${H - 12} a8 8 0 0 1 -8 8 H30 L18 ${H + 6} V${H - 4} H8 a8 8 0 0 1 -8 -8 V8 a8 8 0 0 1 8 -8 Z`} />;
    default:
      return <rect width={W} height={H} rx={kind === "trigger" ? h : 8} />;
  }
}

export function WorkflowBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 500"
      preserveAspectRatio="xMidYMid slice"
      className={`wf-backdrop pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        {edges.map(([a, b]) => (
          <path key={`${a}-${b}`} d={elbow(nodes[a], nodes[b])} className="wf-edge" />
        ))}
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <Shape kind={n.kind} />
            {n.kind !== "end" && (
              <rect x="14" y={H / 2 - 3} width={W * 0.45} height="6" rx="3" fill="currentColor" stroke="none" opacity="0.5" />
            )}
          </g>
        ))}
        {edges.map(([a, b]) => (
          <circle key={`p-${a}-${b}`} cx={nodes[a].x + W} cy={nodes[a].y + H / 2} r="2.5" fill="currentColor" stroke="none" />
        ))}
      </g>
    </svg>
  );
}
