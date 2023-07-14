export default function DialogoBorrarTarea({ dialogoBorrarTarea, tareaId, usuarioId, idLista, cargarTareas}) {


  const onCancelarBorrar = () => {
    dialogoBorrarTarea.close();
      tareaId = {};
  }

  const onConfirmarBorrar = (() => {
      const options = {
          method: 'DELETE'
      }

      const borrar = fetch (`/${usuarioId}/list/${idLista}/tasks/${tareaId}`, options)
      .then((res) => {  
        if (res.ok) { 
          cargarTareas(idLista);
          dialogoBorrarTarea.close();

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