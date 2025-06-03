import React, { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../../services/tasks/taskService.jsx";
import { FaTrash, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";


// Componente que muestra y permite editar los detalles de una tarea
const DetalleTarea = ({
  tarea,
  cerrarPanel,
  refrescarTareas,
  setTareaSeleccionada,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");


   // Cuando cambia la tarea seleccionada, se actualizan los campos locales
  useEffect(() => {
    if (tarea) {
      setDescripcion(tarea.descripcion || "");
      setTitulo(tarea.titulo || "");
    }
  }, [tarea]);

    // Actualiza los datos de la tarea
  const handleActualizar = async () => {
    try {
      await updateTask(tarea.idTarea, { ...tarea, titulo, descripcion }, tarea.correo);
      toast.success("Tarea actualizada correctamente");
      refrescarTareas();
      cerrarPanel();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      toast.error("No se pudo actualizar la tarea");
    }
  };

   // Elimina la tarea actual
  const handleEliminar = async () => {
    toast.info("Eliminando tarea...");
    try {
      await deleteTask(tarea.idTarea, tarea.correo);
      toast.success("Tarea eliminada");
      refrescarTareas();
      cerrarPanel();
      setTareaSeleccionada(null);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      toast.error("No se pudo eliminar la tarea");
    }
  };

  if (!tarea) return null;

  return (
    <div className="w-1/4 bg-white/90 dark:bg-white/[0.1] border-l border-gray-300 dark:border-white/20 p-6 rounded-r-xl backdrop-blur-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Detalles de la tarea</h2>

      {/* Título */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 bg-white dark:bg-white/[0.15] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Fecha límite */}
      {tarea.fechaLimite && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">Fecha límite</label>
          <input
            type="date"
            value={tarea.fechaLimite?.split("T")[0]}
            disabled
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-white/[0.1] text-gray-600 dark:text-white/80 cursor-not-allowed border border-gray-300"
          />
        </div>
      )}

      {/* Descripción */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full h-24 p-2 rounded-lg border border-gray-300 bg-white dark:bg-white/[0.15] text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handleActualizar}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow"
        >
          <FaSave /> Actualizar
        </button>

        <button
          onClick={handleEliminar}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetalleTarea;
