import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";

//Pestaña app tareas de cada usuario: 
export default function AppTares () {
    const {user_id} = useParams(); 
    const [usuario, setUsuario] = useState();
    console.log(usuario)

    const [listas, setListas] = useState([]);
    const [tareas, setTareas] = useState([]);

    async function cargarUsuario () { 
        const respuesta = await fetch (`/users/${user_id}/list`); 
        const datos = await respuesta.json(); 
        setUsuario(datos); 
    }

    useEffect (() => {
        cargarUsuario ();
        
    }, []);

    //sacamos la función del useEffect ya que la necesitaremos en otros componentes para los demás métodos --> la pasaremos con las props
    async function cargarListas () { 
        const respuesta = await fetch (`/users/${user_id}/list`); //la respuesta que recibimos de /tareas
        const datos = await respuesta.json(); //la almacenamos en js
        setListas(datos.lista); //los datos que queremos recibir del usuario son sus tareas y accedemos a ellas con .tareas
    }

     //usamos use effect para hacer un fetch para optimizar la aplicación y que no se haga una petición cada vez que se renderiza
     useEffect (() => {
        cargarListas ();
        
    }, []); //no agregamos dependencias ya que queremos que se haga el fetch únicamente una vez


    async function submitLogout (event) { //cuando se haga un submit // el usuario haga login:
        event.preventDefault();

        const response = await fetch(`/logout`)
        if (response.ok) {
            window.location.href = "/app_tareas/";
        } else {
            console.error("Error en el logout");
        }
    }


    return (
        <div>
            { usuario ? //¿Hay usuario?
                <div>
                <nav>
                    <h1>Mis listas</h1>
                    <button onClick={submitLogout}>Cerrar Sesión</button>
                </nav>
                <h2>Hola, {usuario.name}</h2>
                <h1>Añade una tarea</h1>
                {/* añadir componente listas */}
                {/* añadir componente lista tareas */}
           
            </div> //si no hay usuario, que se muestre la siguiente pestaña: 
            : <div>
                {/* añadir un icono de cargando */}
                <h1>Cargando...</h1>
                </div>}
        </div>
    )
}
