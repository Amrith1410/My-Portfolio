import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks";

/* Small hand-built animated illustrations, one per featured project. */

const TRACES = [
  "M212 96 V72 L186 46 H92",
  "M236 96 V60 L256 40 H370",
  "M268 96 V80 L300 48 H410 L424 62",
  "M180 128 H120 L84 164 H54",
  "M180 160 H150 L128 182 H96 L72 206 H40",
  "M300 132 H350 L386 168 H440",
  "M300 172 H330 L352 194 H396 L420 218 H446",
  "M212 204 V230 L186 256 H110",
  "M240 204 V244 H330 L352 266 H420",
];
const PADS = [
  [92, 46],
  [370, 40],
  [424, 62],
  [54, 164],
  [40, 206],
  [440, 168],
  [446, 218],
  [110, 256],
  [420, 266],
];
const VIAS = [
  [186, 46],
  [300, 48],
  [128, 182],
  [352, 194],
  [330, 244],
];

export function PcbArt() {
  const pinsX = Array.from({ length: 7 }, (_, i) => 200 + i * 13);
  const pinsY = Array.from({ length: 6 }, (_, i) => 112 + i * 14);
  return (
    <svg viewBox="0 0 480 300" className="art-svg" role="img" aria-label="A routed circuit board with signals pulsing along its traces">
      <rect x="14" y="14" width="452" height="272" rx="20" className="pcb-board" />
      {[
        [32, 32],
        [448, 32],
        [32, 268],
        [448, 268],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="7" className="pcb-hole-ring" />
          <circle cx={x} cy={y} r="2.6" className="pcb-hole" />
        </g>
      ))}

      {TRACES.map((d, i) => (
        <g key={d}>
          <path d={d} className="pcb-trace" />
          <path d={d} pathLength="1" className="pcb-pulse" style={{ animationDelay: `${i * 0.55}s` }} />
        </g>
      ))}

      {VIAS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5.5" className="pcb-via" />
          <circle cx={x} cy={y} r="1.8" className="pcb-hole" />
        </g>
      ))}
      {PADS.map(([x, y]) => (
        <circle key={`${x}.${y}`} cx={x} cy={y} r="5" className="pcb-pad" />
      ))}

      <rect x="188" y="104" width="104" height="92" rx="7" className="pcb-chip" />
      {pinsX.map((x) => (
        <g key={`h${x}`}>
          <rect x={x} y="96" width="5" height="8" className="pcb-pin" />
          <rect x={x} y="196" width="5" height="8" className="pcb-pin" />
        </g>
      ))}
      {pinsY.map((y) => (
        <g key={`v${y}`}>
          <rect x="180" y={y} width="8" height="5" className="pcb-pin" />
          <rect x="292" y={y} width="8" height="5" className="pcb-pin" />
        </g>
      ))}
      <circle cx="199" cy="115" r="3" className="pcb-pin1" />
      <text x="240" y="146" textAnchor="middle" className="pcb-silk">U1</text>
      <text x="240" y="162" textAnchor="middle" className="pcb-silk pcb-silk--dim">TQFP-100</text>
    </svg>
  );
}

const STAGES = ["Confirmed", "Production", "Quality Check", "Packing", "Ready to Ship"];

