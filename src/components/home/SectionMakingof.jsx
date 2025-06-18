export const SectionMakingof = ({ data }) => {
  return (
    <section className="w-full h-dvh relative">
      <BackGround data={data}>Hola</BackGround>
    </section>
  );
};

/* Background dinamico */
const BackGround = ({ data, children }) => {
  return (
    <>
      <div className="absolute top-0 left-0 bg-gradient-to-t to-blackInte from-70% size-full z-20" />
      <div className="absolute top-0 left-0 bg-radial to-80% to-blackInter size-full z-10" />
      <div
        className={`flex justify-center items-center size-full bg-[url("${data.imgBackgroundMakingOf}")] bg-top bg-no-repeat bg-contain`}
      >
        {children}
      </div>
    </>
  );
};
