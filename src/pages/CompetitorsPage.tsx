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
  { tier: "BLUE OCEAN", range: "≤5 products", color: "text-blue-400" },
  { tier: "EMERGING", range: "≤20 products", color: "text-primary" },
  { tier: "COMPETITIVE", range: "≤100 products", color: "text-warning" },
  { tier: "SATURATED", range: "100+ products", color: "text-destructive" },
];

const threatBadge: Record<string, string> = {
  HIGH: "badge-dont",
  MEDIUM: "badge-risky",
  LOW: "badge-build",
};

const CompetitorsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Competition Landscape</h1>
        <p className="text-muted-foreground mt-1 text-sm">Market saturation · Moat analysis · Threat assessment</p>
      </motion.div>

      {/* Saturation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {saturationLevels.map((s, i) => (
          <motion.div key={s.tier} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="surface-card p-4 text-center"
            style={i === 1 ? { border: "1px solid rgba(99,102,241,0.3)" } : {}}
          >
            <p className={`text-[13px] font-semibold uppercase ${s.color} font-mono`}>{s.tier}</p>
            <p className="text-[11px] text-muted-foreground mt-1 font-mono">{s.range}</p>
            {i === 1 && <p className="text-[10px] text-primary mt-2 font-semibold font-mono">← YOUR MARKET</p>}
          </motion.div>
        ))}
      </div>

      {/* Direct */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="surface-card p-5 mb-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
          <Target className="w-3.5 h-3.5" /> Direct Competitors
        </h3>
        <div className="space-y-2">
          {directCompetitors.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 + i * 0.04 }}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-1" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <p className="text-[14px] font-medium">{c.name}</p>
                <p className="text-[11px] text-muted-foreground mt-1 font-mono">{c.weakness}</p>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-[18px] font-semibold font-mono">{c.price}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{c.users} users</p>
                </div>
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[5px] font-mono ${threatBadge[c.threat]}`}>
                  {c.threat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Indirect + Moat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="surface-card p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4">Indirect Competitors</h3>
          <div className="space-y-2.5">
            {indirectCompetitors.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px] text-secondary-foreground">
                <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="surface-card p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Moat Strategy
          </h3>
          <div className="p-4 rounded-lg" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <p className="text-[14px] font-semibold text-primary mb-2">Multi-Brain AI Debate Engine</p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              No competitor uses multiple AI models debating each other to reach consensus. Defensible moat
              through unique validation methodology and cross-platform data synthesis.
            </p>
          </div>
          <div className="mt-3 p-4 rounded-lg bg-surface-1" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[14px] font-medium mb-2">12-Month Defense Plan</p>
            <div className="space-y-1.5 text-[12px] text-muted-foreground font-mono">
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