export function CartArt() {
  return (
    <svg viewBox="0 0 480 300" className="art-svg" role="img" aria-label="A WhatsApp message being parsed into an order that moves through stages until it is packed">
      <rect x="22" y="34" width="176" height="232" rx="16" className="cart-panel" />
      <circle cx="42" cy="54" r="5" className="cart-dot" />
      <rect x="54" y="50" width="62" height="8" rx="4" className="cart-bar" />

      <g className="cart-bubble">
        <rect x="38" y="76" width="144" height="86" rx="12" className="cart-msg" />
        <text x="50" y="98" className="cart-txt">Name: Priya</text>
        <text x="50" y="116" className="cart-txt">Item: Brownies x6</text>
        <text x="50" y="134" className="cart-txt">Date: Sat 14</text>
        <text x="50" y="152" className="cart-txt cart-txt--dim">Addr: 12 Lake Rd</text>
      </g>
      <g className="cart-bubble cart-bubble--2">
        <rect x="38" y="176" width="92" height="30" rx="12" className="cart-msg cart-msg--me" />
        <text x="50" y="195" className="cart-txt">Done! ✓</text>
      </g>

      <path d="M204 150 H280" className="cart-flow" />
      <path d="M204 150 H280" pathLength="1" className="cart-flow-pulse" />
      <path d="M272 143 L281 150 L272 157" className="cart-arrow" />
      <text x="242" y="138" textAnchor="middle" className="cart-txt cart-txt--dim">parse</text>

      <rect x="288" y="34" width="176" height="232" rx="16" className="cart-panel cart-panel--order" />
      <text x="304" y="60" className="cart-txt cart-txt--hi">ORDER #1042</text>
      <text x="304" y="80" className="cart-txt">Priya · Brownies ×6</text>
      <text x="304" y="97" className="cart-txt cart-txt--dim">due Sat 14</text>
      <line x1="304" y1="108" x2="448" y2="108" className="cart-rule" />

      {STAGES.map((s, i) => (
        <g key={s}>
          {i < STAGES.length - 1 ? (
            <line x1="311" y1={130 + i * 26 + 7} x2="311" y2={130 + (i + 1) * 26 - 7} className="cart-rail" />
          ) : null}
          <circle cx="311" cy={130 + i * 26} r="6" className="cart-stage" style={{ animationName: `st${i}` }} />
          <text x="328" y={134 + i * 26} className="cart-txt">{s}</text>
        </g>
      ))}
    </svg>
  );
}

