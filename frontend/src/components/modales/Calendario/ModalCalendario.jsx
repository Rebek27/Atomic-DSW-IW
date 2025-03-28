import { useState } from 'react';
import dayjs from 'dayjs';

const ModalCalendario = ({ onAgregarEvento, cerrarModal }) => {
  const [titulo, setTitulo] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [etiqueta, setEtiqueta] = useState('personal');
  const [descripcion, setDescripcion] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevoEvento = {
      //id: Date.now(),
      title: titulo,
      descripcion: descripcion,
      fechaInicio: dayjs(inicio).toDate(),
      fechaFin: dayjs(fin).toDate(),
      etiqueta: etiqueta,
      recordatorio: false, //CHECAR ESTO
    };

    onAgregarEvento(nuevoEvento);
    cerrarModal();
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Inicio:</label>
        <input
          type="datetime-local"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Fin:</label>
        <input
          type="datetime-local"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Etiqueta:</label>
        <select
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="importante">Importante</option>
          <option value="personal">Personal</option>
          <option value="medico">Medico</option>
          <option value="estudio">Estudio</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Agrega una descripción para el evento"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Agregar Evento
        </button>
        <button
          type="button"
          onClick={cerrarModal}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ModalCalendario;