import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";

const LayoutGlobal = () => {
  return (
    <>
      <Header />
      <main className="bg-blackInter w-full h-full">
        <Outlet />
      </main>
    </>
  );
};
export default LayoutGlobal;
