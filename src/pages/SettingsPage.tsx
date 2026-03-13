import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const providers = [
  { name: "Gemini", models: ["3.1 Pro", "3.1 Flash-Lite", "3 Flash"], color: "text-blue-400" },
  { name: "OpenAI", models: ["GPT-5.4", "GPT-5.3 Codex", "GPT-5.2"], color: "text-emerald-400" },
  { name: "Anthropic", models: ["Opus 4.6", "Sonnet 4.6", "Haiku 4.5"], color: "text-amber-400" },
  { name: "Groq", models: ["Llama 4 Scout", "Llama 3.3 70B", "Llama 3.1 8B"], color: "text-orange-400" },
  { name: "DeepSeek", models: ["V4", "V3.2 Speciale", "Reasoner"], color: "text-cyan-400" },
  { name: "Grok", models: ["4.1", "4.1 Fast"], color: "text-red-400" },
  { name: "Minimax", models: ["MiniMax-01"], color: "text-pink-400" },
  { name: "OpenRouter", models: ["Claude 3.5 Sonnet", "GPT-4o", "Qwen3 480B"], color: "text-violet-400" },
  { name: "Ollama", models: ["Custom (local)"], color: "text-gray-400" },
];

const activeModels = [
  { provider: "Gemini", model: "gemini-2.0-flash", priority: 1, status: "verified", key: "•••••••AIza" },
  { provider: "Groq", model: "llama-3.3-70b", priority: 2, status: "verified", key: "•••••••gsk_" },
  { provider: "OpenAI", model: "gpt-4o", priority: 3, status: "error", key: "•••••••sk-p" },
];

const statusIcons: Record<string, React.ReactNode> = {
  verified: <CheckCircle className="w-4 h-4 text-primary" />,
  error: <XCircle className="w-4 h-4 text-destructive" />,
  pending: <AlertTriangle className="w-4 h-4 text-amber-400" />,
};

const SettingsPage = () => {
  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure AI models and manage your account</p>
      </motion.div>

      {/* Active Models */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Active Agents ({activeModels.length}/6)
          </h3>
          <Button variant="neon" size="sm">
            <Plus className="w-3 h-3" /> Add Model
          </Button>
        </div>

        <div className="space-y-2">
          {activeModels.map((model, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border group"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary font-mono">
                  P{model.priority}
                </span>
                <div>
                  <p className="text-sm font-semibold">{model.provider} <span className="text-muted-foreground font-mono text-xs">/ {model.model}</span></p>
                  <p className="text-xs text-muted-foreground font-mono">{model.key}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {statusIcons[model.status]}
                <button className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Providers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Available Providers (9)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {providers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.03 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-secondary/20 border border-border hover:border-primary/30 transition-all cursor-pointer"
            >
              <p className={`text-sm font-bold ${p.color}`}>{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {p.models.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
