import { PlayIcon } from "./PlayIcon";

export const MainContent = ({ data, handleClick }) => {
  return (
    <div className="w-1/4 absolute bottom-44 left-20 z-10 flex flex-col justify-items-start items-start gap-4">
      <h1 className="text-5xl font-extrabold">
        {!data.tituloImg == "" ? (
          <figure className="w-full inline-block">
            <img
              className="w-full h-full object-contain"
              src={data.tituloImg}
              alt={`Logo de ${data.titulo}`}
            />
          </figure>
        ) : (
          data.titulo
        )}
      </h1>
      <h2>{data.descripcion}</h2>
      <button className="btn" onClick={handleClick}>
        <PlayIcon /> Reproducir
      </button>
    </div>
  );
};
