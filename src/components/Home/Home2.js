import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/me3.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Aspiring to build a career in Information Technology by delivering value to the organization and evolving through ongoing learning and development.

              <br />
              <br />I am proficient in core programming languages such as
              <i>
                <b className="purple"> C++ and Python </b>, and passionate about building modern web technologies and products.
              </i>
              <br />
              <br />
              My areas of interest include &nbsp;
              <i>
                <b className="purple">full-stack development </b> , particularly with
                {" "}
                <b className="purple">
                  Node.js, Express.js,
                </b>and <b className="purple">React.js</b> , where I channel my enthusiasm into crafting efficient and scalable applications.
              </i>
              <br /><br />I thrive in collaborative, fast-paced environments and am driven by the challenge of solving real-world problems through clean, maintainable, and impactful code.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Amrith1410?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/amrith-eshwar-t-t-0b60a2317/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
