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

export default function GetListas ({usuario, listas, openVentanaListas, setOpenVentanaListas}) { 

    console.log("openVentanaListas", openVentanaListas);

    const [listaSeleccionada, setListaSeleccionada] = useState(false); //Estado para abrir el menu de opciones
    const [openVentanaTareas, setOpenVentanaTareas] = useState(false); //Estado para abrir la ventana de tareas
    const [dialogoCrearLista, setDialogoCrearLista] = useState(false);
    const [btnOpciones, setBtnOpciones] = useState(true);


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
        console.log("se hace click");
        setOpenVentanaTareas(true);
        setIdLista(listId);
        cargarTareas(listId);
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
        <div>
          {openVentanaListas === true ? (
            <div className="h-screen grid grid-cols-1 lg:grid-cols-3 gap-20 pb-32">
              <section id="box-listas" className="flex flex-col h-full bg-Gainsboro col-span-1 lg:col-span-1 rounded-3xl px-3 py-10 text-center">
                {listas.length > 0 ? (
                  listas.map((lista) => (
                    <ul className="p-2 text-white mx-auto" key={lista.id}>
                        <button className="bg-SlateGray hover:bg-MidnightBlue py-2 px-6 rounded-3xl w-60 flex justify-between" 
                            key={lista.id} onClick={() => onAbrirListaHandle(lista.id)}>
                            {lista.titulo}
                            <button className="ml-6" onClick={onBtnOpcionesHandle}>
                            <FontAwesomeIcon className="text-xl" icon={faEllipsisVertical} />
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
                  <div>
                    <p>No tienes ninguna lista</p>
                  </div>
                )}
                <div className="mt-10 lg:mt-auto mx-auto ">
                  <button className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 font-3xl font-light px-6" onClick={mostrarDialogoCrear}>
                    Crear Lista
                  </button>
                  <CrearListaFormulario user_id={user_id} dialogoCrearLista={dialogoCrearLista} setDialogoCrearLista={setDialogoCrearLista} />
                </div>
              </section>
      
              <section id="box-tareas" className="col-span-1 lg:col-span-2">
                <h1 className="text-3xl mb-5">Hola, {usuario.name}</h1>
                {openVentanaTareas === true ? (
                  <VentanaTareas
                    tareas={tareas}
                    usuario={usuario}
                    idLista={idLista}
                    cargarTareas={cargarTareas}
                    openVentanaTareas={openVentanaTareas}
                    setOpenVentanaTareas={setOpenVentanaTareas}
                  ></VentanaTareas>
                ) : (
                  <div className="bg-MidnightBlue p-5 rounded-3xl font-light col-span-1">
                    <h1 className="text-2xl text-white mb-6">Atención</h1>
                    <h1 className="text-2xl text-white mb-1">Antes de empezar... seleccione una lista.</h1>
                    <h3 className="text-lg text-white mb-4">Si no tienes ninguna lista, añade una lista en 'Crear lista'</h3>
                  </div>
                )}
              </section>
            </div>
          ) : (
            <div>
            <p className="my-10 font-3xl font-light">
              Para empezar debes crear al menos una lista. 
            </p>
            <button className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 font-3xl font-light px-6" onClick={mostrarDialogoCrear}>
              Crear Lista
            </button>
            <CrearListaFormulario user_id={user_id} dialogoCrearLista={dialogoCrearLista} setDialogoCrearLista={setDialogoCrearLista} />
          </div>
          )}
        </div>
      );
      
    }      