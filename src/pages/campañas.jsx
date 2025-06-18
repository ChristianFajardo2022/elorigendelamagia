import { useParams } from "react-router-dom";

import data from "../data/data.json";

const Campañas = () => {
  const { slug } = useParams();
  const page = data.find((p) => p.slug === slug);

  if (!page) return <h1>Página no encontrada</h1>;

  return (
    <div>
      <h1>{page.titulo}</h1>

      <p>{page.descripcion}</p>
      <video src={page.videoUrl} controls />
      <h3>Making of:</h3>
      {page.makingOf.map((url, i) => (
        <img key={i} src={url} alt={`making of ${i}`} />
      ))}
      {page.souvenir && <p>🎁 Esta campaña incluyó un souvenir</p>}
    </div>
  );
};

export default Campañas;
