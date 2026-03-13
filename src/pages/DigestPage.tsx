import { motion } from "framer-motion";
import { Clock, Zap, Search, TrendingUp, CheckCircle } from "lucide-react";

const digestItems = [
  { time: "2:34 PM", type: "validation", icon: Zap, title: "Validation complete: AI code review tool", detail: "Verdict: BUILD IT (82% confidence) — 347 posts analyzed across 4 platforms", color: "text-primary" },
  { time: "1:12 PM", type: "scan", icon: Search, title: "Scan finished: \"no-code automation\"", detail: "892 posts found across 28 subreddits — 65% positive sentiment", color: "text-blue-400" },
  { time: "11:45 AM", type: "trend", icon: TrendingUp, title: "Trend alert: \"AI code review\" is EXPLODING", detail: "+67% growth over 6 months — 1.8x score multiplier applied", color: "text-amber-400" },
  { time: "10:20 AM", type: "validation", icon: Zap, title: "Validation complete: Podcast notes generator", detail: "Verdict: RISKY (54% confidence) — Low data from only 2 platforms", color: "text-amber-400" },
  { time: "9:00 AM", type: "system", icon: CheckCircle, title: "Daily scrape cycle completed", detail: "2,847 subreddits monitored — 12,340 new posts indexed overnight", color: "text-muted-foreground" },
  { time: "Yesterday", type: "validation", icon: Zap, title: "Validation complete: Reddit-to-newsletter pipeline", detail: "Verdict: BUILD IT (91% confidence) — Exceptional signal with 562 posts", color: "text-primary" },
  { time: "Yesterday", type: "scan", icon: Search, title: "Scan finished: \"meeting transcription\"", detail: "156 posts found — 81% positive sentiment — scan duration: 10h", color: "text-blue-400" },
  { time: "2 days ago", type: "validation", icon: Zap, title: "Validation complete: LinkedIn CRM extension", detail: "Verdict: DON'T BUILD (38% confidence) — Saturated market, capped confidence", color: "text-destructive" },
];

const DigestPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Activity Digest</h1>
        <p className="text-muted-foreground mt-1">Timeline of all validations, scans, and findings</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-1">
          {digestItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 py-3 pl-1 group"
              >
                <div className={`w-9 h-9 rounded-full bg-secondary/50 border border-border flex items-center justify-center flex-shrink-0 z-10 group-hover:border-primary/30 transition-colors ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 glass-card rounded-xl p-4 group-hover:neon-border group-hover:border transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DigestPage;
