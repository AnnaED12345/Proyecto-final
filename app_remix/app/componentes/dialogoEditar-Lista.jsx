import { useState } from "react";


/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente DialogoEditarLista:
    - Variables definidas
    - Función onSubmitLista 
    Condicional: Validación del input
        - Si el input está vacío se muestra un error en pantalla
        - SetTimeOut para que el error no permanezca en pantalla. Este desaparecerá a los 2 segundos 
      else:     
        - Variable Options dónde se indica el tipo de método del fetch y el contenido
        - Petición fetch a la ruta `/users/${usuarioId}/list/${idList}` con método PUT para editar las listas del usuario
    - Evento onCancelarEditarLista

- Return: 
    - Condicional: Si modalEditarLista es true: 
      - Formulario para añadir el nuevo titulo de la Lista
      - Button Aceptar
      - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */


export default function DialogoEditarLista({usuarioId, idList, cargarListas, modalEditarLista, setModalEditarLista}) {
  const [error, setError] = useState(""); //String. Se actualiza con el valor del error
  const [listaActualizada, setListaActualizada] = useState(" "); //String. Almacena el valor del input.

  const onSubmitLista = (event) => {
    //Acepta la edición de la lista y cierra la ventana modal
    if (
      listaActualizada === null ||
      listaActualizada === "" ||
      listaActualizada === " " ||
      listaActualizada.length < 0
    ) {
      event.preventDefault();
      setError("Tienes que añadir un título para la lista");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      const options = {
        method: "PUT",
        body: JSON.stringify({ titulo: listaActualizada }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const actualizar = fetch(
        `/users/${usuarioId}/list/${idList}`,
        options
      ).then((res) => {
        if (res.ok) {
          cargarListas(idList);
          setModalEditarLista(false);
        } else {
          console.log(error);
        }
      });
    }
  };

  const onCancelarEditarLista = () => {
    //Cancela la edición de la lista y cierra la ventana modal
    setModalEditarLista(false);
  };

  return (
    <overlay>
      {modalEditarLista && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <mdoal className="bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10">
            <form
              className="flex flex-col sm:px-16 md:px-22 py-2"
              onSubmit={onSubmitLista}
            >
              <label
                className="text-MidnightBlue text-2xl text-left pb-6"
                id="cajaIngresar"
                htmlFor="lista"
              >
                ¿Deseas cambiar el nombre de la lista?
              </label>

              <input
                className="mb-6 border border-SlateGrat shadow-xl rounded-md pl-10 pr-3 py-2 font-light text-MidnightBlue text-md md:text-lg sm:text-base "
                type="text"
                placeholder="Actualiza tu lista..."
                name="lista_actualizada"
                id="lista_actualizadaID"
                onChange={(event) => setListaActualizada(event.target.value)}
                style={{ textIndent: "10px", paddingLeft: "10px" }}
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
                  onClick={onCancelarEditarLista}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </mdoal>
        </div>
      )}
    </overlay>
  );
}