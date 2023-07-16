import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import CrearTareaFormulario from "../../componentes/crear-tarea";
import GetListas from "../../componentes/get-listas";
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


  
    return (
        <div className="h-screen items-center justify-center overflow-y-hidden">
            { usuario ? //¿Hay usuario? (
                <div className="px-10 md:px-20">
                <nav className="bg-white flex justify-between my-6">
                    <button className="self-center ml-4 lg:ml-8 text-3xl font-bold"
                        onClick={onAbrirVentanaListas}>Tus listas</button>
                    <button className="self-center mr-4 lg:mr-8 text-md text-SlateGray hover:text-MidnightBlue ml-auto"
                        onClick={submitLogout}>Cerrar Sesión</button>
                </nav>
            
                <div className="h-screen grid grid-cols-1 lg:grid-cols-3 gap-20 pb-32">
                    <section id="box-listas"  className="flex flex-col h-full bg-Gainsboro col-span-1 lg:col-span-1 rounded-3xl px-3 py-10 text-center">
                        <GetListas
                            usuario={usuario} 
                            listas={listas} 
                            openVentanaListas={openVentanaListas} 
                            setOpenVentanaListas={setOpenVentanaListas}
                        ></GetListas>
                        <button>
                            <CrearListaFormulario ></CrearListaFormulario>
                            </button>
                    </section>
                    {openVentanaListas === true ? (
                        <section id="box-listas" className="col-span-1 lg:col-span-2">
                            <h1>Hola, {usuario.name}</h1>
                                {openVentanaTareas === true ? (
                                    <VentanaTarea
                                        tareas={tareas}
                                        usuario={usuario}
                                        idLista={idLista}
                                        cargarTareas={cargarTareas}
                                        openVentanaTareas={openVentanaTareas}
                                        setOpenVentanaTareas={setOpenVentanaTareas}
                                    >
                                    </VentanaTarea>
                                    ) : (
                                    <div>
                                        <h1>Antes de empezar... <br /> seleccione una lista.</h1>
                                        <h2>Si no tienes ninguna lista, <br /> añade una lista en 'Crear lista'</h2>
                                    </div>
                                    )}
                        </section>) : <h1>Porfavor, seleccione una lista</h1> }
                </div>
            </div>
            : <div>
                <h1>Cargando...</h1>
                </div>}
        </div>
    )
}
