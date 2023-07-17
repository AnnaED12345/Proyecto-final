import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTrashCan, faPen  } from '@fortawesome/free-solid-svg-icons';
import CrearTareaFormulario from "./crear-tarea";
import DialogoEditarTarea from './dialogoEditar-Tarea';
import DialogoBorrarTarea from './dialogoBorrar-Tarea';
import { useState } from 'react';


export default function VentanaTareas ({tareas, usuario, idLista, cargarTareas, openVentanaTareas, listaTitulo}) {

    const [modalBorrarTarea, setModalBorrarTarea] = useState(false);
    const [modalEditarTarea, setEditarBorrarTarea] = useState(false);

    const [tareaId, setTareaId] = useState() 

     // ---------------- MOSTRAR DIALOGO EDITAR ----------------
     
     const mostrarDialogoEditarTarea = (idTarea) => {
        setTareaId(idTarea);
        setEditarBorrarTarea(true);
    }
   // ---------------- MOSTRAR DIALOGO EDITAR ----------------


   // ---------------- MOSTRAR DIALOGO BORRAR ----------------
   const mostrarDialogoBorrarTarea = (idTarea) => {
       setTareaId(idTarea);
       setModalBorrarTarea(true);
   }
   // ---------------- MOSTRAR DIALOGO BORRAR ----------------


    return (
        <div>
            {openVentanaTareas && (
            <div>
                <CrearTareaFormulario idLista={idLista} cargarTareas={cargarTareas} listaTitulo={listaTitulo}></CrearTareaFormulario>
                <div className='h-80 overflow-y-auto mt-2 overflow-y-auto'>
                    {tareas!==undefined && tareas.length > 0 ? ( //si es asi se verifica si hay tareas
                    tareas.map((tarea) => (
                        <li className='bg-Gainsboro bg-opacity-50  rounded-3xl my-4 p-3 px-10 flex justify-between'
                        key={tarea.id}>{tarea.descripcion}
                        
                        <div>
                            <button className='px-10'
                            onClick={() => mostrarDialogoEditarTarea(tarea.id)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button className="btnBorrar" onClick={() => mostrarDialogoBorrarTarea(tarea.id)}>
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
                setEditarBorrarTarea={setEditarBorrarTarea}
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
    )
}