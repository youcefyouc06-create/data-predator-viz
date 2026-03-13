import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";

const savedIdeas = [
  { id: 1, title: "Reddit-to-newsletter pipeline for niche communities", verdict: "BUILD IT", confidence: 91, savedAt: "Mar 11, 2026", notes: "Strong signal — revisit after MVP launch" },
  { id: 2, title: "AI-powered code review for solo devs", verdict: "BUILD IT", confidence: 82, savedAt: "Mar 10, 2026", notes: "" },
  { id: 3, title: "Open-source Zapier alternative", verdict: "RISKY", confidence: 61, savedAt: "Mar 8, 2026", notes: "Monitor for 30 days" },
];

const verdictStyles: Record<string, string> = {
  "BUILD IT": "text-primary",
  "RISKY": "text-warning",
  "DON'T BUILD": "text-destructive",
};

const SavedPage = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-4xl font-black tracking-brutal">Saved Ideas</h1>
        <p className="text-muted-foreground mt-1 text-sm font-mono">Bookmarked validations for quick access</p>
      </motion.div>

      {savedIdeas.length === 0 ? (
        <div className="bento-card rounded-xl p-12 text-center">
          <Bookmark className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-mono">No saved ideas yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {savedIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bento-card rounded-xl p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold">{idea.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-mono">
                    <span className={`font-bold ${verdictStyles[idea.verdict]}`}>{idea.verdict}</span>
                    <span>{idea.confidence}%</span>
                    <span>{idea.savedAt}</span>
                  </div>
                  {idea.notes && <p className="text-[10px] text-muted-foreground mt-1 italic font-mono">"{idea.notes}"</p>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-md hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
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
