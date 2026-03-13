import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useRef } from "react";

const trendsData = [
  { keyword: "AI code review", trend: "EXPLODING", change: "+67%", multiplier: "1.8x", interest: 89, data: [20, 25, 30, 35, 42, 55, 62, 70, 78, 85, 89, 92] },
  { keyword: "no-code automation", trend: "GROWING", change: "+23%", multiplier: "1.4x", interest: 72, data: [45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72] },
  { keyword: "meeting notes AI", trend: "STABLE", change: "+5%", multiplier: "1.0x", interest: 55, data: [50, 52, 54, 53, 55, 54, 56, 55, 54, 56, 55, 55] },
  { keyword: "email newsletter tool", trend: "DECLINING", change: "-22%", multiplier: "0.7x", interest: 38, data: [60, 58, 55, 52, 50, 48, 45, 43, 42, 40, 39, 38] },
  { keyword: "RSS reader", trend: "DEAD", change: "-52%", multiplier: "0.3x", interest: 12, data: [40, 35, 30, 28, 25, 22, 20, 18, 16, 14, 13, 12] },
];

const statusColors: Record<string, { text: string; line: string }> = {
  EXPLODING: { text: "text-success", line: "#22c55e" },
  GROWING:   { text: "text-emerald-300", line: "#6ee7b7" },
  STABLE:    { text: "text-warning", line: "#f59e0b" },
  DECLINING: { text: "text-orange-400", line: "#f97316" },
  DEAD:      { text: "text-destructive", line: "#ef4444" },
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 120 * dpr;
    canvas.height = 40 * dpr;
    ctx.scale(dpr, dpr);

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    // Area fill
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * 120;
      const y = 40 - ((v - min) / range) * 34 - 3;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(120, 40);
    ctx.lineTo(0, 40);
    ctx.closePath();

    // Parse color for fill
    const fillGrad = ctx.createLinearGradient(0, 0, 0, 40);
    fillGrad.addColorStop(0, color + "26"); // ~15% opacity
    fillGrad.addColorStop(1, color + "00");
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Line
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * 120;
      const y = 40 - ((v - min) / range) * 34 - 3;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [data, color]);

  return <canvas ref={canvasRef} className="w-[120px] h-[40px]" />;
};

const TrendsPage = () => {
  const statusCounts = ["EXPLODING", "GROWING", "STABLE", "DECLINING", "DEAD"].map((s) => ({
    status: s,
    count: trendsData.filter((t) => t.trend === s).length,
    ...statusColors[s],
  }));

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Market Trends</h1>
        <p className="text-muted-foreground mt-1 text-sm">Google Trends · 12-month analysis window</p>
      </motion.div>

      {/* Status Pills */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {statusCounts.map((s, i) => (
          <motion.div
            key={s.status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="surface-card p-4 text-center"
          >
            <p className={`text-[32px] font-semibold font-mono ${s.text}`}>{s.count}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">{s.status}</p>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="surface-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_100px_80px_80px_80px] gap-4 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Keyword</span>
          <span>12mo Trend</span>
          <span>Status</span>
          <span className="text-right">Change</span>
          <span className="text-right">Interest</span>
          <span className="text-right">Multiplier</span>
        </div>

        {/* Rows */}
        {trendsData.map((t, i) => {
          const sc = statusColors[t.trend];
          return (
            <motion.div
              key={t.keyword}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 + i * 0.04 }}
              className="grid grid-cols-[1fr_120px_100px_80px_80px_80px] gap-4 px-6 py-4 items-center hover:bg-surface-2/50 transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <span className="text-[14px] font-medium font-mono">{t.keyword}</span>
              <Sparkline data={t.data} color={sc.line} />
              <span className={`text-[11px] font-semibold uppercase px-2 py-1 rounded-[5px] w-fit font-mono flex items-center gap-1 ${sc.text}`} style={{ background: sc.line + "14" }}>
                {t.trend === "EXPLODING" && <Flame className="w-3 h-3" />}
                {t.trend}
              </span>
              <span className={`text-[14px] font-mono text-right font-semibold ${sc.text}`}>{t.change}</span>
              <span className="text-[14px] font-mono text-right text-foreground/70">{t.interest}</span>
              <span className="text-[14px] font-mono text-right text-muted-foreground">{t.multiplier}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TrendsPage;
