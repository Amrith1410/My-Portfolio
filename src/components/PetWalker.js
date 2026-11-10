import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks";

const LINES = [
  "psst… a note for you!",
  "hire Amrith 🙂",
  "I carry notes, not bugs.",
  "have you tried the Drone tab?",
  "back to work, friend!",
  "tap the board to route a net",
  "tiny pet, big ideas",
];

/**
 * Pen-pal Pet, loose on the page: it patrols along the bottom edge of the screen.
 * Hover to make it stop, click for a hop and a friendly line.
 */
function PetWalker() {
  const [line, setLine] = useState(null);
  const [hop, setHop] = useState(false);
  const [side, setSide] = useState("center");
  const timer = useRef(0);
  const next = useRef(0);
  const petRef = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (prefersReducedMotion()) return null;

  const talk = () => {
    clearTimeout(timer.current);
    // keep the speech bubble on screen when the pet is near either edge
    const r = petRef.current ? petRef.current.getBoundingClientRect() : null;
    if (r && r.left < 130) setSide("left");
    else if (r && r.right > window.innerWidth - 130) setSide("right");
    else setSide("center");
    next.current = (next.current + 1 + Math.floor(Math.random() * (LINES.length - 1))) % LINES.length;
    setLine(LINES[next.current]);
    setHop(true);
    timer.current = setTimeout(() => {
      setLine(null);
      setHop(false);
    }, 3200);
  };

  return (
    <div className="walker">
      <div className={`walker-pet ${line ? "is-talking" : ""}`} ref={petRef}>
        <div className="walker-face">
          <button type="button" className={`walker-btn ${hop ? "is-hop" : ""}`} onClick={talk} aria-label="Pen-pal Pet: say hi">
            <svg viewBox="-24 -62 48 66" className="walker-svg" aria-hidden="true">
              <ellipse cx="0" cy="1" rx="13" ry="2.4" className="walker-shadow" />
              <g className="walker-bob">
                <path d="M-12 -24 L-9 -36 L-2 -27 Z M12 -24 L9 -36 L2 -27 Z" className="pet-ear" />
                <ellipse cx="0" cy="-15" rx="15" ry="12" className="pet-body" />
                <ellipse cx="0" cy="-10" rx="8" ry="6" className="pet-belly" />
                <circle cx="-5" cy="-18" r="1.8" className="pet-eye" />
                <circle cx="5" cy="-18" r="1.8" className="pet-eye" />
                <rect x="-10" y="-5" width="6" height="5" rx="2" className="pet-foot pet-foot--a" />
                <rect x="4" y="-5" width="6" height="5" rx="2" className="pet-foot pet-foot--b" />
              </g>
            </svg>
          </button>
        </div>
        {line ? (
          <span className={`walker-say ${side !== "center" ? `walker-say--${side}` : ""}`} role="status">
            {line}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default PetWalker;
