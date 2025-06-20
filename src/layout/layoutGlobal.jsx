import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useState } from "react";

const LayoutGlobal = () => {
  const [nameCampaña, setNameCampaña] = useState({});

  return (
    <>
      <Header nameCampaña={nameCampaña} />
      <>
        <Outlet context={{ nameCampaña, setNameCampaña }} />
      </>
    </>
  );
};
export default LayoutGlobal;
