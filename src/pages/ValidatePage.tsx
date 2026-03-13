import { motion } from "framer-motion";
import { Zap, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const stages = [
  { label: "Decomposing idea...", detail: "Extracting keywords, audience, competitors" },
  { label: "Scraping Reddit...", detail: "Searching r/SaaS, r/startups, r/Entrepreneur" },
  { label: "Scraping HackerNews...", detail: "Querying Algolia API for Ask HN & Show HN" },
  { label: "Analyzing trends...", detail: "Google Trends data for top 5 keywords" },
  { label: "Competition analysis...", detail: "Scanning G2, ProductHunt, alternatives" },
  { label: "AI Pass 1: Market...", detail: "Pain validation, WTP signals, TAM" },
  { label: "AI Pass 2: Strategy...", detail: "ICP, competition landscape, pricing" },
  { label: "AI Pass 3: Launch...", detail: "Roadmap, projections, risk matrix" },
  { label: "Debate engine...", detail: "Models debating verdict" },
  { label: "Complete!", detail: "Report generated" },
];

const ValidatePage = () => {
  const [idea, setIdea] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);

  const handleValidate = () => {
    if (!idea.trim()) return;
    setIsValidating(true);
    setCurrentStage(0);
    // Simulate stages
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage >= stages.length) {
        clearInterval(interval);
        setIsValidating(false);
        return;
      }
      setCurrentStage(stage);
    }, 1500);
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Validate Idea</h1>
        <p className="text-muted-foreground mt-1">Submit your idea for AI-powered market validation</p>
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Describe your idea
        </label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A tool that scrapes Reddit to validate SaaS ideas using AI debate between multiple models..."
          rows={4}
          className="w-full bg-secondary/30 border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none font-mono transition-all"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Target Audience</label>
            <input
              placeholder="e.g., SaaS founders"
              className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Pain Hypothesis</label>
            <input
              placeholder="e.g., Manual validation is slow"
              className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Known Competitors</label>
            <input
              placeholder="e.g., Gummy Search, SparkToro"
              className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono transition-all"
            />
          </div>
        </div>

        <Button
          variant="neon"
          className="mt-6 w-full md:w-auto"
          onClick={handleValidate}
          disabled={isValidating || !idea.trim()}
        >
          {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {isValidating ? "Validating..." : "Launch Validation"}
        </Button>
      </motion.div>

      {/* Progress */}
      {currentStage >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Validation Pipeline
          </h3>
          <div className="space-y-3">
            {stages.map((stage, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                  i === currentStage
                    ? "bg-primary/10 neon-border border"
                    : i < currentStage
                    ? "opacity-50"
                    : "opacity-20"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {i < currentStage ? (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  ) : i === currentStage ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{stage.label}</p>
                  <p className="text-xs text-muted-foreground">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ValidatePage;
