import React, { useEffect, useState } from "react";
import { prefersReducedMotion, useCount, useInView } from "../hooks";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#/<>_+";

function scrambled(text, resolved) {
  return text
    .split("")
    .map((ch, i) =>
      i < resolved || /[^A-Za-z0-9]/.test(ch) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    )
    .join("");
}

/**
 * Titles "decode" into place when they scroll into view.
 * The real text stays in the layout (invisible while decoding) so nothing jumps around.
 */
export function ScrambleText({ text }) {
  const [ref, seen] = useInView({ threshold: 0.5 });
  const [live, setLive] = useState(() => (prefersReducedMotion() ? null : scrambled(text, 0)));

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return undefined;
    let frame = 0;
    const len = text.length;
    const id = setInterval(() => {
      frame += 1;
      const resolved = Math.floor(Math.max(0, frame - 3) * (len / 30));
      if (resolved >= len) {
        clearInterval(id);
        setLive(null);
      } else {
        setLive(scrambled(text, resolved));
      }
    }, 32);
    return () => clearInterval(id);
  }, [seen, text]);

  return (
    <span ref={ref} className={`scr ${live !== null ? "scr--live" : ""}`}>
      <span className="scr-final">{text}</span>
      {live !== null ? (
        <span className="scr-live" aria-hidden="true">
          {live}
        </span>
      ) : null}
    </span>
  );
}

/** Small silkscreen-style heading: "01 · ABOUT" plus a trace that runs off to a via. */
export function SectionHead({ num, label, title, children }) {
  return (
    <header className="section-head reveal">
      <p className="section-ref">
        <span className="section-num">{num}</span>
        <span className="section-label">{label}</span>
        <span className="section-trace" aria-hidden="true">
          <i />
        </span>
      </p>
      <h2 className="section-title">
        <ScrambleText text={title} />
      </h2>
      {children}
    </header>
  );
}

/** A card whose surface glows towards the pointer, and (optionally) tilts a few degrees towards it. */
export function SpotlightCard({ as: Tag = "div", className = "", tilt = false, children, ...rest }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--x", `${px}px`);
    el.style.setProperty("--y", `${py}px`);
    if (tilt && e.pointerType === "mouse") {
      el.style.setProperty("--ry", `${((px / r.width - 0.5) * 7).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py / r.height) * 5).toFixed(2)}deg`);
    }
  };
  const onLeave = (e) => {
    if (!tilt) return;
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag
      className={`card ${tilt ? "card--tilt" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

/** Animated impact meter: a ring for one percentage, or a bar for a before → after jump. */
export function Impact({ impact }) {
  const [ref, seen] = useInView({ threshold: 0.6 });
  const isRing = impact.kind === "ring";
  // with reduced motion the meters simply show their final value
  const shown = seen || prefersReducedMotion();
  const count = useCount(isRing ? impact.value : impact.to, seen, {
    from: isRing ? 0 : impact.from,
  });

  if (isRing) {
    return (
      <div className="impact impact--ring" ref={ref}>
        <div className="ring">
          <svg viewBox="0 0 84 84" aria-hidden="true">
            <circle className="ring-bg" cx="42" cy="42" r={RING_R} />
            <circle
              className="ring-fg"
              cx="42"
              cy="42"
              r={RING_R}
              transform="rotate(-90 42 42)"
              strokeDasharray={RING_C}
              strokeDashoffset={shown ? RING_C * (1 - impact.value / 100) : RING_C}
            />
          </svg>
          <b className="ring-num">{count}%</b>
        </div>
        <p className="impact-text">
          <b>{impact.label}</b>
          <span>{impact.note}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="impact impact--bar" ref={ref}>
      <div className="impact-big" aria-label={`${impact.from}% to ${impact.to}%`}>
        <span className="from">{impact.from}%</span>
        <span className="arrow" aria-hidden="true">→</span>
        <b>{count}%</b>
      </div>
      <div className="bar-track" aria-hidden="true">
        <i className="bar-base" style={{ width: `${impact.from}%` }} />
        <i
          className="bar-gain"
          style={{ left: `${impact.from}%`, width: shown ? `${impact.to - impact.from}%` : "0%" }}
        />
      </div>
      <p className="impact-text">
        <b>{impact.label}</b>
        <span>{impact.note}</span>
      </p>
    </div>
  );
}

export function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}
