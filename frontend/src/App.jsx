
// import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router";
// import Inicio from './pages/inicio';
// import Home from './pages/Home';
// import AppLayout from './layouts/AppLayout';
// import Login from "./pages/Login";
// import SingUp from "./pages/SingUp";
// import Calendario from "./pages/Calendar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import "./index.css";


// function App() {

//   return (
//     <>
//     <Router>
//       <Routes>
//             {/* PAGINA DE INICIO */}
//             <Route index path="/" element = {<Inicio/>}/>


//               <Route index path="/login" element = {<Login/>}/>
//               <Route index path="/singup" element = {<SingUp/>}/>
        
//               <Route element={<ProtectedRoute/>}>
//               <Route element={<AppLayout />}>
//                   <Route index path="/home" element = {<Home/>}/>
//                   <Route index path="/calendario" element = {<Calendario/>}/>
//               </Route>
//               </Route>
//               <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//     </Router>  
//     </>
//   );
// };

// export default App
// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from './pages/inicio';
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Calendario from "./pages/Calendar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<SingUp />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calendario" element={<Calendario />} />
        </Route>
      </Route>

      {/* Redirección por defecto */}
      <Route path="" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;