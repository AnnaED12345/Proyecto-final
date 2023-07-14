import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTrashCan, faPen  } from '@fortawesome/free-solid-svg-icons';
import CrearTareaFormulario from "./crear-tarea";
import DialogoEditarTarea from './dialogoEditar-Tarea';
import DialogoBorrarTarea from './dialogoBorrar-Tarea';
import { useState } from 'react';


export default function VentanaTareas ({tareas, usuario, idLista, cargarTareas, openVentanaTareas, setopenVentanaTareas}) {

    const dialogoBorrarTarea = document.getElementById("borrar_dialogo");
    const dialogoEditarTarea = document.getElementById("editar-dialogo-tarea");

    const [tareaId, setTareaId] = useState() 

     // ---------------- MOSTRAR DIALOGO EDITAR ----------------
     
     const mostrarDialogoEditarTarea = (idTarea) => {
        setTareaId(idTarea);
        dialogoEditarTarea.showModal();
    }
   // ---------------- MOSTRAR DIALOGO EDITAR ----------------


   // ---------------- MOSTRAR DIALOGO BORRAR ----------------
   const mostrarDialogoBorrarTarea = (idTarea) => {
       setTareaId(idTarea);
       dialogoBorrarTarea.showModal();
   }
   // ---------------- MOSTRAR DIALOGO BORRAR ----------------


    return (
        <div>
            {openVentanaTareas && (
            <div>
                <CrearTareaFormulario idLista={idLista} cargarTareas={cargarTareas}></CrearTareaFormulario>
                {tareas!==undefined && tareas.length > 0 ? ( //si es asi se verifica si hay tareas
                    tareas.map((tarea) => (
                        <li key={tarea.id}>{tarea.descripcion}

                            <button className="btnEditar" onClick={() => mostrarDialogoEditarTarea(tarea.id)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button className="btnBorrar" onClick={() => mostrarDialogoBorrarTarea(tarea.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />                                
                            </button>
                        </li>
                    ))
                    ) : (
                        <div>
                            <h3>No tienes ninguna tarea</h3>
                        </div>
                        )}
                    
                <DialogoEditarTarea 
                dialogoEditarTarea={dialogoEditarTarea} 
                tareaId={tareaId} 
                usuarioId={usuario.id} 
                idLista={idLista} 
                cargarTareas={cargarTareas} 
                /> 
                <DialogoBorrarTarea 
                dialogoBorrarTarea={dialogoBorrarTarea} 
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