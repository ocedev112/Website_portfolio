import "./styles/body.css";
import "./styles/demo.css";

import { useNavigate } from "react-router-dom";
import { useOnInView } from "react-intersection-observer";

const Meeting = () => {
  const navigate = useNavigate();

  const headerRef = useOnInView((isInview, entry) => {
    if (isInview && entry) {
      entry.target.style.transform = "translateY(0px)";
      entry.target.style.opacity = "1";
    } else {
      entry.target.style.transform = "translateY(50px)";
      entry.target.style.opacity = "0";
    }
  });

  const buttonRef = useOnInView((isInview, entry) => {
    if (isInview && entry) {
      entry.target.style.transform = "translateY(0px)";
      entry.target.style.opacity = "1";
    } else {
      entry.target.style.transform = "translateY(50px)";
      entry.target.style.opacity = "0";
    }
  });

  return (
    <div className="demo_container">
      <div className="demo_header" ref={headerRef}>
        {" "}
        Would you like to schedule a meeting with me
      </div>
      <button
        className="demo_btn"
        onClick={() => {
          navigate("/book-demo");
        }}
        ref={buttonRef}
      >
        Schedule meeting
      </button>
    </div>
  );
};

export default Meeting;
