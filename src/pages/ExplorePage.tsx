import { motion } from "framer-motion";
import { TrendingUp, Flame, MessageSquare } from "lucide-react";
import { useState } from "react";

const ideas = [
  { id: 1, title: "AI-powered code review tool for solo devs", verdict: "BUILD IT", confidence: 82, score: 347, comments: 89, author: "u/launch_king", timeAgo: "2h ago" },
  { id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, score: 213, comments: 42, author: "u/podmaster", timeAgo: "5h ago" },
  { id: 3, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, score: 562, comments: 134, author: "u/niche_hunter", timeAgo: "8h ago" },
  { id: 4, title: "Browser extension for LinkedIn CRM auto-logging", verdict: "DON'T BUILD", confidence: 38, score: 45, comments: 12, author: "u/sales_bro", timeAgo: "12h ago" },
  { id: 5, title: "Open-source Zapier alternative for developers", verdict: "RISKY", confidence: 61, score: 289, comments: 67, author: "u/automate_dev", timeAgo: "1d ago" },
  { id: 6, title: "AI meeting summarizer with action item extraction", verdict: "BUILD IT", confidence: 78, score: 445, comments: 98, author: "u/meetingfree", timeAgo: "1d ago" },
];

const filters = ["All", "BUILD IT", "RISKY", "DON'T BUILD"] as const;

const verdictClass: Record<string, string> = {
  "BUILD IT": "badge-build",
  "RISKY": "badge-risky",
  "DON'T BUILD": "badge-dont",
};

const ExplorePage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = activeFilter === "All" ? ideas : ideas.filter((i) => i.verdict === activeFilter);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight-custom">Explore Ideas</h1>
          <p className="text-muted-foreground mt-1 text-sm">Community-validated ideas and market signals</p>
        </div>
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-[5px] text-[11px] font-semibold tracking-[0.02em] transition-all ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeFilter !== f ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" } : {}}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="surface-card p-5 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[15px] font-medium leading-snug pr-4">
                {idea.title}
              </h3>
              <span className={`text-[11px] font-semibold uppercase px-2.5 py-[3px] rounded-[5px] whitespace-nowrap tracking-[0.05em] ${verdictClass[idea.verdict]}`}>
                {idea.verdict}
              </span>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.04)] pt-3 mt-3" />

            <div className="flex items-center gap-4 text-[13px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                {idea.confidence}%
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {idea.score}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                {idea.comments}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
              <span className="text-[12px] text-muted-foreground font-mono">{idea.author}</span>
              <span className="text-[12px] text-muted-foreground font-mono">{idea.timeAgo}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
