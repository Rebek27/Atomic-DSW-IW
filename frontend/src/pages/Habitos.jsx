
import React, { useState } from "react";
import HabitCard from "../components/habitos/HabitCard";
import { v4 as uuid } from "uuid";

const HabitManager = () => {

  // Estado para el formulario (nombre, icono y frecuencia)
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({ nombre: "", icono: "", frecuencia: "diario" });
  const [editId, setEditId] = useState(null);


  // Manejador de cambios en los inputs del formulario
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.icono) return;

    if (editId) {
      setHabits(prev => prev.map(h => h._id === editId ? { ...h, ...form } : h));
      setEditId(null);
    } else {
      // Si es un nuevo hábito
      setHabits(prev => [
        ...prev,
        {
          _id: uuid(),
          userId: "demoUser",
          nombre: form.nombre,
          icono: form.icono,
          frecuencia: form.frecuencia,
          rachaActual: 0,
          rachaMaxima: 0,
          progreso: [],
        }
      ]);
    }
    setForm({ nombre: "", icono: "", frecuencia: "diario" });
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este hábito?")) {
      setHabits(prev => prev.filter(h => h._id !== id));
    }
  };

  // Cargar los datos del hábito en el formulario para edición
  const handleEdit = (habit) => {
    setForm({ nombre: habit.nombre, icono: habit.icono, frecuencia: habit.frecuencia });
    setEditId(habit._id);
  };


  // Marcar hábito como completado hoy y actualizar progreso y rachas
  const handleCompleteToday = (habitId) => {
    const hoy = new Date();
    setHabits(prev => prev.map(h => {
      if (h._id === habitId) {
        const nuevoProgreso = [...h.progreso, { fecha: hoy, completado: true }];
        const nuevaRacha = h.rachaActual + 1;
        return {
          ...h,
          progreso: nuevoProgreso,
          rachaActual: nuevaRacha,
          rachaMaxima: Math.max(h.rachaMaxima, nuevaRacha),
        };
      }
      return h;
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto rounded-2xl border border-gray-300 bg-white shadow-md">


      {/* Formulario para agregar/editar hábito */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">{editId ? "Editar hábito" : "Nuevo hábito"}</h2>
        <input
          name="nombre"
          placeholder="Nombre del hábito"
          value={form.nombre}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          required
        />
        <input
          name="icono"
          placeholder="Icono (ej. 💧, 🧘)"
          value={form.icono}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          required
        />
        <select
          name="frecuencia"
          value={form.frecuencia}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="diario">Diario</option>
          <option value="semanal">Semanal</option>
          <option value="mensual">Mensual</option>
        </select>
        <button type="submit" className="bg-gradient-to-r from-[#67e8f9] to-[#7c3aed] text-white px-4 py-2 rounded-md font-medium hover:opacity-90">
          {editId ? "Guardar cambios" : "Agregar hábito"}
        </button>
      </form>



      {/* Listado de hábitos actuales */}
      <div className="grid gap-4 md:grid-cols-2">
        {habits.map((habit) => (
          <div key={habit._id} className="relative">
            <HabitCard habit={habit} onCompleteToday={handleCompleteToday} />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleEdit(habit)}
                className="text-xs bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(habit._id)}
                className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitManager;