import { useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Intro({ loading }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleClick = () => {
    if (!showVideo) {
      setVideoLoading(true);
      setShowVideo(true);
    }
  };

  return (
    <div onClick={handleClick} className="relative w-screen h-screen overflow-hidden">
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
              <Link
                to="amuleto"
                className="absolute bottom-10 right-10 cursor-pointer Manrope hover:bg-[#e2e2e2] hover:opacity-100 hover:text-[#262626] border border-[#e2e2e2] opacity-70 text-[#e2e2e2] py-2 px-10 rounded-3xl text-[1.2rem] z-50"
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
                // Cuando el reproductor de Vimeo esté listo, quitamos el loader
                setVideoLoading(false);
                // Después de 5s, mostramos el botón “Omitir”
                setTimeout(() => {
                  setShowSkipButton(true);
                }, 5000);
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

            {/* ⚡ Motion div para transición oscuro → claro */}
            {!videoLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 4 }}
                className="absolute top-0 left-0 w-full h-full bg-black z-40"
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex items-end justify-center h-full">
          {/* Video de fondo */}
          <video
            src="/video/Im-Home2.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          />

          {/* ⚡ Motion div para transición inicial */}
          {!loading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 4 }}
              className="absolute top-0 left-0 w-full h-full bg-black z-50"
            />
          )}

          <button
            className="flex cursor-pointer mb-70 Manrope group border border-[#e2e2e2] text-[#e2e2e2] hover:text-black hover:bg-[#e2e2e2] font-bold py-2 px-10 rounded-3xl text-[1.2rem] z-[80]"
            onClick={handleClick}
          >
            Reproducir
            <img
              className="w-4 ml-5 transition-filter duration-200 filter invert contrast-200 group-hover:invert-0 group-hover:contrast-100"
              src="/reproducir-09.svg"
              alt="Ícono de reproducir"
            />
          </button>
        </div>
      )}
    </div>
  );
}
