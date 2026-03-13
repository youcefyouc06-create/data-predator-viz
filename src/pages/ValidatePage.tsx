import { motion } from "framer-motion";
import { Zap, Loader2, Terminal, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
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

const recentIdeas = [
  "AI code review tool for solo devs",
  "Reddit-to-newsletter pipeline",
  "Automated podcast show notes",
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
    <div className="max-w-[760px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Validate Idea</h1>
        <p className="text-muted-foreground mt-1 text-sm">AI-powered multi-pass market validation</p>
      </motion.div>

      {/* Input Card */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="surface-card p-6 mb-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Describe your idea
          </label>
          {idea && (
            <button onClick={() => setIdea("")} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              clear
            </button>
          )}
        </div>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A tool that scrapes Reddit to validate SaaS ideas using AI debate between multiple models..."
          rows={5}
          className="w-full bg-surface-1 border border-[rgba(255,255,255,0.08)] rounded-lg p-4 text-[13px] text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] resize-none transition-all"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            { label: "Target Audience", placeholder: "e.g., SaaS founders" },
            { label: "Pain Hypothesis", placeholder: "e.g., Manual validation is slow" },
            { label: "Known Competitors", placeholder: "e.g., GummySearch, SparkToro" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2 block">
                {field.label}
              </label>
              <input
                placeholder={field.placeholder}
                className="w-full bg-surface-1 border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
              />
            </div>
          ))}
        </div>

        <Button className="mt-5" onClick={handleValidate} disabled={isValidating || !idea.trim()}>
          {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {isValidating ? "Validating..." : "Launch Validation"}
        </Button>
      </motion.div>

      {/* Recent Ideas */}
      {currentStage < 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center">
          <p className="text-[11px] text-muted-foreground mb-3 uppercase tracking-[0.08em]">Or validate a recent idea</p>
          <div className="flex flex-wrap justify-center gap-2">
            {recentIdeas.map((r) => (
              <button
                key={r}
                onClick={() => setIdea(r)}
                className="px-3.5 py-1.5 rounded-full text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pipeline + Terminal */}
      {currentStage >= 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="surface-card p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-primary" /> Pipeline
            </h3>
            <div className="space-y-1">
              {stages.map((stage, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-2 px-3 rounded-md transition-all duration-300 ${
                    i === currentStage ? "bg-primary/8" : i < currentStage ? "opacity-40" : "opacity-15"
                  }`}
                  style={i === currentStage ? { border: "1px solid rgba(99,102,241,0.2)" } : { border: "1px solid transparent" }}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {i < currentStage ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    ) : i === currentStage ? (
                      <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate">{stage.label}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="terminal-card p-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.5)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(245,158,11,0.5)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
                </div>
                <span className="text-[11px] font-mono text-muted-foreground ml-2">validation.stream</span>
              </div>
              <Terminal className="w-3 h-3 text-muted-foreground" />
            </div>
            <div ref={termRef} className="h-[360px] overflow-y-auto space-y-0.5 text-[11px] font-mono leading-relaxed">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`py-0.5 ${
                    line.includes("[DONE]") || line.includes("[CONSENSUS]") ? "text-success"
                    : line.includes("[WARN]") ? "text-warning"
                    : line.includes("[SIGNAL]") || line.includes("[TREND]") ? "text-foreground/70"
                    : line.includes("[DEBATE]") ? "text-primary"
                    : "text-muted-foreground"
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              {isValidating && <span className="inline-block w-1.5 h-4 bg-primary/70 animate-pulse" />}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ValidatePage;
