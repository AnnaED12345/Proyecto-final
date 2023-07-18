import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useParams } from '@remix-run/react';
import { useState } from 'react';

export default function CrearTareaFormulario ({idLista, cargarTareas, listaTitulo} ) {
    console.log("listaSeleccionada", listaTitulo)
  const {user_id}=useParams();
    const [tareaCreada, setTareaCreada] = useState(""); //definimos una variable que actualizaremos con los datos recibidos del fetch
    const [error, setError] = useState(""); //para actualizar el valor del error

    async function submitTarea (event) { //cuando se haga un submit en el input::
        if (tareaCreada === null || tareaCreada === "" || tareaCreada === " " || tareaCreada.length < 0){
            event.preventDefault();
            setError("Tienes que añadir una tarea");
        } else {
            event.preventDefault();

            const post = await fetch(`/${user_id}/list/${idLista}/tasks`, { //se realizará un fetch con el método post
                method: "POST",
                body: JSON.stringify({ descripcion: tareaCreada }), //body: tarea recibirá el valor de tarea creada
                headers: {
                  "Content-Type": "application/json",
                }})
    
                if (post.ok) { 
                    setTareaCreada("");
                    cargarTareas(idLista);
                                        
                  } else {     
                        const error = await post.text(); //gestionamos el error
                        setError(error);
                  }
            }
    };


    return (
      <div className="grid grid-cols-3">
        <form
          className="flex flex-col col-span-2"
          onSubmit={submitTarea} 
        >
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
