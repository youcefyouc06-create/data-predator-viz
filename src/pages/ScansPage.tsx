import { motion } from "framer-motion";
import { Search, Clock, Radio } from "lucide-react";
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Keyword Scans</h1>
        <p className="text-muted-foreground mt-1">Deep-scan Reddit for any keyword or niche</p>
      </motion.div>

      {/* New Scan */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword to scan..."
              className="w-full bg-secondary/30 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 font-mono transition-all"
            />
          </div>
          <select className="bg-secondary/30 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono">
            <option>10 min</option>
            <option>1 hour</option>
            <option>10 hours</option>
            <option>48 hours</option>
          </select>
          <Button variant="neon">
            <Radio className="w-4 h-4" />
            Start Scan
          </Button>
        </div>
      </motion.div>

      {/* Scan Results */}
      <div className="space-y-3">
        {mockScans.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 flex items-center justify-between group hover:neon-border hover:border transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${scan.status === "running" ? "bg-primary animate-pulse-neon" : "bg-muted-foreground"}`} />
              <div>
                <h3 className="text-sm font-semibold font-mono">"{scan.keyword}"</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{scan.topSubreddit} · {scan.subreddits} subreddits</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-bold font-mono">{scan.posts.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground uppercase">posts found</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold font-mono">{scan.sentiment}%</p>
                <p className="text-[10px] text-muted-foreground uppercase">sentiment</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {scan.duration}
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${scan.status === "running" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
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
