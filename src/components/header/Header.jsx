import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { NavBar } from "./navBar";
import "./header.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollLock } from "../../helpers/ScrollLock";
import { RedesSociales } from "../commons/RedesSociales";

export const Header = ({ nameCampaña }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  useEffect(() => {
    if (activeMenu) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Limpieza por si el componente se desmonta
    return () => unlockScroll();
  }, [activeMenu, lockScroll, unlockScroll]);
  return (
    <>
      <header className="fixed bg-blackInter top-0 left-0 w-full flex justify-between items-center z-100 py-4 lg:px-20 max-lg:px-4">
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
              className="size-full z-99 flex justify-center items-center lg:px-20 max-lg:px-4 h-dvh"
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
        className="max-w-7xl size-full z-99 flex max-lg:flex-col-reverse justify-center items-center h-full"
      >
        <div className="lg:h-1/2 max-lg:w-full lg:flex-1 flex justify-between flex-col items-start lg:border-r border-b border-whiteInter/30">
          <div className="h-full flex justify-between flex-col items-start lg:pr-12">
            <div className="w-full pt-12">
              <h1 className="lg:w-180 lg:text-6xl max-lg:text-3xl font-interB mt-2 mb-4">
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
          <div className="w-full flex justify-between lg:items-center max-lg:items-start pr-12 pb-6 max-lg:flex-col">
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
          <div className="w-full flex justify-between items-center border-t border-whiteInter/30 h-24 lg:pr-12">
            <span className="inline-block text-xs">
              interrapidisimoplay.com
            </span>
            <span className="inline-block text-xs">
              Copyright ⓒ 2025 Inter Rapidísimo S.A.
            </span>
          </div>
        </div>
        <div className="lg:h-1/2 max-lg:w-full lg:flex-1 flex justify-center items-center max-lg:justify-start lg:pt-12 lg:pb-3">
          <ul className="h-full flex flex-col justify-between text-5xl gap-10">
            <li>Última historia</li>
            <li>Making of</li>
            <li>Otras historias</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};
