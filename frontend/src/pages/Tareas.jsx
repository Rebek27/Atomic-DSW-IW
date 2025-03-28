import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tareasData from "../components/DatosEstaticos/tareas.json"; // Importamos el JSON
import { FaCalendarAlt, FaBell, FaTrash, FaChevronDown, FaChevronRight } from "react-icons/fa";
import DetalleTarea from "../components/Tareas/DetalleTarea.jsx";

const Tareas = () => {
  // Estado para manejar las tareas
  const [tareas, setTareas] = useState([]);

  // Cargar tareas desde el JSON al montar el componente
  useEffect(() => {
    setTareas(tareasData);
  }, []);

  // Estado del formulario
  const [tarea, setTarea] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [notificacionActiva, setNotificacionActiva] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarCompletadas, setMostrarCompletadas] = useState(true);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [nota, setNota] = useState(""); // Estado para notas

  // Alternar el menú de selección de fecha
  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMostrarCalendario(false);
  };

  // Alternar el estado de completado de una tarea
  const toggleCompletado = (id) => {
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, completado: !t.completado } : t
    );
    setTareas(nuevasTareas);
  };

  // Eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
    setTareaSeleccionada(null);
  };

  // Separar tareas en completadas e incompletas
  const tareasIncompletas = tareas.filter((t) => !t.completado);
  const tareasCompletadas = tareas.filter((t) => t.completado);

  // Seleccionar una fecha y actualizar el estado
  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMenuAbierto(false);
  };

  // Seleccionar una tarea para ver detalles
  const seleccionarTarea = (tarea) => {
    setTareaSeleccionada(tarea);
    setNota(tarea.nota || ""); // Cargar nota si existe
  };
  
  const actualizarTituloTarea = (nuevoTitulo) => {
    if (!tareaSeleccionada) return;

    // Actualiza el estado de las tareas con el nuevo título
    const tareasActualizadas = tareas.map((t) =>
      t.id === tareaSeleccionada.id ? { ...t, titulo: nuevoTitulo } : t
    );

    setTareas(tareasActualizadas);
    setTareaSeleccionada({ ...tareaSeleccionada, titulo: nuevoTitulo }); // Actualiza el panel de detalles
  };

  const actualizarFechaTarea = (id, nuevaFecha) => {
    const tareasActualizadas = tareas.map((t) =>
      t.id === id ? { ...t, fechaLimite: nuevaFecha.toISOString().split("T")[0] } : t
    );

    setTareas(tareasActualizadas);
    setTareaSeleccionada({ ...tareaSeleccionada, fechaLimite: nuevaFecha.toISOString().split("T")[0] });
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return fecha
      ? `Vence ${fecha.toLocaleDateString("es-ES", { weekday: "short", month: "long", day: "numeric" })}`
      : <FaCalendarAlt className="w-4 h-4 hover:text-blue-300" />;
  };

  // Agregar una nueva tarea a la lista
  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    const nuevaTarea = {
      id: tareas.length + 1,
      titulo: tarea,
      fechaLimite: fechaSeleccionada ? fechaSeleccionada.toISOString().split("T")[0] : null,
      notificacion: notificacionActiva,
      completado: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setTarea("");
    setFechaSeleccionada(null);
    setNotificacionActiva(false);
  };

  return (

    <div className="flex h-screen transition-all duration-300 rounded-2xl border border-gray-300 bg-white dark:border-gray-800 dark:bg-white/[0.20]">
      <div className={`p-6 transition-all duration-300 ${tareaSeleccionada ? "w-3/4" : "w-full"}`}>
        <h1 className="text-3xl font-semibold text-left">Tareas</h1>

        {/* Input para Nueva Tarea */}
        <form>
          <div className="flex w-full mt-4">
            <div className="flex w-full items-center bg-white shadow-md rounded-lg p-2 border border-gray-300">
              {/* Botón de selección */}
              <input type="radio" className="mr-3 w-5 h-5 text-blue-600" />

              {/* Campo de texto */}
              <input
                type="text"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                placeholder="Escribe una tarea..."
                className="flex-1 border-none outline-none text-lg p-2 rounded-lg"
              />

              {/* Menú de selección de fecha */}
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
                          <DatePicker selected={fechaSeleccionada} onChange={(fecha) => seleccionarFecha(fecha)} inline className="border-none" />
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

              {/* Botón de Campana */}
              <button type="button" onClick={() => setNotificacionActiva(!notificacionActiva)} className="p-2 rounded-lg hover:bg-gray-200">
                <FaBell className={`w-5 h-5 ${notificacionActiva ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500`} />
              </button>

              {/* Botón de Agregar */}
              <button type="button" onClick={agregarTarea} className="ml-3 text-blue-600 font-semibold hover:underline">
                Añadir
              </button>
            </div>
          </div>
        </form>

        <hr className="my-4 border-gray-300" />

        {/* Tabla de Tareas Incompletas */}
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">✔</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Fecha Límite</th>
              <th className="px-4 py-2 text-center">Notificación</th>
            </tr>
          </thead>
          <tbody>
            {tareasIncompletas.map((tarea) => (
              <tr
                key={tarea.id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => seleccionarTarea(tarea)}
              >
                {/* Checkbox de completado */}
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={tarea.completado}
                    onChange={() => toggleCompletado(tarea.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </td>

                {/* Título de la tarea */}
                <td className="px-4 py-2">{tarea.titulo}</td>

                {/* Fecha límite */}
                <td className="px-4 py-2">{tarea.fechaLimite}</td>

                {/* Notificación (Campana) */}
                <td className="px-4 py-2 text-center">
                  <FaBell className={`text-xl cursor-pointer ${tarea.notificacion ? "text-yellow-500" : "text-gray-400"}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sección de tareas completadas */}
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
                      key={tarea.id}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => seleccionarTarea(tarea)}
                    >
                      {/* Checkbox de completado */}
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={tarea.completado}
                          onChange={() => toggleCompletado(tarea.id)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>

                      {/* Título de la tarea (tachado si está completada) */}
                      <td className="px-4 py-2 line-through">{tarea.titulo}</td>

                      {/* Fecha límite */}
                      <td className="px-4 py-2">{tarea.fechaLimite}</td>

                      {/* Notificación (Campana) */}
                      <td className="px-4 py-2 text-center">
                        <FaBell className={`text-xl cursor-pointer ${tarea.notificacion ? "text-yellow-500" : "text-gray-400"}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}


      </div>

      {/* 📌 Panel lateral para detalles de la tarea */}
      <DetalleTarea
        tarea={tareaSeleccionada}
        nota={nota}
        setNota={setNota}
        cerrarPanel={() => setTareaSeleccionada(null)}
        eliminarTarea={eliminarTarea}
        actualizarTituloTarea={actualizarTituloTarea}
        actualizarFechaTarea={actualizarFechaTarea} // 🔥 Nueva función para actualizar la fecha
      />
    </div>

  );
};

export default Tareas;
