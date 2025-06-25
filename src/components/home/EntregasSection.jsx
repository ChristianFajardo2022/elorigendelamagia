import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollLock } from "../../helpers/ScrollLock";
import { OverLay } from "../commons/OverLay";
import { PlayIcon } from "../commons/PlayIcon";
import { CardCampaing } from "../commons/CardCampaing";
import { SliderCampaing } from "../commons/Slider/Slider";
import { VideoPlayinline } from "../commons/VideoPlayinline";
import { RedesSociales } from "../commons/RedesSociales";

export const EntregasSection = ({ dataList, handlePlay }) => {
  const [selectedMaking, setSelectedMaking] = useState(null);
  const [ficha, setFicha] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (ficha) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Limpieza por si el componente se desmonta
    return () => unlockScroll();
  }, [ficha, lockScroll, unlockScroll]);

  if (!Array.isArray(dataList)) return null; // o puedes retornar un loader

  const uniqueGroups = {};

  dataList.forEach((item) => {
    const categorias = Array.isArray(item.categoria)
      ? item.categoria
      : [item.categoria || "Otras entregas"];

    categorias.forEach((categoria) => {
      const key = categoria?.trim() || "Otras entregas";
      if (!uniqueGroups[key]) uniqueGroups[key] = new Set();
      uniqueGroups[key].add(item);
    });
  });

  // Convertir sets a arrays
  const groupedData = Object.entries(uniqueGroups).reduce(
    (acc, [cat, itemsSet]) => {
      acc[cat] = Array.from(itemsSet);
      return acc;
    },
    {}
  );

  console.log(selectedMaking);

  return (
    <section className="w-full px-8 py-12 bg-black text-white space-y-10">
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category}>
          <h2 className="pl-20 text-xl font-bold mb-4 capitalize">
            {category}
          </h2>

          <SliderCampaing>
            {items.map((item, i) => (
              <div className="customSlide justify-center items-center h-full">
                <CardCampaing
                  data={item}
                  i={i}
                  setFicha={setFicha}
                  more={true}
                  handlePlay={handlePlay}
                  setSelectedMaking={setSelectedMaking}
                  isCampaingSlide={true}
                />
              </div>
            ))}
          </SliderCampaing>
        </div>
      ))}
      <AnimatePresence mode="wait">
        {ficha && (
          <FichaCampaing
            setFicha={setFicha}
            data={selectedMaking}
            handlePlay={handlePlay}
          >
            <Content data={selectedMaking} handlePlay={handlePlay} />
          </FichaCampaing>
        )}
      </AnimatePresence>
    </section>
  );
};

const FichaCampaing = ({ setFicha, data, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-101 w-full h-dvh left-0 top-0 bg-blackInter/80 flex justify-center overflow-hidden pt-32"
    >
      <div
        onClick={() => setFicha(false)}
        className="absolute size-full left-0 top-0 -z-10"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-blackInter rounded-t-2xl overflow-auto max-h-[calc(100vh-8rem)]"
      >
        <div className="size-full relative">
          <div
            style={{ backgroundImage: `url(${data.imgBackgroundMakingOf})` }}
            className="relative w-full h-96 bg-top bg-cover"
          >
            <OverLay bottom={true} />
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Content = ({ data, handlePlay }) => {
  return (
    <>
      <div className="relative size-full flex flex-col justify-end items-start z-50 gap-6 translate-y-16 px-12">
        <div className="w-5/6">
          <h3 className="font-bold">Una producción de Inter Rapidísimo</h3>
          <h1 className="size-full h-auto text-6xl font-interB mt-2">
            {!data.tituloImg == "" ? (
              <figure className="size-full">
                <img
                  className="size-full object-contain"
                  src={data.tituloImg}
                  alt={`Logo de ${data.titulo}`}
                />
              </figure>
            ) : (
              data.titulo
            )}
          </h1>
        </div>
        <button
          className="btn scale-75 origin-left"
          onClick={() => handlePlay(data.video)}
        >
          <span className="w-6 flex justify-center items-center">
            <PlayIcon />
          </span>
          Reproducir video
        </button>
      </div>
      <div className="translate-y-16 px-12 pt-14 flex flex-col gap-6">
        <h2 className="capitalize font-interB text-2xl">
          {data.categoria} | InterRapidísimo
          <span className="w-full text-start text-xs inline-block">
            Abril de 2025
          </span>
        </h2>
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: data.descripcion }}
        />
        <div className="w-full flex justify-between gap-2">
          {data.makingOf.map((item, i) => (
            <figure key={i} className="relative">
              {item.video !== "" && (
                <PlayIcon
                  handleClick={() => handlePlay(item.video)}
                  customStyle={
                    "absolute left-1/2 top-1/2 -translate-1/2 z-10 w-8 h-8 p-2 rounded-full bg-whiteInter hover:opacity-80 cursor-pointer"
                  }
                />
              )}
              <img className="rounded-lg" src={item.kv} alt={item.titulo} />
            </figure>
          ))}
        </div>
        <h3 className="font-interB">Conoce más sobre {data.titulo}</h3>
        <div className="flex pb-14">
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: data.creditos }}
          />
          <div className="flex flex-col justify-end gap-2 pl-16">
            <p className="text-sm inline-block">interrapidisimoplay.com</p>
            <p>Visítanos en:</p>
            <div className="h-10">
              <RedesSociales />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
