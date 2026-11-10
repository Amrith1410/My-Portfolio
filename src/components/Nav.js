import React, { useEffect, useRef, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data";
import { useActiveSection } from "../hooks";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "toolbox", label: "Toolbox" },
  { id: "contact", label: "Contact" },
];

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Amrith Eshwar T T, back to top">
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <path d="M12 3v5M20 3v5M28 3v5M12 32v5M20 32v5M28 32v5M3 12h5M3 20h5M3 28h5M32 12h5M32 20h5M32 28h5" />
        </g>
        <rect x="9" y="9" width="22" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14.5 26 20 14l5.5 12M16.6 22.5h6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo-text">amrith<span>.eshwar</span></span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef(null);
  // "top" is the hero: observed so that no link stays highlighted when you scroll back up
  const active = useActiveSection(["top", ...links.map((l) => l.id)]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progress.current) progress.current.style.setProperty("--p", p.toFixed(4));
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Sections">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "is-active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--small nav-cta"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn aria-hidden="true" /> Let's connect
          </a>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="nav-progress" ref={progress} aria-hidden="true">
        <i />
      </div>
    </header>
  );
}

export default Nav;
