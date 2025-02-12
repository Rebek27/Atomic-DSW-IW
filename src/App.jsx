import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavbarInicio from './components/NavBarInicio'
import Hero from './components/Hero/Hero'

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [isPlay, setIsPlay] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

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

    <div className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
      <Hero togglePlay={togglePlay} />
      </div>
    </>
  );
};

export default App
