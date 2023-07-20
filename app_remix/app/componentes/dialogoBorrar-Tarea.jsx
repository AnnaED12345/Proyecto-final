import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente DialogoBorrarTarea:
    - Variables definidas
    - Variable Options dónde se indica el tipo de método del fetch y el contenido
    - Función confirmarBorrarTarea 
      - Petición fetch a la ruta `/${usuarioId}/list/${idLista}/tasks/${tareaId}` con método DELETE para borrar las tareas del usuario
    - Evento onCancelarBorrarTareaHandle

- Return: 
    - Condicional: Si modalBorrarTarea es true: 
      - Mensaje de confirmación
      - Button Aceptar
      - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function DialogoBorrarTarea({
  tareaId,
  usuarioId,
  idLista,
  cargarTareas,
  modalBorrarTarea,
  setModalBorrarTarea,
}) {
  //aplicado al botón Aceptar:
  const confirmarBorrarTarea = () => {
    const options = {
      method: "DELETE",
    };

    const borrar = fetch(
      `/${usuarioId}/list/${idLista}/tasks/${tareaId}`,
      options
    ).then((res) => {
      if (res.ok) {
        cargarTareas(idLista);
        setModalBorrarTarea(false); //cierra la ventana modal
      } else {
        console.log("No existe esta tarea");
      }
    });
  };

  //Cancela la edición de la tarea y cierra la ventana modal. Aplicado al boton Cancelar
  const onCancelarBorrarTareaHandle = () => {
    tareaId = {};
    setModalBorrarTarea(false);
  };

  return (
    <overlay>
      {modalBorrarTarea && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <modal className="bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10">
            <div className="flex items-center justify-center mb-5">
              <FontAwesomeIcon
                className="text-SlateGray text-3xl"
                icon={faTriangleExclamation}
              />
            </div>
            <p className="text-MidnightBlue text-lg font-bold">
              ¿Estás seguro de que deseas borrar esta tarea?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                className="bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin md:text-lg py-2 rounded-md"
                onClick={confirmarBorrarTarea}
              >
                Aceptar
              </button>
              <button
                className="bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin md:text-lg py-2 rounded-md"
                onClick={onCancelarBorrarTareaHandle}
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
