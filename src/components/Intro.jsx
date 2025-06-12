import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { Link } from "react-router-dom";

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
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (!showVideo) {
      setVideoLoading(true);
      setShowVideo(true);
    }
  };

  const maskStyle = {
    maskImage: `radial-gradient(circle 300px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle 300px at ${lightPosition.x}px ${lightPosition.y}px, transparent 70%, black 100%)`,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden"
      style={{ cursor: `url('/mouse-09.svg'), auto` }}
    >
      {/* LOADER SIEMPRE ARRIBA DE TODO CUANDO showVideo Y videoLoading */}
      {showVideo && videoLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <Loader />
        </div>
      )}

      {showVideo ? (
        <>
          {/* Contenedor del video (siempre debajo del loader, z-40) */}
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
            {showSkipButton && (
              <Link
                to="contenido"
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
              playing
              width="150%"
              height="150%"
              onReady={() => {
                setVideoLoading(false);
                setTimeout(() => setShowSkipButton(true), 5000);
              }}
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

            {/* Overlay negro que se desvanece cuando videoLoading === false */}
            {!videoLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="fixed inset-0 bg-black z-20"
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Video de fondo */}
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

          {/* Imágenes superpuestas */}
{/*           <div className="absolute mt-40 inset-0 flex items-center justify-center">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <img
                className="w-[37rem]"
                src="/transparent/pagina_la_magia_de_nueva_venecia2.png"
                alt=""
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={maskStyle}
            >
              <img
                className="w-[37rem]"
                src="/color/pagina_la_magia_de_nueva_venecia.png"
                alt=""
              />
            </div>
          </div>

 */}          {/* Overlay negro inicial */}
          {!loading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 3 }}
              className="fixed inset-0 bg-black z-40"
            />
          )}

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
        </>
      )}
    </div>
  );
}
