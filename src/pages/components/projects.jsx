import "./styles/body.css";
import "./styles/project.css";
import { useState, useEffect, forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { useOnInView } from "react-intersection-observer";

const Projects = forwardRef((prop, ref) => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingId, setExitingId] = useState(null);
  const [animating, setAnimating] = useState(false);

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
    { threshold: 0.1 },
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
    { threshold: 0.1 },
  );
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/ocedev112/repos?per_page=12&sort=created",
        );

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();

        const featured = data.filter((repo) =>
          repo.topics?.includes("portfolio"),
        );

        const withDescriptions = await Promise.all(
          featured.map(async (repo) => {
            try {
              const res = await fetch(
                `https://raw.githubusercontent.com/ocedev112/${repo.name}/${repo.default_branch}/description.md`,
              );
              const long_description = res.ok ? await res.text() : null;
              return { ...repo, long_description };
            } catch {
              return { ...repo, long_description: null };
            }
          }),
        );

        setProjects(withDescriptions);
      } catch (err) {
        console.log("error", err);
        setStatus("error");
      } finally {
        setStatus("finished");
      }
    };

    fetchProjects();
  }, []);
  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (animating || currentIndex >= projects.length - 1) return;
    setAnimating(true);
    setExitingId(projects[currentIndex].id);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitingId(null);
      setAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (animating || currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <>
      <div className="main_project_container" ref={ref}>
        <div className="project_hero uppercase" ref={textRef}>
          Hi, i'm olewuenyi emmanuel
        </div>
        <div className="project_hero_sub" ref={textRef2}>
          {" "}
          check out my projects
        </div>
        <div className="project_content">
          {status === "finished" &&
            projects.length > 0 &&
            projects[currentIndex] && (
              <div className="project_desctiptions text-white uppercase">
                <div className="project_name">
                  {projects[currentIndex].name}
                </div>
                <div className="project_description">
                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                    {projects[currentIndex].long_description}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          {status === "loading" && (
            <div className="loading_container">Loading Projects....</div>
          )}

          {status.includes("error") && (
            <div className="error_container">error loading project</div>
          )}

          {status === "finished" && (
            <div className="project_stack_wrapper ">
              <div className="project_stack_container">
                {visibleProjects.map((project, i) => {
                  const isExiting = project.id === exitingId;
                  const style = isExiting
                    ? {
                        transform: "translateY(-170px)",
                        opacity: 0,
                        zIndex: 300,
                      }
                    : {
                        transform: `translateY(-${i * 22}px) scale(${1 - i * 0.05})`,
                        opacity: 1 - i * 0.18,
                        zIndex: 100 - i,
                      };

                  return (
                    <div
                      className="project_card bg-white text-black"
                      key={project.id}
                      style={style}
                    >
                      <div className="project_languages">
                        {project.language}
                      </div>
                      <div className="project_card_box">
                        <div className="v_project_title font-600">
                          {project.name}
                        </div>
                        <p className="v_project_description">
                          {project.description}
                        </p>
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

              <div className="project_stack_controls">
                <button
                  className="project_nav_btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  Prev
                </button>
                <button
                  className="project_nav_btn"
                  onClick={handleNext}
                  disabled={currentIndex >= projects.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Projects;
