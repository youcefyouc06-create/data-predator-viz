import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const providers = [
  { name: "Gemini", models: ["3.1 Pro", "3.1 Flash-Lite", "3 Flash"], color: "text-blue-400" },
  { name: "OpenAI", models: ["GPT-5.4", "GPT-5.3 Codex", "GPT-5.2"], color: "text-emerald-400" },
  { name: "Anthropic", models: ["Opus 4.6", "Sonnet 4.6", "Haiku 4.5"], color: "text-warning" },
  { name: "Groq", models: ["Llama 4 Scout", "Llama 3.3 70B"], color: "text-orange-400" },
  { name: "DeepSeek", models: ["V4", "V3.2 Speciale", "Reasoner"], color: "text-cyan-400" },
  { name: "Grok", models: ["4.1", "4.1 Fast"], color: "text-destructive" },
  { name: "Minimax", models: ["MiniMax-01"], color: "text-pink-400" },
  { name: "OpenRouter", models: ["Claude 3.5", "GPT-4o", "Qwen3 480B"], color: "text-violet-400" },
  { name: "Ollama", models: ["Custom (local)"], color: "text-muted-foreground" },
];

const activeModels = [
  { provider: "Gemini", model: "gemini-2.0-flash", priority: 1, status: "verified", key: "•••••••AIza" },
  { provider: "Groq", model: "llama-3.3-70b", priority: 2, status: "verified", key: "•••••••gsk_" },
  { provider: "OpenAI", model: "gpt-4o", priority: 3, status: "error", key: "•••••••sk-p" },
];

const statusIcons: Record<string, React.ReactNode> = {
  verified: <CheckCircle className="w-3.5 h-3.5 text-primary" />,
  error: <XCircle className="w-3.5 h-3.5 text-destructive" />,
  pending: <AlertTriangle className="w-3.5 h-3.5 text-warning" />,
};

const SettingsPage = () => {
  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">AI models · Account · Configuration</p>
      </motion.div>

      {/* Active Models */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Active Agents ({activeModels.length}/6)
          </h3>
          <Button variant="neon" size="sm" className="h-7 text-[10px]">
            <Plus className="w-3 h-3" /> Add Model
          </Button>
        </div>

        <div className="space-y-1.5">
          {activeModels.map((model, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3.5 rounded-lg bg-surface-1 border border-border/50 group hover:border-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary font-mono border border-primary/20">
                  P{model.priority}
                </span>
                <div>
                  <p className="text-xs font-bold">{model.provider} <span className="text-muted-foreground font-mono text-[10px]">/ {model.model}</span></p>
                  <p className="text-[10px] text-muted-foreground font-mono">{model.key}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                {statusIcons[model.status]}
                <button className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Providers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bento-card rounded-xl p-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
          Available Providers (9)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {providers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03 }}
              whileHover={{ scale: 1.02 }}
              className="p-3.5 rounded-lg bg-surface-1 border border-border/50 hover:border-primary/20 transition-all cursor-pointer"
            >
              <p className={`text-xs font-bold ${p.color}`}>{p.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-mono leading-relaxed">
                {p.models.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
