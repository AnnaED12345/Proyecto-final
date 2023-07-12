export default function DialogoBorrar({ dialogoBorrar, user_id, list_id, tareaId, cargarTareas}) {
  
  const onCancelarBorrar = () => {
      dialogoBorrar.close();
      tareaId = {};
  }

  const onConfirmarBorrar = (() => {
      const options = {
          method: 'DELETE'
      }

      const borrar = fetch (`/${user_id}/list/${list_id}/tasks/${tareaId}`, options)
      .then((res) => {  
        if (res.ok) { 
          cargarTareas(list_id);
          dialogoBorrar.close();

        } else {
            console.log ("No existe esta tarea");
        }
  })
  });

    return (
      <dialog id="borrar_dialogo">
        <p>¿Estás seguro de que deseas borrar esta tarea?</p>

        <button 
        onClick={onConfirmarBorrar}>
          Borrar
        </button>

        <button
        onClick={onCancelarBorrar}>
          Cancelar
        </button>
      </dialog>
    );
  }