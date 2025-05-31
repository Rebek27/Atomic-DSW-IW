import React, { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../../services/tasks/taskService.jsx";
import { FaTrash, FaSave } from "react-icons/fa";

const DetalleTarea = ({
  tarea,
  cerrarPanel,refrescarTareas,
  setTareaSeleccionada,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    if (tarea) {
      setDescripcion(tarea.descripcion || "");
      setTitulo(tarea.titulo || "");
    }
  }, [tarea]);

  const handleActualizar = async () => {
    try {
      await updateTask(tarea.idTarea, {
        ...tarea,
        titulo,
        descripcion,
      }, tarea.correo);
      alert("Tarea actualizada correctamente");
    refrescarTareas(); 
      cerrarPanel();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("No se pudo actualizar la tarea");
    }
  };

  const handleEliminar = async () => {
    const confirmar = confirm("¿Estás seguro que deseas eliminar esta tarea?");
    if (!confirmar) return;

    try {
      await deleteTask(tarea.idTarea, tarea.correo); 
      alert("Tarea eliminada");
        refrescarTareas(); 
      cerrarPanel();
      setTareaSeleccionada(null);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("No se pudo eliminar la tarea");
    }
  };

  if (!tarea) return null;

  return (
    <div className="w-1/4 border-l border-gray-300 p-6 bg-white dark:bg-white/[0.15]">
      <h2 className="text-2xl font-semibold mb-4">Detalles de la tarea</h2>

      {/* Título */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Fecha límite (solo si existe) */}
      {tarea.fechaLimite && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Fecha límite</label>
          <input
            type="date"
            value={tarea.fechaLimite?.split("T")[0]}
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>
      )}

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
        />
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between text-sm">
        <button
          onClick={handleActualizar}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaSave /> Actualizar
        </button>

        <button
          onClick={handleEliminar}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetalleTarea;
