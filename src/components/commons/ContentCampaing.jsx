import { useState } from "react";
import { PlayIcon } from "./PlayIcon";
import { VideoPlayinline } from "./VideoPlayinline";
import { CardCampaing } from "./CardCampaing";

export const ContentCampaing = ({
  data,
  setSelectedMaking,
  handlePlay,
  more,
  setFicha,
}) => {
  return (
    <div className="lg:h-80 max-lg:h-62 max-lg:w-full flex items-center justify-start lg:gap-6 ">
      {data.map((data, i) => (
        <CardCampaing
          key={i}
          data={data}
          i={i}
          setFicha={setFicha}
          more={more}
          handlePlay={handlePlay}
          setSelectedMaking={setSelectedMaking}
        />
      ))}
    </div>
  );
};
