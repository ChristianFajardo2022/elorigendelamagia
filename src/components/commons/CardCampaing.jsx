import { useState } from "react";
import { PlayIcon } from "./PlayIcon";
import { VideoPlayinline } from "./VideoPlayinline";

export const CardCampaing = ({
  data,
  i,
  setFicha,
  more,
  handlePlay,
  setSelectedMaking,
  isCampaingSlide,
}) => {
  const [play, setPlay] = useState(null);

  const handleMouseEnter = (i) => {
    if (isCampaingSlide) {
      setPlay(i);
    } else {
      setSelectedMaking(i);
      setPlay(i);
    }
  };

  const handleMouseLeave = () => {
    if (isCampaingSlide) {
      return;
    } else {
      setPlay(null);
    }
  };

  const handleFicha = () => {
    if (isCampaingSlide) {
      setSelectedMaking(data);
      setFicha(true);
    } else {
      setFicha(true);
    }
  };
  return (
    <div
      onMouseEnter={() => handleMouseEnter(i)}
      onMouseLeave={handleMouseLeave}
      className={`group/card relative transition-all delay-150 overflow-hidden aspect-video hover:h-full h-62 w-96 transform origin-center rounded-2xl`}
    >
      <div className="absolute bottom-0 w-full h-14 group-hover/card:bg-blackInter transition-all duration-500 z-20 flex px-6 items-center justify-between">
        <h2 className="font-extrabold">{data.titulo}</h2>
        <div className="flex justify-center items-center gap-2 group-hover/card:opacity-100 opacity-0 transition-all duration-500">
          <button
            className="cursor-pointer hover:opacity-70 w-8 h-8 inline-block flex items-center justify-center bg-whiteInter rounded-full p-2"
            onClick={() => handlePlay(data.video)}
          >
            <PlayIcon />
          </button>
          {more && (
            <button
              onClick={handleFicha}
              className="cursor-pointer w-8 h-8 flex items-center justify-center group/icon"
            >
              <i className="w-full inline-block ">
                <img
                  className="size-full object-contain group-hover/card/icon:opacity-70"
                  src="/iconos/more.svg"
                  alt="Ver más"
                />
              </i>
            </button>
          )}
        </div>
      </div>
      <img
        className="absolute z-10 size-full object-center object-cover scale-105 group-hover/card:scale-x-125 top-0 left-0 transition-all duration-500 opacity-100 group-hover/card:opacity-0"
        src={data.kv}
        alt={data.titulo}
      />
      <VideoPlayinline data={data} play={play === i} scale={"scale-135"} />
    </div>
  );
};
