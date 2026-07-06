import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";
import Menu from "./menu";

const Navbar = ({ scrollTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOptionClick = (section) => {
    scrollTo(section);
    setIsMenuOpen(false);
  };

  const handleGithubClick = () => {
    window.open(
      "https://github.com/ocedev112",
      "_blank",
      "noopener,noreferrer",
    );
    setIsMenuOpen(false);
  };

  return (
    <div className="main_nav_bar_box">
      <div className="navbar_container">
        <div className="nav_bar_logo">
          <div className="logo"></div>
        </div>
        <Menu scrollTo={scrollTo} />
        <div className="nav_bar_links">
          <div
            className="links_github"
            onClick={() => {
              window.open(
                "https://github.com/ocedev112",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          ></div>
        </div>
        <div
          className={`menu_open_container ${isMenuOpen ? "is_open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </div>
      <div className={`vertical_menu ${isMenuOpen ? "is_open" : ""}`}>
        <div className="menu_contents">
          <div
            className="menu_option"
            onClick={() => handleOptionClick("project")}
          >
            Projects
          </div>
          <div
            className="menu_option"
            onClick={() => handleOptionClick("profile")}
          >
            Profile
          </div>
          <div className="menu_option">
            <Link
              className="menu_link_demo"
              to="/book-demo"
              onClick={() => setIsMenuOpen(false)}
            >
              Meet with me
            </Link>
          </div>
          <div className="menu_option" onClick={handleGithubClick}>
            Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
