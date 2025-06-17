import React from "react";

export default function Character({ characterY = 0 }) {
  return (
    <img
      src="/game/nina.png" // Cambia la ruta si es necesario
      alt="Personaje"
      style={{
        position: "absolute",
        left: 80,
        bottom: 35 + characterY, // characterY viene de la física del salto
        width: 100, // o usa "w-20" con Tailwind si prefieres
        zIndex: 10,
        userSelect: "none",
        pointerEvents: "none",
        transition: "none", // ¡NO uses transition! La animación la da el loop del game
      }}
      draggable={false}
    />
  );
}
