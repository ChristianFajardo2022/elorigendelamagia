export const PlayIcon = ({ invertColor, customStyle, handleClick }) => {
  return (
    <i
      onClick={handleClick ? handleClick : null}
      className={`size-full pl-0.5 inline-block ${invertColor ? "invert" : ""} ${
        customStyle ? customStyle : ""
      }`}
    >
      <img
        className="w-full h-full object-contain"
        src="/iconos/play.svg"
        alt="Reproducir video comercial"
      />
    </i>
  );
};
