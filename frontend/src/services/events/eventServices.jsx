import API from '../../api/axios';

//Crear evento
export const createEvent = async (evento) => API.post('/event/add',evento);

//ObtenerEventos
export const getEventList = async () => API.get('/events');

//Detalles de un solo evento
export const getEventDetails = async(id) => API.get(`/event/${id}`);

//Actualizar los datos de un evento
export const updateEvent = async(id,evento) => API.put(`/event-update/${id}`,evento);
//Eliminar un evento 
export const deleteEvent = async(id) => API.delete(`/event-delete/${id}`);