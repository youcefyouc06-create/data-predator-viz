import { motion } from "framer-motion";
import SentimentChart from "@/components/SentimentChart";
import PainPointsTicker from "@/components/PainPointsTicker";
import TerminalFeed from "@/components/TerminalFeed";
import StatCard from "@/components/StatCard";

const DashboardHome = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Command Center</h1>
        <p className="text-muted-foreground mt-1">Real-time extraction intelligence overview</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Subreddits" value="2,847" subtitle="actively monitored" delay={0.1} />
        <StatCard label="Validation Score" value="8.7/10" subtitle="strong signal" delay={0.2} />
        <StatCard label="Competitors" value="12" subtitle="direct matches" delay={0.3} />
        <StatCard label="Trends Δ" value="+34%" subtitle="6-month momentum" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SentimentChart />
        <PainPointsTicker />
        <TerminalFeed />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Multi-Brain Engine</h3>
          <div className="space-y-3">
            {[
              { name: "Gemini Pro", status: "active", latency: "120ms" },
              { name: "GPT-4o", status: "active", latency: "340ms" },
              { name: "Claude 3.5", status: "standby", latency: "—" },
              { name: "DeepSeek", status: "error", latency: "timeout" },
            ].map((model) => (
              <div key={model.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${model.status === "active" ? "bg-primary animate-pulse-neon" : model.status === "error" ? "bg-destructive" : "bg-muted-foreground"}`} />
                  <span className="text-sm font-medium">{model.name}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{model.latency}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
