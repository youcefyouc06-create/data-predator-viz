import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const painPoints = [
  "Users frustrated with slow onboarding flow",
  "No bulk export feature — requested 47 times",
  "Pricing page confusion causing 23% drop-off",
  "Mobile app crashes on Android 13+",
  "API rate limiting too aggressive for enterprise",
  "Dashboard loading time exceeds 8 seconds",
  "Missing dark mode — top requested feature",
  "Customer support response time > 48hrs",
  "Integration with Slack broken since v2.4",
  "Search functionality returns irrelevant results",
];

const PainPointsTicker = () => {
  const [count, setCount] = useState(1247);
  const [currentPoints, setCurrentPoints] = useState(painPoints.slice(0, 4));
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoints((prev) => {
        const nextIdx = (painPoints.indexOf(prev[prev.length - 1]) + 1) % painPoints.length;
        return [...prev.slice(1), painPoints[nextIdx]];
      });
      setKey((k) => k + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card rounded-xl p-6 col-span-1 row-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Pain Points Extracted
        </h3>
      </div>

      <div className="mb-6">
        <motion.p
          key={count}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-5xl font-black tracking-tight-custom neon-text font-mono"
        >
          {count.toLocaleString()}
        </motion.p>
        <p className="text-xs text-muted-foreground mt-1">and counting...</p>
      </div>

      <div className="space-y-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {currentPoints.map((point, i) => (
            <motion.div
              key={`${key}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-start gap-2 p-2 rounded-md bg-secondary/50"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs text-secondary-foreground leading-relaxed">
                {point}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PainPointsTicker;
