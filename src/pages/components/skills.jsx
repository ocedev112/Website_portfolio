import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/skills.css";

gsap.registerPlugin(ScrollTrigger);

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
  const headerRefs = useRef([]);
  const descRefs = useRef([]);
  const manualOverride = useRef(skillsData.map(() => false));
  const hasStacked = useRef(skillsData.map(() => false));
  const isFirstRun = useRef(true);

  const [openState, setOpenState] = useState(
    skillsData.map((_, index) => index !== lastIndex),
  );

  useLayoutEffect(() => {
    const triggers = [];

    for (let i = 0; i < lastIndex; i++) {
      const target = i;
      const nextHeader = headerRefs.current[i + 1];
      if (!nextHeader) continue;

      const close = () => {
        if (manualOverride.current[target]) return;
        if (hasStacked.current[target]) return;
        hasStacked.current[target] = true;
        setOpenState((prev) => {
          if (!prev[target]) return prev;
          const next = [...prev];
          next[target] = false;
          return next;
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: nextHeader,
        start: "bottom bottom",
        onEnter: close,
      });

      triggers.push(trigger);
    }

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  useLayoutEffect(() => {
    descRefs.current.forEach((el, i) => {
      if (!el) return;

      if (isFirstRun.current) {
        gsap.set(el, { height: openState[i] ? "auto" : 0 });
        return;
      }

      gsap.to(el, {
        height: openState[i] ? "auto" : 0,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      });
    });

    isFirstRun.current = false;
  }, [openState]);

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
              className="skill_header"
              ref={(el) => (headerRefs.current[index] = el)}
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
              ref={(el) => (descRefs.current[index] = el)}
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
