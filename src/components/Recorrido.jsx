import { useRef, useEffect } from "react";

export default function Recorrido() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const targetTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // — 1. Cuando el video carga, configuramos la altura del contenido interno —
    const onLoadedMetadata = () => {
      // El video dura 8 s; queremos que hacer scroll desde 0 hasta 8×viewport
      // cubra exactamente todos los segundos. 
      // Por tanto, el "contenido" dentro del container tendrá altura = 8×viewport.
      const duration = video.duration; // 8
      const fullHeight = duration * window.innerHeight; // 8 × viewport
      // Ponemos ese valor en el contenedor
      container.style.height = `${window.innerHeight}px`;          // viewport “visible”
      container.firstElementChild.style.height = `${fullHeight}px`; // contenido scrollable
    };

    // — 2. Cada vez que scrollées dentro del container, calculamos el targetTime—
    const onScrollContainer = () => {
      const scrollTop = container.scrollTop; // cuánto has bajado dentro del container
      const maxScroll = container.scrollHeight - container.clientHeight;
      const fraction = scrollTop / maxScroll; // 0 → arriba, 1 → abajo
      targetTime.current = video.duration * fraction; // 0…8 s
    };

    // — 3. requestAnimationFrame: animamos video.currentTime → targetTime con lerp —
    const animateFrame = () => {
      if (video.duration) {
        const current = video.currentTime;
        const diff = targetTime.current - current;
        // lerp rápido para que no “congele”:
        const lerpFactor = 0.3; 
        video.currentTime = current + diff * lerpFactor;
      }
      requestAnimationFrame(animateFrame);
    };

    // — Registramos event listeners —
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    container.addEventListener("scroll", onScrollContainer);
    requestAnimationFrame(animateFrame);

    // — Recalibramos en caso de resize (opcional) —
    const onResize = () => {
      if (!video || !container) return;
      const duration = video.duration || 8;
      const fullHeight = duration * window.innerHeight;
      container.style.height = `${window.innerHeight}px`;
      container.firstElementChild.style.height = `${fullHeight}px`;
    };
    window.addEventListener("resize", onResize);

    // — Cleanup —
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      container.removeEventListener("scroll", onScrollContainer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // 1. Este div es el “viewport” con overflow-y: scroll
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",       // ocupa 1×viewport
        overflowY: "scroll",
      }}
    >
      {/*
        2. Aquí va un único hijo que tendrá "height = 8 × viewport".
        Al hacer scroll dentro de este hijo, el video avanzará.
      */}
      <div style={{ width: "100%" /* altura setea en JS */ }} />

      {/*
        3. Este video está en posición fija (cover), siempre visible. 
           Reacciona a scroll dentro del container.
      */}
      <video
        ref={videoRef}
        src="/video/spiderman.mp4"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        muted
        playsInline
        preload="auto"
      />

      {/*
        4. Contenido superpuesto (opcional). 
           Aquí ponemos un mensaje en medio de la pantalla.
      */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          color: "white",
          textAlign: "center",
          marginTop: "50vh",
        }}
      >
        <h1>Desliza hacia abajo adentro de este recuadro para controlar el video</h1>
      </div>
    </div>
  );
}
