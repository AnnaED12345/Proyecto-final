import { useState } from "react";

export default function DialogoEditar({user_id, list_id, tareaId, cargarTareas}) {
    const onCancelarEditar = (event) => {
        event.preventDefault()
        editarDialogo.close();
    }

    const [tareaActualizada, setTareaActualizada] = useState(" ")

    const onSubmitTarea = (event) => {
        event.preventDefault();
        const body = {descripcion: tareaActualizada};
        const options = {
           method: 'PUT',
           body: JSON.stringify(body),
           headers: {
               "Content-Type": "application/json" 
         }
       }
     
         const actualizar = fetch (`/${user_id}/list/${list_id}/tasks/${tareaId}`, options)
         .then((res) => {  
            if (res.ok) { 
              cargarTareas(idLista);
              editarDialogo.close();   
      
          } else {
              console.log(error);
          }
      })
      
    } 
    return (
        <dialog id="editar_dialogo">
            <form onSubmit={onSubmitTarea}>
                <input
                className="editar_texto"
                type="text"
                placeholder="Actualiza tu tarea..."
                name="tarea_actualizada"
                id="tarea_actualizadaID"
                onChange={(event) => setTareaActualizada(event.target.value)}
                />
                <div>
                <input id="btnOk" type="submit" value="Aceptar" />

                <input
                id="btnCancelar"
                type="submit"
                value="Cancelar"
                onClick={onCancelarEditar}
                />
                </div>
            </form>
        </dialog>
  );
}