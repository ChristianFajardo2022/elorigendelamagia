import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VideoPlayinline } from "../commons/VideoPlayinline";
import { OverLay } from "../commons/OverLay";

export const SectionMakingof = ({ data }) => {
  const [selectedMaking, setSelectedMaking] = useState(0);
  const dataMaking = data.makingOf;
  return (
    <section className="w-full h-dvh relative">
      <BackGround data={dataMaking} selectedMaking={selectedMaking}>
        <ContentMakingOf
          data={data}
          selectedMaking={selectedMaking}
          setSelectedMaking={setSelectedMaking}
        />
      </BackGround>
    </section>
  );
};

/* Background dinamico */
const BackGround = ({ data, children, selectedMaking }) => {
  return (
    <>
      <OverLay top={true} radial={true} />
      <AnimatePresence mode="wait">
        <motion.div
          key={data[selectedMaking].kv} // clave dinámica para reiniciar la animación
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${data[selectedMaking].kv})`,
          }}
          className="absolute size-full bg-top bg-no-repeat bg-contain z-[9]"
        />
      </AnimatePresence>
      <div
        className={`relative flex flex-col justify-end items-start size-full z-[22] px-20 pb-20`}
      >
        <div className="w-full pb-14">
          <h2 className="font-interB text-6xl">
            {data[selectedMaking].titulo}
          </h2>
          <p>{data[selectedMaking].descripcion}</p>
        </div>
        {children}
      </div>
    </>
  );
};
/* Contenido dinamico */
const ContentMakingOf = ({ data, setSelectedMaking }) => {
  const dataMaking = data.makingOf;
  const [play, setPlay] = useState(null);

  const handleMouseEnter = (i) => {
    setSelectedMaking(i);
    setPlay(i);
  };

  const handleMouseLeave = () => {
    setPlay(null);
  };

  return (
    <div className="h-80 flex items-center justify-start gap-6">
      {dataMaking.map((data, i) => (
        <div
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          className={`group relative transition-all delay-150 overflow-hidden aspect-video hover:h-full h-62 w-96 hover:scale-110 transform origin-center rounded-2xl`}
          key={i}
        >
          <div className="absolute bottom-0 w-full h-10 group-hover:bg-blackInter transition-all duration-500 z-10 flex px-6 items-center justify-between">
            <h2 className="font-extrabold">{data.titulo}</h2>
            <div className="flex justify-center gap-2 group-hover:opacity-100 opacity-0 transition-all duration-500 delay-300">
              <i>icono 1</i>
              <i>icono 2</i>
            </div>
          </div>
          <img
            className="absolute z-10 size-full object-center object-cover scale-105 group-hover:scale-x-125 top-0 left-0 transition-all duration-500 opacity-100 group-hover:opacity-0"
            src={data.kv}
            alt={data.titulo}
          />
          <VideoPlayinline data={data} play={play === i} scale={"scale-135"} />
        </div>
      ))}
    </div>
  );
};
