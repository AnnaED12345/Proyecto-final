import DialogoBorrarLista from "./dialogoBorrar-Lista";

export default function BotonOpciones ({user_id, listaId, cargarListas}) {
    const opciones = ["Editar", "Borrar"] //menu de opciones

    // const dialogoBorrarLista = document.getElementById("dialogo-borrar-lista");

    const mostrarDialogoBorrarLista = (idLista) => {
        idLista = listaId;
        document.getElementById("dialogo-borrar-lista").showModal();
    }

    const onCancelarBorrarLista = (idLista) => {
        document.getElementById("dialogo-borrar-lista").close();
        idLista = {};
    }

        const options = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        };

        async function borrarLista (idLista) { 
            idLista = listaId;
            const respuesta = await fetch (`/users/${user_id}/list/${idLista}`, options); 
            const datos = await respuesta.json(); 
            console.log(datos);
            cargarListas()
        };
        
        const onBorrarListaHandle = ((idLista) => {
            borrarLista(idLista);
        })


    return (
        <div>
            <ul>{opciones.map((opcion) => (
                <button 
                key={opcion} 
                onClick={() => {
                    if(opcion === "Borrar"){
                        mostrarDialogoBorrarLista(listaId);
                    }else{
                        console.log("se hace click en editar")
                    }}}>{opcion}</button>
                ))}
            </ul>
            <DialogoBorrarLista onCancelarBorrarLista={onCancelarBorrarLista} onBorrarListaHandle={onBorrarListaHandle}></DialogoBorrarLista>
        </div>
    )
}