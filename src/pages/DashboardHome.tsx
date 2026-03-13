import { motion } from "framer-motion";
import SentimentChart from "@/components/SentimentChart";
import PainPointsTicker from "@/components/PainPointsTicker";
import TerminalFeed from "@/components/TerminalFeed";
import StatCard from "@/components/StatCard";

const DashboardHome = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Command Center</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Real-time extraction intelligence overview</p>
      </motion.div>

      {/* Stats row - massive numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Subreddits" value="2,847" subtitle="actively monitored" delay={0.1} highlight />
        <StatCard label="Validation Score" value="8.7" subtitle="out of 10 — strong signal" delay={0.15} />
        <StatCard label="Competitors" value="12" subtitle="direct matches found" delay={0.2} />
        <StatCard label="Trend Δ" value="+34%" subtitle="6-month momentum" delay={0.25} />
      </div>

      {/* Bento grid - asymmetric */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Sentiment chart - large, spans 2 cols and 2 rows */}
        <SentimentChart />
        
        {/* Pain points ticker */}
        <PainPointsTicker />
        
        {/* Terminal feed */}
        <TerminalFeed />

        {/* Multi-brain engine status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bento-card rounded-xl p-5"
        >
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">
            Multi-Brain Engine
          </h3>
          <div className="space-y-2.5">
            {[
              { name: "Gemini Pro", status: "active", latency: "120ms" },
              { name: "GPT-4o", status: "active", latency: "340ms" },
              { name: "Claude 3.5", status: "standby", latency: "—" },
              { name: "DeepSeek", status: "error", latency: "timeout" },
            ].map((model) => (
              <div key={model.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${model.status === "active" ? "bg-primary animate-pulse-neon status-live" : model.status === "error" ? "bg-destructive" : "bg-muted-foreground/50"}`} />
                  <span className="text-xs font-medium">{model.name}</span>
                </div>
                <span className={`text-[10px] font-mono ${model.status === "active" ? "text-primary" : model.status === "error" ? "text-destructive" : "text-muted-foreground"}`}>
                  {model.latency}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
