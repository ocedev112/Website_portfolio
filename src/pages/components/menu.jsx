import "./styles/body.css";
import "./styles/menu.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Menu = ({ scrollTo }) => {
  return (
    <>
      <div className="menu_container">
        <div className="menu_options_container">
          <div className="menu_options_hold">
            <div
              className="menu_options text-2xl font-bold 
                uppercase text-start border-b-2 border-black w-[0%]"
              onClick={() => {
                scrollTo("project");
              }}
            >
              Projects
            </div>
          </div>
        </div>
        <div className="menu_options_container">
          <div className="menu_options_hold">
            <div
              className="menu_options text-2xl font-bold 
                uppercase text-start border-b-2 border-black w-[0%]"
              onClick={() => {
                scrollTo("profile");
              }}
            >
              Profile
            </div>
          </div>
        </div>

        <div className="menu_options_container">
          <div className="menu_options_hold">
            <div
              className="menu_options text-2xl font-bold 
                uppercase text-start border-b-2 border-black w-[0%]"
            >
              <Link to="/book-demo">Meet with me</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
