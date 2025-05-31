export const mockHabits = [
  {
    _id: "1",
    userId: "u1",
    nombre: "Meditar",
    icono: "🧘",
    frecuencia: "diario",
    rachaActual: 7,
    rachaMaxima: 15,
    progreso: [
      { fecha: new Date("2025-05-31"), completado: true },
      { fecha: new Date("2025-05-30"), completado: true }
    ]
  },
  {
    _id: "2",
    userId: "u1",
    nombre: "Leer 20 min",
    icono: "📚",
    frecuencia: "diario",
    rachaActual: 3,
    rachaMaxima: 10,
    progreso: [
      { fecha: new Date("2025-05-30"), completado: true },
      { fecha: new Date("2025-05-28"), completado: false }
    ]
  },
  {
    _id: "3",
    userId: "u1",
    nombre: "Ejercicio",
    icono: "🏃‍♂️",
    frecuencia: "semanal",
    rachaActual: 1,
    rachaMaxima: 4,
    progreso: [
      { fecha: new Date("2025-05-29"), completado: true }
    ]
  }
];
