import React from "react";
import { profile } from "../data";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="footer-mono">
          <i aria-hidden="true" /> all nets connected
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default Footer;
