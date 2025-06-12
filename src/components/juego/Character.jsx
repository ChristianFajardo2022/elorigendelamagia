import React from "react";

export default function Character({ isJumping }) {
  return (
    <img
      src="/game/nina.png" // Cambia esta ruta por la de tu imagen
      alt="Personaje"
      className={`absolute left-20 bottom-8 w-20 transition-all duration-300
        ${isJumping ? "-translate-y-28" : ""}
      `}
      style={{ zIndex: 10 }}
    />
  );
}
