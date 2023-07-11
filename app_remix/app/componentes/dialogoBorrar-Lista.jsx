export default function DialogoBorrarLista ({ onCancelarBorrarLista, onCancelarEditar }) {
    
    return (
      <dialog id="borrar_dialogo_lista">
        <p>¿Estás seguro de que deseas borrar esta tarea?</p>

        <button 
        onClick={onConfirmarBorrar}>
          Borrar
        </button>

        <button
        onClick={onCancelarBorrarLista}>
          Cancelar
        </button>
      </dialog>
    );
  }