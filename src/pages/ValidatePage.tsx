import { motion, AnimatePresence } from "framer-motion";
import { Zap, Loader2, Terminal, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const stages = [
  { label: "Decomposing idea", detail: "Extracting keywords, audience, competitors" },
  { label: "Scraping Reddit", detail: "r/SaaS, r/startups, r/Entrepreneur — 34 subreddits" },
  { label: "Scraping HackerNews", detail: "Algolia API — Ask HN & Show HN threads" },
  { label: "Analyzing Google Trends", detail: "5 keywords — 12mo lookback window" },
  { label: "Competition scan", detail: "G2, ProductHunt, alternatives databases" },
  { label: "AI Pass 1: Market", detail: "Pain validation · WTP signals · TAM estimation" },
  { label: "AI Pass 2: Strategy", detail: "ICP profiling · Competition landscape · Pricing" },
  { label: "AI Pass 3: Launch", detail: "Roadmap · Projections · Risk matrix" },
  { label: "Debate engine", detail: "3 models entering consensus round" },
  { label: "Complete", detail: "Report generated — BUILD IT (82%)" },
];

const terminalOutput = [
  "[INIT] Starting validation pipeline...",
  "[SYS] Allocating 3 AI models for multi-pass analysis",
  "[SCRAPE] Connecting to Reddit JSON API...",
  "[DATA] r/SaaS — scanning 2,847 posts...",
  "[DATA] Found 347 relevant discussions",
  "[NLP] Extracting pain points from 347 posts...",
  "[SIGNAL] WTP detected: \"I'd pay $50/mo\" (↑245)",
  "[SIGNAL] WTP detected: \"shut up and take my money\" (↑189)",
  "[TREND] \"AI code review\" → EXPLODING (+67%)",
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

const ValidatePage = () => {
  const [idea, setIdea] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  const handleValidate = () => {
    if (!idea.trim()) return;
    setIsValidating(true);
    setCurrentStage(0);
    setTerminalLines([]);

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
  };

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Validate Idea</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">AI-powered multi-pass market validation</p>
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bento-card rounded-xl p-6 mb-4"
      >
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3 block">
          Describe your idea
        </label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A tool that scrapes Reddit to validate SaaS ideas using AI debate between multiple models..."
          rows={3}
          className="w-full bg-surface-1 border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 resize-none font-mono transition-all"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {[
            { label: "Target Audience", placeholder: "e.g., SaaS founders" },
            { label: "Pain Hypothesis", placeholder: "e.g., Manual validation is slow" },
            { label: "Known Competitors", placeholder: "e.g., GummySearch, SparkToro" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                {field.label}
              </label>
              <input
                placeholder={field.placeholder}
                className="w-full bg-surface-1 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 font-mono transition-all"
              />
            </div>
          ))}
        </div>

        <Button
          variant="neon"
          className="mt-5 w-full md:w-auto"
          onClick={handleValidate}
          disabled={isValidating || !idea.trim()}
        >
          {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {isValidating ? "Validating..." : "Launch Validation"}
        </Button>
      </motion.div>

      {/* War Room: Pipeline + Terminal side by side */}
      {currentStage >= 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pipeline progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bento-card rounded-xl p-5"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-primary" /> Validation Pipeline
            </h3>
            <div className="space-y-1.5">
              {stages.map((stage, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                    i === currentStage
                      ? "bg-primary/8 border border-primary/20"
                      : i < currentStage
                      ? "opacity-40"
                      : "opacity-15"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {i < currentStage ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    ) : i === currentStage ? (
                      <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{stage.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live terminal output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="terminal-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive/60" />
                  <span className="w-2 h-2 rounded-full bg-warning/60" />
                  <span className="w-2 h-2 rounded-full bg-primary/60" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground ml-2">validation.stream</span>
              </div>
              <Terminal className="w-3 h-3 text-muted-foreground" />
            </div>

            <div
              ref={termRef}
              className="h-[360px] overflow-y-auto space-y-0.5 text-[11px] font-mono leading-relaxed"
            >
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`py-0.5 ${
                    line.includes("[OK]") || line.includes("[DONE]") || line.includes("[CONSENSUS]")
                      ? "text-primary"
                      : line.includes("[WARN]")
                      ? "text-warning"
                      : line.includes("[SIGNAL]") || line.includes("[DATA]") || line.includes("[TREND]")
                      ? "text-foreground/70"
                      : line.includes("[DEBATE]")
                      ? "text-primary/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              {isValidating && (
                <span className="inline-block w-1.5 h-3 bg-primary animate-terminal-blink" />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ValidatePage;
