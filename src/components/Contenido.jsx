import React, { useEffect } from 'react'
import Cuadro from './Cuadro'
import MakinOff from './MakinOff'
import Comparte from './Comparte'
import Game from './juego/Game'

const Contenido = () => {
  useEffect(() => {
    const handleSpaceScroll = (e) => {
      if (e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', handleSpaceScroll, { passive: false });
    return () => window.removeEventListener('keydown', handleSpaceScroll);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Game />
      <div className="w-full h-screen">
        <MakinOff />
      </div>
      <Comparte />
    </div>
  )
}

export default Contenido
