import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import opticsImg from "../Assets/earlier/optics.webp";
import chessImg from "../Assets/earlier/chess.webp";
import brainImg from "../Assets/earlier/brain.webp";
import codeImg from "../Assets/earlier/code.webp";
import { earlier, projects } from "../data";
import { ART } from "./ProjectArt";
import { Chips, Impact, SectionHead, SpotlightCard } from "./shared";

const IMAGES = { optics: opticsImg, chess: chessImg, brain: brainImg, code: codeImg };

// Captions for the illustrations (the PCB art manages its own, it has a Board / Drone switch).
const CAPTIONS = {
  cart: "paste → parse → packed",
  pet: "walks off the edge of the window",
};

function Featured({ p, index }) {
  const Art = ART[p.art];
  // On the wide card the impact meter and tags sit under the illustration to balance the columns.
  const meta = (
    <>
      {p.impact ? <Impact impact={p.impact} /> : null}
      <Chips items={p.stack} />
    </>
  );
  return (
    <SpotlightCard
      as="article"
      tilt={!p.wide}
      className={`project reveal ${p.wide ? "project--wide" : ""}`}
      style={{ "--d": `${index * 0.06}s` }}
      id={p.id}
    >
      <div className="art-col">
        <div className="art">
          <Art />
          {CAPTIONS[p.art] ? (
            <span className="art-cap"><i /> {CAPTIONS[p.art]}</span>
          ) : null}
        </div>
        {p.wide ? <div className="art-meta">{meta}</div> : null}
      </div>

      <div className="project-body">
        <p className="kicker">{p.kicker}</p>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-tag">{p.tagline}</p>
        <p className="project-blurb">{p.blurb}</p>

        <ul className="points">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>

        {p.wide ? null : meta}

        {p.repo || p.download ? (
          <div className="project-links">
            {p.repo ? (
              <a className="btn btn--small" href={p.repo} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" /> Source
              </a>
            ) : null}
            {p.download ? (
              <a className="btn btn--small btn--primary" href={p.download} target="_blank" rel="noreferrer">
                <FiDownload aria-hidden="true" /> Download for Windows
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </SpotlightCard>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead num="03" label="Projects" title="Things I've built for real people.">
          <p className="section-sub">
            A friend's business, my juniors' projects and a bit of fun with friends. Each one started
            with someone who needed something easier.
          </p>
        </SectionHead>

        <div className="project-grid">
          {projects.map((p, i) => (
            <Featured p={p} index={i} key={p.id} />
          ))}
        </div>

        <h3 className="earlier-title reveal">Earlier builds</h3>
        <div className="earlier-grid">
          {earlier.map((e, i) => (
            <SpotlightCard
              as="article"
              tilt
              className="earlier reveal"
              style={{ "--d": `${i * 0.06}s` }}
              key={e.title}
            >
              <img src={IMAGES[e.image]} alt="" loading="lazy" width="760" height="507" />
              <div className="earlier-body">
                <h4>{e.title}</h4>
                <p>{e.text}</p>
                <Chips items={e.stack} />
                <a className="link" href={e.repo} target="_blank" rel="noreferrer">
                  <FaGithub aria-hidden="true" /> View on GitHub
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
