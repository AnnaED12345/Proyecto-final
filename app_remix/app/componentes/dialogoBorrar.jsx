export default function DialogoBorrar({ onConfirmarBorrar, onCancelarEditar }) {
    
    return (
      <dialog id="borrar_dialogo">
        <p>¿Estás seguro de que deseas borrar esta tarea?</p>

        <button 
        onClick={onConfirmarBorrar}>
          Borrar
        </button>

        <button
        onClick={onCancelarEditar}>
          Cancelar
        </button>
      </dialog>
    );
  }