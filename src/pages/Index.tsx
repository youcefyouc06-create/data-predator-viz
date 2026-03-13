import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Activity, Search, TrendingUp, Shield } from "lucide-react";
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
      <div className="grid-pattern fixed inset-0 pointer-events-none z-0 opacity-40" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 neon-border border flex items-center justify-center neon-glow">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight-custom">
              Reddit<span className="neon-text">Pulse</span>
            </span>
          </div>
          <Button variant="neon" size="sm" onClick={() => navigate("/dashboard")}>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 neon-border border mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="text-xs font-mono text-primary">DATA EXTRACTION WEAPON</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight-custom leading-[0.9] mb-6">
            Extract. Validate.
            <br />
            <span className="text-gradient-neon">Dominate.</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
            Real-time Reddit intelligence. Multi-brain AI debate engine.
            Turn raw community conversations into validated market weapons.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button variant="neon" size="lg" onClick={() => navigate("/dashboard/validate")} className="text-base px-8">
              <Zap className="w-5 h-5" />
              Start Validating
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/dashboard")} className="text-base text-muted-foreground">
              View Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "AI Providers", value: "9" },
            { label: "Platforms Scraped", value: "4" },
            { label: "Validation Passes", value: "3+1" },
            { label: "Max Active Models", value: "6" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-6 text-center">
              <p className="text-3xl font-black font-mono neon-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
