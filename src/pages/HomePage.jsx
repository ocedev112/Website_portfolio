import { Landing } from "./components";
import { Menu } from "./components";
import { Projects } from "./components";
import { Skills } from "./components";
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

  return (
    <>
      <Landing scrollTo={scrollTo} />

      <Projects ref={projectRef} />
      <Skills />
      <Profile ref={profileRef} />
      <Meeting />
    </>
  );
}
