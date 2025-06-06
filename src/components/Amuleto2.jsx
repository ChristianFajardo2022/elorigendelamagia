import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

export function Model({ scrollProgress, modelRef }) {
  const { nodes, materials } = useGLTF("/models/collar-retrato.glb");

  // Referencia para el grupo principal (rotación Y)
  const groupRef = useRef();

  // Últimos valores para no re-animar si no cambia
  const lastAutoOpen = useRef(false);

  useEffect(() => {
    // Calcula el valor de rotaciónY según el scrollProgress (los 2 primeros tercios)
    let targetY = 0;
    if (scrollProgress < 0.5) {
      targetY = lerp(0, Math.PI / 4, scrollProgress / 0.5);
    } else if (scrollProgress < 1) {
      targetY = lerp(Math.PI / 4, 0, (scrollProgress - 0.5) / 0.5);
    } else if (scrollProgress < 1.5) {
      targetY = lerp(0, -Math.PI / 4, (scrollProgress - 1) / 0.5);
    } else if (scrollProgress < 2) {
      targetY = lerp(-Math.PI / 4, 0, (scrollProgress - 1.5) / 0.5);
    } else {
      targetY = 0;
    }

    // Anima la rotación del grupo principal (eje Y) usando GSAP
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: targetY,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    // Manejo de apertura automática
    if (modelRef.current) {
      if (scrollProgress >= 2 && !lastAutoOpen.current) {
        // Abrir completamente
        gsap.to(modelRef.current.rotation, {
          z: -Math.PI,
          duration: 1,
          ease: "power2.inOut",
        });
        lastAutoOpen.current = true;
      } else if (scrollProgress < 2 && lastAutoOpen.current) {
        // Cerrar completamente
        gsap.to(modelRef.current.rotation, {
          z: 0,
          duration: 1,
          ease: "power2.inOut",
        });
        lastAutoOpen.current = false;
      }
    }
  }, [scrollProgress, modelRef]);

  return (
    <group
      dispose={null}
      position={[0, -1, -2]}
      rotation={[0, 0, 0]}
      ref={groupRef}
    >
      <mesh
        name="Cylinder"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.005"]}
        position={[0.012, 0.52, 0.027]}
        rotation={[1.595, 0, 0]}
        scale={[0.934, 0.838, 0.411]}
      />
      <mesh
        name="Cylinder002"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials.metal1}
        position={[0, -0.058, -0.016]}
        rotation={[1.595, 0, 0]}
        scale={[1.42, 1.618, 0.566]}
      />
      <mesh
        name="Cylinder001"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials.metal1}
        position={[-0.002, -0.047, 0.065]}
        rotation={[1.595, 0, 0]}
        scale={[1.451, 1.313, 0.566]}
      />
      <mesh
        name="Torus"
        castShadow
        receiveShadow
        geometry={nodes.Torus.geometry}
        material={materials.metal1}
        position={[-0.002, 3.168, 0.01]}
        rotation={[1.595, 0, -Math.PI]}
        scale={[10.261, 6.793, 10.261]}
      />
      <mesh
        name="Cone"
        castShadow
        receiveShadow
        geometry={nodes.Cone.geometry}
        material={materials.metal1}
        position={[-0.024, 3.284, 0.057]}
        rotation={[-1.546, 0, 0.175]}
        scale={[-8, -42.92, -24.597]}
      />
      <mesh
        ref={modelRef}
        name="tapa"
        castShadow
        receiveShadow
        geometry={nodes.tapa.geometry}
        material={materials.metal1}
        position={[1.314, 1.864, 0.021]}
        rotation={[1.584, -0.002, 0]}
        scale={[1.026, 0.082, 1.146]}
      />
      <mesh
        name="Cylinder003"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials["Material.004"]}
        position={[1.284, 1.889, 0.085]}
        rotation={[-3.117, 0, 0.14]}
      />
      <mesh
        name="Cylinder004"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials["Material.004"]}
        position={[1.249, 1.643, 0.079]}
        rotation={[-3.117, 0, 0.14]}
      />
      <mesh
        name="Cylinder005"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials["Material.004"]}
        position={[1.214, 1.393, 0.072]}
        rotation={[-3.117, 0, 0.14]}
      />
      <mesh
        name="Cylinder006"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials["Material.004"]}
        position={[1.319, 2.136, 0.091]}
        rotation={[-3.117, 0, 0.14]}
      />
      <mesh
        name="portaretrato"
        castShadow
        receiveShadow
        geometry={nodes.portaretrato.geometry}
        material={materials.metal1}
        position={[0, 1.87, -0.021]}
        rotation={[1.595, 0, 0]}
        scale={[1, 0.082, 1.146]}
      />
    </group>
  );
}

// Lerp helper
function lerp(a, b, t) {
  return a + (b - a) * t;
}

useGLTF.preload("/models/collar-retrato.glb");
