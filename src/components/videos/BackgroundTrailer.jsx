import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoTrailer from "./VideoTrailer";
import { VideoPlayinline } from "../commons/VideoPlayinline";

export const BackgroundTrailer = ({ data, play, setplay }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <AnimatePresence mode="wait">
        {play ? (
          <motion.div key="player" className="absolute w-full h-full z-50">
            <motion.div
              className="absolute w-full h-full bg-blackInter pointer-events-none z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <button
              onClick={() => setplay(false)}
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
                url={data.videoUrl}
                play={play}
                contenedorWidth={containerRef.current?.clientWidth}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            className="w-full h-full relative"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute w-4xl h-full bg-gradient-to-r from-blackInter/60 pointer-events-none " />
            <VideoPlayinline data={data} autoPlay={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
