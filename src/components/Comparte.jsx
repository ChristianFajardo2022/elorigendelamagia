import React from "react";

const Comparte = () => {
  return (
    <div className="relative w-full h-screen">
      <video
        src="/video/FONDO-3 (2).mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />

      {/* Gradiente superior */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none z-10" />

      <div className=" absolute inset-0 amber text-white flex flex-col items-center justify-center w-full h-full z-20 ">
        <p className=" text-4xl">COMPARTE ESTE MÁGICO HOMENAJE</p>
        <div className=" flex gap-5 mt-10">
          <button>
            <img className=" w-18" src="/comparte/facebook-04.svg" />
          </button>
          <button>
            <img className=" w-18" src="/comparte/instagram-05.svg" />
          </button>
          <button>
            <img className=" w-18" src="/comparte/twit.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparte;
