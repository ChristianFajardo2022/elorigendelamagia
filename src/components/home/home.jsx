import { useState } from "react";
import Data from "../../data/data.json";
import VideoTrailer from "../videos/VideoTrailer";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";
import { MainContent } from "../commons/MainContent";
import { MainSection } from "./MainSection";
import { SectionMakingof } from "./SectionMakingof";
import { EntregasSection } from "./EntregasSection";

export const Home = () => {
  const slug = "el-origen-de-la-magia";
  const data = Data.find((p) => p.slug === slug);

  return (
    <>
      <MainSection data={data} />
      <SectionMakingof data={data} />
      <EntregasSection dataList={Data} />

    </>
  );
};
