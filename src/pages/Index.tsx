import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Activity, Search, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Search, title: "Multi-Platform Scraping", desc: "Reddit, HackerNews, ProductHunt, IndieHackers — all at once" },
  { icon: Activity, title: "AI Debate Engine", desc: "Up to 6 AI models debate your idea's viability and reach consensus" },
  { icon: TrendingUp, title: "Trend Intelligence", desc: "Google Trends integration with EXPLODING to DEAD classification" },
  { icon: Shield, title: "Competition Analysis", desc: "Market saturation detection from Blue Ocean to Saturated" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />

      {/* Nav */}
      <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center" style={{ border: "1px solid rgba(99,102,241,0.2)" }}>
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight-custom">RedditPulse</span>
          </div>
          <Button size="sm" onClick={() => navigate("/dashboard")} className="h-8 text-[13px]">
            Open Dashboard <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <span className="w-[6px] h-[6px] rounded-full bg-success animate-pulse-dot" />
            <span className="text-[11px] font-mono text-primary tracking-wider uppercase">Precision Intelligence Tool</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6 text-gradient-subtle">
            Validate ideas
            <br />
            with precision.
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto text-[16px] leading-relaxed mb-10">
            Real-time Reddit intelligence. Multi-model AI debate engine.
            Turn raw community signals into validated market opportunities.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate("/dashboard/validate")} className="text-[14px] px-8 h-11">
              <Zap className="w-4 h-4" />
              Start Validating
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/dashboard")} className="text-[14px] text-muted-foreground h-11">
              View Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              className="surface-card p-5 cursor-default">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-3" style={{ border: "1px solid rgba(99,102,241,0.2)" }}>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-[14px] font-medium mb-1.5">{title}</h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "AI Providers", value: "9" },
            { label: "Platforms", value: "4" },
            { label: "Validation Passes", value: "3+1" },
            { label: "Max Models", value: "6" },
          ].map((s) => (
            <div key={s.label} className="surface-card p-5 text-center">
              <p className="text-[32px] font-semibold font-mono tracking-tight text-primary">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.08em] font-mono">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
