import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente DialogoBorrarLista:
    - Variables definidas
    - Variable Options dónde se indica el tipo de método del fetch y el contenido
    - Función borrarLista 
      - Petición fetch a la ruta `/users/${usuarioId}/list/${idList}` con método DELETE para borrar las listas del usuario
    - Evento onBorrarListaHandle
    - Evento onCancelarBorrarLista

- Return: 
    - Condicional: Si modalBorrarLista es true: 
      - Mensaje de confirmación
      - Button Aceptar
      - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */


export default function DialogoBorrarLista ({usuarioId, idList, cargarListas, modalBorrarLista, setModalBorrarLista }) {

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function borrarLista(event) {
    const respuesta = await fetch(
      `/users/${usuarioId}/list/${idList}`,
      options
    );
    const datos = await respuesta.json();
    cargarListas(idList);
    location.reload();
  };
    
    const onBorrarListaHandle = () => {
      //Acepta la eliminación de la lista y cierra la ventana modal
      borrarLista();
    };

    const onCancelarBorrarLista = () => { //Cancela la eliminación de la lista y cierra la ventana modal
      setModalBorrarLista(false);
      idList = {};
    };

  return (
    <overlay>
      {modalBorrarLista && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <modal className="bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10">
            <div className="flex items-center justify-center mb-5">
              <FontAwesomeIcon
                className="text-SlateGray text-3xl"
                icon={faTriangleExclamation}
              />
            </div>
            <p className="text-MidnightBlue text-lg font-bold text-center">
              ¿Estás seguro de que deseas borrar la lista?
            </p>
            <p className="text-MidnightBlue text-center text-md font-light">
              Atención: Se borrarán todas las tareas vinculadas a esta lista
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                className="bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin md:text-lg py-2 rounded-md"
                onClick={onBorrarListaHandle}
              >
                Aceptar
              </button>
              <button
                className="bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin md:text-lg py-2 rounded-md"
                onClick={onCancelarBorrarLista}
              >
                Cancelar
              </button>
            </div>
          </modal>
        </div>
      )}
    </overlay>
  );
  }