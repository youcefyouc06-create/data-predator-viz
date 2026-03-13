import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  delay?: number;
}

const StatCard = ({ label, value, subtitle, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="glass-card rounded-xl p-6 cursor-default group"
  >
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
      {label}
    </p>
    <p className="text-3xl font-black tracking-tight-custom group-hover:neon-text transition-all duration-300">
      {value}
    </p>
    {subtitle && (
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    )}
  </motion.div>
);

export default StatCard;
