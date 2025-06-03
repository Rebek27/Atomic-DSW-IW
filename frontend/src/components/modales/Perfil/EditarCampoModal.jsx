import React, { useState, useEffect } from 'react';

const EditarCampoModal = ({ isOpen, onClose, onSave, label, valorActual }) => {
   // Estado para el nuevo valor que el usuario va escribiendo
  const [valor, setValor] = useState('');


    // Actualiza el valor del input cada vez que cambia el valor actual
  useEffect(() => {
    setValor(valorActual || '');
  }, [valorActual]);

  const handleSubmit = () => {
    onSave(valor);
  };

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Editar {label}</h2>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarCampoModal;
