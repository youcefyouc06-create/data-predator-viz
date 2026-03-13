import { motion } from "framer-motion";
import { Shield, AlertTriangle, Target } from "lucide-react";

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
  { tier: "BLUE OCEAN", range: "≤5 products", color: "text-blue-400 bg-blue-400/10" },
  { tier: "EMERGING", range: "≤20 products", color: "text-primary bg-primary/10" },
  { tier: "COMPETITIVE", range: "≤100 products", color: "text-amber-400 bg-amber-400/10" },
  { tier: "SATURATED", range: "100+ products", color: "text-destructive bg-destructive/10" },
];

const CompetitorsPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Competition Landscape</h1>
        <p className="text-muted-foreground mt-1">Direct & indirect competitors, market saturation, moat analysis</p>
      </motion.div>

      {/* Saturation Meter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {saturationLevels.map((s, i) => (
          <motion.div key={s.tier} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`glass-card rounded-xl p-4 text-center ${i === 1 ? "neon-border border" : ""}`}>
            <p className={`text-xs font-bold uppercase ${s.color.split(" ")[0]}`}>{s.tier}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.range}</p>
            {i === 1 && <p className="text-[10px] text-primary mt-2 font-semibold">← YOUR MARKET</p>}
          </motion.div>
        ))}
      </div>

      {/* Direct Competitors */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" /> Direct Competitors
        </h3>
        <div className="space-y-3">
          {directCompetitors.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border">
              <div>
                <p className="text-sm font-bold">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.weakness}</p>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-sm font-mono font-bold">{c.price}</p>
                  <p className="text-[10px] text-muted-foreground">{c.users} users</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${c.threat === "HIGH" ? "bg-destructive/10 text-destructive" : c.threat === "MEDIUM" ? "bg-amber-400/10 text-amber-400" : "bg-primary/10 text-primary"}`}>
                  {c.threat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Indirect + Moat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Indirect Competitors</h3>
          <div className="space-y-2">
            {indirectCompetitors.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-secondary-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Moat Strategy
          </h3>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold neon-text mb-2">Multi-Brain AI Debate Engine</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No competitor uses multiple AI models debating each other to reach consensus. This creates a defensible moat
              through unique validation methodology, proprietary prompt engineering across 9 providers, and cross-platform
              data synthesis that's expensive to replicate.
            </p>
          </div>
          <div className="mt-3 p-4 rounded-lg bg-secondary/20 border border-border">
            <p className="text-sm font-semibold mb-2">12-Month Defense Plan</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>• M1-3: Build proprietary dataset from user validations</p>
              <p>• M4-6: Fine-tune models on accumulated data</p>
              <p>• M7-12: API ecosystem + integrations lock-in</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompetitorsPage;
