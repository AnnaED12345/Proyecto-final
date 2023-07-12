import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import GetListasUsuarios from "../../componentes/get-listas";
import CrearTareaFormulario from "../../componentes/crear-tarea";



//Pestaña app tareas de cada usuario: 
export default function AppTareas () {
    const {user_id} = useParams(); 
    const [usuario, setUsuario] = useState();
    const [listas, setListas] = useState();

    async function cargarUsuario () { 
        const respuesta = await fetch (`/users/${user_id}/list`); 
        const datos = await respuesta.json(); 
        setUsuario(datos); 
        setListas(datos.listas.id);
    }

    useEffect (() => {
        cargarUsuario ();
        
    }, []);


    async function submitLogout (event) { //cuando se haga un submit // el usuario haga login:
        event.preventDefault();

        const response = await fetch(`/logout`)
        if (response.ok) {
            window.location.href = "/app_tareas/";
        } else {
            console.error("Error en el logout");
        }
    }


    //Función para crear tareas:
  
    return (
        <div>
            { usuario ? //¿Hay usuario?
                <div>
                <nav>
                    <h1>Mis listas</h1>
                    <button onClick={submitLogout}>Cerrar Sesión</button>
                </nav>
                <h1>Hola, {usuario.name}</h1>
                {/* <CrearTareaFormulario listasId={listas}></CrearTareaFormulario> */}
                <GetListasUsuarios></GetListasUsuarios>
           
            </div> //si no hay usuario, que se muestre la siguiente pestaña: 
            : <div>
                {/* añadir un icono de cargando */}
                <h1>Cargando...</h1>
                </div>}
        </div>
    )
}
