import React, { useRef } from "react";
import Lottie from "lottie-react";
import icono from "../assets/Boton-reproducir.json";

export const BotonReproducir = () => {
  const lottieRef = useRef();
  const directionRef = useRef(1); // 1 = forward, -1 = reverse

  // Play forward al entrar
  const handleMouseEnter = () => {
    if (lottieRef.current) {
      directionRef.current = 1;
      lottieRef.current.setDirection(1); // Forward
      lottieRef.current.play();
    }
  };

  // Play en reversa al salir
  const handleMouseLeave = () => {
    if (lottieRef.current) {
      directionRef.current = -1;
      lottieRef.current.setDirection(-1); // Reverse
      lottieRef.current.play();
    }
  };

  // Cuando termina, quedarse en el frame correspondiente
  const handleComplete = () => {
    if (lottieRef.current) {
      const totalFrames = lottieRef.current.getDuration(true);
      if (directionRef.current === 1) {
        // Si iba hacia adelante, quédate al final
        lottieRef.current.goToAndStop(totalFrames - 1, true);
      } else {
        // Si iba en reversa, quédate al principio
        lottieRef.current.goToAndStop(0, true);
      }
    }
  };

  return (
    <div
      className="cursor-pointer w-[17.076875rem]  flex flex-col items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="w-full h-auto inline-block">
        <Lottie
          lottieRef={lottieRef}
          animationData={icono}
          autoplay={false}
          loop={false}
          onComplete={handleComplete}
          className="w-full h-full"
        />
      </span>
    </div>
  );
};
