import { UserModel } from "../models/UsersModel";

export const UserValues = (values) =>{
    let Usuario = UserModel();
    Usuario.nombre = values.nombre;
    Usuario.apellidos =values.apellidos;
    Usuario.correo = values.correo;
    Usuario.nombreUsuario = values.nombreUsuario;
    Usuario.contrasena = values.contrasena;
    Usuario.edad = values.edad;
    Usuario.ocupacion = values.ocupacion;
    Usuario.verificado = values.verificado;
    Usuario.tokenVer = values.tokenVer;
    Usuario.expirToken = values.expirToken;
    Usuario.Activo = values.Activo;

    return Usuario;
};