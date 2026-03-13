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
  up: { icon: <TrendingUp className="w-4 h-4" />, color: "text-primary" },
  stable: { icon: <Minus className="w-4 h-4" />, color: "text-amber-400" },
  down: { icon: <TrendingDown className="w-4 h-4" />, color: "text-destructive" },
};

const WatchlistPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Watchlist</h1>
        <p className="text-muted-foreground mt-1">Track keywords and niches over time</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_80px_80px_80px_60px_60px] gap-4 px-6 py-3 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span>Keyword</span>
          <span className="text-right">Trend</span>
          <span className="text-right">Change</span>
          <span className="text-right">Posts/7d</span>
          <span className="text-right">Last Check</span>
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
              className="grid grid-cols-[1fr_80px_80px_80px_80px_60px_60px] gap-4 px-6 py-4 border-b border-border last:border-0 items-center hover:bg-secondary/20 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold font-mono">"{item.keyword}"</span>
              </div>
              <div className={`flex justify-end ${t.color}`}>{t.icon}</div>
              <span className={`text-sm font-mono text-right ${t.color}`}>{item.change}</span>
              <span className="text-sm font-mono text-right">{item.posts7d}</span>
              <span className="text-xs text-right text-muted-foreground">{item.lastCheck}</span>
              <div className="flex justify-center">
                {item.alerts > 0 ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Bell className="w-3 h-3" /> {item.alerts}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WatchlistPage;
