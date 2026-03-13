import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";

const ideas = [
  { id: 1, title: "AI-powered code review tool for solo devs", verdict: "BUILD IT", confidence: 82, score: 347, comments: 89, author: "u/launch_king", timeAgo: "2h ago" },
  { id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, score: 213, comments: 42, author: "u/podmaster", timeAgo: "5h ago" },
  { id: 3, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, score: 562, comments: 134, author: "u/niche_hunter", timeAgo: "8h ago" },
  { id: 4, title: "Browser extension for LinkedIn CRM auto-logging", verdict: "DON'T BUILD", confidence: 38, score: 45, comments: 12, author: "u/sales_bro", timeAgo: "12h ago" },
  { id: 5, title: "Open-source Zapier alternative for developers", verdict: "RISKY", confidence: 61, score: 289, comments: 67, author: "u/automate_dev", timeAgo: "1d ago" },
  { id: 6, title: "AI meeting summarizer with action item extraction", verdict: "BUILD IT", confidence: 78, score: 445, comments: 98, author: "u/meetingfree", timeAgo: "1d ago" },
];

const verdictStyles: Record<string, string> = {
  "BUILD IT": "bg-primary/10 text-primary border-primary/20 neon-glow",
  "RISKY": "bg-warning/10 text-warning border-warning/20",
  "DON'T BUILD": "bg-destructive/10 text-destructive border-destructive/20",
};

const ExplorePage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Explore Ideas</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Community-validated ideas and market signals</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["All", "BUILD IT", "RISKY", "DON'T BUILD"].map((f, i) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all font-mono ${
              f === "All"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ideas.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="bento-card rounded-xl p-5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-bold leading-snug pr-4 group-hover:text-foreground transition-colors">
                {idea.title}
              </h3>
              <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-md border whitespace-nowrap font-mono ${verdictStyles[idea.verdict]}`}>
                {idea.verdict}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {idea.confidence}%
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {idea.score}
              </span>
              <span>{idea.comments} comments</span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <span className="text-[10px] text-muted-foreground font-mono">{idea.author}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{idea.timeAgo}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
