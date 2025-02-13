import React from "react";
// import BooksStack from "../../assets/website/books-stack.png";
import BooksStack from "../../assets/images/CirculoBenef.png"
// import Vector from "../../assets/vector3.png";
import { FcLike } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";

const Beneficios = () => {
  
  return (
    <>
      <div className="py-16 sm:py-16 dark:bg-white dark:text-black duration-300 overflow-hidden">
        <div className="min-h-[600px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div data-aos="slide-up" className="container">
          <div className="container  rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-14 items-center p-16">
              {/* Image section */}
              <div>
                <img
                  src={BooksStack}
                  className="w-4/5 mx-auto drop-shadow-[-5px_5px_9px_rgba(0,0,0,1)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-4xl sm:text-5xl font-bold text-[#36c8a2]">
                  Beneficios de Atomic.
                </h1>
                <p className="text-sm text-gray-600 tracking-wide leading-5">
                Atomic es una aplicación web diseñada para ayudarte a organizar tu vida 
                mientras cuidas tu salud mental y bienestar.
                  <br />
                </p>
                <div className="flex flex-col gap-6 text-black">
                  <div className="flex items-center gap-4">
                    <FcContacts className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                    <p> Organiza tu día con una agenda intuitiva.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FcLike  className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                    <p>Crea hábitos saludables y mide tu progreso.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FcMindMap className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                    <p>Registra tu estado de ánimo y mejora tu bienestar.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FcAdvertising  className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                    <p>Visualiza reportes para un crecimiento personal continuo.</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beneficios;