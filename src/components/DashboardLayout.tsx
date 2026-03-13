import { NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Activity, Search, Settings, TrendingUp, DollarSign,
  Swords, Database, FileText, Bookmark, Clock, Eye, Compass,
  ChevronLeft, ChevronRight, Radio, Wifi,
} from "lucide-react";
import { useState, useEffect } from "react";

const navSections = [
  {
    label: "Core",
    items: [
      { to: "/dashboard", icon: Activity, label: "Command Center", end: true },
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
  const [scanCount, setScanCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanCount((c) => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 h-full bg-surface-0 z-50 flex flex-col overflow-hidden border-r border-border"
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center neon-glow flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-primary" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold tracking-brutal whitespace-nowrap"
            >
              REDDIT<span className="neon-text">PULSE</span>
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5 px-2.5">
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
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-200 group relative ${
                        isActive
                          ? "bg-primary/8 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-primary"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                          />
                        )}
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Status + Collapse */}
        <div className="border-t border-border">
          {!collapsed && (
            <div className="px-3 py-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-neon status-live" />
              <span className="text-[10px] font-mono text-muted-foreground">
                {scanCount.toLocaleString()} indexed
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full h-10 border-t border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/30"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-1 min-h-screen"
      >
        {/* Top status bar */}
        <div className="sticky top-0 z-40 h-10 border-b border-border bg-surface-0/80 backdrop-blur-xl flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-primary animate-pulse-neon" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-wider">Live</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <span className="text-[10px] font-mono text-muted-foreground">
              {scanCount.toLocaleString()} posts · 34 subreddits · 4 platforms
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-mono text-muted-foreground">3 models active</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <span className="text-[10px] font-mono text-muted-foreground">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        {/* Grid pattern background */}
        <div className="grid-pattern fixed inset-0 pointer-events-none z-0 opacity-15" />

        {/* Page content */}
        <div className="relative z-10 p-6 lg:p-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
