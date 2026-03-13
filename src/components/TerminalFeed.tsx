import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const terminalLines = [
  { type: "system", text: "[SCAN] Initializing Reddit API connection..." },
  { type: "success", text: "[OK] Connected to r/SaaS, r/startups, r/Entrepreneur" },
  { type: "data", text: "[DATA] Scraping 2,847 posts from last 30 days..." },
  { type: "system", text: "[NLP] Running sentiment analysis on extracted corpus" },
  { type: "warning", text: "[WARN] Rate limit approaching — throttling requests" },
  { type: "data", text: "[DATA] Extracted 1,247 unique pain points" },
  { type: "success", text: "[OK] ICP profile generated: B2B SaaS founders, $10-50k MRR" },
  { type: "system", text: "[AI] Deploying multi-brain debate engine..." },
  { type: "data", text: "[DATA] Competition analysis: 12 direct competitors found" },
  { type: "success", text: '[OK] Validation score: 8.7/10 — "Strong market signal"' },
  { type: "system", text: "[SCAN] Cross-referencing with HackerNews Algolia API..." },
  { type: "data", text: "[DATA] Google Trends momentum: +34% over 6 months" },
  { type: "warning", text: "[WARN] DeepSeek API latency spike — switching to Gemini" },
  { type: "success", text: "[OK] Report generated — 47 actionable insights ready" },
];

const colorMap: Record<string, string> = {
  system: "text-muted-foreground",
  success: "text-primary",
  data: "text-foreground",
  warning: "text-amber-400",
};

const TerminalFeed = () => {
  const [lines, setLines] = useState<typeof terminalLines>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev, terminalLines[idx % terminalLines.length]];
        if (newLines.length > 12) newLines.shift();
        return newLines;
      });
      idx++;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="glass-card rounded-xl overflow-hidden col-span-2"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-destructive/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">
          redditpulse — extraction_engine
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="p-4 font-mono text-xs leading-relaxed h-56 overflow-y-auto terminal-bg"
      >
        {lines.map((line, i) => (
          <motion.div
            key={`${i}-${line.text}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${colorMap[line.type]} mb-1`}
          >
            <span className="text-muted-foreground select-none">$ </span>
            {line.text}
          </motion.div>
        ))}
        <span className="inline-block w-2 h-4 bg-primary animate-pulse-neon ml-1" />
      </div>
    </motion.div>
  );
};

export default TerminalFeed;
