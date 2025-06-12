import Lottie from "lottie-react";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { BotonReproducir } from "./BotonReproducir";

const videos = [
  {
    title: "BEHIND THE SCENES",
    thumbnail: "/making/making1.jpg",
    bgVideo: "https://www.youtube.com/watch?v=c02q6fefv1c",
    youtube: "https://www.youtube.com/watch?v=XXXXXXXXXX",
    aspect: 16 / 9,
  },
  {
    title: "CONTENIDOS DE EXPECTATIVA",
    thumbnail: "/making/making2.jpg",
    bgVideo: "https://www.youtube.com/watch?v=a7ddtxlYkpw",
    youtube: "https://www.youtube.com/watch?v=YYYYYYYYYY",
    aspect: 16 / 9,
  },
  {
    title: "DEL STORY BOARD A LA HISTORIA",
    thumbnail: "/making/making3.jpg",
    bgVideo: "https://www.youtube.com/watch?v=YBGU3g6Tbrk",
    youtube: "https://www.youtube.com/watch?v=ZZZZZZZZZZ",
    aspect: 16 / 9,
  },
];

export default function MakinOff() {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

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

  // Cover logic
  const aspect = videos[selected].aspect || 16 / 9;
  let videoWidth = dimensions.width;
  let videoHeight = dimensions.width / aspect;

  if (videoHeight < dimensions.height) {
    videoHeight = dimensions.height;
    videoWidth = dimensions.height * aspect;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: "400px" }}
    >
      <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

      {/* Video de fondo centrado en ambas direcciones */}
      <div
        className="absolute left-1/2 top-1/2 z-0"
        style={{
          width: `${videoWidth}px`,
          height: `${videoHeight}px`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
        }}
      >
        <ReactPlayer
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
      </div>
      {/* Overlay degradado */}
      {
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/20 z-10 pointer-events-none" />
      }
      {/* Contenido principal */}
      <div className="relative px-10 md:px-20 xl:px-40 z-20 flex justify-between items-center w-full h-full max-lg:flex-col max-lg:justify-center max-lg:gap-8">
        {/* Izquierda */}
        <div className="max-w-lg text-white amber h-full flex flex-col amber justify-end pb-40">
          <h1 className="text-[40px] md:text-[52px] font-light mb-0">
            MAKING OF
          </h1>
          <p className="mt-5 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            className="cursor-pointer mt-10 flex flex-col"
            onClick={() => setModalOpen(true)}
          >
              <BotonReproducir />
          </button>
        </div>
        {/* Derecha */}
        <div className="flex flex-col gap-8 mt-8 md:mt-0 amber">
          <h2 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-4 text-left">
            SHORTS
          </h2>
          {videos.map((v, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`
                cursor-pointer w-52 md:w-80 h-24 md:h-48 rounded-2xl
                bg-cover bg-center shadow-xl relative flex items-end overflow-hidden border-2 transition
                ${selected === i ? "border-white" : "border-transparent"}
              `}
              style={{ backgroundImage: `url(${v.thumbnail})` }}
            >
              <div className="w-full bg-black/40 text-white px-6 py-4 font-medium text-base backdrop-blur">
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
          <div className="w-[90vw] md:w-[80vw] h-[40vh] md:h-[70vh] max-w-[1200px] rounded-2xl overflow-hidden bg-transparent">
            <ReactPlayer
              url={videos[selected].youtube}
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
