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
      ctx.strokeStyle = "hsla(0, 0%, 100%, 0.02)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += h / 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Main line
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, "hsl(142, 72%, 45%)");
      gradient.addColorStop(0.5, "hsl(142, 72%, 55%)");
      gradient.addColorStop(1, "hsl(142, 72%, 40%)");

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

      // Glow
      ctx.shadowColor = "hsl(142, 72%, 50%)";
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const fillGradient = ctx.createLinearGradient(0, 0, 0, h);
      fillGradient.addColorStop(0, "hsla(142, 72%, 50%, 0.12)");
      fillGradient.addColorStop(0.5, "hsla(142, 72%, 50%, 0.03)");
      fillGradient.addColorStop(1, "hsla(142, 72%, 50%, 0)");
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bento-card rounded-xl p-6 col-span-2 row-span-2 scan-line-overlay"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1">
            Sentiment Analysis
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-brutal neon-text-strong">72.4%</span>
            <span className="text-xs text-muted-foreground font-mono">POSITIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-neon status-live" />
          <span className="text-[10px] font-mono text-primary tracking-wider">LIVE</span>
        </div>
      </div>
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
};

export default SentimentChart;
