
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio';


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route index element = {<Inicio/>}/>
        </Routes>
    </BrowserRouter>  
    </>
  );
};

export default App
