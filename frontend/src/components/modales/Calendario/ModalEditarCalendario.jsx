import { useState } from 'react';
import dayjs from 'dayjs';


const ModalEditarCalendario = ({ eventoEditar, onEditarEvento, cerrarModal }) => {
  const [titulo, setTitulo] = useState(eventoEditar.title);
  const [inicio, setInicio] = useState(dayjs(eventoEditar.start).format('YYYY-MM-DDTHH:mm'));
  const [fin, setFin] = useState(dayjs(eventoEditar.end).format('YYYY-MM-DDTHH:mm'));
  const [etiqueta, setEtiqueta] = useState(eventoEditar.label);
  const [descripcion, setDescripcion] = useState(eventoEditar.descripcion);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const evento = {
      id: eventoEditar.id,
      title: titulo,
      start: dayjs(inicio).toDate(),
      end: dayjs(fin).toDate(),
      label: etiqueta,
      descripcion: descripcion,
    };

    onEditarEvento(evento);
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
          Editar Evento
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

export default ModalEditarCalendario;
