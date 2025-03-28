
import {Navigate, Routes, Route } from "react-router";
import Inicio from './pages/inicio';
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Calendario from "./pages/Calendar";
import Tareas from "./pages/Tareas";
import Perfil from "./pages/Perfil";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";


function App() {

  return (
    <>
      <Routes>
        {/* PAGINA DE INICIO */}
        <Route index path="/" element={<Inicio />} />


        <Route index path="/login" element={<Login />} />
        <Route index path="/singup" element={<SingUp />} />


        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />
            <Route index path="/calendario" element={<Calendario />} />
            <Route index path="/tareas" element={<Tareas />} />
            <Route index path="/profile" element={<Perfil />} />
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="" element={<Navigate to="/login" />} />

      </Routes>
      <ToastContainer />
    </>
  );
};

export default App
