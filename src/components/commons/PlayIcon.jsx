export const PlayIcon = ({ invertColor }) => {
  return (
    <i className={`size-full inline-block ${invertColor ? "invert" : ""}`}>
      <img src="/iconos/play.svg" alt="Reproducir video comercial" />
    </i>
  );
};
