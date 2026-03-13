import { motion } from "framer-motion";
import { Zap, Loader2, Terminal, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const stages = [
  { label: "◉ DECOMPOSING...", detail: "Extracting keywords, audience, competitors" },
  { label: "◌ SCRAPING REDDIT...", detail: "r/SaaS, r/startups — 34 subreddits" },
  { label: "◍ ANALYZING PAIN...", detail: "NLP extraction from 347 posts" },
  { label: "◑ MODELS DEBATING...", detail: "3 models entering consensus round" },
  { label: "◈ COMPLETE", detail: "Report generated — BUILD IT (82%)" },
];

const terminalOutput = [
  "[INIT] Starting validation pipeline...",
  "[SYS] Allocating 3 AI models for multi-pass analysis",
  "[SCRAPE] Connecting to Reddit JSON API...",
  "[DATA] r/SaaS — scanning 2,847 posts...",
  "[DATA] Found 347 relevant discussions",
  "[NLP] Extracting pain points from 347 posts...",
  '[SIGNAL] WTP detected: "I\'d pay $50/mo" (↑245)',
  '[SIGNAL] WTP detected: "shut up and take my money" (↑189)',
  '[TREND] "AI code review" → EXPLODING (+67%)',
  "[AI:GEMINI] Pass 1 complete — Market analysis ready",
  "[AI:GPT4o] Pass 2 complete — Strategy analysis ready",
  "[AI:LLAMA] Pass 3 complete — Launch plan ready",
  "[DEBATE] Models entering consensus round...",
  "[DEBATE] GEMINI: BUILD IT (85%) — strong pain signal",
  "[DEBATE] GPT4o: BUILD IT (79%) — good WTP coverage",
  "[DEBATE] LLAMA: BUILD IT (82%) — growing trend",
  "[CONSENSUS] Unanimous: BUILD IT — 82% confidence",
  "[DONE] Full report generated. 12 sections ready.",
];

const activityData = [3, 7, 5, 9, 4, 8, 12, 6, 11, 8, 15, 10, 7, 13];
const maxActivity = Math.max(...activityData);

const ValidatePage = () => {
  const [idea, setIdea] = useState("");
  const [target, setTarget] = useState("");
  const [pain, setPain] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  const handleValidate = () => {
    if (!idea.trim()) return;
    setIsValidating(true);
    setCurrentStage(0);
    setTerminalLines([]);
    setConfidence(0);

    let stage = 0;
    let line = 0;

    const stageInterval = setInterval(() => {
      stage++;
      if (stage >= stages.length) {
        clearInterval(stageInterval);
        setIsValidating(false);
        return;
      }
      setCurrentStage(stage);
    }, 1800);

    const lineInterval = setInterval(() => {
      if (line >= terminalOutput.length) {
        clearInterval(lineInterval);
        return;
      }
      setTerminalLines((prev) => [...prev, terminalOutput[line]]);
      line++;
      if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
    }, 1000);

    // Animate confidence
    let conf = 0;
    const confInterval = setInterval(() => {
      conf += 1;
      if (conf > 80) { clearInterval(confInterval); return; }
      setConfidence(conf);
    }, 100);
  };

  // SVG arc for confidence dial
  const dialRadius = 36;
  const circumference = 2 * Math.PI * dialRadius;
  const dashOffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-bold font-display tracking-tight-custom">Validate Idea</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">AI-powered multi-pass market validation</p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-2.5" style={{ gridAutoRows: "80px" }}>
        {/* Idea textarea — spans 8 cols, 4 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bento-cell col-span-8 row-span-4 p-5 flex flex-col"
        >
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3 font-sans">
            Describe your idea
          </label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., A tool that scrapes Reddit to validate SaaS ideas using AI debate between multiple models..."
            className="flex-1 bg-transparent border-none text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none font-mono leading-relaxed"
          />
        </motion.div>

        {/* Launch button — 4 cols, 2 rows */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleValidate}
          disabled={isValidating || !idea.trim()}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-4 row-span-2 rounded-[14px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, hsla(16,100%,50%,0.15), hsla(16,80%,55%,0.08))",
            border: "1px solid hsla(16,100%,50%,0.25)",
            boxShadow: isValidating ? "0 0 40px hsla(16,100%,50%,0.2), inset 0 0 20px hsla(16,100%,50%,0.05)" : "none",
          }}
        >
          {isValidating ? (
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
          ) : (
            <Zap className="w-7 h-7 text-primary" />
          )}
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">
            {isValidating ? stages[currentStage]?.label || "Processing..." : "Launch Validation"}
          </span>
        </motion.button>

        {/* Posts stat — 2 cols, 2 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bento-cell col-span-2 row-span-2 p-4 flex flex-col items-center justify-center"
        >
          <p className="font-display text-[30px] font-extrabold leading-none text-primary" style={{ textShadow: "0 0 24px hsla(16,100%,50%,0.4)" }}>
            2,960
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-2">Posts</p>
        </motion.div>

        {/* Platforms stat — 2 cols, 2 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bento-cell col-span-2 row-span-2 p-4 flex flex-col items-center justify-center"
        >
          <p className="font-display text-[30px] font-extrabold leading-none text-primary" style={{ textShadow: "0 0 24px hsla(16,100%,50%,0.4)" }}>
            4
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-2">Platforms</p>
        </motion.div>

        {/* Target — 3 cols, 1 row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bento-cell col-span-3 row-span-1 p-3 flex items-center gap-3"
        >
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground whitespace-nowrap">Target</label>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="SaaS founders"
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-mono"
          />
        </motion.div>

        {/* Pain hypothesis — 9 cols, 1 row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bento-cell col-span-9 row-span-1 p-3 flex items-center gap-3"
        >
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground whitespace-nowrap">Pain Hypothesis</label>
          <input
            value={pain}
            onChange={(e) => setPain(e.target.value)}
            placeholder="Manual validation is slow and unreliable"
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-mono"
          />
        </motion.div>

        {/* Competitors — 12 cols, 1 row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bento-cell col-span-12 row-span-1 p-3 flex items-center gap-3"
        >
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground whitespace-nowrap">Known Competitors</label>
          <input
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            placeholder="GummySearch, SparkToro, Exploding Topics"
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-mono"
          />
        </motion.div>

        {/* Active models — 4 cols, 3 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bento-cell col-span-4 row-span-3 p-5"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Active Models</p>
          <div className="space-y-2.5">
            {[
              { name: "Gemini Pro", latency: "120ms", active: true },
              { name: "GPT-4o", latency: "340ms", active: true },
              { name: "LLaMA 3.3", latency: "210ms", active: true },
            ].map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-[5px] h-[5px] rounded-full ${m.active ? "bg-build" : "bg-muted-foreground/30"}`} style={m.active ? { animation: "pulse-green 2s ease infinite" } : {}} />
                  <span className="text-xs font-medium">{m.name}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{m.latency}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity bars — 4 cols, 3 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bento-cell col-span-4 row-span-3 p-5"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Activity (14d)</p>
          <div className="flex items-end gap-[3px] h-[120px]">
            {activityData.map((v, i) => {
              const intensity = v / maxActivity;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-colors hover:opacity-80"
                  style={{
                    height: `${(v / maxActivity) * 100}%`,
                    background: `hsla(16, ${Math.round(80 + intensity * 20)}%, ${Math.round(45 + intensity * 10)}%, ${0.2 + intensity * 0.4})`,
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Confidence dial — 4 cols, 3 rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bento-cell col-span-4 row-span-3 p-5 flex flex-col items-center justify-center"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Avg Score</p>
          <div className="relative">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r={dialRadius} fill="none" stroke="hsla(0,0%,100%,0.05)" strokeWidth="6" />
              <circle
                cx="45" cy="45" r={dialRadius} fill="none"
                stroke="url(#dialGrad)" strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 45 45)"
                style={{ transition: "stroke-dashoffset 0.1s ease" }}
              />
              <defs>
                <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="100%" stopColor="#ff9966" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-xl font-extrabold text-primary">{confidence}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Terminal output — only shows during/after validation */}
      {currentStage >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 terminal-card rounded-[14px] p-4"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-dont/60" />
                <span className="w-2 h-2 rounded-full bg-risky/60" />
                <span className="w-2 h-2 rounded-full bg-build/60" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground ml-2">validation.stream</span>
            </div>
            <Terminal className="w-3 h-3 text-muted-foreground" />
          </div>
          <div ref={termRef} className="h-[300px] overflow-y-auto space-y-0.5 text-[11px] font-mono leading-relaxed">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line.includes("[DONE]") || line.includes("[CONSENSUS]") ? "text-build"
                    : line.includes("[SIGNAL]") || line.includes("[DATA]") || line.includes("[TREND]") ? "text-foreground/70"
                      : line.includes("[DEBATE]") ? "text-primary/80"
                        : "text-muted-foreground"
                }
              >
                {line}
              </motion.div>
            ))}
            {isValidating && <span className="inline-block w-1.5 h-3 bg-primary animate-terminal-blink" />}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ValidatePage;
