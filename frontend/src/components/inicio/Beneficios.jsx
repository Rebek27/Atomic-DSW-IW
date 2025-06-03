import React from "react";
import BooksStack from "../../assets/images/CirculoBenef.png"
import { FcLike } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { motion } from "framer-motion";



/**
 * Función que devuelve una configuración de animación para Framer Motion.
 * Aplica una transición que sube y aparece (fade up).
 */

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

//--------------------------------------------
/**
 * Componente que muestra los beneficios principales de usar la app "Atomic".
 */


const Beneficios = ({ id }) => { //ID ES PARA NAVEGAR EN LA LANDING PAGE

  return (
    <>
      {/* Sección de fondo blanco con transición y espaciado */}
      <div id={id} className="py-16 sm:py-16 dark:bg-white dark:text-black duration-300 overflow-hidden">
        <div className="min-h-[600px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div data-aos="slide-up" className="container">
            <div className="container  rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-14 items-center p-16">

              {/* Sección de imagen */}
              <div>
                <img
                  src={BooksStack}
                  className="w-4/5 mx-auto drop-shadow-[-5px_5px_9px_rgba(0,0,0,1)] object-cover"
                />
              </div>


              {/* Sección de contenido textual y beneficios */}

              <div className="flex flex-col justify-center">
                <div className="text-center md:text-left space-y-12">
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold !leading-snug"
                  >


                    {/* Título animado */}
                    Beneficios de usar Atomic.
                  </motion.h1>
                  <div className="flex flex-col gap-5">
                    <motion.div
                      variants={FadeUp(0.2)}
                      initial="initial"
                      whileInView={"animate"}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300  hover:shadow-[1px_6px_10px_rgba(12,131,124,0.6)]"
                    >

                      {/* Lista de beneficios con íconos animados */}
                      <FcContacts className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                      <p className="text-m">Organiza tu día con una agenda intuitiva.</p>
                    </motion.div>
                    <motion.div
                      variants={FadeUp(0.4)}
                      initial="initial"
                      whileInView={"animate"}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-[1px_6px_10px_rgba(12,131,124,0.6)]"
                    >
                      <FcLike className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                      <p className="text-m">Crea hábitos saludables y mide tu progreso.</p>
                    </motion.div>
                    <motion.div
                      variants={FadeUp(0.6)}
                      initial="initial"
                      whileInView={"animate"}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-[1px_6px_10px_rgba(12,131,124,0.6)]"
                    >
                      <FcMindMap className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                      <p className="text-m">Registra tu estado de ánimo y mejora tu bienestar.</p>
                    </motion.div>
                    <motion.div
                      variants={FadeUp(0.6)}
                      initial="initial"
                      whileInView={"animate"}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-[1px_6px_10px_rgba(12,131,124,0.6)]"
                    >
                      <FcAdvertising className="text-4xl h-14 w-14 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                      <p className="text-m">Visualiza reportes para un crecimiento personal continuo.</p>
                    </motion.div>
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