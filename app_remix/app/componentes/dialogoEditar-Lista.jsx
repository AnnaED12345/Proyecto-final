import { useState } from "react";

export default function DialogoEditarLista({usuarioId, idList, cargarListas}) {

    const [error, setError] = useState(""); //para actualizar el valor del error


    const onCancelarEditarTarea = () => {
        document.getElementById("dialogo-editar-lista").close(); 
    }

    const [listaActualizada, setListaActualizada] = useState(" ")

    const onSubmitLista = (event) => {
        if (listaActualizada === null || listaActualizada === "" || listaActualizada === " " || listaActualizada.length < 0){
            event.preventDefault();
            setError("Tienes que añadir un título para la lista");
        } else {
            const body = {titulo: listaActualizada};
            const options = {
               method: 'PUT',
               body: JSON.stringify(body),
               headers: {
                   "Content-Type": "application/json" 
             }
           }
         
             const actualizar = fetch (`/users/${usuarioId}/list/${idList}`, options)
             .then((res) => {  
                if (res.ok) { 
                    cargarListas(idList);
                    document.getElementById("dialogo-editar-lista").close(); 
          
              } else {
                  console.log(error);
              }
          })    
        }
    } 
    
    return (
        <dialog id="dialogo-editar-lista">
            <form onSubmit={onSubmitLista}>
                <input
                className="editar_texto"
                type="text"
                placeholder="Actualiza tu lista..."
                name="tarea_actualizada"
                id="tarea_actualizadaID"
                onChange={(event) => setListaActualizada(event.target.value)}
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