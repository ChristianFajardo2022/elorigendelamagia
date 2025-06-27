import { PlayIcon } from "./PlayIcon";

export const MainContent = ({ data, handleClick }) => {
  return (
    <div className="lg:w-4/7 max-lg:w-full absolute lg:bottom-44 max-lg:bottom-12 px-4 lg:left-20 max-lg:lef0 z-10 flex flex-col justify-items-start items-start gap-4 z-50">
      <div className="size-full">
        <h3 className="font-bold">Una producción de Inter Rapidísimo</h3>
        <h1 className="size-full lg:text-6xl max-lg:text-3xl font-interB mt-4">
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
      <button className="btn max-lg:w-full" onClick={handleClick}>
        <span className="lg:w-6 max-lg:w-4 flex justify-center items-center">
          <PlayIcon />
        </span>
        Reproducir
      </button>
    </div>
  );
};
