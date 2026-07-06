import { useEffect, useRef, useState } from "react";
import "./styles/skills.css";

const skillsData = [
  {
    name: "AI Engineering",
    description: `
      Designing multi-modal chatbot interfaces with robust session management.
      Building and optimizing RAG pipelines for conversational AI.
      Optimizing inference for high-concurrency workloads and compressing token payloads to reduce latency and cost.
      Architecting real-time interfaces and connections for live agents.
      Crafting effective prompts and integrating LLM APIs.
      `,
  },
  {
    name: "ML Engineering",
    description: `
      Understanding of deep learning model architectures, such as neural networks and transformers.
      Performing data analysis, including cleaning, extraction, and normalization.
      Fine-tuning models for domain-specific problems using Hugging Face.
      Conducting sentiment analysis and tokenization for NLP tasks.
      Evaluating model performance and output quality.
      Optimizing model inference and training through compression, quantization, and LoRA fine-tuning.
      `,
  },
  {
    name: "System Design",
    description: `      
     Building load balancers with optimal selection algorithms, e.g., least connections, and reverse proxies.
     Designing and implementing scalable backend systems for production environments.
     Rate-limiting requests through API gateways to ensure system stability.
     Designing queueing systems to publish and consume events reliably.
     Maintaining proper version control and management for APIs.
     Deploying and managing applications on cloud infrastructure.
      `,
  },
  {
    name: "Full stack Development",
    description: `
     Building clean, intuitive user interfaces.
     Optimizing page load times.
     Integrating front-end applications with RESTful and third-party APIs.
     Ensuring responsive design and cross-browser compatibility.

      `,
  },
];

const HEADER_HEIGHT = 80;
const lastIndex = skillsData.length - 1;

const Skills = () => {
  const sentinelRefs = useRef([]);
  const manualOverride = useRef(skillsData.map(() => false));
  const hasClosed = useRef(skillsData.map(() => false));
  const [openState, setOpenState] = useState(
    skillsData.map((_, index) => index !== lastIndex),
  );

  useEffect(() => {
    let rafId = null;

    const update = () => {
      setOpenState((prev) => {
        let changed = false;
        const next = [...prev];

        for (let i = 0; i < lastIndex; i++) {
          if (manualOverride.current[i]) continue;
          if (hasClosed.current[i]) continue;

          const sentinel = sentinelRefs.current[i];
          if (!sentinel) continue;

          const lockAt = i * HEADER_HEIGHT;
          const top = sentinel.getBoundingClientRect().top;

          if (top <= lockAt) {
            hasClosed.current[i] = true;
            if (next[i] !== false) {
              next[i] = false;
              changed = true;
            }
          }
        }

        return changed ? next : prev;
      });

      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const toggle = (index) => {
    manualOverride.current[index] = true;
    setOpenState((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <div className="skills_container">
      <div className="skills_hero">Skills</div>
      <div className="skills">
        {skillsData.map((skill, index) => (
          <div className="skill" key={skill.name}>
            <div
              className="stick_sentinel"
              ref={(el) => (sentinelRefs.current[index] = el)}
            />
            <div
              className="skill_header"
              style={{ top: `${index * HEADER_HEIGHT}px`, zIndex: 10 + index }}
            >
              <div className="skill_no">{index + 1}</div>
              <div className="skill_name">{skill.name}</div>
              <div
                className={`skill_button ${
                  openState[index] ? "skill_button_open" : ""
                }`}
                onClick={() => toggle(index)}
              >
                +
              </div>
            </div>
            <div
              className="skill_description"
              style={{ maxHeight: openState[index] ? "260px" : "0px" }}
            >
              {skill.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
