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
    <div className={`w-full dijeCanva h-screen z-50 relative bg-black`}>
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        <OrbitControls ref={cameraControlRef} />
        <ambientLight intensity={1} />
        <directionalLight position={[6, 10, 10]} intensity={2} />
        <directionalLight position={[-6, 10, 10]} intensity={2} />
        <directionalLight position={[6, 10, -10]} intensity={2} />
        <directionalLight position={[-6, 10, -10]} intensity={2} />
        <Suspense fallback={<Loader />}>
          <Model modelRef={modelRef} valueRotation={valueRotation} />
          {/* <Model abrirDije={abrirDije} open={open} snap={snap} group={group} /> */}
        </Suspense>
        <Environment
          //files="/dije2/backgroundEnviroment.hdr"
          preset="night"
        />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={1}
          scale={6}
          blur={2.5}
          far={10}
          resolution={256}
          color="#fff"
        />
      </Canvas>
    </div>
  );
};
