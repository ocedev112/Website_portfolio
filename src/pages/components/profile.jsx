import "./styles/body.css";
import "./styles/profile.css";
import { useOnInView } from "react-intersection-observer";
import { forwardRef } from "react";

const Profile = forwardRef((prop, ref) => {
  const profileRef = useOnInView((isInview, entry) => {
    if (isInview && entry) {
      entry.target.style.transform = "translateX(0px)";
      entry.target.style.opacity = "1";
    } else {
      entry.target.style.transform = "translateX(-100%)";
      entry.target.style.opacity = "0";
    }
  });
  return (
    <div className="profile_container" ref={ref}>
      <div className="profile_section_1">
        <div className="profile_name">Olewuenyi Emmanuel</div>
        <div className="profile_role">Full stack development</div>
        <div className="profile_image"></div>
      </div>
      <div className="profile_section_2 ">
        <div className="profile">Profile</div>
      </div>
      <div className="profile_section_3" ref={profileRef}>
        <p className="profile_paragraph">
          Emmanuel is a Computer Science(Information Systems) graduate from
          Babcock University building AI solutions for real-world problems. His
          work includes a deployed healthcare model for fetal abnormality risk
          assessment (aimed at reducing infant mortality in Nigeria), a
          multi-modal chatbot with text-to-speech and image generation
          capabilities, and an agentic Chrome extension for browser automation.
          He works across the stack, from machine learning models in TensorFlow
          and PyTorch to web interfaces in React and Three.js, with a focus on
          practical applications that solve tangible problems.
        </p>

        <div className="profile_prog_lang">
          <div className="lang_header">Languages</div>
          <div className="languages">
            <div className="prog_lang"> Python</div>
            <div className="prog_lang">JavaScript</div>
          </div>
        </div>

        <div className=" profile_domains">
          <div className="profile_domain">
            <div className="profile_domain_icon" id="web_icon"></div>
            <div className="profile_domain_text">Web development</div>
          </div>
          <div className="profile_domain">
            <div className="profile_domain_icon" id="ML_AI_icon"></div>
            <div className="profile_domain_text">Machine Learning</div>
          </div>
        </div>

        <div className="profile_tools">
          <div className="profile_tool" id="react"></div>
          <div className="profile_tool" id="tensorflow"></div>
          <div className="profile_tool" id="pytorch"></div>
          <div className="profile_tool" id="mongodb"></div>
          <div className="profile_tool" id="next"></div>
        </div>
        <div className="profile_contacts">
          <div className="profile_contact_container">
            <a
              className="contact_link"
              href="https://www.linkedin.com/in/olewuenyi-emman/"
              target="_blank"
            >
              <div className="contact_icon" id="profile_linkedin_icon"></div>
            </a>
          </div>
          <div className="profile_contact_container">
            <a
              className="contact_link"
              href="mailto:eolewuenyi@gmail.com"
              target="_blank"
            >
              <div className="contact_icon" id="profile_gmail_icon"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
