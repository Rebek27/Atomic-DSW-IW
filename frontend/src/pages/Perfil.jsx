import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cambiarImagen, cambiarNom, cambiarNomUs, cambiarOcupacion, cambiarAp, eliminarCuenta } from '../services/auth/authService';
import AvatarModal from '../components/modales/Perfil/AvatarModal'
import { FaPen } from 'react-icons/fa6';
import EditarCampoModal from '../components/modales/Perfil/EditarCampoModal';
import CambiarContrasena from '../components/modales/Perfil/CambiarContraseña';


const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);
  const [modalLabel, setModalLabel] = useState('');
  const [valorActual, setValorActual] = useState('');


  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmDelete) {
      try {
        // Aquí deberías llamar a tu servicio para eliminar la cuenta
        await eliminarCuenta();
        console.log("Eliminar cuenta");
      logout();
      navigate('/signin');
      } catch (error) {
        console.error("Error al eliminar la cuenta",error);
      }
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

  const handlePassChange = ()=>{
    setModalOpen(true);
  }
  const closePassModal = () =>{
    setModalOpen(false)
  }

  const abrirModal = (tipo, label, valor) => {
    setModalTipo(tipo);
    setModalLabel(label);
    setValorActual(valor);
  };

  const cerrarModal = () => {
    setModalTipo(null);
    setValorActual('');
  };

  const guardarCampo = async (nuevoValor) => {
    try {
      switch (modalTipo) {
        case 'nom':
          await cambiarNom({ correo: user.correo, nombre: nuevoValor });
          break;
        case 'ap':
          await cambiarAp({ correo: user.correo, apellidos: nuevoValor });
          break;
        case 'ocupacion':
          await cambiarOcupacion({ correo: user.correo, ocupacion: nuevoValor });
          break;
        case 'usuario':
          await cambiarNomUs({ correo: user.correo, nombreUsuario: nuevoValor });
          break;
        default:
          return;
      }

      cerrarModal();
      window.location.reload(); // o actualizar el contexto
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

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
            Editar avatar
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
          <h3 className="text-xl font-semibold">Información personal</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 flex items-center gap-2">Nombre(s)
              <FaPen
                className="text-[#7000ff] cursor-pointer"
                onClick={() => abrirModal('nom', 'Nombre(s):', user?.nombre)}
              />
            </p>
            <p className="font-medium">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center gap-2">Apellido(s)
              <FaPen
                className="text-[#7000ff] cursor-pointer"
                onClick={() => abrirModal('ap', 'Apellido(s):', user?.apellidos)}
              />
            </p>
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
          <div>
            <p className="text-gray-500 flex items-center gap-2">Ocupación
              <FaPen
                className="text-[#7000ff] cursor-pointer"
                onClick={() => abrirModal('ocupacion', 'Ocupación', user?.ocupacion)}
              />
            </p>
            <p className="font-medium">{user?.ocupacion}</p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center gap-2">
              Nombre de usuario
              <FaPen
                className="text-[#7000ff] cursor-pointer"
                onClick={() => abrirModal('usuario', 'Nombre de usuario', user?.nombreUsuario)}
              />
            </p>
            <p className="font-medium">{user?.nombreUsuario}</p>
          </div>
        </div>
      </section >

      <EditarCampoModal
        isOpen={!!modalTipo}
        onClose={cerrarModal}
        onSave={guardarCampo}
        label={modalLabel}
        valorActual={valorActual}
      />

      {/* Contraseña */}
      < section className="bg-white rounded-xl shadow p-6" >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Contraseña</h3>
          <button onClick={handlePassChange} className="px-4 py-2 border rounded-full hover:bg-gray-100">
            Cambiar contraseña
          </button>
        </div>
      </section >

      <CambiarContrasena
        onClose={closePassModal}
        isVisible={modalOpen}
      />

      {/* Cerrar sesión */}
      < section className="bg-white rounded-xl shadow p-6 flex justify-between items-center" >
        <h3 className="text-lg font-semibold">Cerrar sesión</h3>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </section >

      {/* Eliminar cuenta */}
      < section className="bg-white rounded-xl shadow p-6 flex justify-between items-center" >
        <h3 className="text-lg font-semibold text-red-600">Eliminar cuenta</h3>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-100"
        >
          Eliminar cuenta
        </button>
      </section >
    </div >
  );
};

export default Perfil;