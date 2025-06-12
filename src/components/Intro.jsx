import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Intro({ loading, loading2, setLoading, setLoading2 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const [num1, setNum1] = useState(300);
  const [num2, setNum2] = useState(300);

  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const delay = 0.1;
    const animation = requestAnimationFrame(() => {
      setLightPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * delay,
        y: prev.y + (mousePosition.y - prev.y) * delay,
      }));
    });
    return () => cancelAnimationFrame(animation);
  }, [mousePosition]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    animateNumbers();

    setTimeout(() => {
      setLoading2(false);
    }, 500);
  };

  const animateNumbers = () => {
    const start = 300;
    const end = 1900;
    const duration = 1000; // 1 segundo
    const steps = 60; // número de frames
    const stepTime = duration / steps;
    const increment = (end - start) / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.round(start + increment * currentStep);
      setNum1(newValue);
      setNum2(newValue);

      if (currentStep >= steps) {
        clearInterval(interval);
        setNum1(end);
        setNum2(end);
      }
    }, stepTime);
  };

  const maskStyle = {
    maskImage: `radial-gradient(circle ${num1}px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${num2}px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden"
      style={{ cursor: `url('/mouse-09.svg'), auto` }}
    >
      <Loader loading={loading} />

      {/* Contenedor del video (siempre debajo del loader, z-40) */}

      <AnimatePresence>
        {loading == "video" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black"
          >
            {showSkipButton && (
              <Link
                to="contenido"
                onClick={() => {
                  setLoading("inicio");
                  setLoading2(false);
                }}
                className="absolute bottom-10 right-10 z-50 cursor-pointer Manrope
                  hover:bg-[#e2e2e2] hover:opacity-100 hover:text-[#262626]
                  border border-[#e2e2e2] opacity-70 text-[#e2e2e2]
                  py-2 px-10 rounded-3xl text-[1.2rem]"
              >
                Omitir
              </Link>
            )}

            <ReactPlayer
              url="https://vimeo.com/860989130"
              playing={!loading2}
              width="150%"
              height="150%"
              onPlay={() => {
                setTimeout(() => setShowSkipButton(true), 5000);
              }}
              config={{
                vimeo: {
                  playerOptions: {
                    autoplay: 0,
                    controls: 0,
                    title: 0,
                    byline: 0,
                    portrait: 0,
                    muted: 0,
                    transparent: 0,
                    loop: 1,
                  },
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video de fondo */}
      <AnimatePresence>
        {loading2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full z-[41] relative"
          >
            <video
              src="/video/Im-Home2.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            {/* Capa negra con máscara */}
            <div
              className="absolute inset-0 bg-black opacity-55 transition-all duration-500 ease-in-out"
              style={maskStyle}
            />
            {/* Botón Reproducir */}
            <button
              onClick={handleClick}
              className="absolute bottom-50 left-1/2 -translate-x-1/2 flex cursor-pointer Manrope
              group border bg-black opacity-70 border-[#e2e2e2] text-[#e2e2e2]
              hover:bg-[#e2e2e2] hover:opacity-100 hover:text-black
              font-bold py-2 px-10 rounded-3xl text-[1.2rem] z-50"
            >
              Reproducir
              {/* Icono por defecto */}
              <img
                src="/reproducir-09.svg"
                alt="Ícono de reproducir"
                className="w-4 ml-5 block group-hover:hidden"
              />
              {/* Icono hover */}
              <img
                src="/reproducirnegro-09.svg"
                alt="Ícono de reproducir (hover)"
                className="w-4 ml-5 hidden group-hover:block"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
