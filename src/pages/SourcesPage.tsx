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
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-semibold tracking-tight-custom">Data Sources</h1>
        <p className="text-muted-foreground mt-1 text-sm">Platforms scraped · AI models deployed</p>
      </motion.div>

      {/* Platforms */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="surface-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Platforms ({dataSources.length})
          </h3>
          <p className="text-[11px] font-mono text-primary font-semibold">{totalPosts.toLocaleString()} total posts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataSources.map((s, i) => (
            <motion.div key={s.platform} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 + i * 0.04 }}
              className="p-4 rounded-lg bg-surface-1 flex items-center justify-between" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="text-[14px] font-medium">{s.platform}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">{s.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[24px] font-semibold font-mono">{s.posts.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.08em]">posts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Models */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="surface-card overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground flex items-center gap-2 mb-4">
            <Cpu className="w-3.5 h-3.5" /> AI Models ({totalCalls} calls)
          </h3>
        </div>
        <div className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-4 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Model</span>
          <span className="text-right">Calls</span>
          <span className="text-right">Tokens</span>
          <span className="text-right">Cost</span>
          <span className="text-right">Status</span>
        </div>
        {modelsUsed.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 + i * 0.03 }}
            className="grid grid-cols-[1fr_80px_80px_80px_60px] gap-4 px-5 py-3.5 items-center hover:bg-surface-2/50 transition-colors"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div>
              <p className="text-[13px] font-medium">{m.name}</p>
              <p className="text-[11px] text-muted-foreground font-mono">{m.provider}</p>
            </div>
            <p className="text-[13px] font-mono text-right font-semibold">{m.calls}</p>
            <p className="text-[13px] font-mono text-right">{m.tokens}</p>
            <p className="text-[13px] font-mono text-right text-primary font-semibold">{m.cost}</p>
            <div className="flex justify-end">
              <span className={`w-[6px] h-[6px] rounded-full ${m.status === "active" ? "bg-success animate-pulse-dot" : m.status === "error" ? "bg-destructive" : "bg-muted-foreground/40"}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SourcesPage;
