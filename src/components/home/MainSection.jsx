import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MainContent } from "../commons/MainContent";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";
import VideoTrailer from "../videos/VideoTrailer";

export const MainSection = ({ data, video, handlePlay, play }) => {
  return (
    <>
      <main className="relative w-full h-full overflow-hidden">
        <div className="w-full h-dvh relative">
          <MainContent
            data={data}
            play={play}
            handleClick={() => handlePlay(data.videoUrl)}
          />
          <BackgroundTrailer data={data} play={play} />
        </div>
      </main>
      <VideoFixed play={play} url={video} handlePlay={handlePlay} />
    </>
  );
};

const VideoFixed = ({ play, url, handlePlay }) => {
  const containerRef = useRef(null);
  return (
    <AnimatePresence mode="wait">
      {play && (
        <motion.div
          key="player"
          ref={containerRef}
          className="fixed size-full top-0 left-0 z-101"
        >
          <motion.div
            className="absolute w-full h-full bg-blackInter pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <button
            onClick={() => handlePlay("")}
            className="cursor-pointer absolute top-4 left-4 text-whiteInter z-[51] text-3xl"
          >
            ←
          </button>
          <motion.div
            className="relative w-full h-full z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoTrailer
              url={url}
              play={play}
              contenedorWidth={containerRef.current?.clientWidth}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
