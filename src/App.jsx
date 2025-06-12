import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Intro2 from "./components/IntroDos";
import Loader from "./components/Loader";
import Contenido from "./components/Contenido";

function App() {
  const [loading, setLoading] = useState("inicio");
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading("video");
    }, 2000); // 14 segundos de carga
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading2(true);
    }, 1000); // 14 segundos de carga
    return () => clearTimeout(timer);
  }, []);
  console.log(loading);

  return (
    <>
      <>
        {/*  <Loader loading={loading} /> */}

        <Router>
          <Routes>
            <Route
              path="/"
              element={<Intro loading={loading} loading2={loading2} setLoading={setLoading} setLoading2={setLoading2}/>}
            />
            <Route path="contenido" element={<Contenido />} />
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;
