import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"}>
      <i className="w-6 h-6 inline-block">
        <img
          className="size-full object-contain"
          src="/iconos/prospero.svg"
          alt=""
        />
      </i>
    </Link>
  );
};
