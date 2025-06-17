import Lottie from "lottie-react";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { BotonReproducir } from "./BotonReproducir";

const videos = [
  {
    title: "MAKING OF",
    thumbnail: "/making/making3.jpg",
    bgVideo: "/making/Shorts-amigos-del-alma.mp4",
    youtube: "https://www.youtube.com/watch?v=c02q6fefv1c",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    aspect: 16 / 9,
  },
  {
    title: "BEHIND THE SCENES",
    thumbnail: "/making/making1.jpg",
    bgVideo: "/making/Shorts-los-clasicos.mp4",
    youtube: "https://www.youtube.com/watch?v=XXXXXXXXXX",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    aspect: 16 / 9,
  },
  {
    title: "CONTENIDOS DE EXPECTATIVA",
    thumbnail: "/making/making2.jpg",
    bgVideo: "/making/Shorts-operacion-mayo.mp4",
    youtube: "https://www.youtube.com/watch?v=YYYYYYYYYY",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    aspect: 16 / 9,
  },
  {
    title: "DEL STORY BOARD A LA HISTORIA",
    thumbnail: "/making/making3.jpg",
    bgVideo: "/making/Shorts-ultima-milla.mp4",
    youtube: "https://www.youtube.com/watch?v=ZZZZZZZZZZ",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    aspect: 16 / 9,
  },
];

export default function MakinOff() {
  const [selected, setSelected] = useState(0); // Cuál cuadro está activo (bg video)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Medición responsive para cover video
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const aspect = videos[selected].aspect || 16 / 9;
  let videoWidth = dimensions.width;
  let videoHeight = dimensions.width / aspect;

  if (videoHeight < dimensions.height) {
    videoHeight = dimensions.height;
    videoWidth = dimensions.height * aspect;
  }

  // --- Layout ---
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: "25rem" }}
    >
      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-20" />

      {/* Background video centrado */}
      <div
        className="absolute left-1/2 top-1/2 z-0"
        style={{
          width: `${videoWidth / 16}rem`,
          height: `${videoHeight / 16}rem`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
        }}
      >
        <video src={videos[selected].bgVideo}
        autoPlay
        loop />
{/*         <ReactPlayer
          url={videos[selected].bgVideo}
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ pointerEvents: "none" }}
          config={{
            youtube: {
              playerVars: { controls: 0, showinfo: 0, modestbranding: 1 },
            },
          }}
        />
 */}      </div>

      {/* Overlay degradado */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/20 z-10 pointer-events-none" />

      {/* Contenido principal superior */}
      <div className="relative z-30 flex flex-col amber justify-end pb-[19rem] h-full px-30">
        <div>
          <h1 className="text-white text-[3.5rem] leading-tight font-light mb-2">
            {videos[selected].title}
          </h1>
          <p className="text-white max-w-lg text-base mb-8">
            {videos[selected].texto}
          </p>
        </div>
{/*         <button
          className="cursor-pointer mt-6 flex flex-col"
          onClick={() => {
            setModalVideo(videos[selected].youtube);
            setModalOpen(true);
          }}
        >
          <BotonReproducir />
        </button>
 */}      </div>

      {/* Fila de shorts al fondo */}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center w-full px-30 ">
        <div className="w-full text-white text-xl amber mb-3 ">
          SHORTS
        </div>
        <div className="flex items-center justify-between w-full">
          {videos.map((v, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className={`
                  cursor-pointer w-[16rem] h-[9rem] md:w-[24.5rem] md:h-[14rem] 
                  rounded-2xl shadow-xl relative overflow-hidden border-2 transition-all duration-200
                  ${selected === i ? " scale-110" : "border-transparent"}
                  group
                `}
                style={{
                  backgroundImage: `url(${v.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => {
                  setModalVideo(v.youtube);
                  setModalOpen(true);
                }}
                tabIndex={0}
              >
                {/* Play icon sólo en el primero o si lo necesitas */}
                {i === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      width="60"
                      height="60"
                      fill="none"
                      viewBox="0 0 60 60"
                      className="opacity-90"
                    >
                      <circle cx="30" cy="30" r="30" fill="rgba(0,0,0,0.5)" />
                      <polygon points="24,18 44,30 24,42" fill="#fff" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-2 w-full pl-5 text-start text-xs md:text-sm text-white font-semibold tracking-tight md:w-full truncate">
                {v.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal igual que antes */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 z-[100] flex items-center justify-center"
        >
          <div className="w-[90vw] md:w-[80vw] h-[40vh] md:h-[70vh] max-w-[75rem] rounded-2xl overflow-hidden bg-transparent">
            <ReactPlayer
              url={modalVideo}
              playing
              controls
              width="100%"
              height="100%"
              className="!rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
