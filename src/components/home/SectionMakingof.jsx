import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OverLay } from "../commons/OverLay";
import { ContentCampaing } from "../commons/ContentCampaing";

export const SectionMakingof = ({ data, handlePlay }) => {
  const [selectedMaking, setSelectedMaking] = useState(0);
  const dataMaking = data.makingOf;
  return (
    <section className="w-full h-dvh relative overflow-hidden">
      <BackGround data={dataMaking} selectedMaking={selectedMaking}>
        <ContentCampaing
          data={data.makingOf}
          setSelectedMaking={setSelectedMaking}
          handlePlay={handlePlay}
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
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${data[selectedMaking].kv})`,
          }}
          className="absolute size-full bg-top bg-no-repeat bg-cover z-[9]"
        />
      </AnimatePresence>
      <div
        className={`relative flex flex-col justify-end items-start size-full z-[22] lg:px-20 max-lg:px-4 pb-20`}
      >
        <div className="w-full pb-10">
          <h2 className="font-interB lg:text-6xl max-lg:text-4xl">
            {data[selectedMaking].titulo}
          </h2>
          <p className="lg:w-1/2 max-lg:w-full mt-4">
            {data[selectedMaking].descripcion}
          </p>
        </div>
        {children}
      </div>
    </>
  );
};
