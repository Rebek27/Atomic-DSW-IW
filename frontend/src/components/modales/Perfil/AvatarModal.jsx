
import React from 'react';
import { avatarMap, avatarList } from '../../../assets/profile/AvatarMap.js';

const AvatarModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20  flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Selecciona tu nuevo avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Avatares disponibles */}
          {avatarList.map((avatarFileName) => (
            <img
              key={avatarFileName}
              src={avatarMap[avatarFileName]}
              alt={avatarFileName}
              className="w-20 h-20 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform border-2 hover:border-blue-500"
              onClick={() => onSelect(avatarFileName)} // <- Solo mandas el nombre
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
