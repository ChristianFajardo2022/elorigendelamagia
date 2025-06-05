import Lottie from "lottie-react";
import React, { useRef } from "react";
import icono from "../assets/PRincipal.json";

export const LoaderSombrero = () => {
  const lottieIcon = useRef(null);

  return (
    <div className="w-80 ml-2 flex flex-col items-center justify-center">
      <span className="w-80 h-auto inline-block">
        <Lottie
          lottieRef={lottieIcon}
          animationData={icono}
          className="w-full h-full"
        />
      </span>
    </div>
  );
};
