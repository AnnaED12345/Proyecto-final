
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus} from '@fortawesome/free-solid-svg-icons';


import { useState } from "react";

export default function CrearListaFormulario ({dialogoCrearLista, user_id}) {
    
    const [listaCreada, setListaCreada] = useState(""); //definimos una variable que actualizaremos con los datos recibidos del fetch
    const [error, setError] = useState(""); //para actualizar el valor del error 


    const onCancelarListaHandle = ((event) => { 
        event.preventDefault();
        dialogoCrearLista.close();
    })



    async function submitLista (event) { //cuando se haga un submit en el input::

        if (listaCreada === null || listaCreada === "" || listaCreada === " " || listaCreada.length < 0){
            event.preventDefault();
            setError("Tienes que añadir un título para la lista");
        } else {
                const post = await fetch(`/users/${user_id}/list`, {
                  //se realizará un fetch con el método post
                  method: "POST",
                  body: JSON.stringify({ titulo: listaCreada }), //body: tarea recibirá el valor de tarea creada
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                    if (post.ok) { 
                        setListaCreada("");       
                        
                      } else { 
                            const error = await post.text(); //gestionamos el error
                            setError(error);
                      }
                    }
                }
       

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
                value={listaCreada}
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