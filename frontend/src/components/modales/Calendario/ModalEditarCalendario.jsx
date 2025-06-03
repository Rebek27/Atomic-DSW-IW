import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


/**
 * Componente ModalEditarCalendario
 * Permite editar un evento ya existente en el calendario.
 */

const ModalEditarCalendario = ({ eventoEditar, onEditarEvento, cerrarModal }) => {
  const [titulo, setTitulo] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [descripcion, setDescripcion] = useState('');


  ///INICIALIZA
  useEffect(() => {
    if (eventoEditar) {
      setTitulo(eventoEditar.title || '');
      setInicio(dayjs(eventoEditar.fechaInicio).format('YYYY-MM-DDTHH:mm'));
      setFin(dayjs(eventoEditar.fechaFin).format('YYYY-MM-DDTHH:mm'));
      setEtiqueta(eventoEditar.etiqueta || 'otro');
      setDescripcion(eventoEditar.descripcion || '');
    }
  }, [eventoEditar]);

  /**
    * Maneja el envío del formulario
    * Convierte las fechas y envía el nuevo objeto actualizado al componente padre
    */
  const manejarEnvio = (e) => {
    e.preventDefault();
    const evento = {
      id: eventoEditar.idEvento,
      title: titulo,
      fechaInicio: dayjs(inicio).toDate(),
      fechaFin: dayjs(fin).toDate(),
      etiqueta: etiqueta,
      descripcion: descripcion,
    };

    onEditarEvento(evento);// Llama a la función del padre para guardar cambios 
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