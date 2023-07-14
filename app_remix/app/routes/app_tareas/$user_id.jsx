import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import CrearTareaFormulario from "../../componentes/crear-tarea";
import GetListas from "../../componentes/get-listas";



/* Pestaña app tareas de cada usuario: 
- Función que hace una petición GET para cargar el usuario con sus respectivos datos:
- Función que hace una petición GET a la ruta lougot para cerrar sesión
- Render: 
    -  Condicional: ¿Hay usuario?
        - Elemento nav: 
            - mis listas --> elemento que renderiza las listas del usuario
            - boton cerrar sesión --> elemento que cierra la sesión 
        - Componente get-Listas --> carga las listas del usuario
    - No hay usuario: Se muestra un mensaje "Cargando..." 
        */



export default function AppTareas () {
    const {user_id} = useParams(); 
    const [usuario, setUsuario] = useState();
    const [listas, setListas] = useState();

    const [openVentanaListas, setOpenVentanaListas] = useState(true); //Estado para abrir la ventana de tareas

    async function cargarUsuario () { 
        const respuesta = await fetch (`/users/${user_id}/list`); 
        const datos = await respuesta.json(); 
        setUsuario(datos); 
        setListas(datos.listas);
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

    const onAbrirVentanaListas = (() => {
        setOpenVentanaListas(openVentanaListas === true ? false : true);
        cargarUsuario();
    });


  
    return (
        <div>
            { usuario ? //¿Hay usuario?
                <div>
                <nav>
                    <button onClick={onAbrirVentanaListas}>Mis listas</button>
                    <button onClick={submitLogout}>Cerrar Sesión</button>
                </nav>
                <h1>Hola, {usuario.name}</h1>
                <section id="box-listas">
                    <GetListas 
                        usuario={usuario} 
                        listas={listas} 
                        openVentanaListas={openVentanaListas} 
                        setOpenVentanaListas={setOpenVentanaListas}
                    ></GetListas>
                </section>
            </div>
            : <div>
                <h1>Cargando...</h1>
                </div>}
        </div>
    )
}
