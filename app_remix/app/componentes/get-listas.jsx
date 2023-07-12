import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import GetTareas from "./get-tareas";
import BotonOpciones from "./boton-opciones";
import CrearTareaFormulario from "./crear-tarea";
import DialogoCrearLista from "./crear-lista";


//Componente que renderiza las listas del usuario

export default function GetListasUsuarios ({}) { 
    const [open, setOpen] = useState(false); //Estado para abrir el menu de opciones
    

    const {user_id} = useParams();
    const [listas, setListas] = useState([]);
    const [listaTareas, setListaTareas] = useState([]);
    //const [idLista, setidLista] = useState();
    let idLista;

    //sacamos la función del useEffect ya que la necesitaremos en otros componentes para los demás métodos --> la pasaremos con las props
    async function cargarListas () { 
        const respuesta = await fetch (`/users/${user_id}/list`); //la respuesta que recibimos de /tareas
        const datos = await respuesta.json(); //la almacenamos en js
        setListas(datos.listas); //los datos que queremos recibir del usuario son sus tareas y accedemos a ellas con .tareas
    }

     //usamos use effect para hacer un fetch para optimizar la aplicación y que no se haga una petición cada vez que se renderiza
     useEffect (() => {
        cargarListas();
    }, []); //no agregamos dependencias ya que queremos que se haga el fetch únicamente una vez
    
    async function cargarTareas (listId) { 
        const respuesta = await fetch (`/${user_id}/list/${listId}/tasks`); 
        const datos = await respuesta.json(); //la almacenamos en js        
        setListaTareas(datos.tareas);
    };

    const onAbrirListaHandle = ((listId) => { 
        idLista=listId;
        cargarTareas(listId);
    })


    // ---------------- DIALOGO CREAR LISTA ----------------
    const dialogoCrearLista = document.getElementById("dialogo-crear-lista");

    const mostrarDialogoCrear = () => {
        dialogoCrearLista.showModal();
    }



    return (
        <div> 
            { listas.length > 0 ? //¿Hay usuario?
            listas.map((lista) => (
                <div key={lista.id}> 
                    <button onClick={() => setOpen(open? false : true)} >
                        <FontAwesomeIcon icon={faEllipsisVertical}/>
                    </button>
                    {open && (
                        <BotonOpciones user_id={user_id} listaId={lista.id} cargarListas={cargarListas}></BotonOpciones>
                        )}
                    <button key={lista.id} onClick={()=>onAbrirListaHandle(lista.id)}>{lista.titulo}</button>
                    <CrearTareaFormulario idLista={lista.id} cargarTareas={cargarTareas}></CrearTareaFormulario>
                </div>
            ))
            : <h3>No tienes ninguna lista</h3>}

            <GetTareas cargarTareas={cargarTareas} idLista={idLista} listaTareas={listaTareas} />
            
            <button onClick={mostrarDialogoCrear}>Crear Lista</button>
            <DialogoCrearLista user_id={user_id} dialogoCrearLista={dialogoCrearLista}></DialogoCrearLista>


        </div>
    )
}