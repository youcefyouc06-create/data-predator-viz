import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SentimentChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    const points = 80;
    const data: number[] = [];
    let val = 50;
    for (let i = 0; i < points; i++) {
      val += (Math.random() - 0.45) * 8;
      val = Math.max(10, Math.min(90, val));
      data.push(val);
    }

    const draw = (offset: number) => {
      ctx.clearRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += h / 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Main line — indigo
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(0.5, "#818cf8");
      gradient.addColorStop(1, "#6366f1");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();

      const stepX = w / (points - 1);
      for (let i = 0; i < points; i++) {
        const x = i * stepX;
        const idx = (i + Math.floor(offset)) % points;
        const y = h - (data[idx] / 100) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fill
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const fillGradient = ctx.createLinearGradient(0, 0, 0, h);
      fillGradient.addColorStop(0, "rgba(99,102,241,0.12)");
      fillGradient.addColorStop(0.5, "rgba(99,102,241,0.03)");
      fillGradient.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = fillGradient;
      ctx.fill();
    };

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame += 0.015;
      draw(frame);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="surface-card p-6 col-span-2 row-span-2"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-1">
            Sentiment Analysis
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-semibold font-mono tracking-tight">72.4%</span>
            <span className="text-[13px] text-muted-foreground font-mono">POSITIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[6px] h-[6px] rounded-full bg-success animate-pulse-dot" />
          <span className="text-[11px] font-mono text-muted-foreground">LIVE</span>
        </div>
      </div>
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
};

export default SentimentChart;
