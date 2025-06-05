import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Loader from "./Loader";

export default function Intro({ loading }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const [showVideo, setShowVideo] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

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
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleClick = () => {
    if (!showVideo) {
      setVideoLoading(true);
      setShowVideo(true);

      setTimeout(() => {
        setVideoLoading(false);
        setTimeout(() => {
          setShowSkipButton(true);
        }, 5000);
      }, 3500);
    }
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    setShowVideo(false);
    setShowSkipButton(false);
  };

  const maskStyle = {
    maskImage: `radial-gradient(circle 250px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle 250px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative w-screen h-screen overflow-hidden"
      style={{
        cursor: `url('/mouse-09.svg'), auto`,
      }}
    >
      {showVideo ? (
        <>
          {/* Loader mientras carga el iframe de Vimeo */}
          {videoLoading && (
            <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black">
              <Loader />
            </div>
          )}

          {/* Contenedor del video */}
          <div className="absolute top-0 left-0 w-screen h-full z-40 flex items-center justify-center bg-black">
            {showSkipButton && (
              <button
                onClick={handleSkip}
                className="absolute bottom-10  right-10 cursor-pointer Manrope hover:bg-[#e2e2e2] hover:opacity-100 hover:text-[#262626] border border-[#e2e2e2] opacity-70 text-[#e2e2e2] py-2 px-10 rounded-3xl text-[1.2rem] z-50"
              >
                Omitir
              </button>
            )}

            {/* Vimeo player precargado */}
            <ReactPlayer
              url="https://vimeo.com/860989130"
              playing
              width="150%"
              height="150%"
              config={{
                vimeo: {
                  playerOptions: {
                    autoplay: 1,
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

            {/* ⚡ Motion div para transición oscuro → claro */}
            {!videoLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2 }} // ajusta la duración a tu gusto
                className="absolute top-0 left-0 w-full h-full bg-black z-40"
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Video de fondo */}
          <video
            src="/video/Loop-Prueba-color.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          />

          {/* Capa negra con máscara */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black transition-all duration-500 ease-in-out"
            style={maskStyle}
          ></div>

          {/* Contenedor de imágenes */}
          <div className="relative top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col gap-2 items-center justify-center">
              <img
                className="w-[22rem]"
                src="/transparent/primeraLineaTransparent (1).png"
                alt=""
              />
              <img
                className="w-[38rem]"
                src="/transparent/segundaLineaTransparent (1).png"
                alt=""
              />
            </div>

            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col gap-2 items-center justify-center"
              style={maskStyle}
            >
              <img
                className="w-[22rem]"
                src="/color/primeraLineaColor.png"
                alt=""
              />
              <img
                className="w-[38rem]"
                src="/color/SegundaLineaColor.png"
                alt=""
              />
            </div>
          </div>

          {/* ⚡ Motion div para transición inicial */}
          {!loading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 4 }}
              className="absolute top-0 left-0 w-full h-full bg-black z-50"
            />
          )}
        </>
      )}
    </div>
  );
}
