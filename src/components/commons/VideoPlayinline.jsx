import { useEffect, useRef } from "react";

export const VideoPlayinline = ({ data, autoPlay, play, scale }) => {
  const video = useRef(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    // Si play está definido, lo usamos para controlar reproducción manual
    if (typeof play === "boolean") {
      if (play) {
        const playPromise = el.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Error al reproducir el video:", err);
          });
        }
      } else {
        el.pause();
      }
    }
  }, [play]);

  return (
    <video
      ref={video}
      className={`video size-full object-cover ${
        scale ? scale : ""
      } object-center pointer-events-none`}
      autoPlay
      muted
      loop
      playsInline
    >
      <source
        src={
          typeof window !== "undefined" &&
          window.matchMedia("(max-width: 600px)").matches
            ? data.trailerM
            : data.trailer
        }
        type="video/mp4"
      />
      Tu navegador no soporta la reproducción de video.
    </video>
  );
};
