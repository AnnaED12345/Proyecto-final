export default function DialogoBorrarLista ({usuarioId, idList, cargarListas }) {
  
  const onCancelarBorrarLista = () => {
    idList = {};
    document.getElementById("dialogo-borrar-lista").close();
};

    const options = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    };

    async function borrarLista (event) { 
        const respuesta = await fetch (`/users/${usuarioId}/list/${idList}`, options); 
        const datos = await respuesta.json(); 
        cargarListas(idList);
        location.reload();
    };
    
    const onBorrarListaHandle = (() => {  
        borrarLista();        
    });


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