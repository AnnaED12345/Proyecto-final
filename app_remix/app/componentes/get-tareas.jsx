import { useState } from "react";
import DialogoBorrar from "./dialogoBorrar";
import DialogoEditar from "./dialogoEditar";
import { useParams } from "@remix-run/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTrashCan, faPen  } from '@fortawesome/free-solid-svg-icons';


//Componente que renderiza las tareas de cada lista

/* let tareaId = null; */

export default function GetTareas ({cargarTareas, idLista, listaTareas}) { 
    
    const dialogoBorrar = document.getElementById("borrar_dialogo");
    const {user_id} = useParams();
    const [tareaId, setTareaId] = useState();

    // ---------------- MOSTRAR DIALOGO BORRAR ----------------
    const mostrarDialogoBorrar = (idTarea) => {
        setTareaId(idTarea);
        dialogoBorrar.showModal();
    }
    // ---------------- MOSTRAR DIALOGO BORRAR ----------------

    // ---------------- MOSTRAR DIALOGO EDITAR ----------------
    const editarDialogo = document.getElementById("editar_dialogo");
    const mostrarDialogoEditar = (idTarea) => {
        setTareaId(idTarea);
        editarDialogo.showModal();
    }
// ---------------- MOSTRAR DIALOGO EDITAR ----------------

    return (
        <div>
            { listaTareas.length > 0 ? //¿Hay usuario?
            listaTareas.map((tarea) => (
                    <li key={tarea.id}>{tarea.descripcion}

                    <button className="btnEditar"
                        onClick={() => mostrarDialogoEditar(tarea.id)}>
                            <FontAwesomeIcon icon={faPen} />
                            </button> 

                    <button className="btnBorrar"
                        onClick={() => mostrarDialogoBorrar(tarea.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            </button> 
                    </li>
            ))
            : <h3>No tienes ninguna tarea</h3>}           

            <DialogoBorrar dialogoBorrar={dialogoBorrar} user_id={user_id} list_id={idLista} tareaID={tareaId} cargarTareas={cargarTareas} />
            <DialogoEditar user_id={user_id} list_id={idLista} tareaID={tareaId} cargarTareas={cargarTareas} /> 
        
        </div>
    )
}
