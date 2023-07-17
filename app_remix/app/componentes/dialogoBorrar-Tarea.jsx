import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function DialogoBorrarTarea({ tareaId, usuarioId, idLista, cargarTareas, modalBorrarTarea, setModalBorrarTarea}) {


  const onCancelarBorrarTarea = () => {
    tareaId = {};
    setModalBorrarTarea(false);
  }

  const onConfirmarBorrarTarea = (() => {
      const options = {
          method: 'DELETE'
      }

      const borrar = fetch (`/${usuarioId}/list/${idLista}/tasks/${tareaId}`, options)
      .then((res) => {  
        if (res.ok) { 
          cargarTareas(idLista);
          setModalBorrarTarea(false);
        } else {
            console.log ("No existe esta tarea");
        }
  })
  });

    return (
      <overlay>
        {modalBorrarTarea && (
          <div className='fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <modal className='bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10'>
              <div className='flex items-center justify-center mb-5'>
                <FontAwesomeIcon className='text-SlateGray text-3xl' icon={faTriangleExclamation} />
              </div>
              <p className="text-MidnightBlue text-lg font-bold">¿Estás seguro de que deseas borrar esta tarea?</p>
              <div className='grid grid-cols-2 gap-3 mt-8'>
                <button className='bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin md:text-lg py-2 rounded-md'
                  onClick={onConfirmarBorrarTarea}>
                  Aceptar
                </button>
                <button className='bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin md:text-lg py-2 rounded-md'
                  onClick={onCancelarBorrarTarea}>
                  Cancelar
                </button>
              </div>
            </modal>
          </div>
        )}
      </overlay>
)}

  