import "./styles/body.css";
import "./styles/project.css";
import { useState, useEffect, useRef, forwardRef } from "react";
import { InView, useOnInView } from "react-intersection-observer";

const Projects = forwardRef((prop, ref) => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  const textRef = useOnInView(
    (inView, entry) => {
      if (inView && entry) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0px)";
      } else {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(90px)";
      }
    },
    {
      threshold: 0.1,
    },
  );

  const textRef2 = useOnInView(
    (inView, entry) => {
      if (inView && entry) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0px)";
      } else {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(90px)";
      }
    },
    {
      threshold: 0.1,
    },
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/ocedev112/repos?per_page=12&sort=updated",
        );

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();
        console.log("fetched data: ", data);

        setProjects(data);
        console.log("finishing");
      } catch (err) {
        setStatus("error");
      } finally {
        setStatus("finished");
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="main_project_container" ref={ref}>
        <div className="project_hero" ref={textRef}>
          Hi, i'm emmanuel, a full stack developer
        </div>
        <div className="project_hero_sub" ref={textRef2}>
          {" "}
          Previous Projects
        </div>
        {status === "loading" && (
          <div className="loading_container">Loading Projects....</div>
        )}

        {status.includes("error") && (
          <div className="error_container">error loading project</div>
        )}

        {status === "finished" && (
          <div className="project_container h-max w-max    ">
            {projects.map((project) => {
              {
                console.log("finished", project.id);
              }
              return (
                <div
                  className="project_card bg-white text-black "
                  key={project.id}
                >
                  <div className="project_languages">{project.language}</div>
                  <div className="project_card_box">
                    <div className="project_title font-600">{project.name}</div>
                    <p className="project_description">{project.description}</p>
                  </div>
                  <div className="project_link">
                    <a href={project.html_url} target="_blank">
                      View Project
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
});

export default Projects;
