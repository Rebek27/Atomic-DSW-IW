import React from "react";

const HabitCard = ({ habit, onCompleteToday }) => {
  const hoyISO = new Date().toISOString().slice(0, 10);
  const completadoHoy = habit.progreso.some(p => new Date(p.fecha).toISOString().slice(0, 10) === hoyISO && p.completado);

  const handleComplete = () => {
    if (!completadoHoy) onCompleteToday(habit._id);
  };

  return (
    <div className="p-4 rounded-xl shadow-sm border border-gray-200 bg-white w-full hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{habit.icono}</span>
        <div>
          <h2 className="text-md font-medium text-gray-800">{habit.nombre}</h2>
          <p className="text-xs text-gray-500">{habit.frecuencia}</p>
        </div>
      </div>

      <div className="text-xs text-gray-600 mb-2 space-y-0.5">
        <p>🔥 Racha actual: <strong>{habit.rachaActual}</strong></p>
        <p>🏅 Racha máxima: <strong>{habit.rachaMaxima}</strong></p>
      </div>

      <div className="text-xs mb-2">
        {completadoHoy ? (
          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Completado</span>
        ) : (
          <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded-full">Pendiente</span>
        )}
      </div>

      {!completadoHoy && (
        <button
          onClick={handleComplete}
          className="w-full text-xs px-3 py-1 bg-gradient-to-r from-[#67e8f9] to-[#7c3aed] text-white font-medium rounded-lg hover:opacity-90 transition"
        >
          Marcar como completado
        </button>
      )}
    </div>
  );
};

export default HabitCard;