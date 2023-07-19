import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { useParams } from '@remix-run/react';
import { useState } from 'react';


/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA
- Componente CrearTareaFormulario:
    - Variables definidas
    - Evento submitTarea 
      Condicional: Validación del input
      Else:
        - Petición fetch a la ruta `/${user_id}/list/${idLista}/tasks` con método POST para crear una tarea.
    
- Return: 
    - Se renderiza un formulario para introducir la descripcion de la tarea    
      - Icono con evento onClick a submitTarea
      - Button Aceptar
      - Button Cancelar

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */


export default function CrearTareaFormulario ({idLista, cargarTareas, listaTitulo} ) {
    const {user_id}=useParams();//String
    const [tareaCreada, setTareaCreada] = useState(""); //String. Se actualizará con los datos recibidos del fetch
    const [error, setError] = useState(""); //String. Se actualizará con el valor del error

    async function submitTarea (event) { 
        if (tareaCreada === null || tareaCreada === "" || tareaCreada === " " || tareaCreada.length < 0){
            event.preventDefault();
            setError("Tienes que añadir una tarea");
        } else {
            event.preventDefault();

            const post = await fetch(`/${user_id}/list/${idLista}/tasks`, { 
                method: "POST",
                body: JSON.stringify({ descripcion: tareaCreada }), 
                headers: {
                  "Content-Type": "application/json",
                }})
    
                if (post.ok) { 
                    setTareaCreada("");
                    cargarTareas(idLista);
                                        
                  } else {     
                        const error = await post.text(); 
                        setError(error);
                  }
            }
    };


return (
  <div className="grid grid-cols-3">
    <form className="flex flex-col col-span-2" onSubmit={submitTarea}>
      <p className="my-2 text-lg font-light">Estás en {listaTitulo}:</p>

      <label className="text-2xl mb-3 " htmlFor="tarea">
        Añade una nueva tarea:
      </label>

      <div className="relative pb-8">
        <input
          className="border border-SlateGrat shadow-xl rounded-md pl-10 pr-3 py-2 font-light text-lg md:text-xl sm:text-base block w-full"
          type="text"
          placeholder="Agregar tarea..."
          name="tareaID"
          id="tareaID"
          value={tareaCreada}
          required
          onChange={(event) => setTareaCreada(event.target.value)}
        />
        <FontAwesomeIcon
          className="absolute right-6 top-6 transform -translate-y-1/2 text-SlateGray hover:text-MidnightBlue "
          icon={faPlus}
          size="lg"
          onClick={submitTarea}
        />
      </div>
      {error && (
        <p id="errores" className="text-red-600 text-lg">
          {error}
        </p>
      )}
    </form>
  </div>
); 
}
