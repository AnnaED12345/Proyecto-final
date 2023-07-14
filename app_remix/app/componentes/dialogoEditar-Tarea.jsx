import { useState } from "react";

export default function DialogoEditarTarea({dialogoEditarTarea, tareaId, usuarioId, idLista, cargarTareas}) {

    const [error, setError] = useState(""); //para actualizar el valor del error


    const onCancelarEditarTarea = (event) => {
        event.preventDefault()
        dialogoEditarTarea.close();
    }

    const [tareaActualizada, setTareaActualizada] = useState(" ")

    const onSubmitTarea = (event) => {
        if (tareaActualizada === null || tareaActualizada === "" || tareaActualizada === " " || tareaActualizada.length < 0){
            event.preventDefault();
            setError("Tienes que añadir una tarea");
            } else {
                event.preventDefault();

                const body = {descripcion: tareaActualizada};
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json" 
                    }
                } 

            const actualizar = fetch (`/${usuarioId}/list/${idLista}/tasks/${tareaId}`, options)
                .then((res) => {  
                    if (res.ok) { 
                    cargarTareas(idLista);
                    dialogoEditarTarea.close();   
            
                } else {
                    console.log(error);
                }
            })
            }     
        } 


    return (
        <dialog id="editar-dialogo-tarea">
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
                onClick={onCancelarEditarTarea}
                />
                </div>

                {error && ( 
                <p id="errores" style={{ color: "red" }}>
                    {error}
                </p>
            )}
            </form>
        </dialog>
  );
}