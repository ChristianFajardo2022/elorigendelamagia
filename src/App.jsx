import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Intro2 from "./components/IntroDos";
import Loader from "./components/Loader";
import Recorrido from "./components/Recorrido";
import Amuleto from "./components/Amuleto";
import {CanvaModel} from "./components/CanvaModel";


function App() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 14 segundos de carga
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading2(true);
    }, 1000); // 14 segundos de carga
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <>
       {/*  <Loader loading={loading} /> */}
       
          <Router>
            <Routes>
              <Route path="/" element={<Intro loading={loading} />} />
              <Route path="amuleto" element={<CanvaModel />} />
            </Routes>
          </Router>
    
      </>
    </>
  );
}

export default App;
