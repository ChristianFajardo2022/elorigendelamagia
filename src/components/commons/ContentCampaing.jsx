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
    <div className="h-80 flex items-center justify-start gap-6">
      {data.map((data, i) => (
        <CardCampaing
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
