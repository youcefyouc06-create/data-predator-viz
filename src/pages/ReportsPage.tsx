import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const reports = [
  { id: 1, title: "AI-powered code review for solo devs", verdict: "BUILD IT", confidence: 82, date: "Mar 12, 2026", posts: 347, platforms: 4, models: 3, summary: "Strong market signal with 347 posts across 4 platforms. Pain validated at HIGH intensity. Multiple WTP signals above $30/mo. Growing trend at +34% momentum." },
  { id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, date: "Mar 10, 2026", posts: 89, platforms: 2, models: 2, summary: "Moderate interest but thin data. 89 posts across 2 platforms. Some WTP signals but inconsistent. No clear growth trend." },
  { id: 3, title: "Reddit-to-newsletter pipeline", verdict: "BUILD IT", confidence: 91, date: "Mar 8, 2026", posts: 562, platforms: 4, models: 4, summary: "Exceptional signal. 562 posts, high engagement. Exploding trend (+67%). Clear WTP averaging $49/mo. Blue ocean opportunity." },
  { id: 4, title: "LinkedIn CRM auto-logging extension", verdict: "DON'T BUILD", confidence: 38, date: "Mar 5, 2026", posts: 45, platforms: 1, models: 2, summary: "Weak signal. 45 posts from single platform. Saturated market. No WTP signals. Confidence capped." },
];

const verdictConfig: Record<string, { icon: React.ReactNode; badge: string }> = {
  "BUILD IT": { icon: <CheckCircle className="w-4 h-4" />, badge: "badge-build" },
  "RISKY": { icon: <AlertTriangle className="w-4 h-4" />, badge: "badge-risky" },
  "DON'T BUILD": { icon: <XCircle className="w-4 h-4" />, badge: "badge-dont" },
};

const ReportsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Validation Reports</h1>
        <p className="text-muted-foreground mt-1 text-sm">Full AI-generated reports · All sections</p>
      </motion.div>

      <div className="space-y-3">
        {reports.map((r, i) => {
          const v = verdictConfig[r.verdict];
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="surface-card p-5 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${r.verdict === "BUILD IT" ? "text-success" : r.verdict === "RISKY" ? "text-warning" : "text-destructive"}`}>{v.icon}</div>
                  <div>
                    <h3 className="text-[15px] font-medium tracking-tight-custom">{r.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-mono">
                      <span>{r.date}</span>
                      <span className="text-muted-foreground/30">·</span>
                      <span>{r.posts} posts</span>
                      <span className="text-muted-foreground/30">·</span>
                      <span>{r.platforms} platforms</span>
                      <span className="text-muted-foreground/30">·</span>
                      <span>{r.models} models</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-[11px] font-semibold uppercase px-2.5 py-[3px] rounded-[5px] font-mono ${v.badge}`}>
                      {r.verdict}
                    </span>
                    <p className="text-[11px] font-mono text-muted-foreground mt-1">{r.confidence}%</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed pt-3 font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {r.summary}
              </p>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {["Market", "ICP", "Competition", "Pricing", "Roadmap", "Risks"].map((section) => (
                  <span key={section} className="text-[10px] px-2 py-0.5 rounded-[5px] bg-surface-2 text-muted-foreground font-mono" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
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
