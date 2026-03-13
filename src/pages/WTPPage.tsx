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
  { name: "Starter", price: "$19/mo", features: ["5 validations/mo", "Basic scraping", "1 AI model"], purpose: "Hobbyists & side-projects" },
  { name: "Pro", price: "$49/mo", features: ["25 validations/mo", "Deep scraping", "3 AI models", "Debate engine"], purpose: "Solo founders" },
  { name: "Team", price: "$149/mo", features: ["Unlimited validations", "All scrapers", "6 AI models", "API access", "White-label reports"], purpose: "Agencies & teams" },
];

const WTPPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">WTP Detection</h1>
        <p className="text-muted-foreground mt-1">Willingness-to-pay signals extracted from real conversations</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <DollarSign className="w-5 h-5 text-primary mb-2" />
          <p className="text-3xl font-black font-mono neon-text">$49</p>
          <p className="text-xs text-muted-foreground mt-1">Median WTP signal</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-6">
          <TrendingUp className="w-5 h-5 text-primary mb-2" />
          <p className="text-3xl font-black font-mono">{wtpSignals.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Explicit WTP mentions</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <AlertTriangle className="w-5 h-5 text-amber-400 mb-2" />
          <p className="text-3xl font-black font-mono">HIGH</p>
          <p className="text-xs text-muted-foreground mt-1">Pain intensity level</p>
        </motion.div>
      </div>

      {/* WTP Signals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Raw WTP Signals</h3>
        <div className="space-y-3">
          {wtpSignals.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="p-4 rounded-lg bg-secondary/20 border-l-2 border-primary/50"
            >
              <p className="text-sm font-mono italic text-foreground">{s.quote}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>{s.source}</span>
                <span>↑ {s.score}</span>
                <span>{s.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Recommended Pricing Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-xl border ${i === 1 ? "border-primary/50 neon-glow" : "border-border"} bg-secondary/10`}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{tier.purpose}</p>
              <p className="text-lg font-bold mt-1">{tier.name}</p>
              <p className={`text-3xl font-black font-mono mt-2 ${i === 1 ? "neon-text" : ""}`}>{tier.price}</p>
              <ul className="mt-4 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
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
