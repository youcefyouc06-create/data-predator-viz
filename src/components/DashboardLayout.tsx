import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Activity, Search, Settings, TrendingUp, DollarSign,
  Swords, Database, FileText, Bookmark, Clock, Eye, Compass,
  ChevronLeft, ChevronRight,
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

const pageTitles: Record<string, string> = {
  "/dashboard": "Command Center",
  "/dashboard/validate": "Validate",
  "/dashboard/explore": "Explore",
  "/dashboard/scans": "Scans",
  "/dashboard/trends": "Trends",
  "/dashboard/wtp": "WTP Detection",
  "/dashboard/competitors": "Competitors",
  "/dashboard/sources": "Sources",
  "/dashboard/reports": "Reports",
  "/dashboard/saved": "Saved",
  "/dashboard/digest": "Digest",
  "/dashboard/watchlist": "Watchlist",
  "/dashboard/settings": "Settings",
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [scanCount, setScanCount] = useState(2960);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setScanCount((c) => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 220 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 h-full z-50 flex flex-col overflow-hidden"
        style={{ background: "#0c0c0e", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <div className="h-11 flex items-center px-4 gap-2.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3 h-3 text-primary" />
          </div>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-semibold tracking-tight-custom whitespace-nowrap text-foreground">
              RedditPulse
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5 px-3">
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
                      `flex items-center gap-2.5 px-3 py-[9px] rounded-md text-[13px] font-medium transition-all duration-150 group relative ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                    style={({ isActive }) => isActive ? { background: "rgba(99,102,241,0.08)" } : { background: "transparent" }}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                          />
                        )}
                        <Icon className="w-[15px] h-[15px] flex-shrink-0" />
                        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </motion.aside>

      {/* Main content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 60 : 220 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-1 min-h-screen"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 h-11 bg-background/80 backdrop-blur-xl flex items-center px-6 justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-muted-foreground">{currentTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-[6px] h-[6px] rounded-full bg-success animate-pulse-dot" />
              <span className="text-[11px] font-mono text-muted-foreground">LIVE</span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {scanCount.toLocaleString()} posts <span className="text-muted-foreground/50">·</span> 34 subreddits <span className="text-muted-foreground/50">·</span> 4 platforms
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-[5px] bg-primary/10 text-primary border border-primary/20">
              3 models active
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        {/* Dot grid background */}
        <div className="dot-grid fixed inset-0 pointer-events-none z-0" />

        {/* Page content */}
        <div className="relative z-10 p-6 lg:p-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
