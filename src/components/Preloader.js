import React, { useEffect, useState } from "react";
import { prefersReducedMotion } from "../hooks";

/** A short "routing nets…" splash. Skipped for people who prefer reduced motion. */
function Preloader() {
  const [phase, setPhase] = useState(prefersReducedMotion() ? "gone" : "show");

  useEffect(() => {
    if (phase === "gone") return undefined;
    const t1 = setTimeout(() => setPhase("fade"), 1500);
    const t2 = setTimeout(() => setPhase("gone"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "fade" ? "preloader--out" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 320 120" className="preloader-art">
        <path className="pl-trace" d="M10 90 H90 L130 50 H210 L250 90 H310" pathLength="1" />
        <path className="pl-trace pl-trace--2" d="M10 30 H60 L90 60 H150 L180 90 H230" pathLength="1" />
        <circle className="pl-pad" cx="10" cy="90" r="5" />
        <circle className="pl-pad" cx="10" cy="30" r="5" />
        <circle className="pl-pad pl-pad--end" cx="310" cy="90" r="5" />
        <circle className="pl-pad pl-pad--end" cx="230" cy="90" r="5" />
      </svg>
      <p className="preloader-text">
        routing nets<span className="preloader-dots" /> <b>AE</b>
      </p>
    </div>
  );
}

export default Preloader;
