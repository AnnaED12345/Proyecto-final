import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import BotonOpciones from "./btn-opciones";
import DialogoCrearLista from "./dialogoCrear-Lista";
import VentanaTareas from "./ventana-tareas";


/* Componente que renderiza las listas del usuario 
- Función para cargar las tareas
- Función para abrir la lista
- Render:
    - Listas del usuario:
        Dentro se renderiza el componente get-Tareas:
            - Formulario para crear tarea
            - Boton de opciones
                - Boton Editar
                - Boton Borrar
            - Tareas
*/

export default function GetListas ({usuario, listas, openVentanaListas, setOpenVentanaListas}) { 

    console.log("openVentanaListas", openVentanaListas);

    const [listaSeleccionada, setListaSeleccionada] = useState(false); //Estado para abrir el menu de opciones
    const [openVentanaTareas, setOpenVentanaTareas] = useState(false); //Estado para abrir la ventana de tareas

    const {user_id} = useParams();
   /*  const [listas, setListas] = useState([]); */
    const [tareas, setTareas] = useState([]); //variable que almacena las tareas

    const [idLista, setIdLista] = useState(); 
    
    async function cargarTareas (listId) { 
        console.log("listId getlistass", listId);
        const respuesta = await fetch (`/${user_id}/list/${listId}/tasks`); 
        const datos = await respuesta.json(); //la almacenamos en js  
        setTareas(datos.tareas);
    };

    const onAbrirListaHandle = ((listId) => {
        setOpenVentanaTareas(true);
        setIdLista(listId);
        cargarTareas(listId);
    });


    // ---------------- DIALOGO CREAR LISTA ----------------
    const dialogoCrearLista = document.getElementById("dialogo-crear-lista");

    const mostrarDialogoCrear = () => {
        dialogoCrearLista.showModal();
    }



    return (
        <div>
           {openVentanaListas === true ? (
            <div>
                {listas.length > 0 ? // ¿Hay lista?
                listas.map((lista) => ( // Se renderiza un listado de las listas del usuario
                    <ul key={lista.id}>
                    <button key={lista.id} onClick={() => onAbrirListaHandle(lista.id)}>{lista.titulo}</button>
                    <button onClick={() => setListaSeleccionada(lista.id)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    {listaSeleccionada == lista.id && (
                    <BotonOpciones 
                    usuario={usuario} 
                    listaId={lista.id} 
                    listaSeleccionada={listaSeleccionada}
                    setOpenVentanaTareas={setOpenVentanaTareas}></BotonOpciones>)}
                    </ul>
                ))
                : <div>
                    <p>No tienes ninguna lista</p>
                </div>
                }
            
                {openVentanaTareas === true ? (
                <VentanaTareas
                    tareas={tareas}
                    usuario={usuario}
                    idLista={idLista}
                    cargarTareas={cargarTareas}
                    openVentanaTareas={openVentanaTareas}
                    setOpenVentanaTareas={setOpenVentanaTareas}
                >
                </VentanaTareas>
                ) : (
                <div className="pb-72">
                    <h1>Antes de empezar... <br /> seleccione una lista.</h1>
                    <h2>Si no tienes ninguna lista, <br /> añade una lista en 'Crear lista'</h2>
                </div>
                )}
                <button className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 font-3xl font-light px-6"
                onClick={mostrarDialogoCrear}>Crear Lista</button>
                <DialogoCrearLista user_id={user_id} dialogoCrearLista={dialogoCrearLista}></DialogoCrearLista>
            </div>
            ) : (
                <button className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 font-3xl font-light px-6"
                onClick={mostrarDialogoCrear}>Crear Lista</button>
            )}
        </div>
      );
    }      