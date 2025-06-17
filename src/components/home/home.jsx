import { useState } from "react";
import Data from "../../data/data.json";
import VideoTrailer from "../videos/VideoTrailer";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";
import { MainContent } from "../commons/MainContent";

export const Home = () => {
  const slug = "el-origen-de-la-magia";
  const data = Data.find((p) => p.slug === slug);

  const [play, setplay] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  console.log(videoReady);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-full h-dvh relative">
        <MainContent
          data={data}
          play={play}
          handleClick={() => setplay(true)}
        />
        <BackgroundTrailer
        setplay={setplay}
          data={data}
          play={play}
          setVideoReady={setVideoReady}
        />
      </div>
    </div>
  );
};
