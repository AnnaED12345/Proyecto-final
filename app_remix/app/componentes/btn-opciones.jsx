import { useParams } from "@remix-run/react";
import DialogoBorrarLista from "./dialogoBorrar-Lista";
import { useEffect, useState } from "react";
import DialogoEditarLista from "./dialogoEditar-Lista";


export default function BotonOpciones ({usuario, listaId, btnOpciones, settnOpciones}) {
   
    /* const dialogoBorarLista = document.getElementById("dialogo-borrar-lista"); */
    const opciones = ["Editar", "Borrar"] //menu de opciones
    const [listas, setListas] = useState();
    //const [idList, setIdList] = useState(null);

    const[modalBorrarLista, setModalBorrarLista]= useState(false);
    const[modalEditarLista, setModalEditarLista]= useState(false);


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
        setModalBorrarLista(true);
    }

    const mostrarDialogoEditarLista = () => {
        setModalEditarLista(true);
    }


    return (
        <div>
            {btnOpciones && ( 
            <ul>{opciones.map((opcion) => (
                <button className="text-MidnightBlue px-4 pt-2"
                id="opciones" key={opcion} 
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
            </ul>)}
    
            <DialogoBorrarLista 
                usuarioId={usuario.id} 
                idList={listaId} 
                cargarListas={cargarListas}
                modalBorrarLista={modalBorrarLista}
                setModalBorrarLista={setModalBorrarLista}></DialogoBorrarLista>
            <DialogoEditarLista 
                usuarioId={usuario.id} 
                idList={listaId} 
                cargarListas={cargarListas}
                modalEditarLista={modalEditarLista}
                setModalEditarLista={setModalEditarLista} ></DialogoEditarLista>
        </div>
    )
}