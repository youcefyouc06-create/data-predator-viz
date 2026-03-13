import { motion } from "framer-motion";
import { TrendingUp, ThumbsUp, ThumbsDown, Flame } from "lucide-react";

const ideas = [
  { id: 1, title: "AI-powered code review tool for solo devs", verdict: "BUILD IT", confidence: 82, score: 347, comments: 89, author: "u/launch_king", timeAgo: "2h ago" },
  { id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, score: 213, comments: 42, author: "u/podmaster", timeAgo: "5h ago" },
  { id: 3, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, score: 562, comments: 134, author: "u/niche_hunter", timeAgo: "8h ago" },
  { id: 4, title: "Browser extension for LinkedIn CRM auto-logging", verdict: "DON'T BUILD", confidence: 38, score: 45, comments: 12, author: "u/sales_bro", timeAgo: "12h ago" },
  { id: 5, title: "Open-source Zapier alternative for developers", verdict: "RISKY", confidence: 61, score: 289, comments: 67, author: "u/automate_dev", timeAgo: "1d ago" },
  { id: 6, title: "AI meeting summarizer with action item extraction", verdict: "BUILD IT", confidence: 78, score: 445, comments: 98, author: "u/meetingfree", timeAgo: "1d ago" },
];

const verdictColors: Record<string, string> = {
  "BUILD IT": "text-primary bg-primary/10 border-primary/30",
  "RISKY": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "DON'T BUILD": "text-destructive bg-destructive/10 border-destructive/30",
};

const ExplorePage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Explore Ideas</h1>
        <p className="text-muted-foreground mt-1">Browse community-validated ideas and insights</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "BUILD IT", "RISKY", "DON'T BUILD"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              f === "All"
                ? "bg-primary/10 text-primary neon-border border"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-xl p-5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold leading-snug pr-4 group-hover:text-foreground transition-colors">
                {idea.title}
              </h3>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border whitespace-nowrap ${verdictColors[idea.verdict]}`}>
                {idea.verdict}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {idea.confidence}% confidence
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {idea.score} score
              </span>
              <span>{idea.comments} comments</span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">{idea.author}</span>
              <span className="text-xs text-muted-foreground">{idea.timeAgo}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
