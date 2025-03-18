import axios from "axios";

export function UserLogin(correo,contrasena){
    console.log('Ejecutando api LOGIN, requiere:',correo,contrasena);
    let user = {correo,contrasena};
    return new Promise((resolve,reject)=>{
        axios.post(import.meta.env.VITE_API_BASE+'/login',user)
        .then((response) =>{
            console.log('Respuesta desde API LOGIN: ',correo);
            const token = response.data;
            if (!token) {
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<LOGIN>> de forma correcta",token);
                reject(token);
            }else{
                resolve(token);
            }
        })
        .catch(error =>{
            console.error("<<ERROR>> en API <<LOGIN>>",error);
            reject(error)
        });
    });
}