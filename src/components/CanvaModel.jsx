import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Amuleto2";
import gsap from "gsap";
import { AnimatedTextBlock } from "./AnimatedTextBlock";

export const CanvaModel = () => {
  const cameraControlRef = useRef(null);
  const modelRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs para textos
  const textoUnoRef = useRef(null);
  const textoDosRef = useRef(null);
  const textoTresRef = useRef(null);
  const textoCuatroRef = useRef(null);

  useEffect(() => {
    const sensitivity = 3 / (4 * window.innerHeight);
    const handleWheel = (e) => {
      setScrollProgress((prev) => {
        let next = prev + e.deltaY * sensitivity;
        if (next < 0) next = 0;
        if (next > 3) next = 3;
        return next;
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // ANIMACIONES CON GSAP SEGÚN scrollProgress
  useEffect(() => {
    // Helper para calcular progresión suave entre dos puntos
    const range = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a)));

    // TEXTO UNO: Siempre visible hasta 0.8, luego desaparece entre 0.8 y 1.2
    if (textoUnoRef.current) {
      const disappear = 1 - range(0.8, 1.2, scrollProgress);
      const t = scrollProgress < 0.8 ? 1 : disappear;
      gsap.to(textoUnoRef.current, {
        scale: t,
        opacity: t,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "right center",
      });
    }
    // TEXTO DOS: aparece y desaparece
    if (textoDosRef.current) {
      const appear = range(0.8, 1.2, scrollProgress);
      const disappear = 1 - range(1.6, 2, scrollProgress);
      const t = Math.min(appear, disappear);
      gsap.to(textoDosRef.current, {
        scale: t,
        opacity: t,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    }
    // TEXTO TRES
    if (textoTresRef.current) {
      const appear = range(1.6, 2, scrollProgress);
      const disappear = 1 - range(2.2, 2.6, scrollProgress);
      const t = Math.min(appear, disappear);
      gsap.to(textoTresRef.current, {
        scale: t,
        opacity: t,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "right center",
      });
    }
    // TEXTO CUATRO: Solo aparece, no desaparece
    if (textoCuatroRef.current) {
      const appear = range(2.2, 2.6, scrollProgress);
      const t = appear;
      gsap.to(textoCuatroRef.current, {
        scale: t,
        opacity: t,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    }
  }, [scrollProgress]);

  // Helper
  const range = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a)));

  const textoUnoProgress =
    scrollProgress < 0.8 ? 1 : 1 - range(0.8, 1.2, scrollProgress);

  const textoDosProgress = Math.min(
    range(0.8, 1.2, scrollProgress),
    1 - range(1.6, 2, scrollProgress)
  );

  const textoTresProgress = Math.min(
    range(1.6, 2, scrollProgress),
    1 - range(2.2, 2.6, scrollProgress)
  );

  const textoCuatroProgress = range(2.2, 2.6, scrollProgress);

  return (
    <div className="relative w-full h-full">
      <video
        className="fixed inset-0 w-full h-full object-cover z-[90] pointer-events-none mix-blend-screen"
        src="/video/fondocielo.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="w-full dijeCanva h-screen z-[80] relative">
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
          <OrbitControls
            ref={cameraControlRef}
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
          <ambientLight intensity={1} />
          <directionalLight position={[6, 5, 10]} intensity={4} />
          <directionalLight position={[-6, 5, 10]} intensity={4} />
          <directionalLight position={[6, 10, -10]} intensity={4} />
          <directionalLight position={[-6, 10, -10]} intensity={4} />
          <Suspense fallback={null}>
            <Model modelRef={modelRef} scrollProgress={scrollProgress} />
          </Suspense>
          <Environment preset="night" />
        </Canvas>
      </div>
      <div className="absolute inset-0 w-full h-full top-0 Amber text-white flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="textoUno absolute z-50 ml-50 w-auto">
          <AnimatedTextBlock
            text="TODO    MAGO,"
            progress={textoUnoProgress}
            className="text-[16rem] w-auto m-0 leading-40"
          />
          <AnimatedTextBlock
            text="LLEVA CONSIGO UN AMULETO"
            progress={textoUnoProgress}
            className="w-full text-end pr-50 text-[2.5rem]"
            align="right"
          />
        </div>

        <div className="textoDos absolute z-40 w-auto left-[12.8rem]">
          <AnimatedTextBlock
            text={"UNO QUE GUARDA\nSU MOMENTO\nMAS FELIZ"}
            progress={textoDosProgress}
            className="text-[5rem] leading-18"
          />
        </div>

        <div className="textoTres absolute z-30 w-auto right-[18rem] flex justify-end">
          <AnimatedTextBlock
            text={"LO PROTEGE,\nLE DA FUERZA\nY ESPERANZA"}
            progress={textoTresProgress}
            className="text-[5rem] leading-18"
            align="right"
          />
        </div>

        <div className="absolute textoCuatro w-auto left-[19rem]">
          <AnimatedTextBlock
            text={"Y TÚ PUEDES\nCREARLE UNO\nA TU MAGO."}
            progress={textoCuatroProgress}
            className="text-[5rem] leading-18"
          />
        </div>
      </div>
    </div>
  );
};
