import { motion } from "framer-motion";
import { Search, Clock, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockScans = [
  { id: 1, keyword: "AI code review", posts: 347, subreddits: 12, status: "complete", duration: "10min", topSubreddit: "r/programming", sentiment: 72 },
  { id: 2, keyword: "no-code automation", posts: 892, subreddits: 28, status: "complete", duration: "1h", topSubreddit: "r/nocode", sentiment: 65 },
  { id: 3, keyword: "meeting transcription", posts: 156, subreddits: 8, status: "running", duration: "10h", topSubreddit: "r/productivity", sentiment: 81 },
  { id: 4, keyword: "email marketing alternatives", posts: 234, subreddits: 15, status: "complete", duration: "48h", topSubreddit: "r/Emailmarketing", sentiment: 44 },
];

const ScansPage = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Keyword Scans</h1>
        <p className="text-muted-foreground mt-1 text-sm">Deep-scan Reddit for any keyword or niche</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="surface-card p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">Targeting System</span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword to scan..."
              className="w-full bg-surface-1 border border-[rgba(255,255,255,0.08)] rounded-[7px] pl-9 pr-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
            />
          </div>
          <select className="bg-surface-1 border border-[rgba(255,255,255,0.08)] rounded-[7px] px-3 py-2.5 text-[13px] text-foreground font-mono focus:outline-none focus:border-primary/50">
            <option>10 min</option>
            <option>1 hour</option>
            <option>10 hours</option>
            <option>48 hours</option>
          </select>
          <Button size="sm">
            <Search className="w-3.5 h-3.5" />
            Start Scan
          </Button>
        </div>
      </motion.div>

      {/* Results */}
      <div className="space-y-3">
        {mockScans.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            className="surface-card p-5 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${scan.status === "running" ? "bg-success animate-pulse-dot" : "bg-muted-foreground/30"}`} />
              <div>
                <h3 className="text-[14px] font-medium font-mono">"{scan.keyword}"</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">{scan.topSubreddit} · {scan.subreddits} subreddits</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[24px] font-semibold font-mono">{scan.posts.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.08em]">posts</p>
              </div>
              <div className="text-right">
                <p className={`text-[24px] font-semibold font-mono ${scan.sentiment >= 70 ? "text-success" : scan.sentiment >= 50 ? "text-warning" : "text-destructive"}`}>
                  {scan.sentiment}%
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.08em]">sentiment</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                <Clock className="w-3 h-3" />
                {scan.duration}
              </div>
              <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[5px] font-mono ${
                scan.status === "running"
                  ? "badge-build"
                  : "bg-surface-2 text-muted-foreground"
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
