import { useEffect, useState } from "react";
import { VideoPlayinline } from "../commons/VideoPlayinline";

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
      <div className="absolute top-0 left-0 bg-gradient-to-t to-blackInter/85 from-70% size-full z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 bg-radial to-80% to-blackInter/70 size-full z-10 pointer-events-none" />
      <div
        style={{
          backgroundImage: `url(${data[selectedMaking].kv})`,
        }}
        className="absolute size-full bg-top bg-no-repeat bg-contain z-[9]"
      />
      <div
        className={`relative flex justify-start items-end size-full z-[22] px-20 pb-20`}
      >
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
    <div className=" h-80 flex items-center justify-start gap-6">
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
            className="absolute size-full object-center object-cover scale-105 group-hover:scale-x-125 top-0 left-0 transition-all duration-500 opacity-100 group-hover:opacity-0"
            src={data.kv}
            alt={data.titulo}
          />
          <VideoPlayinline data={data} play={play === i} />
        </div>
      ))}
    </div>
  );
};
