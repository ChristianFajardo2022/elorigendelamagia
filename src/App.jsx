import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Loader from "./components/Loader";
import Recorrido from "./components/Recorrido";
import Amuleto from "./components/Amuleto";
import { CanvaModel } from "./components/CanvaModel";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 14 segundos de carga
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<Intro loading={loading} />} />
          <Route path="amuleto" element={<CanvaModel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
