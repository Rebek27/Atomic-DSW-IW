import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaBell, FaTrash, FaChevronDown, FaChevronRight } from "react-icons/fa";
import DetalleTarea from "../components/Tareas/DetalleTarea.jsx";
import { createTask, getTaskList, updateTask, deleteTask } from "../services/tasks/taskService.jsx";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [notificacionActiva, setNotificacionActiva] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarCompletadas, setMostrarCompletadas] = useState(true);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [nota, setNota] = useState("");

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await getTaskList();
        setTareas(response.data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTareas();
  }, []);

  const refrescarTareas = async () => {
  try {
    const response = await getTaskList();
    setTareas(response.data);
  } catch (error) {
    console.error("Error al recargar tareas:", error);
  }
}

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMostrarCalendario(false);
  };

  const toggleCompletado = async (idTarea) => {
    const tareaOriginal = tareas.find((t) => t.idTarea === idTarea);
    if (!tareaOriginal) return;

    const actualizado = {
      ...tareaOriginal,
      completado: !tareaOriginal.completado,
    };

    try {
      await updateTask(idTarea, actualizado);
      setTareas((prev) =>
        prev.map((t) => (t.idTarea === idTarea ? actualizado : t))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };


  const tareasIncompletas = tareas.filter((t) => !t.completado);
  const tareasCompletadas = tareas.filter((t) => t.completado);

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMenuAbierto(false);
  };

  const seleccionarTarea = (tarea) => {
    if (!tarea) return;
    setTareaSeleccionada(tarea);
    setNota(tarea.nota || "");
  };


  const formatearFecha = (fecha) => {
    return fecha
      ? `Vence ${fecha.toLocaleDateString("es-ES", {
        weekday: "short",
        month: "long",
        day: "numeric",
      })}`
      : <FaCalendarAlt className="w-4 h-4 hover:text-blue-300" />;
  };

  const agregarTarea = async () => {
    if (tarea.trim() === "") return;

    const nuevaTarea = {
      titulo: tarea,
      fechaLimite: fechaSeleccionada,
      notificacion: notificacionActiva,
      completado: false,
      descripcion: "",
    };

    try {
      const response = await createTask(nuevaTarea);
      setTareas((prev) => [...prev, response.data]);
      setTarea("");
      setFechaSeleccionada(null);
      setNotificacionActiva(false);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <div className="flex h-screen transition-all duration-300 rounded-2xl border border-gray-300 bg-white dark:border-gray-800 dark:bg-white/[0.20]">
      <div className={`p-6 transition-all duration-300 ${tareaSeleccionada ? "w-3/4" : "w-full"}`}>
        <h1 className="text-3xl font-semibold text-left">Tareas</h1>

        {/* Formulario nueva tarea */}
        <form>
          <div className="flex w-full mt-4">
            <div className="flex w-full items-center bg-white shadow-md rounded-lg p-2 border border-gray-300">
              <input type="radio" className="mr-3 w-5 h-5 text-blue-600" />
              <input
                type="text"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                placeholder="Escribe una tarea..."
                className="flex-1 border-none outline-none text-lg p-2 rounded-lg"
              />

              <div className="relative inline-block text-left">
                <button type="button" onClick={alternarMenu} className="p-2 rounded-lg hover:bg-gray-200">
                  {formatearFecha(fechaSeleccionada)}
                </button>

                {menuAbierto && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => seleccionarFecha(new Date())}>
                        <span>Hoy</span>
                        <span className="text-gray-400">{new Date().toLocaleDateString("es-ES", { weekday: "short" })}</span>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => seleccionarFecha(new Date(Date.now() + 86400000))}>
                        <span>Mañana</span>
                        <span className="text-gray-400">{new Date(Date.now() + 86400000).toLocaleDateString("es-ES", { weekday: "short" })}</span>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => seleccionarFecha(new Date(Date.now() + 7 * 86400000))}>
                        <span>Próxima semana</span>
                        <span className="text-gray-400">{new Date(Date.now() + 7 * 86400000).toLocaleDateString("es-ES", { weekday: "short" })}</span>
                      </li>
                      <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => setMostrarCalendario(!mostrarCalendario)}>
                        <span>Elegir una fecha</span>
                      </li>
                      {mostrarCalendario && (
                        <div className="px-4 py-2">
                          <DatePicker selected={fechaSeleccionada} onChange={(fecha) => seleccionarFecha(fecha)} inline />
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

              <button type="button" onClick={agregarTarea} className="ml-3 text-blue-600 font-semibold hover:underline">
                Añadir
              </button>
            </div>
          </div>
        </form>

        <hr className="my-4 border-gray-300" />

        {/* Tareas Incompletas */}
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">✔</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Fecha Límite</th>
            </tr>
          </thead>
          <tbody>
            {tareasIncompletas.map((tarea) => (
              <tr
                key={tarea.idTarea}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => seleccionarTarea(tarea)}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={tarea.completado}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCompletado(tarea.idTarea);
                    }}
                    className="w-5 h-5 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2">{tarea.titulo}</td>
                <td className="px-4 py-2">
                  {tarea.fechaLimite &&
                    new Date(tarea.fechaLimite).toLocaleDateString("es-ES", {
                      weekday: "short",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tareas Completadas */}
        {tareasCompletadas.length > 0 && (
          <>
            <button
              className="flex items-center w-full px-4 py-2 mt-4 text-left font-semibold bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
              onClick={() => setMostrarCompletadas(!mostrarCompletadas)}
            >
              {mostrarCompletadas ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
              Completadas ({tareasCompletadas.length})
            </button>

            {mostrarCompletadas && (
              <table className="w-full border-collapse border border-gray-300 shadow-md mt-2">
                <tbody>
                  {tareasCompletadas.map((tarea) => (
                    <tr
                      key={tarea.idTarea}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => seleccionarTarea(tarea)}
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={tarea.completado}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleCompletado(tarea.idTarea);
                          }}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-2 line-through">{tarea.titulo}</td>
                      <td className="px-4 py-2">{tarea.fechaLimite}</td>
                      <td className="px-4 py-2 text-center">
                        <FaBell className={`text-xl ${tarea.notificacion ? "text-yellow-500" : "text-gray-400"}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* Panel lateral */}
      <DetalleTarea
        tarea={tareaSeleccionada}
        setTareaSeleccionada={setTareaSeleccionada}
        cerrarPanel={() => setTareaSeleccionada(null)}
        refrescarTareas={refrescarTareas} 
      />
    </div>
  );
};

export default Tareas;
