import {
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
  forwardRef,
} from "react";

import "./styles/body.css";
import "./styles/hero.css";

const GridCell = memo(({ glowClass, onMouseEnter }) => (
  <div
    className={`grid-cell  w-full h-full ${glowClass}`}
    onMouseEnter={onMouseEnter}
  ></div>
));

GridCell.displayName = "GridCell";

const Hero = () => {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [grid, setGrid] = useState({ rows: 20, cols: 20, quantity: 400 });
  const [glowGrid, setGlowGrid] = useState([]);

  const updateGlowGrid = useCallback((index) => {
    setGlowGrid((prev) =>
      prev.length === 4 ? [...prev.slice(1), index] : [...prev, index],
    );
  }, []);

  const getGlowClass = useCallback(
    (cellIndex) => {
      const position = glowGrid.indexOf(cellIndex);
      return position !== -1 ? `grid-cell-glow-${position}` : "";
    },
    [glowGrid],
  );

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      const base_max_size = 73;
      const base_min_size = 55;

      const cellSize =
        width > 1000
          ? Math.floor(width / Math.floor(width / base_max_size))
          : Math.floor(width / Math.floor(width / base_min_size));

      const rows = Math.floor(height / cellSize);
      const cols = Math.floor(width / cellSize);
      const quantity = rows * cols;

      setGrid({ rows, cols, quantity });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let timer;

    const handleMouseMove = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setGlowGrid([]);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const canvasRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/portfolio_resume.pdf";
    link.download = "MyResume.pdf";
    link.click();
  };

  return (
    <>
      <div className="main_body">
        <div
          className="grid_body"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {Array.from({ length: grid.quantity }).map((_, index) => (
            <GridCell
              key={index}
              glowClass={getGlowClass(index)}
              onMouseEnter={() => updateGlowGrid(index)}
            />
          ))}
        </div>

        <div className="hero_container flex flex-col justify-center items-center gap-1 font-futuristic absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="hero_texts flex flex-col justify-center items-start gap-1">
            <h1 className="hero_name self-start  uppercase">
              olewuenyi emmanuel
            </h1>
            <h2 className="hero_title  text-7xl font-semibold  uppercase">
              Building great software
            </h2>
          </div>
          <div className="hero_roles flex justify-center items-center  gap-2 pb-3">
            <div className="hero_role"> AI/ML Engieering</div>
            <div className="hero_role">Full Stack Development</div>
          </div>
          <div className="hero_buttons flex justify-center items-center  gap-10">
            <div
              className="hero_button text-white uppercase"
              onClick={handleDownload}
            >
              View Resume
            </div>
            <div
              className="hero_button contact uppercase"
              onClick={() =>
                (window.location.href = "mailto:olewuenyie@example.com")
              }
            >
              Get in touch
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
