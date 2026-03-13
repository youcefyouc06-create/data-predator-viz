import { motion } from "framer-motion";
import { FileText, ChevronRight, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const reports = [
  {
    id: 1, title: "AI-powered code review for solo devs", verdict: "BUILD IT", confidence: 82, date: "Mar 12, 2026",
    posts: 347, platforms: 4, models: 3, quality: "sufficient",
    executive_summary: "Strong market signal with 347 posts across 4 platforms. Pain is validated with HIGH intensity. Multiple WTP signals found above $30/mo. Growing trend with +34% momentum.",
  },
  {
    id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, date: "Mar 10, 2026",
    posts: 89, platforms: 2, models: 2, quality: "low_data",
    executive_summary: "Moderate interest but thin data. Only 89 posts found across 2 platforms. Some WTP signals but inconsistent. Market timing is stable with no clear growth trend.",
  },
  {
    id: 3, title: "Reddit-to-newsletter pipeline", verdict: "BUILD IT", confidence: 91, date: "Mar 8, 2026",
    posts: 562, platforms: 4, models: 4, quality: "sufficient",
    executive_summary: "Exceptional market signal. 562 posts with high engagement. Exploding trend (+67%). Clear WTP signals averaging $49/mo. Blue ocean opportunity with weak competition.",
  },
  {
    id: 4, title: "LinkedIn CRM auto-logging extension", verdict: "DON'T BUILD", confidence: 38, date: "Mar 5, 2026",
    posts: 45, platforms: 1, models: 2, quality: "capped",
    executive_summary: "Weak signal. Only 45 posts from a single platform. Saturated market with established players. No WTP signals found. Confidence was capped due to single-platform data.",
  },
];

const verdictConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  "BUILD IT": { icon: <CheckCircle className="w-5 h-5" />, color: "text-primary" },
  "RISKY": { icon: <AlertTriangle className="w-5 h-5" />, color: "text-amber-400" },
  "DON'T BUILD": { icon: <XCircle className="w-5 h-5" />, color: "text-destructive" },
};

const ReportsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Validation Reports</h1>
        <p className="text-muted-foreground mt-1">Full AI-generated validation reports with all sections</p>
      </motion.div>

      <div className="space-y-4">
        {reports.map((r, i) => {
          const v = verdictConfig[r.verdict];
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.005 }}
              className="glass-card rounded-xl p-6 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${v.color}`}>{v.icon}</div>
                  <div>
                    <h3 className="text-base font-bold tracking-tight-custom">{r.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{r.date}</span>
                      <span>{r.posts} posts</span>
                      <span>{r.platforms} platforms</span>
                      <span>{r.models} models</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-sm font-bold ${v.color}`}>{r.verdict}</p>
                    <p className="text-xs font-mono text-muted-foreground">{r.confidence}% confidence</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {r.executive_summary}
              </p>

              {/* Report sections preview */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {["Market Analysis", "ICP", "Competition", "Pricing", "Roadmap", "Risks"].map((section) => (
                  <span key={section} className="text-[10px] px-2 py-1 rounded bg-secondary/50 text-muted-foreground font-mono">
                    {section}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsPage;
