import API from '../../api/axios';

// Crear una tarea
export const createTask = async (tarea) => API.post('/tasks', tarea);

// Obtener todas las tareas
export const getTaskList = async () => API.get('/tasks');

// Obtener detalles de una tarea
export const getTaskDetails = async (id) => API.get(`/tasks/${id}`);

// Actualizar una tarea
export const updateTask = async (id, tarea) => API.put(`/tasks/${id}`, tarea);

// Eliminar una tarea
export const deleteTask = async (id) => API.delete(`/tasks/${id}`);
