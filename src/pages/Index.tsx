import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Activity, Search, TrendingUp, Shield } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";

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
      <ThreeBackground />
      <div className="noise-overlay" />

      {/* Atmospheric blobs */}
      <div className="fixed pointer-events-none rounded-full"
        style={{ top: -200, left: -150, width: 700, height: 700, filter: "blur(140px)", background: "hsla(16,100%,50%,0.07)", animation: "drift 18s ease-in-out infinite alternate" }}
      />
      <div className="fixed pointer-events-none rounded-full"
        style={{ bottom: -250, right: -100, width: 600, height: 600, filter: "blur(120px)", background: "hsla(16,70%,50%,0.05)", animation: "drift 24s ease-in-out infinite alternate-reverse" }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ borderBottom: "1px solid hsl(var(--border))", background: "hsla(0,0%,4%,0.7)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-[13px] font-semibold tracking-wider">
            <span className="text-muted-foreground">⬡</span>{" "}
            <span className="text-foreground">REDDIT</span>
            <span className="text-primary">PULSE</span>
          </span>
          <button
            onClick={() => navigate("/dashboard/validate")}
            className="inline-flex items-center gap-2 px-4 h-8 rounded-lg text-xs font-semibold text-primary-foreground transition-all"
            style={{ background: "hsl(var(--primary))", boxShadow: "0 0 24px hsla(16,100%,50%,0.3)" }}
          >
            Open Dashboard <ArrowRight className="w-3 h-3" />
          </button>
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: "hsl(var(--orange-dim))", border: "1px solid hsl(16 100% 50% / 0.2)" }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-build status-live" style={{ animation: "pulse-green 2s ease infinite" }} />
            <span className="text-[10px] font-mono text-primary tracking-wider uppercase">Intelligence Terminal</span>
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-extrabold tracking-tight-custom leading-[0.85] mb-6">
            <span className="text-gradient-steel">Extract.</span>
            <br />
            <span className="text-gradient-steel">Validate.</span>
            <br />
            <span className="text-gradient-orange">Dominate.</span>
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10 font-mono">
            Real-time Reddit intelligence. Multi-brain AI debate engine.
            Turn raw community pain into validated market weapons.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/dashboard/validate")}
              className="inline-flex items-center gap-2 px-8 h-11 rounded-lg text-sm font-semibold text-primary-foreground transition-all"
              style={{ background: "hsl(var(--primary))", boxShadow: "0 0 24px hsla(16,100%,50%,0.3)" }}
            >
              <Zap className="w-4 h-4" />
              Start Validating
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 px-6 h-11 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
              className="bento-cell rounded-[14px] p-5"
            >
              <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                style={{ background: "hsl(var(--orange-dim))", border: "1px solid hsl(16 100% 50% / 0.2)" }}
              >
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
            <div key={s.label} className="bento-cell rounded-[14px] p-5 text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight-custom orange-text">{s.value}</p>
              <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-[0.12em] font-mono">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
