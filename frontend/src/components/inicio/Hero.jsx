import React from "react";
import HeroPng from "../../assets/images/AtomicHero.png"
import { BiPlayCircle } from "react-icons/bi";

const Hero = () => {
  return (
    <>
      <div className="py-18 sm:py-10 dark:bg-[#f2f2f2] flex justify-center items-centerr dark:text-black duration-300 overflow-hidden">
        <div className="container min-h-[600px] flex relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-8">
          
          {/* TEXTO */}
            <div className="order-2 sm:order-1 pl-6 sm:pl-12 space-y-5 lg:pr-20 relative z-30">
              <h1 data-aos="fade-up" className="text-5xl font-semibold">
                ¡Únete!{" "}
                <span className="bg-clip-text text-[#502dff] bg-gradient-to-r from-primary to-secondary">
                Organiza tu vida y cuida tu bienestar en un solo lugar.
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="300">
              Una agenda inteligente diseñada para ayudarte a mantener 
              un seguimiento detallado de tus hábitos diarios, así como
               para cuidar de tu salud mental de manera integral.
              </p>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="py-2 px-4 rounded-lg bg-[#2abd95] text-white hover:bg-[#4d31d7]"
                >
                  Regístrate ahora
                </button>
              </div>
            </div>
            {/* image section */}
            <div
              data-aos="fade-up"
              data-aos-offset="0"
              className="order-1 sm:order-2"
            >
              <img src={HeroPng} alt="" className="w-1/1" />
            </div>
          </div>

          {/* Animated Blob */}
          <div className="relative overflow-hidden">
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;