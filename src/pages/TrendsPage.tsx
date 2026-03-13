import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Flame } from "lucide-react";
import { useEffect, useRef } from "react";

const trendsData = [
  { keyword: "AI code review", trend: "EXPLODING", change: "+67%", multiplier: "1.8x", interest: 89, data: [20, 25, 30, 35, 42, 55, 62, 70, 78, 85, 89, 92] },
  { keyword: "no-code automation", trend: "GROWING", change: "+23%", multiplier: "1.4x", interest: 72, data: [45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72] },
  { keyword: "meeting notes AI", trend: "STABLE", change: "+5%", multiplier: "1.0x", interest: 55, data: [50, 52, 54, 53, 55, 54, 56, 55, 54, 56, 55, 55] },
  { keyword: "email newsletter tool", trend: "DECLINING", change: "-22%", multiplier: "0.7x", interest: 38, data: [60, 58, 55, 52, 50, 48, 45, 43, 42, 40, 39, 38] },
  { keyword: "RSS reader", trend: "DEAD", change: "-52%", multiplier: "0.3x", interest: 12, data: [40, 35, 30, 28, 25, 22, 20, 18, 16, 14, 13, 12] },
];

const trendColors: Record<string, { text: string; bg: string }> = {
  EXPLODING: { text: "text-primary", bg: "bg-primary/10" },
  GROWING: { text: "text-emerald-400", bg: "bg-emerald-400/10" },
  STABLE: { text: "text-amber-400", bg: "bg-amber-400/10" },
  DECLINING: { text: "text-orange-400", bg: "bg-orange-400/10" },
  DEAD: { text: "text-destructive", bg: "bg-destructive/10" },
};

const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
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

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * 120;
      const y = 40 - ((v - min) / range) * 36 - 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [data, color]);

  return <canvas ref={canvasRef} className="w-[120px] h-[40px]" />;
};

const chartColors: Record<string, string> = {
  EXPLODING: "hsl(142, 72%, 50%)",
  GROWING: "hsl(160, 60%, 50%)",
  STABLE: "hsl(45, 90%, 55%)",
  DECLINING: "hsl(30, 80%, 55%)",
  DEAD: "hsl(0, 84%, 60%)",
};

const TrendsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Market Trends</h1>
        <p className="text-muted-foreground mt-1">Google Trends analysis across validated keywords</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {["EXPLODING", "GROWING", "STABLE", "DECLINING", "DEAD"].map((tier) => {
          const count = trendsData.filter((t) => t.trend === tier).length;
          const c = trendColors[tier];
          return (
            <motion.div key={tier} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`glass-card rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-black font-mono ${c.text}`}>{count}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">{tier}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Trends Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_80px_80px_80px] gap-4 px-6 py-3 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span>Keyword</span>
          <span>12mo Trend</span>
          <span>Status</span>
          <span className="text-right">Change</span>
          <span className="text-right">Interest</span>
          <span className="text-right">Multiplier</span>
        </div>
        {trendsData.map((t, i) => {
          const c = trendColors[t.trend];
          return (
            <motion.div
              key={t.keyword}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_120px_100px_80px_80px_80px] gap-4 px-6 py-4 border-b border-border last:border-0 items-center hover:bg-secondary/20 transition-colors"
            >
              <span className="text-sm font-semibold font-mono">{t.keyword}</span>
              <MiniChart data={t.data} color={chartColors[t.trend]} />
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${c.bg} ${c.text} w-fit`}>
                {t.trend === "EXPLODING" && <Flame className="w-3 h-3 inline mr-1" />}
                {t.trend}
              </span>
              <span className={`text-sm font-mono text-right ${c.text}`}>{t.change}</span>
              <span className="text-sm font-mono text-right">{t.interest}</span>
              <span className="text-sm font-mono text-right text-muted-foreground">{t.multiplier}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TrendsPage;
