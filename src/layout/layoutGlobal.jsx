import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useState } from "react";

const LayoutGlobal = () => {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <>
      <Header />
      <>
        <Outlet context={{videoReady, setVideoReady}} />
      </>
    </>
  );
};
export default LayoutGlobal;
