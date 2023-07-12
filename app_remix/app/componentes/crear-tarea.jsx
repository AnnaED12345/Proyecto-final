import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useParams } from '@remix-run/react';
import { useState } from 'react';

export default function CrearTareaFormulario ({idLista ,cargarTareas} ) {
  console.log(idLista);
  console.log(cargarTareas);

  const {user_id}=useParams();
    const [tareaCreada, setTareaCreada] = useState(""); //definimos una variable que actualizaremos con los datos recibidos del fetch
    const [error, setError] = useState(""); //para actualizar el valor del error

    async function submitTarea (event) { //cuando se haga un submit en el input::
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
                
                console.log(tareaCreada);
                
              } else { 

                    const error = await post.text(); //gestionamos el error
                    setError(error);
              }
    };


    return (
        <div>
             <form id="editar_dialogo"  onSubmit={submitTarea} >
                <label id="cajaIngresar" htmlFor="tarea"></label>
                
                <input 
                className="texto" 
                type="text" 
                placeholder="Agregar tarea..." 
                name="tarea" 
                id="tareaID"
                onChange={(event) => setTareaCreada(event.target.value)} /> 
                
                <input 
                id="btnAnadir" 
                type="submit" 
                value=" + " />
            </form>

            {error && ( 
                <p id="errores" style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    ) 
}
