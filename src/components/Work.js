import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiRotateCw } from "react-icons/fi";
import { profile, work } from "../data";
import { prefersReducedMotion, useInView } from "../hooks";
import { Chips, SectionHead, SpotlightCard } from "./shared";

/* ───────────────────────── agent pipeline ───────────────────────── */

function Node({ name, role, tone = "agent", i = 0 }) {
  return (
    <div className={`fnode fnode--${tone}`} style={{ "--i": i }}>
      <b>{name}</b>
      {role ? <span>{role}</span> : null}
    </div>
  );
}

function AgentFlow({ flow }) {
  return (
    <figure className="flow" aria-label="How wfguard runs: a code change goes to an orchestrator agent, five specialist agents work in parallel, and a report-writer agent produces one review report.">
      <div className="flow-row">
        <Node name={flow.start} tone="io" />
        <span className="flink" aria-hidden="true"><i /></span>
        <Node name={flow.lead.name} role={flow.lead.role} tone="lead" />
        <span className="flink" aria-hidden="true"><i /></span>
        <div className="fbus">
          {flow.agents.map((a, i) => (
            <Node key={a.name} name={a.name} role={a.role} i={i} />
          ))}
        </div>
        <span className="flink" aria-hidden="true"><i /></span>
        <Node name={flow.writer.name} role={flow.writer.role} tone="lead" />
        <span className="flink" aria-hidden="true"><i /></span>
        <Node name={flow.end} tone="io" />
      </div>
      <figcaption>
        Agents plan, call tools and hand results to each other. One clear report goes to the reviewer.
      </figcaption>
    </figure>
  );
}

/* ───────────────────────── terminal replay ───────────────────────── */

const STEP_MS = 760;

function Terminal({ title, lines }) {
  const [ref, seen] = useInView({ threshold: 0.35 });
  const reduced = prefersReducedMotion();
  const [shown, setShown] = useState(reduced ? lines.length : 0);
  const [typedCmd, setTypedCmd] = useState(reduced ? lines[0].text : "");
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    setShown(0);
    setTypedCmd("");
    const cmd = lines[0].text;
    for (let i = 1; i <= cmd.length; i += 1) {
      timers.current.push(setTimeout(() => setTypedCmd(cmd.slice(0, i)), 18 * i));
    }
    const base = 18 * cmd.length + 450;
    for (let k = 1; k <= lines.length; k += 1) {
      timers.current.push(setTimeout(() => setShown(k), base + (k - 1) * STEP_MS));
    }
  }, [lines]);

  useEffect(() => {
    if (seen && !reduced) play();
    return clear;
  }, [seen, reduced, play]);

  return (
    <div className="term" ref={ref}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="term-title">{title}</span>
        <button type="button" className="term-replay" onClick={play} aria-label="Replay the run">
          <FiRotateCw aria-hidden="true" /> replay
        </button>
      </div>
      <div className="term-body" role="log" aria-live="off">
        <p className="tl tl--cmd">
          <span className="tl-prompt">$</span> {typedCmd}
          {shown === 0 && !reduced ? <span className="caret" /> : null}
        </p>
        {lines.slice(1).map((l, idx) => {
          if (shown <= idx) return null;
          if (l.kind === "verdict") {
            return (
              <p className="tl tl--verdict" key={idx}>
                <span className="who">{l.who}</span>
                <span className="tl-msg">{l.text}</span>
              </p>
            );
          }
          return (
            <p className={`tl tl--${l.kind}`} key={idx}>
              <span className="who">{l.who}</span>
              {l.check ? <span className="sev">high</span> : null}
              {l.check ? <code>{l.check}</code> : null}
              <span className="tl-msg">{l.text}</span>
              {l.tag ? <span className="ok">✓</span> : null}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── section ───────────────────────── */

function Work() {
  const cs = work.caseStudy;
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead num="02" label="Work" title="What I do at work." />

        <div className="role reveal">
          <div className="role-head">
            <div>
              <h3>{work.role}</h3>
              {profile.company || profile.period ? (
                <p className="role-meta">
                  {profile.company}
                  {profile.company && profile.period ? " · " : ""}
                  {profile.period}
                </p>
              ) : null}
            </div>
            <span className="badge"><i /> Now</span>
          </div>
          <p>{work.summary}</p>
        </div>

        <SpotlightCard as="article" className="case reveal">
          <p className="kicker">{cs.kicker}</p>
          <h3 className="case-title">{cs.name}</h3>
          <p className="case-tag">{cs.tagline}</p>

          <div className="case-cols">
            <div>
              <h4>The problem</h4>
              <p>{cs.problem}</p>
            </div>
            <div>
              <h4>What I built</h4>
              <p>{cs.solution}</p>
            </div>
          </div>

          <AgentFlow flow={cs.flow} />

          <Terminal title={cs.terminalTitle} lines={cs.terminal} />

          <ul className="points">
            {cs.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <Chips items={cs.chips} />
        </SpotlightCard>
      </div>
    </section>
  );
}

export default Work;
