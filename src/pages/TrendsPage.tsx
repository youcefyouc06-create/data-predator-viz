import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const trendsData = [
  { keyword: "AI code review", trend: "EXPLODING", change: "+67%", multiplier: "1.8x", interest: 89, data: [20, 25, 30, 35, 42, 55, 62, 70, 78, 85, 89, 92] },
  { keyword: "no-code automation", trend: "GROWING", change: "+23%", multiplier: "1.4x", interest: 72, data: [45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72] },
  { keyword: "meeting notes AI", trend: "STABLE", change: "+5%", multiplier: "1.0x", interest: 55, data: [50, 52, 54, 53, 55, 54, 56, 55, 54, 56, 55, 55] },
  { keyword: "email newsletter tool", trend: "DECLINING", change: "-22%", multiplier: "0.7x", interest: 38, data: [60, 58, 55, 52, 50, 48, 45, 43, 42, 40, 39, 38] },
  { keyword: "RSS reader", trend: "DEAD", change: "-52%", multiplier: "0.3x", interest: 12, data: [40, 35, 30, 28, 25, 22, 20, 18, 16, 14, 13, 12] },
];

const trendConfig: Record<string, { color: string; orbClass: string; sparkColor: string }> = {
  EXPLODING: { color: "text-primary", orbClass: "before:bg-primary", sparkColor: "#ff4500" },
  GROWING: { color: "text-build", orbClass: "before:bg-build", sparkColor: "#46d160" },
  STABLE: { color: "text-risky", orbClass: "before:bg-risky", sparkColor: "#ffb000" },
  DECLINING: { color: "text-orange-400", orbClass: "before:bg-orange-400", sparkColor: "#ff8a6a" },
  DEAD: { color: "text-dont", orbClass: "before:bg-dont", sparkColor: "#ff585b" },
};

const badgeConfig: Record<string, string> = {
  EXPLODING: "bg-primary/10 text-primary border-primary/25",
  GROWING: "bg-build/10 text-build border-build/20",
  STABLE: "bg-risky/10 text-risky border-risky/20",
  DECLINING: "bg-orange-400/10 text-orange-400 border-orange-400/20",
  DEAD: "bg-dont/10 text-dont border-dont/20",
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = 32;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return { x, y };
  });

  // Build smooth bezier path
  let linePath = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.4;
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) * 0.4;
    linePath += ` C${cp1x},${points[i - 1].y} ${cp2x},${points[i].y} ${points[i].x},${points[i].y}`;
  }
  const areaPath = linePath + ` L${w},${h} L0,${h}Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const TrendsPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-bold font-display tracking-tight-custom">Market Trends</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Google Trends · 12-month analysis window</p>
      </motion.div>

      {/* Status Orbs */}
      <div className="flex gap-2.5 mb-6">
        {(["EXPLODING", "GROWING", "STABLE", "DECLINING", "DEAD"] as const).map((tier) => {
          const count = trendsData.filter((t) => t.trend === tier).length;
          const cfg = trendConfig[tier];
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="flex-1 rounded-[14px] p-[18px] text-center relative overflow-hidden transition-all cursor-pointer"
              style={{
                border: "1px solid hsl(var(--border))",
                background: "hsl(0 0% 100% / 0.025)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Radial glow blob */}
              <div
                className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-50 transition-opacity"
                style={{
                  filter: "blur(35px)",
                  background: cfg.sparkColor,
                }}
              />
              <p className={`font-display text-[28px] font-extrabold leading-none relative ${cfg.color}`}
                style={tier === "EXPLODING" ? { textShadow: `0 0 20px hsla(16,100%,50%,0.5)` } : {}}
              >
                {count}
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-1 relative">{tier}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Holographic Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Head */}
        <div
          className="grid gap-4 px-[22px] py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          style={{
            gridTemplateColumns: "2.5fr 140px 110px 80px 80px 80px",
            background: "hsl(16 100% 50% / 0.04)",
            borderBottom: "1px solid hsl(var(--border))",
          }}
        >
          <span>Keyword</span>
          <span>12mo Trend</span>
          <span>Status</span>
          <span className="text-right">Change</span>
          <span className="text-right">Interest</span>
          <span className="text-right">Multiplier</span>
        </div>

        {/* Rows */}
        {trendsData.map((t, i) => {
          const cfg = trendConfig[t.trend];
          return (
            <motion.div
              key={t.keyword}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid gap-4 px-[22px] py-4 items-center cursor-pointer transition-colors holo-row"
              style={{
                gridTemplateColumns: "2.5fr 140px 110px 80px 80px 80px",
                borderBottom: i < trendsData.length - 1 ? "1px solid hsl(0 0% 100% / 0.03)" : "none",
                background: "hsla(0,0%,4%,0.5)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(16 100% 50% / 0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsla(0,0%,4%,0.5)")}
            >
              <span className="font-mono text-[13px] text-foreground">{t.keyword}</span>
              <Sparkline data={t.data} color={cfg.sparkColor} />
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md w-fit font-mono border ${badgeConfig[t.trend]}`}>
                {t.trend === "EXPLODING" && <Flame className="w-3 h-3" />}
                {t.trend}
              </span>
              <span className={`text-sm font-mono text-right font-bold ${cfg.color}`}>{t.change}</span>
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
