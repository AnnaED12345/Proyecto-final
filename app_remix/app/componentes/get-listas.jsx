import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import BotonOpciones from "./btn-opciones";
import DialogoCrearLista from "./dialogoCrear-Lista";
import VentanaTareas from "./ventana-tareas";
import CrearListaFormulario from "./dialogoCrear-Lista";


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

export default function GetListas ({usuario, listas, openVentanaListas}) { 

    console.log("openVentanaListas", openVentanaListas);

    const [listaSeleccionada, setListaSeleccionada] = useState(false); //Estado para abrir el menu de opciones
    const [openVentanaTareas, setOpenVentanaTareas] = useState(false); //Estado para abrir la ventana de tareas
    const [dialogoCrearLista, setDialogoCrearLista] = useState(false);
    const [btnOpciones, setBtnOpciones] = useState(true);
    const [listaTitulo, setlistaTitulo] = useState();
    console.log("listaTitulo", listaTitulo)


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

    const onAbrirListaHandle = ((listId, listaTitulo) => {
        console.log("se hace click");
        setOpenVentanaTareas(true);
        setIdLista(listId);
        cargarTareas(listId);
        setlistaTitulo(listaTitulo)
    });

    const mostrarDialogoCrear = () => {
        console.log("se hace click")
        setDialogoCrearLista(true);
    }

    const onBtnOpcionesHandle = () => {
        console.log("se hace click")
        setListaSeleccionada(idLista)
        setBtnOpciones(btnOpciones ? false : true);
    }


    return (
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 mt-5 ">
              <section id="box-listas" className="flex flex-col bg-Gainsboro col-span-1 md:col-span-1 rounded-3xl px-3 py-2">
                <div className="h-64 lg:h-80 overflow-y-auto m-5 mb-10 rounded-xl overflow-x-hidden">
                    {listas.length > 0 ? (
                    listas.map((lista) => (
                        <ul className="p-2 text-lg text-white" key={lista.id}>
                        <button className="bg-SlateGray hover:bg-MidnightBlue py-1.5 px-6 rounded-3xl flex justify-between w-full"
                            key={lista.id}
                            onClick={() => onAbrirListaHandle(lista.id, lista.titulo)}
                        >
                            {lista.titulo}
                            <button className="ml-6 mt-1" onClick={onBtnOpcionesHandle}>
                            <FontAwesomeIcon className="text-2xl" icon={faEllipsisVertical} />
                            </button>
                        </button>
                        {listaSeleccionada === lista.id && (
                            <BotonOpciones 
                            usuario={usuario}
                            listaId={lista.id}
                            listaSeleccionada={listaSeleccionada}
                            setOpenVentanaTareas={setOpenVentanaTareas}
                            btnOpciones={btnOpciones}
                            setBtnOpciones={setBtnOpciones}
                            />
                        )}
                        </ul>
                  ))
                ) : (
                    <p className="text-center my-10 text-xl font-light">No tienes ninguna lista</p>
                )}
                </div>
                <div className="mb-10 mt-auto mx-auto">
                  <button className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 text-xl font-light px-6" onClick={mostrarDialogoCrear}>
                    Crear Lista
                  </button>
                  <CrearListaFormulario user_id={user_id} dialogoCrearLista={dialogoCrearLista} setDialogoCrearLista={setDialogoCrearLista} />
                </div>
              </section>
      
              <section id="box-tareas" className="col-span-1 md:col-span-2">
                <h1 className="text-3xl mb-3 font-bold">Hola, {usuario.name}</h1>
                {openVentanaTareas === true ? (
                  <VentanaTareas 
                    tareas={tareas}
                    usuario={usuario}
                    idLista={idLista}
                    cargarTareas={cargarTareas}
                    openVentanaTareas={openVentanaTareas}
                    setOpenVentanaTareas={setOpenVentanaTareas}
                    listaTitulo={listaTitulo}
                  ></VentanaTareas>
                ) : (
                  <div className="bg-MidnightBlue p-8 rounded-3xl font-light col-span-1">
                    <h1 className="text-2xl text-white mb-6">Esta es tu App de tareas</h1>
                    <h1 className="text-2xl text-white mb-2">Antes de empezar... seleccione una lista.</h1>
                    <h3 className="text-lg text-white mb-8">Si no tienes ninguna lista, añade una lista en 'Crear lista'</h3>
                  </div>
                )}
              </section>
            </div>
          )   
    }      