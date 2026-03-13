import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Compass, TrendingUp, Search, Settings, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";

const dockItems = [
  { to: "/dashboard/validate", icon: Zap, label: "Validate" },
  { to: "/dashboard/explore", icon: Compass, label: "Explore" },
  { to: "/dashboard/trends", icon: TrendingUp, label: "Trends" },
  { to: "/dashboard/scans", icon: Search, label: "Scans" },
];

const dockRight = [
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const DashboardLayout = () => {
  const [postCount, setPostCount] = useState(2960);
  const [clock, setClock] = useState("");
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) setPostCount((c) => c + Math.floor(Math.random() * 3));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Three.js background */}
      <ThreeBackground />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Atmospheric blobs */}
      <div
        className="fixed pointer-events-none rounded-full"
        style={{
          top: -200, left: -150, width: 700, height: 700,
          filter: "blur(140px)", background: "hsla(16, 100%, 50%, 0.07)",
          animation: "drift 18s ease-in-out infinite alternate", zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none rounded-full"
        style={{
          bottom: -250, right: -100, width: 600, height: 600,
          filter: "blur(120px)", background: "hsla(16, 70%, 50%, 0.05)",
          animation: "drift 24s ease-in-out infinite alternate-reverse", zIndex: 0,
        }}
      />

      {/* Top Status Bar */}
      <header
        className="sticky top-0 z-50 h-11 flex items-center justify-between px-6"
        style={{
          background: "hsla(0,0%,4%,0.7)",
          borderBottom: "1px solid hsl(0 0% 100% / 0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Wordmark */}
          <span className="font-mono text-[13px] font-semibold tracking-wider">
            <span className="text-muted-foreground">⬡</span>{" "}
            <span className="text-foreground">REDDIT</span>
            <span className="text-primary">PULSE</span>
          </span>

          <div className="h-3 w-px bg-border" />

          {/* Live pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
            style={{ background: "hsla(134,61%,55%,0.08)", border: "1px solid hsla(134,61%,55%,0.2)" }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-build status-live" style={{ animation: "pulse-green 2s ease infinite" }} />
            <span className="text-[10px] font-mono font-medium text-build">LIVE</span>
          </div>

          <div className="h-3 w-px bg-border" />

          <span className="text-[10px] font-mono text-muted-foreground">
            {postCount.toLocaleString()} posts · 34 subreddits · 4 platforms
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Model dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-primary" style={{ boxShadow: "0 0 6px hsla(16,100%,50%,0.25)" }} />
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#ff6534" }} />
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: "hsla(16,100%,50%,0.5)" }} />
          </div>
          <div className="h-3 w-px bg-border" />
          <span className="text-[10px] font-mono text-muted-foreground">{clock}</span>
        </div>
      </header>

      {/* Page Content */}
      <main className="relative z-10 p-6 lg:p-8 pb-28">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Floating Dock */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1"
        style={{
          background: "hsla(0,0%,4%,0.85)",
          border: "1px solid hsl(0 0% 100% / 0.1)",
          borderRadius: 20,
          padding: "8px 12px",
          backdropFilter: "blur(40px) saturate(200%)",
          boxShadow: "0 0 0 1px hsl(0 0% 100% / 0.05), 0 24px 64px rgba(0,0,0,0.7), 0 0 40px hsla(16,100%,50%,0.05)",
        }}
      >
        {dockItems.map((item) => (
          <DockItem key={item.to} {...item} />
        ))}

        {/* Separator */}
        <div className="w-px h-8 mx-1.5" style={{ background: "hsl(0 0% 100% / 0.08)" }} />

        {dockRight.map((item) => (
          <DockItem key={item.to} {...item} />
        ))}
      </nav>
    </div>
  );
};

const DockItem = ({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<any>; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex flex-col items-center gap-[3px] px-4 py-2 rounded-xl min-w-[60px] transition-all duration-150 text-[10px] tracking-wider ${
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`
    }
    style={({ isActive }) =>
      isActive
        ? {
            background: "hsl(16 100% 50% / 0.12)",
            border: "1px solid hsl(16 100% 50% / 0.2)",
          }
        : { border: "1px solid transparent" }
    }
  >
    {({ isActive }) => (
      <>
        <Icon className="w-[18px] h-[18px]" />
        <span className="font-medium">{label}</span>
        {isActive && (
          <span
            className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"
            style={{ boxShadow: "0 0 6px hsl(16 100% 50%)" }}
          />
        )}
      </>
    )}
  </NavLink>
);

export default DashboardLayout;
