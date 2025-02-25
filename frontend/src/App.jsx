
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Inicio from './pages/inicio';
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import "./index.css";


function App() {

  return (
    <>
    <Router>
     <Routes>
        <Route element={<AppLayout />}>
            <Route index path="/" element = {<Home/>}/>
        /</Route>
            <Route path="/login" element = {<Inicio/>}/>
        </Routes>
    </Router>  
    </>
  );
};

export default App
