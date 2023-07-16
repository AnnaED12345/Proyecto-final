import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function DialogoBorrarLista ({usuarioId, idList, cargarListas, modalBorrarLista, setModalBorrarLista }) {
  
  const onCancelarBorrarLista = () => {
    setModalBorrarLista(false);
    idList = {};
};

    const options = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    };

    async function borrarLista (event) { 
        const respuesta = await fetch (`/users/${usuarioId}/list/${idList}`, options); 
        const datos = await respuesta.json(); 
        cargarListas(idList);
        location.reload();
    };
    
    const onBorrarListaHandle = (() => {  
        borrarLista();        
    });


    return (
      <overlay>
        {modalBorrarLista && (
          <div className='fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center' >
            <modal className='bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10'>
                <FontAwesomeIcon className='text-SlateGray text-3xl mb-5' icon={faTriangleExclamation} />
                <p className="text-MidnightBlue">¿Estás seguro de que deseas borrar esta lista?</p>
                <p className="text-MidnightBlue">Atención: Se borrarán todas las tareas vinculadas a esta lista</p>
                <div className='grid grid-cols-2 gap-3 mt-6'>
                        <button className='bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin md:text-lg py-2 rounded-md'
                            onClick={onBorrarListaHandle}>
                            Aceptar
                        </button>
                        <button className='bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin md:text-lg py-2 rounded-md'
                            onClick={onCancelarBorrarLista}>
                            Cancelar
                        </button>
                    </div>
            </modal>
        </div>)}
      </overlay>
    );
  }