import { motion } from "framer-motion";
import { Cpu, Globe } from "lucide-react";

const dataSources = [
  { platform: "Reddit", icon: "🔴", posts: 2847, method: "JSON API + keyword search" },
  { platform: "HackerNews", icon: "🟠", posts: 423, method: "Algolia API (Ask HN + Show HN)" },
  { platform: "ProductHunt", icon: "🟡", posts: 89, method: "Web scraping + API" },
  { platform: "IndieHackers", icon: "🟢", posts: 156, method: "Community scraping" },
];

const modelsUsed = [
  { name: "Gemini 2.0 Flash", provider: "Google", calls: 47, tokens: "1.2M", cost: "$0.34", status: "active" },
  { name: "Llama 3.3 70B", provider: "Groq", calls: 35, tokens: "890K", cost: "$0.00", status: "active" },
  { name: "GPT-4o", provider: "OpenAI", calls: 28, tokens: "650K", cost: "$4.20", status: "active" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", calls: 12, tokens: "340K", cost: "$1.80", status: "standby" },
  { name: "DeepSeek V3", provider: "DeepSeek", calls: 8, tokens: "210K", cost: "$0.12", status: "error" },
];

const SourcesPage = () => {
  const totalPosts = dataSources.reduce((a, b) => a + b.posts, 0);
  const totalCalls = modelsUsed.reduce((a, b) => a + b.calls, 0);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Data Sources</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Platforms scraped · AI models deployed</p>
      </motion.div>

      {/* Platforms */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Platforms ({dataSources.length})
          </h3>
          <p className="text-[10px] font-mono text-primary font-bold">{totalPosts.toLocaleString()} total posts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {dataSources.map((s, i) => (
            <motion.div key={s.platform} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="p-4 rounded-lg bg-surface-1 border border-border/50 flex items-center justify-between hover:border-border transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-bold">{s.platform}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{s.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black font-mono tracking-brutal">{s.posts.toLocaleString()}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">posts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Models */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bento-card rounded-xl overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2 mb-4">
            <Cpu className="w-3.5 h-3.5" /> AI Models ({totalCalls} calls)
          </h3>
        </div>
        <div className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-4 px-5 py-3 border-b border-border text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          <span>Model</span>
          <span className="text-right">Calls</span>
          <span className="text-right">Tokens</span>
          <span className="text-right">Cost</span>
          <span className="text-right">Status</span>
        </div>
        {modelsUsed.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }}
            className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-4 px-5 py-3.5 border-b border-border/50 last:border-0 items-center hover:bg-secondary/10 transition-colors">
            <div>
              <p className="text-xs font-bold">{m.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{m.provider}</p>
            </div>
            <p className="text-xs font-mono text-right font-bold">{m.calls}</p>
            <p className="text-xs font-mono text-right">{m.tokens}</p>
            <p className="text-xs font-mono text-right neon-text font-bold">{m.cost}</p>
            <div className="flex justify-end">
              <span className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-primary animate-pulse-neon status-live" : m.status === "error" ? "bg-destructive" : "bg-muted-foreground/40"}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SourcesPage;
