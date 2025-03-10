import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import FooterImg from "../../assets/images/Footer3.png";
import { motion } from "framer-motion";

const bgStyle = {
  backgroundImage: `url(${FooterImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const FooterInicio = () => {
  return (
    <div style={bgStyle} className="bg-white py-12 flex justify-center items-center" >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="container text-center space-y-4 py-12 text-black items-center"
      >
        <div className="space-y-4 justify-center items-center">
          <p className="text-3xl md:text-4xl font-bold text-black items-center">Comienza tu experiencia Atomic.</p>
          <p>Cambia tu estilo de vida</p>
        </div>
        <div className=" space-y-4">
          <button className="primary-btn text-[#502dff]">
              <a href="/singup">
              ¡Crea tu cuenta aqui!
               </a></button>
          <div className="flex flex-row justify-center gap-6">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FooterInicio;