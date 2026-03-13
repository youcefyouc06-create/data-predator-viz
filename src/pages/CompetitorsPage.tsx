import { motion } from "framer-motion";
import { Shield, Target } from "lucide-react";

const directCompetitors = [
  { name: "GummySearch", price: "$29/mo", users: "5K+", weakness: "No AI debate, single model only", threat: "HIGH" },
  { name: "SparkToro", price: "$150/mo", users: "20K+", weakness: "No Reddit scraping, audience-focused only", threat: "MEDIUM" },
  { name: "Exploding Topics", price: "$97/mo", users: "50K+", weakness: "Trends only, no idea validation", threat: "LOW" },
  { name: "Syften", price: "$19/mo", users: "2K+", weakness: "Monitoring only, no analysis", threat: "LOW" },
];

const indirectCompetitors = [
  "Google Trends — free but no Reddit data or AI analysis",
  "Reddit Search — native but no NLP or validation scoring",
  "Brandwatch — enterprise pricing, overkill for solo founders",
  "Mention — social listening but weak on Reddit specifically",
];

const saturationLevels = [
  { tier: "BLUE OCEAN", range: "≤5 products", text: "text-blue-400", bg: "bg-blue-400/10" },
  { tier: "EMERGING", range: "≤20 products", text: "text-primary", bg: "bg-primary/10" },
  { tier: "COMPETITIVE", range: "≤100 products", text: "text-warning", bg: "bg-warning/10" },
  { tier: "SATURATED", range: "100+ products", text: "text-destructive", bg: "bg-destructive/10" },
];

const threatStyles: Record<string, string> = {
  HIGH: "bg-destructive/10 text-destructive border border-destructive/20",
  MEDIUM: "bg-warning/10 text-warning border border-warning/20",
  LOW: "bg-primary/10 text-primary border border-primary/20",
};

const CompetitorsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Competition Landscape</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Market saturation · Moat analysis · Threat assessment</p>
      </motion.div>

      {/* Saturation Meter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {saturationLevels.map((s, i) => (
          <motion.div key={s.tier} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bento-card rounded-xl p-4 text-center ${i === 1 ? "border-primary/30 neon-glow" : ""}`}>
            <p className={`text-xs font-bold uppercase ${s.text} font-mono`}>{s.tier}</p>
            <p className="text-[10px] text-muted-foreground mt-1 font-mono">{s.range}</p>
            {i === 1 && <p className="text-[9px] text-primary mt-2 font-bold font-mono">← YOUR MARKET</p>}
          </motion.div>
        ))}
      </div>

      {/* Direct Competitors */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card rounded-xl p-5 mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 flex items-center gap-2">
          <Target className="w-3.5 h-3.5" /> Direct Competitors
        </h3>
        <div className="space-y-2">
          {directCompetitors.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-1 border border-border/50 hover:border-border transition-colors">
              <div>
                <p className="text-sm font-bold">{c.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">{c.weakness}</p>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-lg font-black font-mono tracking-brutal">{c.price}</p>
                  <p className="text-[9px] text-muted-foreground font-mono">{c.users} users</p>
                </div>
                <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-md font-mono ${threatStyles[c.threat]}`}>
                  {c.threat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Indirect + Moat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bento-card rounded-xl p-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Indirect Competitors</h3>
          <div className="space-y-2.5">
            {indirectCompetitors.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-secondary-foreground">
                <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bento-card rounded-xl p-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Moat Strategy
          </h3>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/15">
            <p className="text-sm font-bold neon-text mb-2">Multi-Brain AI Debate Engine</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              No competitor uses multiple AI models debating each other to reach consensus. Defensible moat
              through unique validation methodology and cross-platform data synthesis.
            </p>
          </div>
          <div className="mt-3 p-4 rounded-lg bg-surface-1 border border-border/50">
            <p className="text-sm font-bold mb-2">12-Month Defense Plan</p>
            <div className="space-y-1.5 text-[11px] text-muted-foreground font-mono">
              <p>• M1-3: Build proprietary dataset</p>
              <p>• M4-6: Fine-tune models on data</p>
              <p>• M7-12: API ecosystem lock-in</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompetitorsPage;
