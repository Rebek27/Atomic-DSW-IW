import API from "../../api/axios";  

// -------- GET
export const getUserList = async () => API.get('/users');

export const getUserByCorreo = async (correo) => API.get(`/user/${correo}`);

export const verifyCorreo = async (token, correo) =>
  API.get(`/verificar-correo?token=${token}&correo=${correo}`);

// -------- POST
export const registerRequest = async (user) => API.post('/register', user);

export const loginRequest = async (user) => API.post('/login', user);

// -------- PUT
export const cambiarContrasena = async (data) =>
  API.put('/cambiar-contrasena', data);

export const cambiarNomAp = async (data) =>
  API.put('/cambiar-nomap', data);

export const cambiarNomUs = async (data) =>
  API.put('/cambiar-nomus', data);

export const cambiarOcupacion = async (data) =>
  API.put('/cambiar-ocupacion', data);
