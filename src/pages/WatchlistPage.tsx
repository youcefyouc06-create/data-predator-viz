import { motion } from "framer-motion";
import { Eye, Bell, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";

const watchlistItems = [
  { id: 1, keyword: "AI code review", addedAt: "Mar 10", lastCheck: "2h ago", trend: "up", change: "+12%", alerts: 3, posts7d: 47 },
  { id: 2, keyword: "no-code automation", addedAt: "Mar 8", lastCheck: "4h ago", trend: "up", change: "+5%", alerts: 1, posts7d: 89 },
  { id: 3, keyword: "meeting transcription", addedAt: "Mar 5", lastCheck: "1h ago", trend: "stable", change: "+1%", alerts: 0, posts7d: 23 },
  { id: 4, keyword: "email marketing tools", addedAt: "Feb 28", lastCheck: "6h ago", trend: "down", change: "-8%", alerts: 2, posts7d: 34 },
  { id: 5, keyword: "podcast editing software", addedAt: "Feb 25", lastCheck: "12h ago", trend: "down", change: "-15%", alerts: 0, posts7d: 12 },
];

const trendIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  up: { icon: <TrendingUp className="w-3.5 h-3.5" />, color: "text-success" },
  stable: { icon: <Minus className="w-3.5 h-3.5" />, color: "text-warning" },
  down: { icon: <TrendingDown className="w-3.5 h-3.5" />, color: "text-destructive" },
};

const WatchlistPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Watchlist</h1>
        <p className="text-muted-foreground mt-1 text-sm">Track keywords and niches over time</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="surface-card overflow-hidden">
        <div className="grid grid-cols-[1fr_60px_70px_70px_70px_50px_40px] gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Keyword</span>
          <span className="text-right">Trend</span>
          <span className="text-right">Change</span>
          <span className="text-right">Posts/7d</span>
          <span className="text-right">Checked</span>
          <span className="text-center">Alerts</span>
          <span />
        </div>
        {watchlistItems.map((item, i) => {
          const t = trendIcons[item.trend];
          return (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 + i * 0.03 }}
              className="grid grid-cols-[1fr_60px_70px_70px_70px_50px_40px] gap-3 px-5 py-3.5 items-center hover:bg-surface-2/50 transition-colors group"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-[13px] font-medium font-mono">"{item.keyword}"</span>
              </div>
              <div className={`flex justify-end ${t.color}`}>{t.icon}</div>
              <span className={`text-[13px] font-mono text-right font-semibold ${t.color}`}>{item.change}</span>
              <span className="text-[13px] font-mono text-right">{item.posts7d}</span>
              <span className="text-[11px] text-right text-muted-foreground font-mono">{item.lastCheck}</span>
              <div className="flex justify-center">
                {item.alerts > 0 ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-warning font-mono">
                    <Bell className="w-3 h-3" /> {item.alerts}
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground font-mono">—</span>
                )}
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WatchlistPage;
