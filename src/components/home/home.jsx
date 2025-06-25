import { useEffect, useState } from "react";
import Data from "../../data/data.json";
import VideoTrailer from "../videos/VideoTrailer";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";
import { MainContent } from "../commons/MainContent";
import { MainSection } from "./MainSection";
import { SectionMakingof } from "./SectionMakingof";
import { EntregasSection } from "./EntregasSection";
import { useOutletContext } from "react-router-dom";
import { useScrollLock } from "../../helpers/ScrollLock";

export const Home = () => {
  const [play, setplay] = useState(false);
  const [video, setVideo] = useState("");
  const slug = "el-origen-de-la-magia";
  const data = Data.find((p) => p.slug === slug);
  const { setNameCampaña } = useOutletContext();

  const { lockScroll, unlockScroll } = useScrollLock();
  useEffect(() => {
    if (play) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [play, lockScroll, unlockScroll]);

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
      <EntregasSection dataList={Data} handlePlay={handlePlay} />
<p>Un mejor mundo para nuestras futuras generaciones, esa será nuestra entrega. Para lograrlo decidimos dar el primer paso, llevamos a cientos de pescadores de plástico a las playas de Colombia con la misión de recolectar el plástico que llega hasta allí y recuperar estos ecosistemas.
Ecosistemas que están siendo alterados y afectados a tal punto que nuestras especies obligadas a adaptarse a estos entornos que se están convirtiendo en una pesadilla para su supervivencia. Por esta razón, estamos invitando a todas las personas a hacer un uso adecuado del plástico, un uso consciente que no ponga en riesgo la vida de nuestras especies, o a usar alternativas que no representen un peligro para los ecosistemas.
Conoce más sobre esta campaña en mundosinplastico.com </p>
    </>
  );
};
