import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Activity, Search, Settings, TrendingUp, DollarSign,
  Swords, Database, FileText, Bookmark, Clock, Eye, Compass,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    label: "Core",
    items: [
      { to: "/dashboard", icon: Activity, label: "Dashboard", end: true },
      { to: "/dashboard/validate", icon: Zap, label: "Validate" },
      { to: "/dashboard/explore", icon: Compass, label: "Explore" },
      { to: "/dashboard/scans", icon: Search, label: "Scans" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/dashboard/trends", icon: TrendingUp, label: "Trends" },
      { to: "/dashboard/wtp", icon: DollarSign, label: "WTP Detection" },
      { to: "/dashboard/competitors", icon: Swords, label: "Competitors" },
      { to: "/dashboard/sources", icon: Database, label: "Sources" },
    ],
  },
  {
    label: "Personal",
    items: [
      { to: "/dashboard/reports", icon: FileText, label: "Reports" },
      { to: "/dashboard/saved", icon: Bookmark, label: "Saved" },
      { to: "/dashboard/digest", icon: Clock, label: "Digest" },
      { to: "/dashboard/watchlist", icon: Eye, label: "Watchlist" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/dashboard/settings", icon: Settings, label: "Settings" },
    ],
  },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-full border-r border-border bg-surface-1 z-50 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 neon-border border flex items-center justify-center neon-glow flex-shrink-0">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold tracking-tight-custom whitespace-nowrap"
            >
              Reddit<span className="neon-text">Pulse</span>
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-3">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map(({ to, icon: Icon, label, ...rest }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={"end" in rest}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-primary/10 text-primary neon-border border"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-12 border-t border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="flex-1 min-h-screen"
      >
        <div className="grid-pattern fixed inset-0 pointer-events-none z-0 opacity-20" />
        <div className="relative z-10 p-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
