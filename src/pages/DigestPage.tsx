import { motion } from "framer-motion";
import { Zap, Search, TrendingUp, CheckCircle } from "lucide-react";

const digestItems = [
  { time: "2:34 PM", icon: Zap, title: "Validation complete: AI code review tool", detail: "Verdict: BUILD IT (82%) — 347 posts across 4 platforms", color: "text-success" },
  { time: "1:12 PM", icon: Search, title: 'Scan finished: "no-code automation"', detail: "892 posts across 28 subreddits — 65% positive", color: "text-primary" },
  { time: "11:45 AM", icon: TrendingUp, title: '"AI code review" is EXPLODING', detail: "+67% growth — 1.8x multiplier applied", color: "text-warning" },
  { time: "10:20 AM", icon: Zap, title: "Validation complete: Podcast notes generator", detail: "Verdict: RISKY (54%) — Low data from 2 platforms", color: "text-warning" },
  { time: "9:00 AM", icon: CheckCircle, title: "Daily scrape cycle completed", detail: "2,847 subreddits — 12,340 new posts indexed", color: "text-muted-foreground" },
  { time: "Yesterday", icon: Zap, title: "Validation: Reddit-to-newsletter pipeline", detail: "Verdict: BUILD IT (91%) — Exceptional signal, 562 posts", color: "text-success" },
  { time: "Yesterday", icon: Search, title: 'Scan: "meeting transcription"', detail: "156 posts — 81% positive — 10h duration", color: "text-primary" },
  { time: "2 days ago", icon: Zap, title: "Validation: LinkedIn CRM extension", detail: "Verdict: DON'T BUILD (38%) — Saturated market", color: "text-destructive" },
];

const DigestPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Activity Digest</h1>
        <p className="text-muted-foreground mt-1 text-sm">Timeline · Validations · Scans · Findings</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[15px] top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="space-y-1">
          {digestItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex gap-3 py-2.5 pl-0 group">
                <div className={`w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center flex-shrink-0 z-10 group-hover:bg-surface-3 transition-colors ${item.color}`} style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 surface-card p-4 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[13px] font-medium">{item.title}</h3>
                    <span className="text-[11px] text-muted-foreground font-mono">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">{item.detail}</p>
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
