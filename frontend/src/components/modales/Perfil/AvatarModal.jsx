
import React from 'react';
import avatar1 from '../../../assets/profile/Perfil1.png'
import avatar2 from '../../../assets/profile/Perfil2.png'
import avatar3 from '../../../assets/profile/Perfil3.png'
import avatar4 from '../../../assets/profile/Perfil4.png'
import avatar5 from '../../../assets/profile/Perfil5.png'
import avatar6 from '../../../assets/profile/Perfil6.png'

// Lista de nombres de archivo de avatares disponibles
const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
];

const AvatarModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20  flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Selecciona tu nuevo avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Avatares disponibles */}
          {avatars.map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt={avatar}
              className="w-20 h-20 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform border-2 hover:border-blue-500"
              onClick={() => onSelect(avatar)}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AvatarModal;
