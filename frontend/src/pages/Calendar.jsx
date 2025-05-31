import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ModalCalendario from '../components/modales/Calendario/ModalCalendario';
import ModalEditarCalendario from '../components/modales/Calendario/ModalEditarCalendario';
import { FaTrash } from 'react-icons/fa';
import * as ES from '../services/events/eventServices';


//CAMBiar idioma a español
dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

const etiquetas = {
  importante: "#a43636", // Rojo
  medico: "#2c89ab", // Azul
  estudio: "#57884e", // Verde
  personal: "#c18a3c", // Amarillo
  otro: "#949494", // Gris
};

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Sin eventos"
};



const MiCalendario = () => {
  const [eventos, setEventos] = useState([]);
  const [esModalAbierto, setEsModalAbierto] = useState(false);
  const [eventoEditar, setEventoEditar] = useState(null);
  const [filtroEtiqueta, setFiltroEtiqueta] = useState("todas");
  const [filtroTiempo, setFiltroTiempo] = useState("todos");



  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await ES.getEventList();
        console.log('Eventos traídos del back', data);

        const eventosFormateados = data.map((evento) => ({
          ...evento,
          fechaInicio: dayjs(evento.fechaInicio).toDate(),
          fechaFin: dayjs(evento.fechaFin).toDate(),
        }));

        eventosFormateados.sort((a, b) => a.fechaInicio - b.fechaInicio);

        if (JSON.stringify(eventos) !== JSON.stringify(eventosFormateados)) {
          setEventos(eventosFormateados);
        }
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    }

    fetchData();
  }, []); 

  // --- Filtro combinado de etiqueta y tiempo ---
  const eventosFiltrados = eventos.filter((evento) => {
    const ahora = dayjs();

    // Filtrado por etiqueta
    if (filtroEtiqueta !== "todas" && evento.etiqueta !== filtroEtiqueta) return false;

    // Filtrado por tiempo
    if (filtroTiempo === "pasados" && dayjs(evento.fechaFin).isBefore(ahora)) return true;
    if (filtroTiempo === "proximos" && dayjs(evento.fechaInicio).isAfter(ahora)) return true;
    if (filtroTiempo === "todos") return true;

    return false;
  });

  const manejarAgregarEvento = async (nuevoEvento) => {
    // const updatedEventos = [...eventos, nuevoEvento];
    try {
      const res = await ES.createEvent(nuevoEvento); // BACKEND ------------------- Llamado a api
      console.log(res.data);
      setEventos([
        ...eventos,
        nuevoEvento,
      ]);
      console.log('Eventos: ', eventos);
    } catch (error) {
      console.log(error);
    }
  };

  const manejarEditarEvento = async (eventoEditado) => {
    try {// BACKEND ------------------- Llamado a api
      const res = await ES.updateEvent(eventoEditado.id, eventoEditado);
      console.log(res.data);
      // Actualizar el estado de eventos de forma inmutable
      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.idEvento === eventoEditado.id ? { ...evento, ...eventoEditado } : evento
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const manejarEliminarEvento = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este evento?");
    if (confirmacion) {
      try {
        const res = await ES.deleteEvent(id);
        console.log(res);
        const eventosActualizados = eventos.filter(evento => evento.id !== id);
        setEventos(eventosActualizados);
      } catch (error) {
        console.log(error);
      }
      // BACKEND -------------------Llamado a api
    }
  };

  const manejarEventoClick = (evento) => {
    abrirModal(evento);
  };

  const cerrarModal = () => {
    setEsModalAbierto(false);
    setEventoEditar(null);
  };

  const abrirModal = (evento = null) => {
    setEsModalAbierto(true);
    setEventoEditar(evento);
    //console.log(evento)
  };


  return (
    <div className="flex flex-col rounded-2xl border border-gray-300 bg-white dark:border-gray-800 dark:bg-white/[0.20]">
      <div className="w-full p-4 flex justify-between items-center border-b">
        <h2 className="p-2 text-3xl font-semibold">Calendario</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-[#5764e3] text-white py-2 px-4 rounded-md text-sm"
        >
          Agregar Evento +
        </button>
      </div>



      <div className="flex">
        {/*---------------  Lista de eventos a la izquierda  ------------------*/}
        <div className="w-1/4 p-4 border-r">
          <div className="mb-4">
            <label className="block font-semibold">Filtrar por:</label>
            <select
              className="w-full p-2 border rounded-md"
              value={filtroTiempo}
              onChange={(e) => setFiltroTiempo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="proximos">Próximos</option>
              <option value="pasados">Pasados</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Filtrar por etiqueta:</label>
            <select
              className="w-full p-2 border rounded-md"
              value={filtroEtiqueta}
              onChange={(e) => setFiltroEtiqueta(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="importante">Importante</option>
              <option value="medico">Médico</option>
              <option value="estudio">Estudio</option>
              <option value="personal">Personal</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <ul className="space-y-4 max-h-[700px] overflow-y-auto">
            {eventosFiltrados.map((evento) => (
              <li
                key={evento.idEvento}
                className="p-1 border rounded-md shadow-sm cursor-pointer relative"
                onClick={() => manejarEventoClick(evento)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    manejarEliminarEvento(evento.idEvento);
                  }}
                  className="absolute top-2 right-2 text-red-300 hover:text-red-700 text-xs"
                >
                  <FaTrash />
                </button>

                <h5 className="font-semibold">{evento.title}</h5>
                <p className="text-sm">{dayjs(evento.fechaInicio).format('DD/MM/YYYY HH:mm')} - {dayjs(evento.fechaFin).format('DD/MM/YYYY HH:mm')}</p>
                <p className="text-sm text-gray-600">{evento.descripcion}</p>

                {(() => {
                  if (etiquetas[evento.etiqueta] === "#a43636") {
                    return (
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Importante</span>
                    );
                  } else if (etiquetas[evento.etiqueta] === "#2c89ab") {
                    return (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Medico</span>
                    );
                  } else if (etiquetas[evento.etiqueta] === "#57884e") {
                    return (
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Estudio</span>
                    );
                  } else if (etiquetas[evento.etiqueta] === "#c18a3c") {
                    return (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">Personal</span>
                    );
                  } else {
                    return (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">Otro</span>
                    );
                  }
                })()}
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------------ */}

        {/* Calendario a la derecha */}
        <div className="w-3/4 p-4">
          {esModalAbierto && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-30">
              <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                  {eventoEditar ? 'Editar Evento' : 'Agregar Evento'}
                </h2>
                {eventoEditar ? (
                  <ModalEditarCalendario
                    eventoEditar={eventoEditar}
                    onEditarEvento={manejarEditarEvento}
                    cerrarModal={cerrarModal}
                  />
                ) : (
                  <ModalCalendario
                    onAgregarEvento={manejarAgregarEvento}
                    cerrarModal={cerrarModal}
                  />
                )}
              </div>
            </div>
          )}



          <div style={{ height: 650 }}>
            <Calendar
              localizer={localizer}
              events={eventos}
              messages={messages}
              startAccessor="fechaInicio"
              endAccessor="fechaFin"
              eventPropGetter={(event) => {
                return {
                  style: {
                    backgroundColor: etiquetas[event.etiqueta],
                    borderRadius: "5px",
                    color: 'white',
                    fontSize: '0.85rem',
                  }
                };
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiCalendario;
