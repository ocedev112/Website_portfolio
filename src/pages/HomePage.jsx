import Hero from "./components/hero";
import { Menu } from "./components";
import { Projects } from "./components";
import { Profile } from "./components";
import { Meeting } from "./components";
import { useEffect, useState, useRef } from "react";

export function HomePage() {
  const heroRef = useRef();
  const projectRef = useRef();
  const profileRef = useRef();

  const scrollTo = (scrollElement) => {
    if (scrollElement === "project") {
      projectRef.current?.scrollIntoView({ behaviour: "smooth" });
    } else if (scrollElement === "profile") {
      profileRef.current?.scrollIntoView({ behaviour: "smooth" });
    }
  };

  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current && window.innerWidth > 768) {
        const scrollY = window.scrollY;
        const newPosition = 0.45 * scrollY;

        heroRef.current.style.transform = `translateY(${newPosition}px)`;
      }
    };

    window.addEventListener("scroll", handleParallax);

    return () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  return (
    <>
      <Hero ref={heroRef} />
      <Menu scrollTo={scrollTo} />
      <Projects ref={projectRef} />
      <Profile ref={profileRef} />
      <Meeting />
    </>
  );
}
