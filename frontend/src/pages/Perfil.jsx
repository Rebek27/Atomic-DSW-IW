import React, { useState } from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cambiarImagen } from '../services/auth/authService';
import AvatarModal from '../components/modales/Perfil/AvatarModal'


const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmDelete) {
      // Aquí deberías llamar a tu servicio para eliminar la cuenta
      console.log("Eliminar cuenta");
      logout();
      navigate('/signin');
    }
  };

  const handleAvatarChange = async (avatarFile) => {
    try {
      await cambiarImagen({ correo: user.correo, imagen: `src/assets/profile/${avatarFile}` });
      setModalOpen(false);
      window.location.reload(); // o puedes actualizar el contexto si prefieres
    } catch (error) {
      console.error("Error al cambiar avatar:", error);
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={`/${user?.imagen}`}
            alt="Perfil Foto 1"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.nombreUsuario}</h2>
            <p className="text-gray-500">Edad: {user?.edad}  | {user?.ocupacion}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setModalOpen(true)}
            className="ml-4 px-4 py-2 border rounded-full hover:bg-gray-100"
          >
            Editar Avatar
          </button>
        </div>
      </section>

      <AvatarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleAvatarChange}
      />

      {/* Personal Information Section */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Información Personal</h3>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-100">Editar</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nombre(s)</p>
            <p className="font-medium">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-gray-500">Apellido(s)</p>
            <p className="font-medium">{user?.apellidos}</p>
          </div>
          <div>
            <p className="text-gray-500">Correo</p>
            <p className="font-medium">{user?.correo}</p>
          </div>
          <div>
            <p className="text-gray-500">Edad</p>
            <p className="font-medium">{user?.edad}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500">Ocupación</p>
            <p className="font-medium">{user?.ocupacion}</p>
          </div>
        </div>
      </section>
      {/* Contraseña */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Contraseña</h3>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-100">
            Cambiar contraseña
          </button>
        </div>
      </section>

      {/* Cerrar sesión */}
      <section className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Cerrar sesión</h3>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </section>

      {/* Eliminar cuenta */}
      <section className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-red-600">Eliminar cuenta</h3>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-100"
        >
          Eliminar cuenta
        </button>
      </section>
    </div>
  );
};

export default Perfil;