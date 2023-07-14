import { useParams } from "@remix-run/react";
import DialogoBorrarLista from "./dialogoBorrar-Lista";
import { useEffect, useState } from "react";
import DialogoEditarLista from "./dialogoEditar-Lista";


export default function BotonOpciones ({usuario, listaId, listaSeleccionada, setListaSeleccionada}) {
   
    /* const dialogoBorarLista = document.getElementById("dialogo-borrar-lista"); */
    const opciones = ["Editar", "Borrar"] //menu de opciones
    const [listas, setListas] = useState();
    //const [idList, setIdList] = useState(null);

    //sacamos la función del useEffect ya que la necesitaremos en otros componentes para los demás métodos --> la pasaremos con las props
    async function cargarListas () { 
        const respuesta = await fetch (`/users/${usuario.id}/list`); //la respuesta que recibimos de /tareas
        const datos = await respuesta.json(); //la almacenamos en js
        setListas(datos.listas); //los datos que queremos recibir del usuario son sus tareas y accedemos a ellas con .tareas
    }

     //usamos use effect para hacer un fetch para optimizar la aplicación y que no se haga una petición cada vez que se renderiza
    /*  useEffect (() => {
        cargarListas();
    }, []); */ //no agregamos dependencias ya que queremos que se haga el fetch únicamente una vez

    const mostrarDialogoBorrarLista = () => {
        document.getElementById("dialogo-borrar-lista").showModal();
    }

    const mostrarDialogoEditarLista = () => {
        document.getElementById("dialogo-editar-lista").showModal();
    }


    return (
        <div>
            <ul>{opciones.map((opcion) => (
                <button id="opciones" key={opcion} 
                    onClick={() => {
                        if (opcion === "Borrar") { 
                            mostrarDialogoBorrarLista(listaId);
                        } else if (opcion === "Editar") { 
                            mostrarDialogoEditarLista(listaId);
                    }
                }}>
                    {opcion}
                </button>
                ))}
                <button>Cancelar</button>
            </ul>
    
            <DialogoBorrarLista usuarioId={usuario.id} idList={listaId} cargarListas={cargarListas}></DialogoBorrarLista>
            <DialogoEditarLista usuarioId={usuario.id} idList={listaId} cargarListas={cargarListas} ></DialogoEditarLista>
        </div>
    )
}