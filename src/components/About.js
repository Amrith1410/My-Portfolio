import React from "react";
import { about } from "../data";
import { SectionHead, SpotlightCard } from "./shared";

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead num="01" label="About" title={about.title} />

        <div className="about-grid">
          <div className="about-copy reveal">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="offclock-label">Off the clock</p>
            <ul className="chips chips--soft">
              {about.offClock.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="rules">
            {about.principles.map((r, i) => (
              <SpotlightCard
                as="article"
                className="rule reveal"
                style={{ "--d": `${0.08 * i}s` }}
                key={r.ref}
              >
                <span className="rule-ref">{r.ref}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
