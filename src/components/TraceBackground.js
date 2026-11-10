import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

/**
 * A page-sized "board" that routes itself.
 *  - copper traces laid on a grid, 45° diagonals only, like the PCBForge autorouter
 *  - bright signal pulses travelling along them
 *  - click anywhere (not on a link/button) to route a brand-new net to the nearest pad
 */

const GRID = 28;
const PARALLAX = 0.28;
const COPPER = "226,163,98";

function mulberry32(seed) {
  let a = seed;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Route like an autorouter: one straight run and one 45° run. */
function routeBetween(a, b, diagFirst) {
  const pts = [[a[0], a[1]]];
  let x = a[0];
  let y = a[1];
  const dx = b[0] - x;
  const dy = b[1] - y;
  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  const d = Math.min(ax, ay);
  const s = Math.abs(ax - ay);
  const diag = () => {
    if (!d) return;
    x += sx * d;
    y += sy * d;
    pts.push([x, y]);
  };
  const straight = () => {
    if (!s) return;
    if (ax > ay) x += sx * s;
    else y += sy * s;
    pts.push([x, y]);
  };
  if (diagFirst) {
    diag();
    straight();
  } else {
    straight();
    diag();
  }
  return pts;
}

function toPx(pts) {
  return pts.map(([gx, gy]) => [gx * GRID, gy * GRID]);
}

function withLengths(points) {
  const cum = [0];
  let x0b = Infinity;
  let y0b = Infinity;
  let x1b = -Infinity;
  let y1b = -Infinity;
  for (let i = 0; i < points.length; i += 1) {
    const [x, y] = points[i];
    x0b = Math.min(x0b, x);
    y0b = Math.min(y0b, y);
    x1b = Math.max(x1b, x);
    y1b = Math.max(y1b, y);
    if (i) {
      const [px, py] = points[i - 1];
      cum.push(cum[i - 1] + Math.hypot(x - px, y - py));
    }
  }
  return { points, cum, length: cum[cum.length - 1], box: [x0b, y0b, x1b, y1b] };
}

/** Points of the trace between distance s0 and s1 along it. */
function subpath(tr, s0, s1) {
  const out = [];
  const { points, cum } = tr;
  const at = (s) => {
    for (let i = 1; i < cum.length; i += 1) {
      if (s <= cum[i]) {
        const k = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
        return [
          points[i - 1][0] + (points[i][0] - points[i - 1][0]) * k,
          points[i - 1][1] + (points[i][1] - points[i - 1][1]) * k,
        ];
      }
    }
    return points[points.length - 1];
  };
  const a = Math.max(0, s0);
  const b = Math.min(tr.length, s1);
  if (b <= a) return out;
  out.push(at(a));
  for (let i = 1; i < cum.length; i += 1) {
    if (cum[i] > a && cum[i] < b) out.push(points[i]);
  }
  out.push(at(b));
  return out;
}

function buildBoard(W, H) {
  const rnd = mulberry32(1410);
  const cols = Math.floor(W / GRID);
  const rows = Math.floor(H / GRID);
  const padCount = Math.max(24, Math.round((cols * rows) / 34));
  const pads = [];
  for (let i = 0; i < padCount; i += 1) {
    pads.push([2 + Math.floor(rnd() * (cols - 4)), 2 + Math.floor(rnd() * (rows - 4))]);
  }
  const traces = [];
  const vias = [];
  const near = (p, minD, maxD) => {
    const c = pads.filter((q) => {
      const d = Math.max(Math.abs(q[0] - p[0]), Math.abs(q[1] - p[1]));
      return d >= minD && d <= maxD;
    });
    return c.length ? c[Math.floor(rnd() * c.length)] : null;
  };
  pads.forEach((a, idx) => {
    if (rnd() < 0.18) return;
    const b = near(a, 5, 22);
    if (!b) return;
    const diagFirst = rnd() < 0.5;
    const bus = rnd() < 0.22 ? 2 + Math.floor(rnd() * 3) : 1;
    for (let k = 0; k < bus; k += 1) {
      const a2 = [a[0], a[1] + k];
      const b2 = [b[0], b[1] + k];
      const pts = toPx(routeBetween(a2, b2, diagFirst));
      if (pts.length > 1) {
        traces.push({ ...withLengths(pts), w: bus > 1 ? 1.4 : 1.8 });
        if (k === 0 && rnd() < 0.5) vias.push(pts[pts.length - 1]);
      }
    }
    if (idx % 3 === 0) {
      const c = near(b, 4, 18);
      if (c) {
        const pts = toPx(routeBetween(b, c, !diagFirst));
        if (pts.length > 1) traces.push({ ...withLengths(pts), w: 1.6 });
      }
    }
  });
  return { pads: pads.map((p) => [p[0] * GRID, p[1] * GRID]), traces, vias };
}

/**
 * Draws the board. `boost` multiplies the copper opacity (used for the cursor flashlight),
 * `view` ([x0, y0, x1, y1]) skips everything outside that window.
 */
function drawStatic(ctx, board, boost = 1, view = null) {
  const a = (v) => Math.min(1, v * boost).toFixed(3);
  const inView = (x, y, m) => !view || (x > view[0] - m && x < view[2] + m && y > view[1] - m && y < view[3] + m);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  board.traces.forEach((t) => {
    if (view && (t.box[2] < view[0] || t.box[0] > view[2] || t.box[3] < view[1] || t.box[1] > view[3])) return;
    ctx.beginPath();
    t.points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.strokeStyle = `rgba(${COPPER},${a(0.105)})`;
    ctx.lineWidth = t.w;
    ctx.stroke();
  });
  board.pads.forEach(([x, y]) => {
    if (!inView(x, y, 8)) return;
    ctx.beginPath();
    ctx.arc(x, y, 3.6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(6,17,13,0.9)";
    ctx.fill();
    ctx.strokeStyle = `rgba(${COPPER},${a(0.3)})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });
  board.vias.forEach(([x, y]) => {
    if (!inView(x, y, 10)) return;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${COPPER},${a(0.22)})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${COPPER},${a(0.4)})`;
    ctx.fill();
  });
}

const SPOT_R = 190;

function TraceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();

    let dpr = 1;
    let vw = 0;
    let vh = 0;
    let board = null;
    let layer = null;
    let boardW = 0;
    let boardH = 0;
    let pulses = [];
    let manual = [];
    let raf = 0;
    let last = 0;
    let scrollY = window.scrollY;
    // cursor flashlight: a small canvas that holds a brighter copy of the traces under the pointer
    const spot = document.createElement("canvas");
    const sctx = spot.getContext("2d");
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, a: 0, on: false };

    const needHeight = () => {
      const doc = Math.max(document.documentElement.scrollHeight, vh);
      return Math.ceil(vh + (doc - vh) * PARALLAX + GRID * 4);
    };

    const spawnPulse = () => {
      if (!board || !board.traces.length) return;
      const tr = board.traces[Math.floor(Math.random() * board.traces.length)];
      if (tr.length < 60) return;
      pulses.push({
        tr,
        s: 0,
        speed: 140 + Math.random() * 220,
        trail: 50 + Math.random() * 60,
        hue: Math.random() < 0.18 ? "116,240,181" : "255,207,153",
      });
    };

    const rebuild = () => {
      boardW = vw;
      boardH = needHeight();
      board = buildBoard(boardW, boardH);
      layer = document.createElement("canvas");
      layer.width = Math.round(boardW * dpr);
      layer.height = Math.round(boardH * dpr);
      const lctx = layer.getContext("2d");
      lctx.scale(dpr, dpr);
      drawStatic(lctx, board);
      pulses = [];
      for (let i = 0; i < 6; i += 1) {
        spawnPulse();
        const p = pulses[pulses.length - 1];
        if (p) p.s = Math.random() * p.tr.length;
      }
    };

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      spot.width = Math.round(SPOT_R * 2 * dpr);
      spot.height = spot.width;
      if (!board || boardW !== vw || needHeight() > boardH + GRID * 8) rebuild();
      if (reduced) paint(0);
    };

    function paint(dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      if (!layer) return;
      const off = scrollY * PARALLAX;
      ctx.drawImage(layer, 0, -off, boardW, boardH);
      if (reduced) return;

      if (ptr.a > 0.02 && board) {
        const D = SPOT_R * 2;
        const wx = ptr.x - SPOT_R;
        const wy = ptr.y + off - SPOT_R;
        sctx.globalCompositeOperation = "source-over";
        sctx.setTransform(1, 0, 0, 1, 0, 0);
        sctx.clearRect(0, 0, spot.width, spot.height);
        sctx.setTransform(dpr, 0, 0, dpr, -wx * dpr, -wy * dpr);
        drawStatic(sctx, board, 6, [wx, wy, wx + D, wy + D]);
        sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sctx.globalCompositeOperation = "destination-in";
        const mask = sctx.createRadialGradient(SPOT_R, SPOT_R, 0, SPOT_R, SPOT_R, SPOT_R);
        mask.addColorStop(0, "rgba(0,0,0,1)");
        mask.addColorStop(0.5, "rgba(0,0,0,0.75)");
        mask.addColorStop(1, "rgba(0,0,0,0)");
        sctx.fillStyle = mask;
        sctx.fillRect(0, 0, D, D);

        ctx.globalAlpha = ptr.a;
        const glow = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, SPOT_R);
        glow.addColorStop(0, `rgba(${COPPER},0.07)`);
        glow.addColorStop(1, `rgba(${COPPER},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(ptr.x - SPOT_R, ptr.y - SPOT_R, D, D);
        ctx.drawImage(spot, ptr.x - SPOT_R, ptr.y - SPOT_R, D, D);
        ctx.globalAlpha = 1;
      }

      ctx.save();
      ctx.translate(0, -off);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      pulses = pulses.filter((p) => p.s - p.trail < p.tr.length);
      pulses.forEach((p) => {
        p.s += p.speed * dt;
        const pts = subpath(p.tr, p.s - p.trail, p.s);
        if (pts.length < 2) return;
        const head = pts[pts.length - 1];
        if (head[1] < off - 40 || head[1] > off + vh + 40) return;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = `rgba(${p.hue},0.14)`;
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.strokeStyle = `rgba(${p.hue},0.85)`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        const g = ctx.createRadialGradient(head[0], head[1], 0, head[0], head[1], 12);
        g.addColorStop(0, `rgba(${p.hue},0.9)`);
        g.addColorStop(1, `rgba(${p.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(head[0], head[1], 12, 0, Math.PI * 2);
        ctx.fill();
      });

      const now = performance.now();
      manual = manual.filter((m) => now - m.born < 5200);
      manual.forEach((m) => {
        const age = now - m.born;
        const grow = Math.min(1, age / 900);
        const fade = age < 3600 ? 1 : 1 - (age - 3600) / 1600;
        const pts = subpath(m.tr, 0, m.tr.length * grow);
        if (pts.length < 2) return;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = `rgba(255,207,153,${0.16 * fade})`;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,207,153,${0.95 * fade})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();
        const [hx, hy] = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,236,210,${fade})`;
        ctx.fill();
        if (grow >= 1) {
          const [sx, sy] = m.tr.points[0];
          ctx.beginPath();
          ctx.arc(sx, sy, 4 + (age % 1200) / 120, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(116,240,181,${0.5 * fade * (1 - (age % 1200) / 1200)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      if (!document.hidden) {
        if (pulses.length < 9 && Math.random() < 0.06) spawnPulse();
        const follow = Math.min(1, dt * 14);
        ptr.x += (ptr.tx - ptr.x) * follow;
        ptr.y += (ptr.ty - ptr.y) * follow;
        ptr.a += ((ptr.on ? 1 : 0) - ptr.a) * Math.min(1, dt * 8);
        paint(dt);
      }
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduced) paint(0);
    };

    const onPointerDown = (e) => {
      if (reduced || !board) return;
      if (e.target.closest && e.target.closest("a,button,input,textarea,select,summary,[role='button']")) return;
      const gx = Math.round(e.clientX / GRID);
      const gy = Math.round((e.clientY + scrollY * PARALLAX) / GRID);
      let best = null;
      let bd = Infinity;
      board.pads.forEach((p) => {
        const d = Math.hypot(p[0] / GRID - gx, p[1] / GRID - gy);
        if (d > 2 && d < bd) {
          bd = d;
          best = p;
        }
      });
      if (!best) return;
      const pts = toPx(routeBetween([gx, gy], [best[0] / GRID, best[1] / GRID], Math.random() < 0.5));
      if (pts.length < 2) return;
      manual.push({ tr: withLengths(pts), born: performance.now() });
      if (manual.length > 6) manual.shift();
    };

    const onPointerMove = (e) => {
      if (reduced || e.pointerType !== "mouse") return;
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      if (!ptr.on) {
        ptr.x = e.clientX;
        ptr.y = e.clientY;
        ptr.on = true;
      }
    };
    const onLeave = () => {
      ptr.on = false;
    };

    size();
    window.addEventListener("resize", size);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    // The page grows as images / fonts load – make sure the board covers it.
    const settle = setTimeout(size, 1200);
    const settle2 = setTimeout(size, 3500);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clearTimeout(settle2);
      window.removeEventListener("resize", size);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="trace-bg" aria-hidden="true" />;
}

export default TraceBackground;
