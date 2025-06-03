import NavbarInicio from '../components/inicio/NavBarInicio'
import Hero from '../components/inicio/Hero'
import Beneficios from '../components/inicio/Beneficios'
import Testimonios from '../components/inicio/Testimonios'
import FooterInicio from '../components/inicio/FooterInicio'
import AOS from "aos"; // Importación de la librería AOS (Animate On Scroll) y sus estilos
import "aos/dist/aos.css";
import { useState, useEffect} from 'react'

const Inicio = () => {
    const [isPlay, setIsPlay] = useState(false);
  
     // Inicialización de AOS al montar el componente
    useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
  
    return (
      <>
          {/* Barra de navegación superior */}
      <NavbarInicio />

      {/* Contenedor principal de la página */}
      <div className="overflow-x-hidden min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white duration-300">
        
        {/* Sección de presentación principal */}
        <Hero id="hero" />

        {/* Sección de beneficios del sistema */}
        <Beneficios id="beneficios" />

        {/* Sección de testimonios de usuarios */}
        <Testimonios id="testimonios" />

        {/* Pie de página */}
        <FooterInicio />
        </div>
      </>
    );
  };
  
  export default Inicio
  