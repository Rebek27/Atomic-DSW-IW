import React, { useEffect, useState } from 'react';
import { getEventList } from '../services/events/eventServices';
import { getTaskList } from '../services/tasks/taskService';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [task, setTask] = useState(null);

  // Función auxiliar para parsear fechas
  const parseDate = (dateField) => {
    if (typeof dateField === 'object' && dateField.$date) {
      return new Date(dateField.$date);
    }
    return new Date(dateField);
  };

  // Formatear fecha en un formato legible
  const formatDate = (dateField) => {
    const date = parseDate(dateField);
    // Verifica que la fecha sea válida
    return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString();
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await getEventList();
        const res2 = await getTaskList();

        const eventos = res.data;
        const tareas = res2.data;
        const fechaActual = new Date();

        // Asegurarse de que existan datos en los arreglos
        if (tareas && tareas.length > 0) {
          // Obtener la tarea con la fecha límite más cercana a la fecha actual
          const tareaMasCercana = tareas.reduce((prev, curr) => {
            const prevDate = parseDate(prev.fechaLimite);
            const currDate = parseDate(curr.fechaLimite);
            return Math.abs(currDate - fechaActual) < Math.abs(prevDate - fechaActual)
              ? curr
              : prev;
          });
          setTask(tareaMasCercana);
        }

        if (eventos && eventos.length > 0) {
          // Obtener el evento con la fecha de inicio más cercana a la fecha actual
          const eventoMasCercano = eventos.reduce((prev, curr) => {
            const prevDate = parseDate(prev.fechaInicio);
            const currDate = parseDate(curr.fechaInicio);
            return Math.abs(currDate - fechaActual) < Math.abs(prevDate - fechaActual)
              ? curr
              : prev;
          });
          setEvent(eventoMasCercano);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    obtenerDatos();
  }, []);

  // Estilos en línea para el banner
  const bannerStyle = {
    height: '120px',
    background: 'linear-gradient(135deg, #a3dce3, #fed6e3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const headingStyle = {
    fontSize: '2em',
    margin: 0,
  };

  return (
    <>
      {/* Banner */}
      <div style={bannerStyle}>
        <h1 style={headingStyle}>Bienvenido a Atomic</h1>
      </div>
      
      {/* Contenedor de tarjetas debajo del banner */}
      <div className="container mx-auto mt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tarjeta para el Evento */}
          {event ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-blue-300 px-4 py-2 border-b">
                <h3 className="text-lg font-semibold">Evento Más Cercano</h3>
                
              </div>
              <div className="p-4">
                <h5 className="text-lg font-bold mb-2">
                  Evento: {event.title || event.titleEvent || "Sin título"}
                </h5>
                <p className="mb-2">Descripción: {event.descripcion}</p>
                <p className="mb-2">
                  <strong>Fecha Inicio:</strong> {formatDate(event.fechaInicio)}
                </p>
                <p className="mb-2">
                  <strong>Fecha Fin:</strong> {formatDate(event.fechaFin)}
                </p>
                <p>
                  <strong>Etiqueta:</strong> {event.etiqueta}
                </p>
                <button type="button" onClick={()=>navigate("/calendario")} className="p-1 m-1 rounded-lg bg-blue-200 hover:bg-blue-100">
                  Ver Todos
                </button>
              </div>
              
            </div>
          ) : (
            <div className="bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded">
              Aun no hay eventos
              <button type="button" onClick={()=>navigate("/calendario")}  className="p-1 m-1 rounded-lg hover:bg-gray-200">
                  Agrega uno nuevo!
              </button>
            </div>
          )}

          {/* Tarjeta para la Tarea */}
          {task ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-blue-300 px-4 py-2 border-b">
                <h3 className="text-lg font-semibold">Tarea Más Cercana</h3>
              </div>
              <div className="p-4">
                <h5 className="text-lg font-bold mb-2">Tarea: {task.titulo}</h5>
                <p className="mb-2">Descripción: {task.descripcion}</p>
                <p>
                  <strong>Fecha Límite:</strong> {formatDate(task.fechaLimite)}
                </p>
                <button type="button" onClick={()=>navigate("/tareas")}  className="p-1 m-1 rounded-lg bg-blue-200 hover:bg-blue-100">
                  Ver Todos
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded">
              Aun no hay tareas
              <button type="button" onClick={()=>navigate("/tareas")} className="p-1 m-1 rounded-lg bg-blue-200 hover:bg-blue-100">
                  Agrega una nueva!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
