import NavbarInicio from '../components/inicio/NavBarInicio'
import Hero from '../components/inicio/Hero'
import Beneficios from '../components/inicio/Beneficios'
import Testimonios from '../components/inicio/Testimonios'
import FooterInicio from '../components/inicio/FooterInicio'
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect} from 'react'

const Inicio = () => {
    const [isPlay, setIsPlay] = useState(false);
  
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
      <NavbarInicio/>
  
      <div className="overflow-x-hidden min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white duration-300">
      <Hero id="hero" />
      <Beneficios id="beneficios" />
      <Testimonios id="testimonios" />
      <FooterInicio />
        </div>
      </>
    );
  };
  
  export default Inicio
  