import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

//Componente que renderiza las listas del usuario

export default function GetListasUsuarios ({}) { 
    const opciones = ["Editar", "Borrar"] //menu de opciones
    const [open, setOpen] = useState(false); //Estado para abrir el menu de opciones
    

    const {user_id, list_id} = useParams();
    const [listas, setListas] = useState([]);
    const [listaTareas, setListaTareas] = useState([]);
    console.log("listaTareas:", listaTareas);
    console.log("list_id", list_id);


    //sacamos la función del useEffect ya que la necesitaremos en otros componentes para los demás métodos --> la pasaremos con las props
    async function cargarListas () { 
        const respuesta = await fetch (`/users/${user_id}/list`); //la respuesta que recibimos de /tareas
        const datos = await respuesta.json(); //la almacenamos en js
        setListas(datos.listas); //los datos que queremos recibir del usuario son sus tareas y accedemos a ellas con .tareas
        idList = list_id
    }

     //usamos use effect para hacer un fetch para optimizar la aplicación y que no se haga una petición cada vez que se renderiza
     useEffect (() => {
        cargarListas();
    }, []); //no agregamos dependencias ya que queremos que se haga el fetch únicamente una vez

    const onAbrirListaHandle = ((event) => {
        event.preventDefault();

        console.log("Se hace click")
        async function cargarTareas (list_id) { 
            const respuesta = await fetch (`/${user_id}/list/${list_id}/tasks`); 
            const datos = await respuesta.json(); //la almacenamos en js
            setListaTareas(datos.tareas); //los datos que queremos recibir del usuario son sus tareas y accedemos a ellas con .tareas
        }
        cargarTareas();
    })


    return (
        <div> { listas.length > 0 ? //¿Hay usuario?
            listas.map((lista) => (
                <div key={lista.id}> 
                    <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setOpen(open? false : true)} />
                    {open && (
                        <ul>{opciones.map((opcion) => (
                            <button key={opcion} onClick={() => setOpen(false)}>{opcion}</button>
                        ))}</ul>
                    )}
                    <button onClick={onAbrirListaHandle}>{lista.titulo}</button>
                </div>
            ))
            : <h3>No tienes ninguna lista</h3>}
            
            <button>Crear Lista</button>
            
        </div>
    )
}