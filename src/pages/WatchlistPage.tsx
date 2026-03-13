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
  up: { icon: <TrendingUp className="w-3.5 h-3.5" />, color: "text-primary" },
  stable: { icon: <Minus className="w-3.5 h-3.5" />, color: "text-warning" },
  down: { icon: <TrendingDown className="w-3.5 h-3.5" />, color: "text-destructive" },
};

const WatchlistPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Watchlist</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Track keywords and niches over time</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_60px_70px_70px_70px_50px_40px] gap-3 px-5 py-3 border-b border-border text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
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
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="grid grid-cols-[1fr_60px_70px_70px_70px_50px_40px] gap-3 px-5 py-3.5 border-b border-border/50 last:border-0 items-center hover:bg-secondary/10 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-xs font-bold font-mono">"{item.keyword}"</span>
              </div>
              <div className={`flex justify-end ${t.color}`}>{t.icon}</div>
              <span className={`text-xs font-mono text-right font-bold ${t.color}`}>{item.change}</span>
              <span className="text-xs font-mono text-right">{item.posts7d}</span>
              <span className="text-[10px] text-right text-muted-foreground font-mono">{item.lastCheck}</span>
              <div className="flex justify-center">
                {item.alerts > 0 ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-warning font-mono">
                    <Bell className="w-3 h-3" /> {item.alerts}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground font-mono">—</span>
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
