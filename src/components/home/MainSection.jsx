import { useState } from "react";
import { MainContent } from "../commons/MainContent";
import { BackgroundTrailer } from "../videos/BackgroundTrailer";

export const MainSection = ({ data }) => {
  const [play, setplay] = useState(false);

  return (
    <main className="relative w-full h-full overflow-hidden">
      <div className="w-full h-dvh relative">
        <MainContent
          data={data}
          play={play}
          handleClick={() => setplay(true)}
        />
        <BackgroundTrailer setplay={setplay} data={data} play={play} />
      </div>
    </main>
  );
};
