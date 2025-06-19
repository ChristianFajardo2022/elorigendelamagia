export const OverLay = ({ top, bottom, radial }) => {
  return (
    <div className="size-full absolute top-0 left-0 pointer-events-none">
      {top && (
        <div className="absolute top-0 left-0 bg-gradient-to-t to-blackInter/85 from-70% size-full z-20" />
      )}
      {radial && (
        <div className="absolute top-0 left-0 bg-radial to-80% to-blackInter/70 size-full z-10" />
      )}
      {bottom && (
        <div className="absolute top-0 left-0 bg-gradient-to-b to-blackInter from-80% size-full z-20" />
      )}
    </div>
  );
};
