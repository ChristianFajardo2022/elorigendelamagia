import { useEffect, useState } from "react";
import Data from "../../data/data.json";
import VideoTrailer from "../videos/VideoTrailer";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";
import { MainContent } from "../commons/MainContent";
import { MainSection } from "./MainSection";
import { SectionMakingof } from "./SectionMakingof";
import { EntregasSection } from "./EntregasSection";
import { useOutletContext } from "react-router-dom";

export const Home = () => {
  const [play, setplay] = useState(false);
  const [video, setVideo] = useState("");
  const slug = "el-origen-de-la-magia";
  const data = Data.find((p) => p.slug === slug);
  const { setNameCampaña } = useOutletContext();

  useEffect(() => {
    setNameCampaña(data);
  }, [data]);

  const handlePlay = (data) => {
    if (data === "") {
      setVideo("");
      setplay(false);
    } else {
      setVideo(data);
      setplay(true);
    }
  };
  console.log(video);
  return (
    <>

      <MainSection
        data={data}
        video={video}
        handlePlay={handlePlay}
        play={play}
      />
      <SectionMakingof data={data} handlePlay={handlePlay} />
      <EntregasSection dataList={Data} />
    </>
  );
};
