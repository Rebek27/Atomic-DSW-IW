import { testimonials } from "./constants";

/**
 * Componente Testimonios
 * Muestra una sección con opiniones de usuarios sobre la app "Atomic".
 * Utiliza un diseño responsive y tarjetas individuales por testimonio.
 */

const Testimonios = ({ id }) => { //ID ES PARA NAVEGAR EN LA LANDING PAG
  return (


    <div id={id} className="py-18 sm:py-20 dark:bg-[#f2f2f2] flex justify-center items-center dark:text-black duration-300 overflow-hidden">
      <div className="container mx-auto  tracking-wide">
        <h2 className="text-3xl sm:text-2xl lg:text-5xl text-center lg:my-20 font-semibold">
          ¿Qué opinan de Atomic?
        </h2>

        <div className="flex flex-wrap justify-center gap-16">

          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full sm:w-2/3 lg:w-1/4 px-0 py-2">
              <div className="bg-white bg-white rounded-md p-5 text-sm border border-neutral-800">
                <p>{testimonial.text}</p>
                <div className="flex mt-8 items-start">
                  <img
                    className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                    src={testimonial.image}
                    alt=""
                  />
                  <div>
                    <h6>{testimonial.user}</h6>
                    <span className="text-sm font-normal italic text-neutral-600">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonios;
