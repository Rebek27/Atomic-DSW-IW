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

    const formatearFecha = (fecha) => {
        return fecha
          ? `Vence ${fecha.toLocaleDateString("es-ES", { weekday: "short", month: "long", day: "numeric" })}`
          : "Selecciona Fecha";
      };

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
            <div className="relative mt-4">
                <button 
                    type="button" 
                    onClick={alternarMenu} 
                    className="w-full flex py-3 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-m border border-gray-300 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-100
                    dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    <FaCalendarAlt className="mr-2" /> {formatearFecha(tarea.fechaLimite)}
                </button>

                {/* Menú desplegable de fechas */}
                {menuAbierto && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <ul className="py-1">
                            <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" 
                                onClick={() => seleccionarFecha(new Date())}>
                                <span>Hoy</span>
                                <span className="text-gray-400">{new Date().toLocaleDateString("es-ES", { weekday: "short" })}</span>
                            </li>
                            <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" 
                                onClick={() => seleccionarFecha(new Date(Date.now() + 86400000))}>
                                <span>Mañana</span>
                                <span className="text-gray-400">{new Date(Date.now() + 86400000).toLocaleDateString("es-ES", { weekday: "short" })}</span>
                            </li>
                            <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" 
                                onClick={() => seleccionarFecha(new Date(Date.now() + 7 * 86400000))}>
                                <span>Próxima semana</span>
                                <span className="text-gray-400">{new Date(Date.now() + 7 * 86400000).toLocaleDateString("es-ES", { weekday: "short" })}</span>
                            </li>
                            <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100" 
                                onClick={() => setMostrarCalendario(!mostrarCalendario)}>
                                <span>Elegir una fecha</span>
                            </li>

                            {/* Calendario de selección personalizada */}
                            {mostrarCalendario && (
                                <div className="px-4 py-2">
                                    <DatePicker 
                                        selected={tarea.fechaLimite ? new Date(tarea.fechaLimite) : null}
                                        onChange={(fecha) => seleccionarFecha(fecha)}
                                        inline
                                        className="border-none"
                                    />
                                </div>
                            )}
                             <li className="flex items-center px-4 py-2 text-red-600 cursor-pointer hover:bg-red-100" onClick={() => seleccionarFecha(null)}>
                                                    <FaTrash className="text-red-500 mr-2" />
                                                    <span>Eliminar fecha</span>
                                                  </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Notas */}
            <div className="mt-4">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notas:</label>
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
