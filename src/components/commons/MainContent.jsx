import { BotonReproducir } from "../BotonReproducir";
import { PlayIcon } from "./PlayIcon";

export const MainContent = ({ data, handleClick }) => {
  return (
    <div className="w-4/7 absolute bottom-44 left-20 z-10 flex flex-col justify-items-start items-start gap-4 z-50">
      <div className="size-full">
        <h3 className="font-bold">Una producción de Inter Rapidísimo</h3>
        <h1 className="size-full text-6xl font-interB mt-2">
          {!data.tituloImg == "" ? (
            <figure className="size-full">
              <img
                className="size-full object-contain"
                src={data.tituloImg}
                alt={`Logo de ${data.titulo}`}
              />
            </figure>
          ) : (
            data.titulo
          )}
        </h1>
      </div>
      <p>{data.descripcion}</p>
      <button className="btn" onClick={handleClick}>
        <PlayIcon /> Reproducir
      </button>
      {/* <button onClick={handleClick}>
        <BotonReproducir />
      </button> */}
    </div>
  );
};
