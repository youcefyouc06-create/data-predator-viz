import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, XCircle, AlertTriangle, User, Mail, Key } from "lucide-react";

const providers = [
  { name: "Gemini", models: ["3.1 Pro", "3.1 Flash-Lite", "3 Flash"], color: "text-teal" },
  { name: "OpenAI", models: ["GPT-5.4", "GPT-5.3 Codex", "GPT-5.2"], color: "text-build" },
  { name: "Anthropic", models: ["Opus 4.6", "Sonnet 4.6", "Haiku 4.5"], color: "text-risky" },
  { name: "Groq", models: ["Llama 4 Scout", "Llama 3.3 70B"], color: "text-primary" },
  { name: "DeepSeek", models: ["V4", "V3.2 Speciale", "Reasoner"], color: "text-teal" },
  { name: "Grok", models: ["4.1", "4.1 Fast"], color: "text-dont" },
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
  verified: <CheckCircle className="w-3.5 h-3.5 text-build" />,
  error: <XCircle className="w-3.5 h-3.5 text-dont" />,
  pending: <AlertTriangle className="w-3.5 h-3.5 text-risky" />,
};

const SettingsPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-[32px] font-bold font-display tracking-tight-custom">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">AI models · Account · Configuration</p>
      </motion.div>

      {/* Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT — AI Config */}
        <div className="space-y-4">
          {/* Active models */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-cell rounded-[14px] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Active Agents ({activeModels.length}/6)
              </p>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-primary transition-all"
                style={{ background: "hsl(var(--orange-dim))", border: "1px solid hsl(16 100% 50% / 0.2)" }}
              >
                <Plus className="w-3 h-3" /> Add Model
              </button>
            </div>
            <div className="space-y-1.5">
              {activeModels.map((model, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3.5 rounded-lg group hover:bg-surface-2 transition-colors"
                  style={{ background: "hsl(var(--surface-1))", border: "1px solid hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold font-mono"
                      style={{ background: "hsl(var(--orange-dim))", color: "hsl(var(--primary))", border: "1px solid hsl(16 100% 50% / 0.2)" }}
                    >
                      P{model.priority}
                    </span>
                    <div>
                      <p className="text-xs font-bold">{model.provider} <span className="text-muted-foreground font-mono text-[10px]">/ {model.model}</span></p>
                      <p className="text-[10px] text-muted-foreground font-mono">{model.key}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {statusIcons[model.status]}
                    <button className="text-muted-foreground hover:text-dont transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Available providers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bento-cell rounded-[14px] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Available Providers (9)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {providers.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="p-3.5 rounded-lg cursor-pointer transition-all"
                  style={{ background: "hsl(var(--surface-1))", border: "1px solid hsl(var(--border))" }}
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

        {/* RIGHT — Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bento-cell rounded-[14px] p-5 h-fit">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-5">Profile</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "hsl(var(--orange-dim))", border: "1px solid hsl(16 100% 50% / 0.2)" }}
            >
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">Sonny</p>
              <p className="text-[11px] text-muted-foreground font-mono">Pro Plan · Member since 2024</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "sonny@redditpulse.io" },
              { icon: Key, label: "API Key", value: "rp_live_•••••••••••" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2 block">{field.label}</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-xs"
                  style={{ background: "hsl(var(--surface-1))", border: "1px solid hsl(var(--border))" }}
                >
                  <field.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-foreground">{field.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5" style={{ borderTop: "1px solid hsl(var(--border))" }}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Usage</p>
            <div className="space-y-3">
              {[
                { label: "Validations this month", value: "23 / 50", pct: 46 },
                { label: "API calls", value: "1,247 / 5,000", pct: 25 },
              ].map((u) => (
                <div key={u.label}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-muted-foreground">{u.label}</span>
                    <span className="font-mono text-foreground">{u.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${u.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