export function PetArt() {
  return (
    <svg viewBox="0 0 480 300" className="art-svg" role="img" aria-label="A small pet carrying a note from one computer window to another and bringing a reply back">
      {[16, 294].map((x, i) => (
        <g key={x}>
          <rect x={x} y="56" width="170" height="168" rx="12" className="pet-win" />
          <line x1={x} y1="78" x2={x + 170} y2="78" className="pet-bar" />
          <circle cx={x + 14} cy="67" r="3" className="pet-dot" />
          <circle cx={x + 26} cy="67" r="3" className="pet-dot" />
          <circle cx={x + 38} cy="67" r="3" className="pet-dot" />
          <text x={x + 85} y="246" textAnchor="middle" className="pet-label">{i === 0 ? "you" : "your friend"}</text>
        </g>
      ))}
      {[18, 32, 46].map((r, i) => (
        <path
          key={r}
          d={`M${240 - r} ${112 + r * 0.2} A${r} ${r} 0 0 1 ${240 + r} ${112 + r * 0.2}`}
          className="pet-wifi"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      <circle cx="240" cy="114" r="3" className="pet-wifi-dot" />
      <path d="M30 208 H450" className="pet-floor" />

      <g className="pet-walker" style={{ transform: "translate(70px, 208px)" }}>
        <g className="pet-walk">
          <g className="pet-env pet-env--out">
            <rect x="-9" y="-50" width="18" height="12" rx="2" className="pet-envelope" />
            <path d="M-9 -50 L0 -43 L9 -50" className="pet-envelope-flap" />
          </g>
          <g className="pet-env pet-env--back">
            <rect x="-9" y="-50" width="18" height="12" rx="2" className="pet-envelope pet-envelope--yellow" />
            <path d="M-9 -50 L0 -43 L9 -50" className="pet-envelope-flap" />
          </g>
          <path d="M-12 -24 L-9 -36 L-2 -27 Z M12 -24 L9 -36 L2 -27 Z" className="pet-ear" />
          <ellipse cx="0" cy="-15" rx="15" ry="12" className="pet-body" />
          <ellipse cx="0" cy="-10" rx="8" ry="6" className="pet-belly" />
          <circle cx="-5" cy="-18" r="1.8" className="pet-eye" />
          <circle cx="5" cy="-18" r="1.8" className="pet-eye" />
          <rect x="-10" y="-5" width="6" height="5" rx="2" className="pet-foot pet-foot--a" />
          <rect x="4" y="-5" width="6" height="5" rx="2" className="pet-foot pet-foot--b" />
        </g>
      </g>
    </svg>
  );
}

const MOTORS = [
  { x: 112, y: 66, dir: "cw" },
  { x: 368, y: 66, dir: "ccw" },
  { x: 112, y: 234, dir: "ccw" },
  { x: 368, y: 234, dir: "cw" },
];

/** The board *is* the airframe: an X-shaped PCB with motors soldered straight onto its arms. */
export function DroneArt() {
  return (
    <svg viewBox="0 0 480 300" className="art-svg" role="img" aria-label="A drone whose body is a printed circuit board, with propellers spinning on each arm">
      <ellipse cx="240" cy="276" rx="96" ry="8" className="drone-shadow" />
      <g className="drone-float">
        {MOTORS.map((m) => (
          <line key={`o${m.x}${m.y}`} x1="240" y1="150" x2={m.x} y2={m.y} className="drone-arm-edge" />
        ))}
        {MOTORS.map((m) => (
          <line key={`i${m.x}${m.y}`} x1="240" y1="150" x2={m.x} y2={m.y} className="drone-arm" />
        ))}
        {MOTORS.map((m, i) => {
          const d = `M240 150 L${m.x} ${m.y}`;
          return (
            <g key={`t${m.x}${m.y}`}>
              <path d={d} className="pcb-trace" />
              <path d={d} pathLength="1" className="pcb-pulse" style={{ animationDelay: `${i * 0.45}s` }} />
            </g>
          );
        })}

        <rect x="204" y="114" width="72" height="72" rx="12" className="drone-core" />
        <rect x="220" y="130" width="40" height="40" rx="6" className="pcb-chip" />
        <text x="240" y="154" textAnchor="middle" className="pcb-silk drone-fc">FC</text>
        <circle cx="240" cy="150" r="2.6" className="drone-gyro" />

        {MOTORS.map((m) => (
          <g key={`m${m.x}${m.y}`}>
            <circle cx={m.x} cy={m.y} r="19" className="drone-mount" />
            {[0, 120, 240].map((a) => (
              <circle
                key={a}
                cx={m.x + 12 * Math.cos((a * Math.PI) / 180)}
                cy={m.y + 12 * Math.sin((a * Math.PI) / 180)}
                r="2.3"
                className="drone-phase"
              />
            ))}
            <circle cx={m.x} cy={m.y} r="6.5" className="drone-motor" />
            <g transform={`translate(${m.x} ${m.y})`}>
              <circle r="50" className="drone-disc" />
              <g className={`drone-prop drone-prop--${m.dir}`}>
                <ellipse rx="50" ry="5" className="drone-blade" />
              </g>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** PCBForge card art: flips between a normal routed board and the drone-shaped board. */
export function PcbSwitch() {
  const [view, setView] = useState("board");
  const touched = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (!touched.current) setView((v) => (v === "board" ? "drone" : "board"));
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const pick = (v) => {
    touched.current = true;
    setView(v);
  };

  return (
    <>
      <div className="art-stack">
        <div className={`art-layer ${view === "board" ? "is-on" : ""}`} aria-hidden={view !== "board"}>
          <PcbArt />
        </div>
        <div className={`art-layer ${view === "drone" ? "is-on" : ""}`} aria-hidden={view !== "drone"}>
          <DroneArt />
        </div>
      </div>
      <div className="art-tabs" role="group" aria-label="Show board or drone version">
        <button type="button" aria-pressed={view === "board"} onClick={() => pick("board")}>Board</button>
        <button type="button" aria-pressed={view === "drone"} onClick={() => pick("drone")}>Drone</button>
      </div>
      <span className="art-cap">
        <i /> {view === "board" ? "0 unrouted · DRC clean" : "the board is the airframe"}
      </span>
    </>
  );
}

export const ART = { pcb: PcbSwitch, cart: CartArt, pet: PetArt };
