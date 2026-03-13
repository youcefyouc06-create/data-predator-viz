import { motion } from "framer-motion";
import { Activity, Zap, Target, TrendingUp } from "lucide-react";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
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

      <div className="hidden md:flex items-center gap-8">
        {[
          { icon: Activity, label: "Dashboard" },
          { icon: Target, label: "Validate" },
          { icon: TrendingUp, label: "Intelligence" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 neon-border border">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
          <span className="text-xs font-mono text-primary">SCANNING</span>
        </div>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
