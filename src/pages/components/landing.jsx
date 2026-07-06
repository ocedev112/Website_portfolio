import Navbar from "./navbar";
import Hero from "./hero";
import Languages from "./languages";
import "./styles/landing.css";

const Landing = ({ scrollTo }) => {
  return (
    <>
      <div className="land_container ">
        <Navbar scrollTo={scrollTo} />
        <Hero />
        <Languages />
      </div>
    </>
  );
};

export default Landing;
