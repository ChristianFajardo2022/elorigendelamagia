// src/components/Amuleto.jsx

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------
// Componente 3D que expone getGroup() y playOpen()
// -----------------------------------------------------
const AmuletoModel = forwardRef((_, ref) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/dijewebhpta.glb");
  const { actions, mixer, names } = useAnimations(animations, group);

  const actionName = names[0] || ""; // nombre de la primera animación
  let openCloseAction = null;

  useEffect(() => {
    if (!animations.length || !actions[actionName]) return;
    openCloseAction = actions[actionName];
    openCloseAction.setLoop(THREE.LoopOnce, 1);
    openCloseAction.clampWhenFinished = true;
    openCloseAction.time = 0;
    openCloseAction.paused = true;

    return () => void mixer.stopAllAction();
  }, [animations, actions, actionName, mixer]);

  useImperativeHandle(ref, () => ({
    getGroup: () => group.current,
    playOpen: () => {
      if (!openCloseAction) return;
      openCloseAction.reset();
      openCloseAction.paused = false;
      openCloseAction.time = 0;
      openCloseAction.timeScale = 1;
      openCloseAction.play();
    },
  }));

  return (
    <group ref={group} dispose={null}>
      {/* Reducimos ligeramente la escala a 0.8 para que aparezca más pequeño */}
      <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]} />
    </group>
  );
});

// -----------------------------------------------------
// Componente padre que maneja scroll, video y textos
// -----------------------------------------------------
export default function Amuleto() {
  const videoRef = useRef();
  const modelRef = useRef();
  const textsRef = useRef([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  useLayoutEffect(() => {
    // Función que chequea repetidamente si el group 3D ya existe
    const setupScrollAnimation = () => {
      const modelApi = modelRef.current;
      if (!modelApi) {
        requestAnimationFrame(setupScrollAnimation);
        return;
      }
      const modelGroup = modelApi.getGroup();
      if (!modelGroup) {
        requestAnimationFrame(setupScrollAnimation);
        return;
      }

      // Creamos timeline atado al scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 1) rotación horizontal de 0 → +90° en Y
      tl.to(
        modelGroup.rotation,
        { y: Math.PI / 2, duration: 1, ease: "none" },
        0
      );
      // 2) +90° → 0 en Y
      tl.to(
        modelGroup.rotation,
        { y: 0, duration: 1, ease: "none" },
        1
      );
      // 3) 0 → -90° en Y
      tl.to(
        modelGroup.rotation,
        { y: -Math.PI / 2, duration: 1, ease: "none" },
        2
      );
      // 4) -90° → 0 en Y
      tl.to(
        modelGroup.rotation,
        { y: 0, duration: 1, ease: "none" },
        3
      );
      // 5) Al llegar al final, disparar apertura de la tapa
      tl.add(() => {
        modelApi.playOpen();
      }, 4);

      // Animar cada bloque de texto
      textsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 200 },
          {
            y: 0,
            scrollTrigger: {
              trigger: document.body,
              start: `${(i + 1) * 20}% top`,
              end: `${(i + 1) * 20 + 40}% top`,
              scrub: true,
            },
          }
        );
      });
    };

    setupScrollAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative flex w-full h-[400vh]">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover"
        src="/video/particulas.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="fixed inset-0 w-full h-full bg-[#14180f] opacity-80"></div>

      {/* Contenedor 3D */}
      <div className="fixed w-1/2 h-full z-10">
        <Canvas camera={{ position: [0, 1.5, 4], fov: 70 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={5} />
          <Suspense fallback={null}>
            <AmuletoModel ref={modelRef} />
            <Environment preset="forest" />
          </Suspense>
        </Canvas>
      </div>

      {/* Textos desplazables */}
      <div className="absolute right-0 h-full w-1/2 flex flex-col px-8 py-16">
        {[
          "TODO MAGO,\nLLEVA CONSIGO\nUN AMULETO",
          "LO ACOMPAÑA\nSIEMPRE, LE DA\nPROTECCIÓN\nY FUERZA",
          "UNO QUE LLEVA\nINMORTALIZADO\nEL MOMENTO\nMÁS FELIZ DE\nSU VIDAS",
          "Y TÚ PUEDES\nCREAR UNO\nPARA AGRADECER\nA TU MAGO",
        ].map((text, idx) => (
          <div
            key={idx}
            ref={(el) => (textsRef.current[idx] = el)}
            className="text-white text-5xl whitespace-pre-line mb-200"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
