import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import CrearTareaFormulario from "./crear-tarea";
import DialogoEditarTarea from "./dialogoEditar-Tarea";
import DialogoBorrarTarea from "./dialogoBorrar-Tarea";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente VentanaTareas:
    - Variables definidas
    - Evento mostrarModalEditarTareaHandle
    - Evento mostrarModalBorrarTareaHandle
    
- Return: 
    - Condicional: Si openVentanaTareas es true
        - Componente CrearTareaFormulario
        - Condicional: ¿Hay tareas? 
            - Lista de tareas
                - Tarea
                - Boton Editar -> muestra componente DialogoEditarTarea
                - Boton Borrar -> muestra componente DialogoBorrarTarea
        - No hay tareas:
            - Mensaje que indica que no hay ninguna tarea creada
        - Componente DialogoEditarTarea
        - Componente DialogoBorrarTarea

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function VentanaTareas({
  tareas,
  usuario,
  idLista,
  cargarTareas,
  openVentanaTareas,
  listaTitulo,
}) {
  const [modalBorrarTarea, setModalBorrarTarea] = useState(false); //Boolean. Estado para abrir la ventana modal para BORRAR una tarea
  const [modalEditarTarea, setModalEditarTarea] = useState(false); //Boolean. Estado para abrir la ventana modal para EDITAR una tarea
  const [tareaId, setTareaId] = useState(); //String. Se actualiza con el id de la tarea

  //en este evento visualizamos la ventana modal que permite editar la tarea. Aplicado al botón con el icono {faPen}
  const mostrarModalEditarTareaHandle = (idTarea) => {
    setTareaId(idTarea);
    setModalEditarTarea(true);
  };

  //en este evento visualizamos la ventana modal que permite borrar la tarea. Aplicado al botón con el icono {faTrashCan}
  const mostrarModalBorrarTareaHandle = (idTarea) => {
    setTareaId(idTarea);
    setModalBorrarTarea(true);
  };

  return (
    <div>
      {openVentanaTareas && (
        <div>
          <CrearTareaFormulario
            idLista={idLista}
            cargarTareas={cargarTareas}
            listaTitulo={listaTitulo}
          ></CrearTareaFormulario>
          <div className="h-96 md:h-64 mx-4 overflow-y-auto overflow-y-auto">
            {tareas !== undefined && tareas.length > 0 ? ( //si es asi se verifica si hay tareas
              tareas.map((tarea) => (
                <li
                  className="bg-Gainsboro bg-opacity-50 text-lg rounded-3xl my-3 p-2 px-8 flex justify-between"
                  key={tarea.id}
                >
                  {tarea.descripcion}

                  <div>
                    <button
                      className="px-10"
                      onClick={() => mostrarModalEditarTareaHandle(tarea.id)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      className="btnBorrar"
                      onClick={() => mostrarModalBorrarTareaHandle(tarea.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div>
                <p className="text-xl font-light">No tienes ninguna tarea</p>
              </div>
            )}
          </div>

          <DialogoEditarTarea
            tareaId={tareaId}
            usuarioId={usuario.id}
            idLista={idLista}
            cargarTareas={cargarTareas}
            modalEditarTarea={modalEditarTarea}
            setModalEditarTarea={setModalEditarTarea}
          />
          <DialogoBorrarTarea
            modalBorrarTarea={modalBorrarTarea}
            setModalBorrarTarea={setModalBorrarTarea}
            tareaId={tareaId}
            usuarioId={usuario.id}
            idLista={idLista}
            cargarTareas={cargarTareas}
          />
        </div>
      )}
    </div>
  );
}
