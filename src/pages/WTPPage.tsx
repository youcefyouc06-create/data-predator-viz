import { motion } from "framer-motion";
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

const wtpSignals = [
  { quote: '"I\'d pay $50/mo for something that actually works"', source: "r/SaaS", score: 245, user: "u/frustrated_founder" },
  { quote: '"shut up and take my money — this is exactly what I need"', source: "r/startups", score: 189, user: "u/early_adopter" },
  { quote: '"We\'re currently paying $200/mo for a worse solution"', source: "r/Entrepreneur", score: 156, user: "u/bootstrapper42" },
  { quote: '"Would easily pay $30/mo if it integrated with Slack"', source: "r/productivity", score: 134, user: "u/pm_life" },
  { quote: '"Our team spends 10hrs/week on this manually. $100/mo is nothing"', source: "r/smallbusiness", score: 98, user: "u/ops_manager" },
];

const pricingTiers = [
  { name: "Starter", price: "$19", features: ["5 validations/mo", "Basic scraping", "1 AI model"], purpose: "Hobbyists" },
  { name: "Pro", price: "$49", features: ["25 validations/mo", "Deep scraping", "3 AI models", "Debate engine"], purpose: "Solo founders" },
  { name: "Team", price: "$149", features: ["Unlimited validations", "All scrapers", "6 AI models", "API access", "White-label"], purpose: "Agencies" },
];

const WTPPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">WTP Detection</h1>
        <p className="text-muted-foreground mt-1 text-sm">Willingness-to-pay signals from real conversations</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="surface-card p-5">
          <DollarSign className="w-4 h-4 text-primary mb-2" />
          <p className="text-[40px] font-semibold font-mono tracking-tight text-primary">$49</p>
          <p className="text-[11px] text-muted-foreground mt-2 font-mono uppercase tracking-[0.08em]">Median WTP signal</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }} className="surface-card p-5">
          <TrendingUp className="w-4 h-4 text-primary mb-2" />
          <p className="text-[40px] font-semibold font-mono tracking-tight">{wtpSignals.length}</p>
          <p className="text-[11px] text-muted-foreground mt-2 font-mono uppercase tracking-[0.08em]">Explicit WTP mentions</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="surface-card p-5">
          <AlertTriangle className="w-4 h-4 text-warning mb-2" />
          <p className="text-[40px] font-semibold font-mono tracking-tight text-warning">HIGH</p>
          <p className="text-[11px] text-muted-foreground mt-2 font-mono uppercase tracking-[0.08em]">Pain intensity</p>
        </motion.div>
      </div>

      {/* WTP Signals */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="surface-card p-5 mb-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4">Raw WTP Signals</h3>
        <div className="space-y-2">
          {wtpSignals.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 + i * 0.04 }}
              className="p-4 rounded-lg bg-surface-1 transition-colors"
              style={{ borderLeft: "2px solid rgba(99,102,241,0.4)" }}
            >
              <p className="text-[14px] font-mono italic text-foreground/90">{s.quote}</p>
              <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground font-mono">
                <span>{s.source}</span>
                <span className="text-success font-semibold">↑{s.score}</span>
                <span>{s.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="surface-card p-5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4">Recommended Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.name}
              className="p-5 rounded-lg bg-surface-1"
              style={i === 1 ? { border: "1px solid rgba(99,102,241,0.3)" } : { border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.08em] font-mono">{tier.purpose}</p>
              <p className="text-[14px] font-semibold mt-1">{tier.name}</p>
              <p className={`text-[32px] font-semibold font-mono tracking-tight mt-2 ${i === 1 ? "text-primary" : ""}`}>
                {tier.price}<span className="text-[14px] text-muted-foreground font-normal">/mo</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="text-[12px] text-muted-foreground flex items-center gap-2 font-mono">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WTPPage;
