import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import GetListasUsuarios from "../../componentes/listas";



//Pestaña app tareas de cada usuario: 
export default function AppTareas () {
    const {user_id} = useParams(); 
    const [usuario, setUsuario] = useState();

    async function cargarUsuario () { 
        const respuesta = await fetch (`/users/${user_id}/list`); 
        const datos = await respuesta.json(); 
        setUsuario(datos); 
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
                <GetListasUsuarios></GetListasUsuarios>
                {/* añadir componente lista tareas */}
           
            </div> //si no hay usuario, que se muestre la siguiente pestaña: 
            : <div>
                {/* añadir un icono de cargando */}
                <h1>Cargando...</h1>
                </div>}
        </div>
    )
}
