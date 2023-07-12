
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus} from '@fortawesome/free-solid-svg-icons';


import { useState } from "react";

export default function Formulario ({dialogoCrearLista, cargarTareas, user_id}) {
    
    const [ListaCreada, setListaCreada] = useState(""); //definimos una variable que actualizaremos con los datos recibidos del fetch
    const [error, setError] = useState(""); //para actualizar el valor del error


    const onCancelarListaHandle = ((event) => { 
        event.preventDefault();
        dialogoCrearLista.close();
    })



    async function submitLista () { //cuando se haga un submit en el input::

        const post = await fetch(`/users/${user_id}/list`, { //se realizará un fetch con el método post
            method: "POST",
            body: JSON.stringify({ titulo: ListaCreada }), //body: tarea recibirá el valor de tarea creada
            headers: {
              "Content-Type": "application/json",
            }})
            if (post.ok) { 
                setListaCreada("");
                cargarTareas();
                
                console.log(ListaCreada);
                
              } else { 
                    const error = await post.text(); //gestionamos el error
                    setError(error);
              }
    };

    return (
        <dialog id='dialogo-crear-lista'>
             <form id="formulario" onSubmit={submitLista}>
                <label id="cajaIngresar" htmlFor="lista">Añade tu lista:</label>
                
                <input 
                className="texto" 
                type="text" 
                placeholder="Agregar lista..." 
                name="lista" 
                id="listID"
                onChange={(event) => setListaCreada(event.target.value)} /> 
            
                <input 
                id="btnAnadir" 
                type="submit" 
                value=" + " />
                <button onClick={onCancelarListaHandle}>Cancelar</button>
            </form>

            {error && ( //explicado el operador && abajo
                <p id="errores" style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </dialog>
    ) 
}