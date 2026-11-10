import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "../data";
import { SectionHead } from "./shared";

function Contact() {
  const { links } = profile;
  return (
    <section className="section section--last" id="contact">
      <div className="container">
        <SectionHead num="05" label="Contact" title="Let's route something together." />

        <div className="contact reveal">
          <p>
            I'm always up for talking about AI agents, developer tooling and local-first software.
            The quickest way to reach me is LinkedIn.
          </p>
          <div className="cta">
            <a className="btn btn--primary btn--big" href={links.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn aria-hidden="true" /> Connect on LinkedIn
            </a>
            {links.email ? (
              <a className="btn btn--big" href={`mailto:${links.email}`}>
                <FiMail aria-hidden="true" /> Email me
              </a>
            ) : null}
            <a className="btn btn--big" href={links.githubNew} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" /> JnrDevAmi
            </a>
            <a className="btn btn--big" href={links.github} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" /> Amrith1410
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
