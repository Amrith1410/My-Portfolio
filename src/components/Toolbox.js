import React from "react";
import { toolbox } from "../data";
import { SectionHead } from "./shared";

/** The skills list, dressed as a bill of materials. */
function Toolbox() {
  return (
    <section className="section" id="toolbox">
      <div className="container">
        <SectionHead num="04" label="Toolbox" title="Bill of materials.">
          <p className="section-sub">What's actually soldered into the things above.</p>
        </SectionHead>

        <div className="bom reveal" role="table" aria-label="Skills grouped by area">
          <div className="bom-head" role="row">
            <span role="columnheader">Ref</span>
            <span role="columnheader">Area</span>
            <span role="columnheader">Parts</span>
          </div>
          {toolbox.map((row) => (
            <div className="bom-row" role="row" key={row.ref}>
              <span className="bom-ref" role="cell">{row.ref}</span>
              <span className="bom-group" role="cell">{row.group}</span>
              <ul className="chips" role="cell">
                {row.parts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Toolbox;
