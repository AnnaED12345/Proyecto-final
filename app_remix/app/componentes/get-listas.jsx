import { useParams } from "@remix-run/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import BotonOpciones from "./btn-opciones";
import VentanaTareas from "./ventana-tareas";
import CrearListaFormulario from "./dialogoCrear-Lista";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA:
- Componente GetListas:
  - Variables definidas
  - Función cargarTareas
    - Petición fetch a la ruta `/${user_id}/list/${listId}/tasks` con método GET para cargar las tareas del usuario.
  - Evento onAbrirListaHandle.
  - Evento mostrarDialogoCrearHandle. 
  - Evento onBtnOpcionesHandle

- Render: 
  - Sección Listas: 
  Condicional ¿hay listas?
    - Div: 
      - Elemento ul con cada una de las listas añadidas por el usuario. 
      - Botón de opciones en cada lista
  No hay ninguna lista
      - Párrafo: Mensaje que indica que el usuario no tiene ninguna lista creada.  
    - Div:
      - Botón crear lista que muestra el componente CrearListaFormulario
      - Componente CrearListaFormulario
    Sección Tareas: 
    Condicional ¿Se está renderizando la VentanaTareas?
      - h1 (saludo usuario)
      - Componente VentanaTareas
    No se renderiza la Ventana tareas
      - Se muestra un mensaje que indica que se debe seleccionar una lista para emepezar a crear tareas dentro de la lista seleccionada.

* COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
*/

export default function GetListas({ usuario, listas }) {
  const [listaSeleccionada, setListaSeleccionada] = useState(false); //Boolean. Estado para abrir el menu de opciones de cada lista.
  const [openVentanaTareas, setOpenVentanaTareas] = useState(false); //Boolean. Estado para abrir el componente VentanaTareas.
  const [modalCrearLista, setModalCrearLista] = useState(false); //Boolean. Estado para abrir la ventana modal para crear una lista.
  const [btnOpciones, setBtnOpciones] = useState(false); //Boolean. Estado para el boton de opciones.
  const [listaTitulo, setlistaTitulo] = useState(); //almacena el titulo de la lista para ser utilizado posteriormente en VentanaTareas. Inicialmente es undefined y almacena un string al hacer click en una lista.
  const { user_id } = useParams(); //String. Recoge el id del usuario de los parametros de la ruta.
  const [tareas, setTareas] = useState([]); //Array. Contiene id, descripción y listaID de cada tarea
  const [idLista, setIdLista] = useState(); //String. Se actualiza con el id de la lista

  async function cargarTareas(listId) {
    const respuesta = await fetch(`/${user_id}/list/${listId}/tasks`);
    const datos = await respuesta.json();
    setTareas(datos.tareas);
  }

  //Al hacer click en la lista se abre una ventana con sus respectivas tareas. Aplicado a cada lista.
  const onAbrirListaHandle = (listId, listaTitulo) => {
    setOpenVentanaTareas(true);
    setIdLista(listId);
    cargarTareas(listId);
    setlistaTitulo(listaTitulo);
  };
  
  //Muestra un dialogo que te permite crear una nueva lista. Aplicado al botón "Crear Lista"
  const mostrarModalCrearHandle = () => {
    setModalCrearLista(true);
  };
  
  //Abre el botón de opciones que permite editar o borrar la lista. Aplicado al boton con el icono {faEllipsisVertical}
  const onBtnOpcionesHandle = (listId) => {
    setListaSeleccionada(listId);
    setBtnOpciones(btnOpciones && listId===listaSeleccionada ? false : true); //si el botón está abierto y la listaId es === a la lista Seleccionada permite hacer toggle del estado.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 mt-4 ">
      <section
        id="box-listas"
        className="flex flex-col bg-Gainsboro col-span-1 md:col-span-1 rounded-3xl py-2"
      >
        <div className="h-64 lg:h-80 overflow-y-auto m-5 mb-10 rounded-xl overflow-x-hidden">
          {listas.length > 0 ? (
            listas.map((lista) => (
              <ul className="my-4 text-lg text-white" key={lista.id}>
                <li
                  className="bg-SlateGray hover:bg-MidnightBlue px-6 rounded-3xl flex items-center justify-between w-full"
                  key={lista.id}
                  onClick={() => onAbrirListaHandle(lista.id, lista.titulo)}
                >
                  {lista.titulo}
                  <button
                    className="py-1.5 px-2 ml-6 mt-1"
                    onClick={() =>onBtnOpcionesHandle(lista.id)}
                  >
                    <FontAwesomeIcon
                      className="text-2xl"
                      icon={faEllipsisVertical}
                    />
                  </button>
                </li>
                
                  <BotonOpciones
                    usuario={usuario}
                    listaId={lista.id}
                    listaSeleccionada={listaSeleccionada}
                    btnOpciones={btnOpciones}
                    setBtnOpciones={setBtnOpciones}
                  />
                
              </ul>
            ))
          ) : (
            <p className="text-center my-10 text-xl font-light">
              No tienes ninguna lista
            </p>
          )}
        </div>
        <div className="mb-10 mt-auto mx-auto">
          <button
            className="bg-MintGreen hover:opacity-60 rounded-3xl py-1 text-xl font-light px-6"
            onClick={mostrarModalCrearHandle}
          >
            Crear Lista
          </button>
          <CrearListaFormulario
            user_id={user_id}
            modalCrearLista={modalCrearLista}
            setModalCrearLista={setModalCrearLista}
          />
        </div>
      </section>

      <section id="box-tareas" className="md:col-span-2">
        <h2 className="text-3xl mb-3 ml-4 font-bold">Hola, {usuario.name}</h2>
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
            <h2 className="text-2xl text-white mb-6">
              Esta es tu App de tareas
            </h2>
            <h3 className="text-2xl text-white mb-2">
              Antes de empezar... seleccione una lista.
            </h3>
            <h4 className="text-lg text-white mb-8">
              Si no tienes ninguna lista, añade una lista en 'Crear lista'
            </h4>
          </div>
        )}
      </section>
    </div>
  );
}
