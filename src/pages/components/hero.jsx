import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
  forwardRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./styles/body.css";
import "./styles/hero.css";

const Laptop = lazy(() => import("../../../public/Scene.jsx"));

const GridCell = memo(({ glowClass, onMouseEnter }) => (
  <div
    className={`grid-cell  w-full h-full ${glowClass}`}
    onMouseEnter={onMouseEnter}
  ></div>
));

GridCell.displayName = "GridCell";

const Hero = forwardRef((props, ref) => {
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

  useEffect(() => {
    const canvas = canvasRef.current?.querySelector("canvas");

    const handleContextLost = (event) => {
      event.preventDefault();
      console.log("WebGL context lost. Attempting to restore...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener(
          "webglcontextrestored",
          handleContextRestored,
        );
      }
    };
  }, []);

  return (
    <>
      <div
        className="main_body"
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

      <div
        className="hero_container flex flex-col justify-center items-center gap-1 font-futuristic absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        ref={ref}
      >
        <h1 className="hero_name   uppercase">Olewuenyi Emmanuel</h1>
        <h2 className="hero_title  text-6xl font-semibold  uppercase">
          Programming meets Design
        </h2>
        <div
          className="canvas_container"
          style={{ width: "min(700px, 90vw)", height: "300px" }}
          ref={canvasRef}
        >
          <Canvas
            className="laptopModel w-full h-full"
            camera={{ position: [0, -0.3, 3.5], fov: 35 }}
            style={{ pointerEvents: "none" }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: windowSize.width >= 768,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              failIfMajorPerformanceCaveat: false,
              preserveDrawingBuffer: false,
              premultipliedAlpha: true,
            }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                "webglcontextlost",
                (e) => {
                  e.preventDefault();
                },
                false,
              );
            }}
          >
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <group
                position={[0, -0.5, 0]}
                scale={windowSize.width < 768 ? 0.8 : 1}
              >
                <Laptop />
              </group>
            </Suspense>
            <Environment
              preset="warehouse"
              resolution={windowSize.width < 768 ? 256 : 512}
              background={false}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
});

export default Hero;
