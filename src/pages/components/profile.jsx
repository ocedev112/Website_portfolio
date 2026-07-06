import "./styles/body.css";
import "./styles/profile.css";
import { useOnInView } from "react-intersection-observer";
import { forwardRef } from "react";

const Profile = forwardRef((prop, ref) => {
  return (
    <div className="profile_container" ref={ref}>
      <div className="profile_file_section">
        <div className="file_top">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 91,0 100,100 0,100"
              fill="rgb(210, 210, 210)"
            />
            <path
              d="M0,100 L0,0 L91,0 L100,100"
              fill="none"
              stroke="none"
              stroke-width="0"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="profile_header">
          <div className="header_text">PROFILE</div>
        </div>
      </div>
      <div className="main_profile_container">
        <div className="profile">
          <div className="profile_section_container">
            <div className="profile_section_header">About Me</div>
            <div className="profile_section">
              <div className="profile_image"></div>
              <p className="profile_paragraph">
                Emmanuel is a Computer Science(Information Systems) graduate
                from Babcock University building AI solutions for real-world
                problems. His work includes a deployed healthcare model for
                fetal abnormality risk assessment (aimed at reducing infant
                mortality in Nigeria), a multi-modal chatbot with text-to-speech
                and image generation capabilities, and an agentic Chrome
                extension for browser automation. He works across the stack,
                from machine learning models in TensorFlow and PyTorch to web
                interfaces in React , with a focus on practical applications
                that solve tangible problems.
              </p>
            </div>
          </div>
          <div className="profile_section_container">
            <div className="profile_section_header">Tech stack</div>

            <div className="profile_section">
              <div className="sub_section">
                <div className="sub_title">
                  <sub>01</sub>AI Engineering
                </div>
              </div>
              <div className="section_list">
                <div
                  className="section_item
              "
                >
                  Groq
                </div>
                <div
                  className="section_item
              "
                >
                  Gemini
                </div>
                <div
                  className="section_item
              "
                ></div>
                <div
                  className="section_item
              "
                >
                  Langchain
                </div>
                <div
                  className="section_item
              "
                >
                  Qdrant
                </div>
                <div
                  className="section_item
              "
                >
                  Chroma
                </div>
              </div>
              <div className="sub_section">
                <div className="sub_title">
                  <sub>02</sub>ML Engineering
                </div>
              </div>
              <div className="section_list">
                <div
                  className="section_item
              "
                >
                  Pandas
                </div>
                <div
                  className="section_item
              "
                >
                  Scikit-Learn
                </div>
                <div
                  className="section_item
              "
                ></div>
                <div
                  className="section_item
              "
                >
                  PyTorch
                </div>
                <div
                  className="section_item
              "
                >
                  TensorFlow
                </div>
                <div
                  className="section_item
              "
                >
                  HuggingFace
                </div>
              </div>
              <div className="sub_section">
                <div className="sub_title">
                  <sub>03</sub>Fullstack Development
                </div>
              </div>
              <div className="section_list">
                <div
                  className="section_item
              "
                >
                  NGINX
                </div>
                <div
                  className="section_item
              "
                >
                  GCP
                </div>
                <div
                  className="section_item
              "
                ></div>
                <div
                  className="section_item
              "
                >
                  Postgresql
                </div>
                <div
                  className="section_item
              "
                >
                  MongoDB
                </div>
                <div
                  className="section_item
              "
                >
                  Docker
                </div>
                <div
                  className="section_item
              "
                >
                  Github
                </div>
                <div
                  className="section_item
              "
                >
                  React
                </div>
              </div>
            </div>
          </div>
          <div className="profile_section_container">
            <div className="profile_section_header">Contact Me</div>

            <div className="profile_section">
              <div className="contact_ways">
                <div
                  className="contacts uppercase"
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/olewuenyi-emman/",
                      "_blank",
                      "noreopener",
                      "noreferrer",
                    );
                  }}
                >
                  <div className="contact_logo" id="linkedin_contact"></div>
                  linkedin
                </div>
                <div
                  className="contacts uppercase"
                  onClick={() =>
                    (window.location.href = "mailto:olewuenyie@gmail.com")
                  }
                >
                  <div className="contact_logo" id="gmail_contact"></div>
                  Gmail
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
