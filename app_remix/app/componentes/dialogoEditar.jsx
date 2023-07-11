
export default function DialogoEditar({ setTareaActualizada, onSubmitTarea, onCancelarEditar }) {
  
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