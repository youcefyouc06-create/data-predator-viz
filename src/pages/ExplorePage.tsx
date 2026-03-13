import { motion } from "framer-motion";
import { useState } from "react";

const ideas = [
  { id: 1, title: "AI-powered code review tool for solo devs", verdict: "BUILD IT", confidence: 82, score: 347, comments: 89, author: "u/launch_king", timeAgo: "2h ago", trending: "+45%", tags: ["devtools", "AI"] },
  { id: 2, title: "Automated podcast show notes generator", verdict: "RISKY", confidence: 54, score: 213, comments: 42, author: "u/podmaster", timeAgo: "5h ago", trending: "+12%", tags: ["content", "AI"] },
  { id: 3, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, score: 562, comments: 134, author: "u/niche_hunter", timeAgo: "8h ago", trending: "+67%", tags: ["newsletter", "automation"] },
  { id: 4, title: "Browser extension for LinkedIn CRM auto-logging", verdict: "DON'T BUILD", confidence: 38, score: 45, comments: 12, author: "u/sales_bro", timeAgo: "12h ago", trending: "-8%", tags: ["CRM", "extension"] },
  { id: 5, title: "Open-source Zapier alternative for developers", verdict: "RISKY", confidence: 61, score: 289, comments: 67, author: "u/automate_dev", timeAgo: "1d ago", trending: "+23%", tags: ["open-source", "automation"] },
  { id: 6, title: "AI meeting summarizer with action item extraction", verdict: "BUILD IT", confidence: 78, score: 445, comments: 98, author: "u/meetingfree", timeAgo: "1d ago", trending: "+34%", tags: ["productivity", "AI"] },
];

const verdictConfig: Record<string, { className: string; arrow: string }> = {
  "BUILD IT": { className: "bg-build/10 text-build border border-build/25", arrow: "▲" },
  "RISKY": { className: "bg-risky/10 text-risky border border-risky/25", arrow: "" },
  "DON'T BUILD": { className: "bg-dont/10 text-dont border border-dont/25", arrow: "▼" },
};

const ExplorePage = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "BUILD IT", "RISKY", "DON'T BUILD"];
  const filtered = filter === "All" ? ideas : ideas.filter((i) => i.verdict === filter);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-bold font-display tracking-tight-custom">Explore Ideas</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Community-validated ideas and market signals</p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-[10px] w-fit" style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(var(--border))" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-[18px] py-1.5 rounded-[7px] text-[11px] font-medium tracking-wider transition-all ${
              f === filter
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={f === filter ? { background: "hsl(var(--orange-dim))", border: "1px solid hsl(16 100% 50% / 0.2)" } : { border: "1px solid transparent" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 3-col flip card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {filtered.map((idea, i) => {
          const v = verdictConfig[idea.verdict];
          return (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flip-wrap h-[200px]"
            >
              <div className="flip-inner">
                {/* Front */}
                <div
                  className="flip-front p-5 flex flex-col gap-2.5"
                  style={{
                    background: "hsl(0 0% 100% / 0.025)",
                    border: "1px solid hsl(var(--border))",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.07), transparent)" }} />
                  <span className={`inline-flex items-center gap-[5px] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full w-fit font-mono ${v.className}`}>
                    {v.arrow && <span className="text-[8px]">{v.arrow}</span>}
                    {idea.verdict}
                  </span>
                  <h3 className="text-sm font-medium leading-snug text-foreground flex-1">{idea.title}</h3>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{idea.author}</span>
                    <span>{idea.timeAgo}</span>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="flip-back p-5 flex flex-col justify-center gap-2"
                  style={{
                    background: "hsla(0,0%,4%,0.97)",
                    border: "1px solid hsl(16 100% 50% / 0.2)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "inset 0 0 30px hsla(16,100%,50%,0.04)",
                  }}
                >
                  {[
                    { label: "Upvotes", value: idea.score.toString() },
                    { label: "Comments", value: idea.comments.toString() },
                    { label: "Confidence", value: `${idea.confidence}%` },
                    { label: "Trending", value: idea.trending },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center text-[13px] text-muted-foreground pb-1.5" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.04)" }}>
                      <span>{stat.label}</span>
                      <strong className="text-foreground font-mono">{stat.value}</strong>
                    </div>
                  ))}
                  <div className="flex gap-1.5 mt-1">
                    {idea.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
