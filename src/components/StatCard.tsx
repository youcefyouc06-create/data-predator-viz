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
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="surface-card p-5 cursor-default"
  >
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-3">
      {label}
    </p>
    <p className={`text-[32px] font-semibold font-mono tracking-tight leading-none ${highlight ? "text-primary" : "text-foreground"}`}>
      {value}
    </p>
    {subtitle && (
      <p className="text-[11px] text-muted-foreground mt-2 font-mono">{subtitle}</p>
    )}
  </motion.div>
);

export default StatCard;
