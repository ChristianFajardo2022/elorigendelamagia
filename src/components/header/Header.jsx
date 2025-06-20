import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { NavBar } from "./navBar";
import "./header.css";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

export const Header = ({ nameCampaña }) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      <header className="fixed bg-blackInter top-0 left-0 w-full flex justify-between items-center z-100 py-4 px-20">
        <Logo />
        <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </header>
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full fixed z-99 bg-blackInter"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="size-full z-99 flex justify-center items-center px-20 h-dvh"
            >
              <Content nameCampaña={nameCampaña} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Content = ({ nameCampaña }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl size-full z-99 flex justify-center items-center h-full"
      >
        <div className="h-1/2 flex-1 flex justify-between flex-col items-start border-r border-b border-whiteInter/30">
          <div className="h-full flex justify-between flex-col items-start pr-12">
            <div className="w-full pt-12">
              <h1 className="w-180 text-6xl font-interB mt-2 mb-4">
                {!nameCampaña.tituloImg == "" ? (
                  <figure className="size-full">
                    <img
                      className="size-full object-contain"
                      src={nameCampaña.tituloImg}
                      alt={`Logo de ${nameCampaña.titulo}`}
                    />
                  </figure>
                ) : (
                  nameCampaña.titulo
                )}
              </h1>
              <p>Una producción de Inter Rapidísimo</p>
            </div>
            <p>Visítanos en:</p>
          </div>
          <div className="w-full flex justify-between items-center pr-12 pb-6">
            <RedesSociales />
            <Link
              to={"https://www.interrapidisimo.com/"}
              className="font-interB"
              target="_blank"
            >
              <span className="-rotate-45 inline-block">→</span>
              interrapidisimo.com
            </Link>
          </div>
          <div className="w-full flex justify-between items-center border-t border-whiteInter/30 h-24 pr-12">
            <span className="inline-block">interrapidisimoplay.com</span>
            <span className="inline-block">
              Copyright ⓒ 2025 Inter Rapidísimo S.A.
            </span>
          </div>
        </div>
        <div className="flex-1 h-1/2 flex justify-center items-center pt-12 pb-3">
          <ul className="h-full flex flex-col justify-between text-5xl">
            <li>Última historia</li>
            <li>Making of</li>
            <li>Otras historias</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

const RedesSociales = () => {
  const redesSociales = [
    {
      instagram: ["https://www.instagram.com/interrapidisimo_co"],
      facebook: ["https://www.facebook.com/interrapidisimo"],
      youtube: ["https://www.youtube.com/@interrapidisimo4868"],
      linkedin: ["https://www.linkedin.com/company/inter-rapid%C3%ADsimo"],
      tiktok: ["https://www.tiktok.com/@interrapidismo_co"],
      x: ["https://x.com/Interrapidisimo"],
    },
  ];
  const redes = Object.entries(redesSociales[0]);
  return (
    <div className="flex w-86 h-full justify-between gap-12">
      {redes.map(([titulo, url], i) => (
        <Link
          key={i}
          to={url[0]} // El enlace de la red social
          target="_blank"
          className="w-auto h-full inline-block"
        >
          <img
            className="w-full h-full object-contain"
            aria-hidden
            src={`/iconos/redes-sociales/${titulo}.svg`} // Ruta de icono basada en el nombre de la red
            alt={`${titulo} icon`}
          />
        </Link>
      ))}
    </div>
  );
};
