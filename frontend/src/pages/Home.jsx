import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEventList } from '../services/events/eventServices';
import { getTaskList } from '../services/tasks/taskService';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/images/Fondo1.png';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados locales para el evento y tarea más cercanos
  const [event, setEvent] = useState(null);
  const [task, setTask] = useState(null);

  // --- Funciones utilitarias  fechas ---

  // Convertir string o MongoDB $date a objeto Date

  const parseDate = (dateField) => {
    if (dateField !== null && typeof dateField === 'object' && dateField.$date) {
      return new Date(dateField.$date);
    }
    return new Date(dateField);
  };

  const formatDate = (dateField) => {
    const date = parseDate(dateField);
    return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString();
  };


  // --- Cargar eventos y tareas al montar el componente ---
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await getEventList();
        const res2 = await getTaskList();
        const eventos = res.data;
        const tareas = res2.data;
        const fechaActual = new Date();

        // Buscar tarea más cercana según fecha límite
        if (tareas && tareas.length > 0) {
          const tareaMasCercana = tareas.reduce((prev, curr) => {
            const prevDate = parseDate(prev.fechaLimite);
            const currDate = parseDate(curr.fechaLimite);
            return Math.abs(currDate - fechaActual) < Math.abs(prevDate - fechaActual) ? curr : prev;
          });
          setTask(tareaMasCercana);
        }

        // Buscar evento más cercano según fecha de inicio
        if (eventos && eventos.length > 0) {
          const eventoMasCercano = eventos.reduce((prev, curr) => {
            const prevDate = parseDate(prev.fechaInicio);
            const currDate = parseDate(curr.fechaInicio);
            return Math.abs(currDate - fechaActual) < Math.abs(prevDate - fechaActual) ? curr : prev;
          });
          setEvent(eventoMasCercano);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    obtenerDatos();
  }, []);

  return (
    <div className="flex justify-center items-center w-ful p-6">
      {/* Cuadro redondeado contenedor */}
      <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800">
        {/* Imagen de fondo posicionada detrás */}
        <img
          src={fondo}
          alt="Fondo decorativo"
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none z-0"
        />

        {/* Contenido del dashboard */}
        <div className="relative z-10 p-6 h-[80vh]">
          {/* Banner de bienvenida */}
          <div className="bg-white/100 dark:bg-gray-800/100 rounded-xl shadow p-6 mb-6 border">
            <h1 className="text-3xl font-bold">¡Hola, {user?.nombre} 👋!</h1>
            <p className="text-gray-600 dark:text-gray-300">Bienvenido de nuevo a Atomic. Organiza tu día y mantente al tanto de tus actividades.</p>
          </div>

          {/* Tarjetas principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Usuario */}
            <div className="bg-white/100 dark:bg-gray-800/90 rounded-xl shadow p-5 flex flex-col items-center text-center border">
              <img src={`/${user?.imagen}`} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user?.nombreUsuario}</h3>
              <p className="text-gray-500 dark:text-gray-300">{user?.ocupacion}</p>
              <p className="text-gray-400 text-sm mt-1">{user?.correo}</p>
            </div>

            {/* Evento más cercano */}
            <div className="bg-white/100 dark:bg-gray-800/90 rounded-xl shadow p-5 border">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">📅 Evento más cercano</h3>
              {event ? (
                <>
                  <p className="font-semibold text-gray-700 dark:text-gray-200">Evento: {event.title || event.titleEvent || "Sin título"}</p>
                  <p className="text-gray-600 dark:text-gray-300">{event.descripcion || "Sin descripción."}</p>
                  <p className="text-sm text-gray-500">Inicio: {formatDate(event.fechaInicio)}</p>
                  <p className="text-sm text-gray-500">Fin: {formatDate(event.fechaFin)}</p>
                  <p className="text-sm text-gray-500">Etiqueta: {event.etiqueta}</p>
                  <button onClick={() => navigate("/calendario")} className="mt-3 px-3 py-1 bg-blue-200 rounded hover:bg-blue-100">
                    Ver todos
                  </button>
                </>
              ) : (
                <p className="text-gray-500">No hay eventos registrados.</p>
              )}
            </div>

            {/* Tarea más cercana */}
            <div className="bg-white/100 dark:bg-gray-800/90 rounded-xl shadow p-5 border">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">📝 Tarea más cercana</h3>
              {task ? (
                <>
                  <p className="font-semibold text-gray-700 dark:text-gray-200">Tarea: {task.titulo}</p>
                  <p className="text-gray-600 dark:text-gray-300">{task.descripcion || "Sin descripción."}</p>
                  <p className="text-sm text-gray-500">Fecha límite: {formatDate(task.fechaLimite)}</p>
                  <button onClick={() => navigate("/tareas")} className="mt-3 px-3 py-1 bg-blue-200 rounded hover:bg-blue-100">
                    Ver todas
                  </button>
                </>
              ) : (
                <p className="text-gray-500">No hay tareas registradas.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
