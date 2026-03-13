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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">WTP Detection</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Willingness-to-pay signals from real conversations</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bento-card rounded-xl p-5 neon-glow">
          <DollarSign className="w-4 h-4 text-primary mb-2" />
          <p className="text-5xl font-black font-mono tracking-brutal neon-text-strong">$49</p>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">Median WTP signal</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bento-card rounded-xl p-5">
          <TrendingUp className="w-4 h-4 text-primary mb-2" />
          <p className="text-5xl font-black font-mono tracking-brutal">{wtpSignals.length}</p>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">Explicit WTP mentions</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card rounded-xl p-5">
          <AlertTriangle className="w-4 h-4 text-warning mb-2" />
          <p className="text-5xl font-black font-mono tracking-brutal text-warning">HIGH</p>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">Pain intensity</p>
        </motion.div>
      </div>

      {/* WTP Signals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bento-card rounded-xl p-5 mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Raw WTP Signals</h3>
        <div className="space-y-2">
          {wtpSignals.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="p-4 rounded-lg bg-surface-1 border-l-2 border-primary/40 hover:border-primary/70 transition-colors"
            >
              <p className="text-sm font-mono italic text-foreground/90">{s.quote}</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground font-mono">
                <span>{s.source}</span>
                <span className="text-primary font-bold">↑{s.score}</span>
                <span>{s.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bento-card rounded-xl p-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Recommended Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-xl border ${i === 1 ? "border-primary/30 neon-glow" : "border-border/50"} bg-surface-1`}
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">{tier.purpose}</p>
              <p className="text-sm font-bold mt-1">{tier.name}</p>
              <p className={`text-4xl font-black font-mono tracking-brutal mt-2 ${i === 1 ? "neon-text-strong" : ""}`}>
                {tier.price}<span className="text-sm text-muted-foreground font-normal">/mo</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="text-[11px] text-muted-foreground flex items-center gap-2 font-mono">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WTPPage;
