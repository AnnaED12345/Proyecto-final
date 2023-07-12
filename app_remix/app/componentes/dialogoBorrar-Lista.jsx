export default function DialogoBorrarLista ({onCancelarBorrarLista, onBorrarListaHandle }) {

    return (
      <dialog id="dialogo-borrar-lista">
        <p>¿Estás seguro de que deseas borrar esta lista?</p>
        <p>Atención: Se borrarán todas las tareas vinculadas a esta lista</p>

        <button 
        onClick={onBorrarListaHandle}>
          Borrar
        </button>

        <button
        onClick={onCancelarBorrarLista}>
          Cancelar
        </button>
      </dialog>
    );
  }