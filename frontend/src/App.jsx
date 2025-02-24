import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import "./index.css";
import './css/style.css';
import './charts/ChartjsConfig.jsx';
import Inicio from './pages/inicio';
import Home from './pages/Home';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas sin AppLayout */}
          <Route index element={<Inicio />} />

            <Route path="/home" element={<Home />} />
            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
