import { useState } from "react";
import DialogoEditarLista from "./dialogoEditar-Lista";
import DialogoBorrarLista from "./dialogoBorrar-Lista";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente BotonOpciones:
    - Variables definidas
    - Función cargarListas:
        - Petición fetch a la ruta `/users/${usuario.id}/list` con método GET para cargar las listas del usuario
    - Evento mostrarDialogoBorrarListaHandle
    - Evento mostrarDialogoEditarListaHandle

- Return: 
    - Condicional: Si el btnOpciones es true
        - Button Borrar abre la ventana de confirmación para eliminar la lista (DialogoBorrarLista)
        - Button Editar abre la ventana de confirmación para actualizar la lista (DialogoEditarLista)
        - Componente DialogoBorrarLista
        - Componente DialogoEditarLista

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function BotonOpciones({ usuario, listaId, btnOpciones }) {
  const opciones = ["Editar", "Borrar"]; //Array. Opciones del btnOpciones
  const [modalBorrarLista, setModalBorrarLista] = useState(false); //Boolean. Estado para abrir la ventana modal para BORRAR una lista.
  const [modalEditarLista, setModalEditarLista] = useState(false); //Boolean. Estado para abrir la ventana modal para EDITAR una lista.

  // Creamos una función que cargué las listas para posteriormente recargar las listas cada vez que borramos o editamos una lista.
  async function cargarListas() {
    const respuesta = await fetch(`/users/${usuario.id}/list`);
    const datos = await respuesta.json();
    setListas(datos.listas);
  }

  //Muestra la ventana modal que permite borrar una lista. Aplicado al boton Borrar
  const mostrarModalBorrarListaHandle = () => {
    setModalBorrarLista(true);
  };

  //Muestra la ventana modal que permite editar una lista. Aplicado al boton Editar
  const mostrarModalEditarListaHandle = () => {
    setModalEditarLista(true);
  };

  return (
    <div className="flex justify-center">
      {btnOpciones && (
        <ul className="flex">
          {opciones.map((opcion) => (
            <button
              className="text-MidnightBlue opacity-70 hover:opacity-100 px-4 pt-3"
              id="opciones"
              key={opcion}
              onClick={() => {
                if (opcion === "Borrar") {
                  mostrarModalBorrarListaHandle(listaId);
                } else if (opcion === "Editar") {
                  mostrarModalEditarListaHandle(listaId);
                }
              }}
            >
              {opcion}
            </button>
          ))}
        </ul>
      )}

      <DialogoBorrarLista
        usuarioId={usuario.id}
        idList={listaId}
        cargarListas={cargarListas}
        modalBorrarLista={modalBorrarLista}
        setModalBorrarLista={setModalBorrarLista}
      ></DialogoBorrarLista>
      <DialogoEditarLista
        usuarioId={usuario.id}
        idList={listaId}
        cargarListas={cargarListas}
        modalEditarLista={modalEditarLista}
        setModalEditarLista={setModalEditarLista}
      ></DialogoEditarLista>
    </div>
  );
}
