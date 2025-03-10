
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Inicio from './pages/inicio';
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Calendario from "./pages/Calendar";
import "./index.css";


function App() {

  return (
    <>
    <Router>
      <Routes>
            {/* PAGINA DE INICIO */}
            <Route index path="/" element = {<Inicio/>}/>


              <Route index path="/login" element = {<Login/>}/>
              <Route index path="/singup" element = {<SingUp/>}/>
        

              <Route element={<AppLayout />}>
                  <Route index path="/home" element = {<Home/>}/>
                  <Route index path="/calendario" element = {<Calendario/>}/>
              </Route>

        </Routes>
    </Router>  
    </>
  );
};

export default App
