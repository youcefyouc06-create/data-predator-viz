import { motion } from "framer-motion";
import SentimentChart from "@/components/SentimentChart";
import PainPointsTicker from "@/components/PainPointsTicker";
import TerminalFeed from "@/components/TerminalFeed";
import StatCard from "@/components/StatCard";

const DashboardHome = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Command Center</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time extraction intelligence overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Subreddits" value="2,847" subtitle="actively monitored" delay={0.05} />
        <StatCard label="Validation Score" value="8.7" subtitle="out of 10 — strong signal" delay={0.1} />
        <StatCard label="Competitors" value="12" subtitle="direct matches found" delay={0.15} />
        <StatCard label="Trend Δ" value="+34%" subtitle="6-month momentum" delay={0.2} highlight />
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SentimentChart />
        <PainPointsTicker />
        <TerminalFeed />

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="surface-card p-5">
          <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-4">
            Multi-Brain Engine
          </h3>
          <div className="space-y-2.5">
            {[
              { name: "Gemini Pro", status: "active", latency: "120ms" },
              { name: "GPT-4o", status: "active", latency: "340ms" },
              { name: "Claude 3.5", status: "standby", latency: "—" },
              { name: "DeepSeek", status: "error", latency: "timeout" },
            ].map((model) => (
              <div key={model.name} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-[6px] h-[6px] rounded-full ${model.status === "active" ? "bg-success animate-pulse-dot" : model.status === "error" ? "bg-destructive" : "bg-muted-foreground/40"}`} />
                  <span className="text-[13px] font-medium">{model.name}</span>
                </div>
                <span className={`text-[11px] font-mono ${model.status === "active" ? "text-success" : model.status === "error" ? "text-destructive" : "text-muted-foreground"}`}>
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
