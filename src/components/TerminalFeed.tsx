import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const logLines = [
  { type: "system", text: "[SYS] Initializing multi-brain engine..." },
  { type: "success", text: "[OK] Gemini 2.0 Flash connected (120ms)" },
  { type: "success", text: "[OK] Llama 3.3 70B connected (85ms)" },
  { type: "data", text: "[SCRAPE] r/SaaS — 347 posts indexed" },
  { type: "data", text: "[SCRAPE] r/startups — 289 posts indexed" },
  { type: "system", text: "[NLP] Pain extraction pipeline active" },
  { type: "data", text: '[SIGNAL] WTP detected: "$50/mo" (r/SaaS)' },
  { type: "warning", text: "[WARN] DeepSeek V3 — connection timeout" },
  { type: "success", text: "[OK] Fallback to GPT-4o (340ms)" },
  { type: "data", text: '[TREND] "AI code review" → EXPLODING (+67%)' },
  { type: "system", text: "[DEBATE] 3 models entering consensus round" },
  { type: "success", text: "[VERDICT] BUILD IT — 82% confidence" },
];

const typeColors: Record<string, string> = {
  system: "text-muted-foreground",
  success: "text-success",
  data: "text-foreground/70",
  warning: "text-warning",
};

const TerminalFeed = () => {
  const [lines, setLines] = useState<typeof logLines>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, logLines[i % logLines.length]]);
      i++;
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="terminal-card p-4"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.5)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(245,158,11,0.5)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
          </div>
          <span className="text-[11px] font-mono text-muted-foreground ml-2">system.log</span>
        </div>
        <span className="w-1.5 h-4 bg-primary/50 animate-pulse" />
      </div>

      <div ref={scrollRef} className="h-44 overflow-y-auto space-y-1 text-[11px] font-mono leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${typeColors[line.type]} py-0.5`}
          >
            {line.text}
          </motion.div>
        ))}
        {lines.length === 0 && <span className="text-muted-foreground">Awaiting input...</span>}
      </div>
    </motion.div>
  );
};

export default TerminalFeed;
