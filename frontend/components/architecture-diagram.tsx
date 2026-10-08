// Animated Flomrg system diagram: shop app → API → stock ledger / reports / partner shops.

const nodes = [
  { id: "client", x: 20, y: 120, w: 150, label: "Shop app", sub: "Sales · Stock · PWA" },
  { id: "api", x: 250, y: 120, w: 150, label: "Flomrg API", sub: "Pricing · Credit" },
  { id: "ledger", x: 480, y: 30, w: 150, label: "Stock ledger", sub: "Batches · FEFO" },
  { id: "reports", x: 480, y: 120, w: 150, label: "Reports", sub: "P&L · Cash flow" },
  { id: "partner", x: 480, y: 210, w: 150, label: "Partner API", sub: "Shops · Webhooks" },
];

const H = 56;

const edges: [string, string][] = [
  ["client", "api"],
  ["api", "ledger"],
  ["api", "reports"],
  ["api", "partner"],
];

function center(id: string, side: "l" | "r") {
  const n = nodes.find((n) => n.id === id)!;
  return { x: side === "r" ? n.x + n.w : n.x, y: n.y + H / 2 };
}

export function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 650 290" className="h-auto w-full" role="img" aria-label="Flomrg architecture: shop app, Flomrg API, stock ledger, reports and partner API">
      <defs>
        <linearGradient id="edge" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      {edges.map(([a, b]) => {
        const s = center(a, "r");
        const e = center(b, "l");
        const mx = (s.x + e.x) / 2;
        const d = `M ${s.x} ${s.y} C ${mx} ${s.y}, ${mx} ${e.y}, ${e.x} ${e.y}`;
        return (
          <g key={`${a}-${b}`}>
            <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
            <path d={d} fill="none" stroke="url(#edge)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round" className="animate-flow" />
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={n.w} height={H} rx="10" fill="var(--bg-elev)" stroke="var(--line-strong)" />
          <circle cx={n.x + 16} cy={n.y + 20} r="3.5" fill="var(--accent)" />
          <text x={n.x + 28} y={n.y + 24} fill="var(--fg)" fontSize="14" fontWeight="600" fontFamily="var(--font-geist-sans)">
            {n.label}
          </text>
          <text x={n.x + 16} y={n.y + 43} fill="var(--muted)" fontSize="11" fontFamily="var(--font-geist-mono)">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
