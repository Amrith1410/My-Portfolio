import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import editor from "../../Assets/Projects/brain final - Copy.png";
import chatify from "../../Assets/Projects/optics final - Copy.png";
import suicide from "../../Assets/Projects/code final.png";
import bitsOfCode from "../../Assets/Projects/chess final.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="HAWK EYE OPTICS – FULL-STACK ECOMMERCE PLATFORM"
              description="Developed an eCommerce web app with product listings, user authentication, cart, and order management.Implemented role-based access and dynamic server-side pages using EJS.Integrated MongoDB with Mongoose for secure data handling and session management.Enabled cart operations with real-time updates using Express middleware.
              Tech Stack: Node.js, Express, MongoDB, Mongoose, EJS, JavaScript, HTML/CSS"
              ghLink="https://github.com/Amrith1410/Hawk-Eye-Optics"
              // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="REAL-TIME CHESS GAME (CHESS.COM CLONE)"
              description="Built a live multiplayer chess game with real-time move syncing and spectator support.Created a drag-and-drop chessboard UI with board flip based on player role.Applied full chess rules and FEN state management using chess.js.Managed player roles and socket-based move broadcasting.
              The following Tech Stack used in this project are: Node.js, Express, Socket.IO, Chess.js, JavaScript, Tailwind CSS, EJS "
              ghLink="https://github.com/Amrith1410/CHESS-"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="BRAIN TUMOR DETECTION WEB APP"
              description=" Built an image classification app to detect brain tumor types using a trained CNN model.Integrated TensorFlow with Flask for real-time prediction and result rendering.Handled image uploads, preprocessing, and secure display of prediction results.
              The following Tech Stack used in this project are : Python, Flask, TensorFlow/Keras, NumPy, Pillow, HTML/CSS"
              ghLink="https://github.com/Amrith1410/Brain-Tumor-Detection"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Code Buddy"
              description="Developed a real-time coding platform with problem selection, in-browser code editor, and submission workflow, inspired by LeetCode.
              Implemented dynamic problem rendering and code execution environment using React and Monaco Editor.
              Designed a responsive, split-pane interface with custom styling for interactive user experience.
              Enabled question selection, difficulty tagging, and example-based problem walkthroughs.
              Structured code editor with Run and Submit buttons for real-time interaction and I/O simulation.
              Integrated JSON-based question bank with scope for backend evaluation integration.
              Tech Stack: React, JavaScript, Monaco Editor, CSS, JSON."
              ghLink="https://github.com/Amrith1410/Code-Buddy"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
