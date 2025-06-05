import { LoaderSombrero } from "./LoaderSombrero";

// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center z-50">
      {/* SVG de un spinner o tu propio SVG */}

      <LoaderSombrero />
    </div>
  );
}
