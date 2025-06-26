import { Route, Routes } from "react-router";
import LayoutGlobal from "../layout/layoutGlobal";
import { HomePage } from "../pages/home";
import Campañas from "../pages/campañas";

const RouteApp = () => {
  return (
    <Routes>
      <Route element={<LayoutGlobal />}>
        <Route index element={<HomePage />} />
        {/* <Route path="/:slug" element={<Campañas />} /> */}
      </Route>
    </Routes>
  );
};
export default RouteApp;
