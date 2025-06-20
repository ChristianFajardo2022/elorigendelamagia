import { AnimatePresence, motion } from "framer-motion";
import { VideoPlayinline } from "../commons/VideoPlayinline";
import { OverLay } from "../commons/OverLay";

export const BackgroundTrailer = ({ data, play }) => {
  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        {!play && (
          <motion.div
            key="preview"
            className="w-full h-full relative"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <OverLay top={true} bottom={true} />
            <VideoPlayinline data={data} autoPlay={true} scale={"scale-135"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
