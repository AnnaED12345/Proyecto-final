import { useState } from "react";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente DialogoEditarTarea:
    - Variables definidas
    - Función onSubmitTarea 
    Condicional: Validación del input
        - Si el input está vacío se muestra un error en pantalla
        - SetTimeOut para que el error no permanezca en pantalla. Este desaparecerá a los 2 segundos 
      else:     
        - Variable Options dónde se indica el tipo de método del fetch y el contenido
        - Petición fetch a la ruta `/${usuarioId}/list/${idLista}/tasks/${tareaId}` con método PUT para editar las tareas del usuario
    - Evento onCancelarEditarTarea

- Return: 
    - Condicional: Si modalEditarTarea es true: 
      - Formulario para añadir la nueva descripcion de la tarea
      - Button Aceptar
      - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function DialogoEditarTarea({
  tareaId,
  usuarioId,
  idLista,
  cargarTareas,
  modalEditarTarea,
  setModalEditarTarea,
}) {
  const [error, setError] = useState(""); //String. Se actualiza con el valor del error
  const [tareaActualizada, setTareaActualizada] = useState(" "); //String. Se actualiza con la tarea indicada en el input

  const onSubmitTarea = (event) => {
    event.preventDefault();

    if (
      tareaActualizada === null || //si la tarea es null
      tareaActualizada === "" || //si la tarea es empty
      tareaActualizada === " " //si la tarea es un espacio vacio
    ) {
      console.log("preventEvent");
      setError("Tienes que añadir una tarea");

      setError("Tienes que añadir una tarea");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      console.log("okokokokokook");
      const body = { descripcion: tareaActualizada };
      const options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const actualizar = fetch(
        `/${usuarioId}/list/${idLista}/tasks/${tareaId}`,
        options
      ).then((res) => {
        if (res.ok) {
          cargarTareas(idLista);
          setModalEditarTarea(false);
          setTareaActualizada(" ");
        } else {
          console.log(error);
        }
      });
    }
  };

  //Cancela la edición de la tarea y cierra la ventana modal. Aplicado al boton Cancelar
  const onCancelarEditarTarea = (event) => {
    event.preventDefault();
    setModalEditarTarea(false);
  };

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
                className="text-MidnightBlue text-2xl text-left pb-6"
                id="cajaIngresar"
                htmlFor="lista"
              >
                ¿Deseas cambiar el nombre de la tarea?
              </label>

              <input
                className="mb-6 border border-SlateGrat shadow-xl rounded-md pl-5 pr-3 py-2 font-light text-md md:text-lg sm:text-base block w-full"
                type="text"
                placeholder="Actualiza tu tarea..."
                name="tarea_actualizada"
                id="tarea_actualizadaID"
                onChange={(event) => setTareaActualizada(event.target.value)}
              />

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
