import { Link } from "react-router-dom";

export const RedesSociales = () => {
  const redesSociales = [
    {
      instagram: ["https://www.instagram.com/interrapidisimo_co"],
      facebook: ["https://www.facebook.com/interrapidisimo"],
      youtube: ["https://www.youtube.com/@interrapidisimo4868"],
      linkedin: ["https://www.linkedin.com/company/inter-rapid%C3%ADsimo"],
      tiktok: ["https://www.tiktok.com/@interrapidismo_co"],
      x: ["https://x.com/Interrapidisimo"],
    },
  ];
  const redes = Object.entries(redesSociales[0]);
  return (
    <div className="flex w-86 h-full justify-between gap-12">
      {redes.map(([titulo, url], i) => (
        <Link
          key={i}
          to={url[0]} // El enlace de la red social
          target="_blank"
          className="w-auto h-full inline-block"
        >
          <img
            className="w-full h-full object-contain"
            aria-hidden
            src={`/iconos/redes-sociales/${titulo}.svg`} // Ruta de icono basada en el nombre de la red
            alt={`${titulo} icon`}
          />
        </Link>
      ))}
    </div>
  );
};
