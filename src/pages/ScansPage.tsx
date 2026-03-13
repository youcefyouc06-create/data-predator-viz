import { motion } from "framer-motion";
import { Search, Clock, Radio, Target } from "lucide-react";
import { useState } from "react";

const mockScans = [
  { id: 1, keyword: "AI code review", posts: 347, subreddits: 12, status: "complete", duration: "10min", topSubreddit: "r/programming", sentiment: 72 },
  { id: 2, keyword: "no-code automation", posts: 892, subreddits: 28, status: "complete", duration: "1h", topSubreddit: "r/nocode", sentiment: 65 },
  { id: 3, keyword: "meeting transcription", posts: 156, subreddits: 8, status: "running", duration: "10h", topSubreddit: "r/productivity", sentiment: 81 },
  { id: 4, keyword: "email marketing alternatives", posts: 234, subreddits: 15, status: "complete", duration: "48h", topSubreddit: "r/Emailmarketing", sentiment: 44 },
];

const ScansPage = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-bold font-display tracking-tight-custom">Keyword Scans</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Deep-scan Reddit for any keyword or niche</p>
      </motion.div>

      {/* Targeting system */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bento-cell rounded-[14px] p-5 mb-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] font-mono font-semibold text-primary uppercase tracking-[0.12em]">Targeting System</span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword to scan..."
              className="w-full bg-surface-0 border border-border rounded-lg pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 font-mono transition-all"
            />
          </div>
          <select className="bg-surface-0 border border-border rounded-lg px-3 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 font-mono">
            <option>10 min</option>
            <option>1 hour</option>
            <option>10 hours</option>
            <option>48 hours</option>
          </select>
          <button
            className="inline-flex items-center gap-2 px-5 h-10 rounded-lg text-[13px] font-semibold cursor-pointer transition-all text-primary-foreground"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "0 0 24px hsla(16,100%,50%,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 32px hsla(16,100%,50%,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 24px hsla(16,100%,50%,0.3)";
            }}
          >
            <Radio className="w-3.5 h-3.5" />
            Start Scan
          </button>
        </div>
      </motion.div>

      {/* Full-width scan results */}
      <div className="space-y-2">
        {mockScans.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bento-cell rounded-[14px] p-5 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${scan.status === "running" ? "bg-build status-live" : "bg-muted-foreground/30"}`}
                style={scan.status === "running" ? { animation: "pulse-green 2s ease infinite" } : {}}
              />
              <div>
                <h3 className="text-sm font-bold font-mono">"{scan.keyword}"</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{scan.topSubreddit} · {scan.subreddits} subreddits</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-extrabold font-display tracking-tight-custom">{scan.posts.toLocaleString()}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-[0.12em]">posts</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-extrabold font-display tracking-tight-custom ${scan.sentiment >= 70 ? "text-build" : scan.sentiment >= 50 ? "text-risky" : "text-dont"}`}>
                  {scan.sentiment}%
                </p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-[0.12em]">sentiment</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                <Clock className="w-3 h-3" />
                {scan.duration}
              </div>
              <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-md font-mono ${
                scan.status === "running"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {scan.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScansPage;
