import React, { useEffect, useRef } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import avatar from "../Assets/avatar.webp";
import { hero, profile } from "../data";
import { prefersReducedMotion, useTypewriter } from "../hooks";

const PINS = 14;

function Pins({ side }) {
  return (
    <div className={`pins pins--${side}`} aria-hidden="true">
      {Array.from({ length: PINS }).map((_, i) => (
        <span key={i} style={{ "--i": i }} />
      ))}
    </div>
  );
}

/** The portrait, mounted on a chip: pins light up in sequence like a signal sweeping the package. */
const ChipPortrait = React.forwardRef(function ChipPortrait(_, chipRef) {
  return (
    <div className="chip-wrap reveal" style={{ "--d": "0.25s" }}>
      <div className="chip" ref={chipRef}>
        <Pins side="t" />
        <Pins side="r" />
        <Pins side="b" />
        <Pins side="l" />
        <div className="chip-body">
          <span className="chip-pin1" aria-hidden="true" />
          <span className="chip-silk chip-silk--tl" aria-hidden="true">AE-2026</span>
          <span className="chip-silk chip-silk--tr" aria-hidden="true">REV C</span>
          <div className="chip-die">
            <img src={avatar} alt="Portrait of Amrith Eshwar T T" width="640" height="640" />
          </div>
          <span className="chip-silk chip-silk--bl" aria-hidden="true">AI&nbsp;ENGINEER</span>
          <span className="chip-silk chip-silk--br" aria-hidden="true">DRC&nbsp;0&nbsp;ERR</span>
        </div>
      </div>
      <span className="net net--a" aria-hidden="true"><i /> wfguard</span>
      <span className="net net--b" aria-hidden="true"><i /> pcbforge</span>
      <span className="net net--c" aria-hidden="true"><i /> chat2cart</span>
      <span className="net net--d" aria-hidden="true"><i /> pen-pal pet</span>
    </div>
  );
});

function Hero() {
  const typed = useTypewriter(hero.typed);
  const words = profile.name.split(" ");
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const chipRef = useRef(null);

  // Pointer play: letters of the name get heavier near the cursor, the chip tilts towards it.
  useEffect(() => {
    const section = heroRef.current;
    if (!section || prefersReducedMotion()) return undefined;
    let raf = 0;
    let ev = null;
    let locked = false;

    // Heavier letters are wider. Pin each letter to its resting width so the name never re-wraps.
    const lock = () => {
      if (locked || !nameRef.current) return;
      locked = true;
      nameRef.current.querySelectorAll(".name-letter").forEach((el) => {
        el.style.width = `${el.offsetWidth}px`;
      });
    };
    const unlock = () => {
      locked = false;
      if (nameRef.current) {
        nameRef.current.querySelectorAll(".name-letter").forEach((el) => {
          el.style.width = "";
        });
      }
    };

    const reset = () => {
      ev = null;
      if (nameRef.current) {
        nameRef.current.querySelectorAll(".name-letter").forEach((el) => {
          el.style.fontWeight = "";
        });
      }
      if (chipRef.current) {
        chipRef.current.style.setProperty("--rx", "0deg");
        chipRef.current.style.setProperty("--ry", "0deg");
      }
    };

    const apply = () => {
      raf = 0;
      if (!ev) return;
      lock();
      if (nameRef.current) {
        nameRef.current.querySelectorAll(".name-letter").forEach((el) => {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(ev.clientX - (r.left + r.width / 2), ev.clientY - (r.top + r.height / 2));
          el.style.fontWeight = Math.round(640 + 160 * Math.exp(-Math.pow(d / 170, 2)));
        });
      }
      if (chipRef.current) {
        const cr = chipRef.current.getBoundingClientRect();
        const nx = (ev.clientX - (cr.left + cr.width / 2)) / (window.innerWidth / 2);
        const ny = (ev.clientY - (cr.top + cr.height / 2)) / (window.innerHeight / 2);
        const clamp = (v) => Math.max(-1, Math.min(1, v));
        chipRef.current.style.setProperty("--ry", `${(clamp(nx) * 9).toFixed(2)}deg`);
        chipRef.current.style.setProperty("--rx", `${(-clamp(ny) * 7).toFixed(2)}deg`);
      }
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      ev = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", reset);
    window.addEventListener("resize", unlock);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", unlock);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">
            <span className="status-dot" aria-hidden="true" />
            {profile.role}
            {profile.company ? <span className="eyebrow-co"> @ {profile.company}</span> : null}
          </p>

          <h1 className="name" aria-label={profile.name} ref={nameRef}>
            {words.map((w, wi) => (
              <span className="name-word" aria-hidden="true" key={wi}>
                {w.split("").map((ch, ci) => (
                  <span className="name-letter" style={{ "--i": wi * 5 + ci }} key={ci}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="tagline reveal" style={{ "--d": "0.15s" }}>
            {hero.tagline} <em>{hero.taglineEm}</em>
          </p>

          <p className="typed reveal" style={{ "--d": "0.25s" }} aria-hidden="true">
            <span className="typed-prompt">▸</span> {hero.typedPrefix}{" "}
            <span className="typed-text">{typed}</span>
            <span className="caret" />
          </p>

          <p className="lede reveal" style={{ "--d": "0.35s" }}>{hero.lede}</p>

          <div className="cta reveal" style={{ "--d": "0.45s" }}>
            <a className="btn btn--primary" href="#work">
              See my work <FiArrowDownRight aria-hidden="true" />
            </a>
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn aria-hidden="true" /> LinkedIn
            </a>
          </div>

          <p className="hint reveal" style={{ "--d": "0.55s" }}>
            <span className="hint-d">tip: move your cursor to light up the board · click to route a net</span>
            <span className="hint-m">tip: tap anywhere on the page to route a net</span>
          </p>
        </div>

        <ChipPortrait ref={chipRef} />
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}

export default Hero;
