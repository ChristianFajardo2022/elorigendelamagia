import { LoaderSombrero } from "./LoaderSombrero";
import { AnimatePresence, motion } from "framer-motion";

// src/components/Loader.jsx
export default function Loader({ loading }) {
  return (
    <AnimatePresence initial={"wait"}>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center z-[100]"
        >
          <LoaderSombrero />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
