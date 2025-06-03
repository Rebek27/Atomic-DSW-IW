import React, { useState } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import Fondito from '../assets/images/FondoFaq.png'

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: '¿Qué es Atomic?',
            answer: 'Atomic es un software en desarrollo creado por estudiantes del Instituto Tecnológico de Tepic. Está enfocado en la organización personal, incluyendo el seguimiento de hábitos, emociones, tareas y más.',
        },
        {
            question: '¿Quiénes somos?',
            answer: 'Somos un equipo de estudiantes del Instituto Tecnológico de Tepic que está desarrollando Atomic como una herramienta para ayudar a las personas a mejorar su bienestar y productividad personal.',
        },
        {
            question: '¿Qué será de Atomic?',
            answer: 'Actualmente, Atomic cuenta con funciones básicas como calendario y gestión de tareas. En el futuro, planeamos integrar funcionalidades como seguimiento de hábitos, emociones, áreas personales y herramientas para mejorar el bienestar integral.',
        },
    ];


    return (
        <div className=" flex justify-center items-center  bg-gray-50 dark:bg-gray-900 p-6">
            {/* Cuadro redondeado contenedor principal */}
            <div className="relative w-full  h-[80vh] rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800">

                {/* Fondo decorativo */}
                <img
                    src={Fondito}
                    alt="Fondo decorativo FAQ"
                    className="absolute inset-0 w-full h-full  opacity-90 pointer-events-none select-none"
                />

                {/* Sección principal sobrepuesta */}

                <section className="relative bg-white rounded-xl shadow p-6 mx-auto max-w-4xl mt-14 items-center dark:bg-gray-800 border border-gray-300">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center gap-2">
                            <FaQuestionCircle className="text-gray-500 w-6 h-6" />
                            <h2 className="text-xl font-semibold">Preguntas frecuentes</h2>
                        </div>
                    </div>

                </section>

                <section className="relative bg-white/100 rounded-xl shadow p-8 max-w-4xl  mx-auto mt-10 dark:bg-gray-800 border border-gray-300 ">
                    <div className="space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl dark:border-gray-700">
                                <button
                                    onClick={() => toggle(index)}
                                    className="flex items-center justify-between w-full p-6 text-base font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div className="p-5 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Faq;
