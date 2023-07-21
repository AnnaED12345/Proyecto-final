import { useState } from "react";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente CrearListaFormulario:
    - Variables definidas
    - Evento onCancelarListaHandle
    
- Return: 
    - Condicional: si modalCrearLista es true
        - Se renderiza un formulario para introducir el titulo de la lista
            - En este componente la petición de método POST para la creación de listas se ejecuta directamente desde el formulario. 
                - "method" -> determinamos el método de la petición.
                - "action" -> la ruta a la que hacemos la petición.
                - name="titulo" -> recogemos el valor de titulo
                - required -> validación que no permite enviar un input vacío 
                - maxLength={25} -> validación que no permite sobrepasar el máximo de carácteres
        - Button de tipo submit
        - Button Aceptar
        - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function CrearListaFormulario({
  user_id,
  modalCrearLista,
  setModalCrearLista,
}) {
  const [listaCreada, setListaCreada] = useState(""); //String

  //Cancela la creación de la lista y cierra la ventana modal. Aplicado al boton Cancelar
  const onCancelarListaHandle = (event) => {
    event.preventDefault();
    setModalCrearLista(false);
    setListaCreada(""); //se actualiza el valor tras cerrar el dialogo para vaciar el input
  };

  return (
    <overlay>
      {modalCrearLista && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <modal className="bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10">
            <form
              method="post"
              action={`/users/${user_id}/list`}
              className="flex flex-col sm:px-16 md:px-22 py-2"
            >
              <label
                className="text-2xl md:text-2xl text-left pb-6"
                id="cajaIngresar"
                htmlFor="lista"
              >
                ¿Qué título te gustaría ponerle a tu nueva lista?
              </label>

              <input
                className="mb-6 sborder border-SlateGrat shadow-xl rounded-md pl-10 pr-3 py-2 font-light text-lg md:text-lg sm:text-base "
                type="text"
                placeholder="Añade una lista nueva..."
                name="titulo"
                id="listID"
                value={listaCreada}
                required
                maxLength={25}
                onChange={(event) => setListaCreada(event.target.value)}
              />

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  className="bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin text-lg py-2 rounded-md"
                  type="submit"
                >
                  Aceptar
                </button>
                <button
                  className="bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin text-lg py-2 rounded-md"
                  onClick={onCancelarListaHandle}
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
