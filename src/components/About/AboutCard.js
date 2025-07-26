import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone ! <br/>I am <span className="purple">Amrith Eshwar T T </span>
            , a final-year undergraduate student from Madras Institute of Technology, Anna University, located in Chennai, Tamil Nadu, India.
            <br />
            I’m currently pursuing a B.Tech in Information Technology, with a keen interest in emerging technologies and  a strong foundation in software development.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Sports
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring New Technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight />  Reading Tech Blogs & Case Studies
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Amrith</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
