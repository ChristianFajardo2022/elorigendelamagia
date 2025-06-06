import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  CameraControls,
  useProgress,
  Html,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import Amuleto from "./Amuleto";
import { Model } from "./Amuleto2";
import gsap from "gsap";

function Loader() {
  const { progress, active } = useProgress();

  return (
    <Html center>
      <p className="text-white loader">{progress.toFixed(1)} % loaded</p>
    </Html>
  );
}

export const CanvaModel = ({}) => {
  const cameraControlRef = useRef(null);
  const modelRef = useRef(null);
  const [valueRotation, setValueRotation] = useState(0);
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);
 
  useEffect(() => {
    setTimeout(() => {
      gsap.to(modelRef.current.rotation, {
        z: -2.5,
        duration: 1, // Duración de la animación
        ease: "power2.out",
      });
    }, 1000);
    valueRotation;
  }, [valueRotation]);

  return (
    <div>
      <video
         ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-[90] pointer-events-none mix-blend-screen"
        src="/video/fondocielo.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={`w-full dijeCanva h-screen z-50 relative`}>
        <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
          <OrbitControls ref={cameraControlRef} />
          <ambientLight intensity={1} />
          <directionalLight position={[6, 5, 10]} intensity={4} />
          <directionalLight position={[-6, 5, 10]} intensity={4} />
          <directionalLight position={[6, 10, -10]} intensity={4} />
          <directionalLight position={[-6, 10, -10]} intensity={4} />
          <Suspense fallback={null }>
            <Model modelRef={modelRef} valueRotation={valueRotation} />
            {/* <Model abrirDije={abrirDije} open={open} snap={snap} group={group} /> */}
          </Suspense>
          <Environment
            //files="/dije2/backgroundEnviroment.hdr"
            preset="night"
          />
        </Canvas>
      </div>
    </div>
  );
};
