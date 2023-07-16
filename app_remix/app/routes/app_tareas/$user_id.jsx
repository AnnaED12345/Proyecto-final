import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import CrearTareaFormulario from "../../componentes/crear-tarea";
import GetListas from "../../componentes/get-listas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CrearListaFormulario from "../../componentes/dialogoCrear-Lista";



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
    const [openVentanaTareas, setOpenVentanaTareas] = useState(false); //Estado para abrir la ventana de tareas


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


    async function cargarTareas (listId) { 
        console.log("listId getlistass", listId);
        const respuesta = await fetch (`/${user_id}/list/${listId}/tasks`); 
        const datos = await respuesta.json(); //la almacenamos en js  
        setTareas(datos.tareas);
    };

    

    return(
            <div className="h-screen items-center justify-center lg:overflow-y-hidden">
              {usuario ? (
                <div className="mx-10">
                    <div>
                    <nav className="bg-white flex justify-between my-6">
                        <button className="self-center ml-3 text-3xl font-bold" onClick={onAbrirVentanaListas}>Tus listas</button>
                        <button className="self-center lg:mr-8 text-sm text-SlateGray hover:text-MidnightBlue ml-auto" onClick={submitLogout}>
                        Cerrar Sesión
                        <FontAwesomeIcon className="ml-3" icon={faArrowRightFromBracket} />
                        </button>
                    </nav>
                    </div>
        
                        <GetListas
                            usuario={usuario} 
                            listas={listas} 
                            openVentanaListas={openVentanaListas} 
                            setOpenVentanaListas={setOpenVentanaListas}
                        ></GetListas>
                </div>
              ) : (
                <div className="text-SlateGray flex flex-col justify-center items-center h-screen">
                  <FontAwesomeIcon className="text-3xl animate-spin h-10 w-10 mb-10" icon={faSpinner} />
                  <h1 className="text-4xl font-bold mb-3">Cargando...</h1>
                  <h2 className="text-2xl">Porfavor, espere unos segundos.</h2>
                </div>
              )}
            </div>
          );
}
