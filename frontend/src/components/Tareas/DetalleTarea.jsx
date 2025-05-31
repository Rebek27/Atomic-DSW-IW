import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { ListIcon } from "../../assets/icons/index";

const DetalleTarea = ({ tarea, nota, setNota, cerrarPanel, eliminarTarea, actualizarTituloTarea, actualizarFechaTarea }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);

    if (!tarea) return null;

    // Función para alternar el menú de fechas
    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
        setMostrarCalendario(false); // Cierra el calendario si estaba abierto
    };

    // Función para seleccionar una nueva fecha
    const seleccionarFecha = (fecha) => {
        actualizarFechaTarea(tarea.id, fecha ? fecha : null); // Si fecha es null, se elimina
        setMenuAbierto(false);
    };

    // const formatearFecha = (fecha) => {
    //     return fecha
    //       ? `Vence ${fecha.toLocaleDateString("es-ES", { weekday: "short", month: "long", day: "numeric" })}`
    //       : "Selecciona Fecha";
    //   };

    return (
        <div className="w-1/4 h-full bg-purple-100 border-l border-gray-300 p-4 shadow-lg flex flex-col relative">
            {/* Encabezado con título y botón de cerrar */}
            <h5
                id="drawer-label"
                className="flex justify-between items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
            >
                <span className="inline-flex items-center">
                    <ListIcon className="w-5 h-5 mr-2" /> Tarea
                </span>
                <button onClick={cerrarPanel}>
                    <FaTimes className="text-gray-600 hover:text-red-500" />
                </button>
            </h5>

            {/* Título editable */}
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-s text-gray-900 border-0 border-b-2 border-purple-400 appearance-none
          dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={tarea.titulo}
                    onChange={(e) => actualizarTituloTarea(e.target.value)}
                />
            </div>

            {/* Botón de Fecha Límite con menú desplegable */}
            {tarea.fechaLimite && (
                <div className="mt-6 flex items-center text-s text-gray-700">
                    <FaCalendarAlt className="mr-2 text-purple-500" />
                    <span class="text-s">
                        Vence{" "}
                        {new Date(tarea.fechaLimite).toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </span>
                </div>
            )}

            {/* Notas */}
            <div className="mt-4">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
                <textarea
                    id="message"
                    rows="4"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Escribe notas aquí..."
                    className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-purple-500 dark:border-purple-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500"
                ></textarea>
            </div>

            {/* Botón para eliminar tarea */}
            <button
                onClick={() => eliminarTarea(tarea.id)}
                className="mt-4 flex items-center text-red-600 hover:text-red-800"
            >
                <FaTrash className="mr-2" /> Eliminar tarea
            </button>
        </div>
    );
};

export default DetalleTarea;
