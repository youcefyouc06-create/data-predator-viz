import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";

const savedIdeas = [
  { id: 1, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, savedAt: "Mar 11, 2026", notes: "Strong signal — revisit after MVP launch" },
  { id: 2, title: "AI-powered code review for solo devs", verdict: "BUILD IT", confidence: 82, savedAt: "Mar 10, 2026", notes: "" },
  { id: 3, title: "Open-source Zapier alternative", verdict: "RISKY", confidence: 61, savedAt: "Mar 8, 2026", notes: "Monitor for 30 days — trends might shift" },
];

const verdictColors: Record<string, string> = {
  "BUILD IT": "text-primary",
  "RISKY": "text-amber-400",
  "DON'T BUILD": "text-destructive",
};

const SavedPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black tracking-tight-custom">Saved Ideas</h1>
        <p className="text-muted-foreground mt-1">Your bookmarked validations for quick access</p>
      </motion.div>

      {savedIdeas.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No saved ideas yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <Bookmark className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold">{idea.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className={`font-bold ${verdictColors[idea.verdict]}`}>{idea.verdict}</span>
                    <span>{idea.confidence}%</span>
                    <span>Saved {idea.savedAt}</span>
                  </div>
                  {idea.notes && <p className="text-xs text-muted-foreground mt-1 italic">"{idea.notes}"</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
