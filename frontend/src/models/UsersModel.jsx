
export function UserModel() {
    let Usuario = {
        nombre: { type: String },
        apellidos: { type: String },
        correo: { type: String, unique: true },
        nombreUsuario: { type: String },
        contrasena: { type: String },
        edad: { type: Number },
        ocupacion: { type: String },
        verificado: { type: Boolean, default: false }, //para la verificacion de usuario
        tokenVer: { type: String },
        expirToken: { type: Date },
        Activo: { type: Boolean, default: true }
    };
    return Usuario;
};