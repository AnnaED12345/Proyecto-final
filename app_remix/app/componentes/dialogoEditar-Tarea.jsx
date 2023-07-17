import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function DialogoEditarTarea({tareaId, usuarioId, idLista, cargarTareas, modalEditarTarea, setEditarBorrarTarea}) {

    const [error, setError] = useState(""); //para actualizar el valor del error


    const onCancelarEditarTarea = (event) => {
        event.preventDefault()
        setEditarBorrarTarea(false);
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
                    setEditarBorrarTarea(false);  
            
                } else {
                    console.log(error);
                }
            })
            }     
        } 


    return (
      <overlay>
        {modalEditarTarea && (
          <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <modal className="bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10">
              <form
                className="flex flex-col sm:px-16 md:px-22 py-2"
                onSubmit={onSubmitTarea}
              >
                <label
                  className="text-MidnightBlue text-xl md:text-2xl text-left pb-6"
                  id="cajaIngresar"
                  htmlFor="lista"
                >
                  ¿Qué nombre deseas asignarle a tu tarea?
                </label>

                <div class="relative pb-5">
                  <input
                    className="border border-SlateGrat shadow-xl rounded-md pl-10 pr-3 py-2 font-light text-md md:text-lg sm:text-base block w-full"
                    type="text"
                    placeholder="Actualiza tu tarea..."
                    name="tarea_actualizada"
                    id="tarea_actualizadaID"
                    onChange={(event) => setTareaActualizada(event.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    className="absolute right-6 top-5 transform -translate-y-1/2 text-SlateGray hover:text-MidnightBlue "
                  />
                </div>

                {error && (
                  <p id="errores" className="text-red-600 text-lg">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    className="bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin md:text-lg py-2 rounded-md"
                    type="submit"
                  >
                    Aceptar
                  </button>
                  <button
                    className="bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin md:text-lg py-2 rounded-md"
                    onClick={onCancelarEditarTarea}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </modal>
          </div>
        )}
      </overlay>
    );
}
