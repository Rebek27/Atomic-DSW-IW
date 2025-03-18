import axios from "axios";

export function UserRegister(Usuario){
    console.log("Ejecutando api REGISTER, Requiere:",Usuario);
    return new Promise((resolve,reject)=>{
        axios.post(import.meta.env.VITE_API_BASE+'/register',Usuario)
        .then((response)=>{
            console.log("RESPUESTA DESDE REGISTREAPI",Usuario);
            const data = response.data;

            if(!data){
                console.error("<<ERROR>> <<NO>> se ejecuto la API <<Register>> de forma correcta",data);
                reject(data);
            }else{
                resolve(data);
            }
        })
        .catch((error)=>{
            console.error("<<ERROR>> en API <<Register>>",error);
            reject(error);
        });
    });
}
