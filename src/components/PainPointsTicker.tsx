import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const painPoints = [
  { text: "Manual validation takes too long", score: 847, source: "r/SaaS" },
  { text: "Can't find real market demand signals", score: 623, source: "r/startups" },
  { text: "Competitor research is overwhelming", score: 512, source: "r/Entrepreneur" },
  { text: "No way to validate willingness to pay", score: 489, source: "r/indiehackers" },
  { text: "Building features nobody actually wants", score: 445, source: "r/SaaS" },
  { text: "Wasting months on unvalidated ideas", score: 398, source: "r/startups" },
  { text: "Reddit search is completely useless", score: 367, source: "r/webdev" },
  { text: "Need real-time market intelligence", score: 334, source: "r/smallbusiness" },
];

const PainPointsTicker = () => {
  const [count, setCount] = useState(12847);
  const [visibleItems, setVisibleItems] = useState(painPoints.slice(0, 5));
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 5) + 1);
      setVisibleItems((prev) => {
        const nextIndex = (painPoints.indexOf(prev[prev.length - 1]) + 1) % painPoints.length;
        return [...prev.slice(1), painPoints[nextIndex]];
      });
      setKey((k) => k + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="surface-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">
          Pain Points Extracted
        </h3>
        <motion.span key={count} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[13px] font-mono text-primary font-semibold">
          {count.toLocaleString()}
        </motion.span>
      </div>

      <div className="space-y-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((point, i) => (
            <motion.div
              key={`${point.text}-${key}-${i}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[13px] text-foreground/80 truncate pr-3 flex-1">{point.text}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] font-mono text-muted-foreground">{point.source}</span>
                <span className="text-[11px] font-mono text-primary font-semibold">↑{point.score}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PainPointsTicker;
