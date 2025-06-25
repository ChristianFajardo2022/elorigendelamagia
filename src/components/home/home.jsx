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

      <p>
En @colombiamoda_oficial  invitamos a los asistentes a vivir nuestra experiencia con los Guardianes del Páramo, en un estand construido con materiales renovables en donde buscaremos sembrar en todos el amor y cuidado por nuestros páramos. Pongamos de moda la sostenibilidad. 🥰      </p>
      <p>
       Ante esto, decidimos donar 2,000 frailejones, de los cuales ya sembramos los primeros 500. Esta acción fue acompañada por Moisés Moreno, quien ha sembrado exitosamente más de 2,400 frailejones, el Doctor en Biología, Fernando Alzate Guarín, docente y experto en Páramos desde hace más de 25 años de la Universidad de Antioquia y un especialista del Instituto Humboldt, estudiaron el suelo y determinaron que cuenta con las condiciones óptimas para que los frailejones crezcan sin problema.

      </p>
      <p>En esta primera siembra, un hijo de la montaña fue el encargado de pedir permiso al páramo para poder ingresar a estas sagradas tierras, luego, dotó de conocimiento y herramientas a cada uno de los 200 voluntarios a quienes bautizaría como Guardianes del Páramo, para que la siembra sea exitosa.</p>
      <p>Esta experiencia fue sellada con una moneda, símbolo de que no existe el dinero suficiente para comprar estos ecosistemas únicos que proveen agua a muchos territorios del país.
      </p>
    </>
  );
};
