import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Activity, Search, TrendingUp, Shield, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import MeteorShower from "@/components/MeteorShower";

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
      <MeteorShower />
      <div className="grid-pattern fixed inset-0 pointer-events-none z-0 opacity-30" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center neon-glow">
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold tracking-brutal">
              REDDIT<span className="neon-text">PULSE</span>
            </span>
          </div>
          <Button variant="neon" size="sm" onClick={() => navigate("/dashboard")} className="h-8 text-xs">
            Open Dashboard <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/8 border border-primary/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-neon status-live" />
            <span className="text-[10px] font-mono text-primary tracking-wider uppercase">Data Extraction Weapon</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-brutal leading-[0.85] mb-6">
            <span className="text-gradient-steel">Extract.</span>
            <br />
            <span className="text-gradient-steel">Validate.</span>
            <br />
            <span className="neon-text-strong">Dominate.</span>
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10 font-mono">
            Real-time Reddit intelligence. Multi-brain AI debate engine.
            Turn raw community pain into validated market weapons.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button variant="neon" size="lg" onClick={() => navigate("/dashboard/validate")} className="text-sm px-8 h-11">
              <Zap className="w-4 h-4" />
              Start Validating
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground h-11">
              View Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bento-card rounded-xl p-5 cursor-default"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-xs font-bold mb-1.5">{title}</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { label: "AI Providers", value: "9" },
            { label: "Platforms", value: "4" },
            { label: "Validation Passes", value: "3+1" },
            { label: "Max Models", value: "6" },
          ].map((s) => (
            <div key={s.label} className="bento-card rounded-xl p-5 text-center">
              <p className="text-4xl font-black font-mono tracking-brutal neon-text">{s.value}</p>
              <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-[0.15em] font-mono">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
