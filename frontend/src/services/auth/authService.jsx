import API from "../../api/axios";  

// -------- GET
export const getUserList = async () => API.get('/users');

export const getUserByCorreo = async (correo) => API.get(`/user/${correo}`);

export const verifyCorreo = async (token, correo) =>
  API.get(`/verificar-correo?token=${token}&correo=${correo}`);

// -------- POST
export const registerRequest = async (user) => API.post('/register', user);

export const loginRequest = async (user) => API.post('/login', user);


export const olvidasteContra = async (body) => API.post('/recuperar-cuenta',body);
//Ahora si el cambio de contraseña
export const resetPassword = async (token,correo,contrasena) => 
  API.put(`/reset-password?token=${token}&correo=${correo}`,contrasena);

// -------- PUT
export const cambiarContrasena = async (data) =>
  API.put('/cambiar-contrasena', data);

export const cambiarNom = async (data) =>
  API.put('/cambiar-nom', data);

export const cambiarAp = async (data) =>
  API.put('/cambiar-ap', data);

export const cambiarNomUs = async (data) =>
  API.put('/cambiar-nomus', data);

export const cambiarOcupacion = async (data) =>
  API.put('/cambiar-ocupacion', data);

export const cambiarImagen = async (data) =>
  API.put('/cambiar-imagen', data);

export const eliminarCuenta = async () => API.delete('/user');