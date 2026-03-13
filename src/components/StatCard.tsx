import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  delay?: number;
  highlight?: boolean;
}

const StatCard = ({ label, value, subtitle, delay = 0, highlight = false }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    className={`bento-card rounded-xl p-5 cursor-default group ${highlight ? "animate-border-glow" : ""}`}
  >
    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3">
      {label}
    </p>
    <p className={`text-4xl font-black tracking-brutal leading-none ${highlight ? "neon-text-strong" : "group-hover:neon-text transition-all duration-300"}`}>
      {value}
    </p>
    {subtitle && (
      <p className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">{subtitle}</p>
    )}
  </motion.div>
);

export default StatCard;
