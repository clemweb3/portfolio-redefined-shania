import { useEffect, useRef, useCallback } from "react";

/**
 * BezierBackground
 * Bold, slow-animated bezier curves inspired by Anthropic's logo.
 * Multiple layered strokes with high enough opacity to be clearly visible
 * on a dark (#080808) background. Mouse-reactive subtle warp.
 */

// Anthropic logo-inspired: 7 "flow lines" that sweep from left to right
// in a tight S-curve band, like the strokes of the ◆ mark.
// Each curve is defined by its vertical offset ratio and a curvature bias.
const BASE_CURVES = [
  // { yStart, yEnd, cpYBias1, cpYBias2, weight, opacity }
  { yStart: 0.18, yEnd: 0.52, cpYBias1: -0.06, cpYBias2: 0.12,  weight: 2.8, opacity: 0.55 },
  { yStart: 0.26, yEnd: 0.58, cpYBias1: -0.04, cpYBias2: 0.10,  weight: 2.2, opacity: 0.45 },
  { yStart: 0.34, yEnd: 0.64, cpYBias1: -0.02, cpYBias2: 0.08,  weight: 1.8, opacity: 0.38 },
  { yStart: 0.42, yEnd: 0.70, cpYBias1:  0.00, cpYBias2: 0.06,  weight: 1.4, opacity: 0.30 },
  { yStart: 0.50, yEnd: 0.76, cpYBias1:  0.02, cpYBias2: 0.04,  weight: 1.1, opacity: 0.22 },
  { yStart: 0.58, yEnd: 0.82, cpYBias1:  0.04, cpYBias2: 0.02,  weight: 0.8, opacity: 0.16 },
  { yStart: 0.66, yEnd: 0.88, cpYBias1:  0.06, cpYBias2: 0.00,  weight: 0.6, opacity: 0.10 },
];

// Gold color from the site's token: --gold: #8B7355
const GOLD_R = 139, GOLD_G = 115, GOLD_B = 85;

export default function BezierBackground({ className = "" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    timeRef.current += 0.004; // very slow drift
    const t = timeRef.current;

    // Subtle mouse influence (normalized -0.5 to 0.5)
    const mx = mouseRef.current.x / w - 0.5;
    const my = mouseRef.current.y / h - 0.5;
    const mouseActive = mouseRef.current.x > 0;

    ctx.clearRect(0, 0, w, h);

    // ── Primary flowing curves (Anthropic logo-style) ──────────────────────
    // These sweep from left-edge to right-edge with a single graceful S-bend.
    // The "seam" is in the upper-left quadrant, like the logo strokes converge.

    for (let i = 0; i < BASE_CURVES.length; i++) {
      const c = BASE_CURVES[i];

      // Slow oscillation per curve, offset by index for wave effect
      const wave = Math.sin(t + i * 0.45) * 0.04;
      const wave2 = Math.cos(t * 0.7 + i * 0.3) * 0.03;

      // Start point: left edge, staggered vertically
      const x0 = -w * 0.02;
      const y0 = h * (c.yStart + wave);

      // End point: right edge
      const x3 = w * 1.02;
      const y3 = h * (c.yEnd + wave2);

      // Control point 1: drives the first arc (upper-left pull)
      const cpx1 = w * 0.32 + (mouseActive ? mx * w * 0.04 : 0);
      const cpy1 = h * (c.yStart + c.cpYBias1 + wave * 0.6) + (mouseActive ? my * h * 0.03 : 0);

      // Control point 2: drives the second arc (lower-right push)
      const cpx2 = w * 0.68 + (mouseActive ? mx * w * 0.03 : 0);
      const cpy2 = h * (c.yEnd + c.cpYBias2 + wave2 * 0.6) + (mouseActive ? my * h * 0.02 : 0);

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x3, y3);

      ctx.strokeStyle = `rgba(${GOLD_R}, ${GOLD_G}, ${GOLD_B}, ${c.opacity})`;
      ctx.lineWidth = c.weight;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // ── Secondary: tighter "convergence" lines that mimic the logo's inner knot ──
    // These are shorter, brighter curves concentrated in the left-center area.
    const KNOT_COUNT = 5;
    for (let i = 0; i < KNOT_COUNT; i++) {
      const t2 = i / (KNOT_COUNT - 1); // 0..1
      const wave = Math.sin(t * 1.2 + i * 0.6) * 0.025;

      // These curves converge toward ~(30%, 45%) and fan out rightward
      const x0 = w * (-0.05 + t2 * 0.10);
      const y0 = h * (0.30 + t2 * 0.22 + wave);

      const cpx1 = w * 0.25;
      const cpy1 = h * (0.28 + t2 * 0.18 + wave * 0.5);

      const cpx2 = w * (0.45 + t2 * 0.15);
      const cpy2 = h * (0.55 + t2 * 0.12 - wave);

      const x3 = w * (0.65 + t2 * 0.25);
      const y3 = h * (0.60 + t2 * 0.15 + wave * 0.3);

      const opacity = 0.28 - t2 * 0.12 + Math.abs(Math.sin(t + i)) * 0.04;
      const weight  = 1.6 - t2 * 0.6;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x3, y3);
      ctx.strokeStyle = `rgba(${GOLD_R}, ${GOLD_G}, ${GOLD_B}, ${Math.max(0.06, opacity)})`;
      ctx.lineWidth = weight;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    // ── Tertiary: very faint wide curves for depth (background atmosphere) ──
    const ATMO_COUNT = 4;
    for (let i = 0; i < ATMO_COUNT; i++) {
      const wave = Math.sin(t * 0.5 + i * 1.1) * 0.06;

      const x0 = w * (0.05 + i * 0.08);
      const y0 = h * (0.05 + i * 0.1 + wave);

      const cpx1 = w * 0.5;
      const cpy1 = h * (0.35 + i * 0.05 + wave * 0.4);

      const cpx2 = w * 0.75;
      const cpy2 = h * (0.6 + i * 0.06 - wave * 0.3);

      const x3 = w * 1.0;
      const y3 = h * (0.7 + i * 0.06 + wave * 0.2);

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x3, y3);
      ctx.strokeStyle = `rgba(${GOLD_R}, ${GOLD_G}, ${GOLD_B}, 0.06)`;
      ctx.lineWidth = 3.5 - i * 0.5;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    const onMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const section = canvasRef.current?.closest("section");
    if (section) {
      section.addEventListener("mousemove", onMove, { passive: true });
      section.addEventListener("mouseleave", onLeave);
      section.addEventListener("touchmove", onMove, { passive: true });
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (section) {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
        section.removeEventListener("touchmove", onMove);
      }
    };
  }, [draw, resize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`bezier-bg-canvas ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}