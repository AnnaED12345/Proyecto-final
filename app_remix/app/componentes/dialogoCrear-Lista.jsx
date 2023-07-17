
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus} from '@fortawesome/free-solid-svg-icons';


import { useState } from "react";

export default function CrearListaFormulario ({user_id, dialogoCrearLista, setDialogoCrearLista}) {
    
    const [listaCreada, setListaCreada] = useState(""); //definimos una variable que actualizaremos con los datos recibidos del fetch
    const [error, setError] = useState(""); //para actualizar el valor del error 


    const onCancelarListaHandle = ((event) => { 
        event.preventDefault();
        setDialogoCrearLista(false);
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
        <overlay>
            {dialogoCrearLista && (
            <div className='fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                <mdoal className='bg-white mx-5 sm:mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto py-10 px-10'>

                <form
                    className='flex flex-col sm:px-16 md:px-22 py-2'
                    onSubmit={submitLista}>

                    <label
                    className='text-2xl md:text-2xl text-left pb-6'
                    id="cajaIngresar"
                    htmlFor="lista"
                    >
                    ¿Qué título te gustaría ponerle a tu nueva lista?
                    </label>

                   
                        <input
                            className='mb-6 sborder border-SlateGrat shadow-xl rounded-md pl-10 pr-3 py-2 font-light text-lg md:text-lg sm:text-base '
                            type="text"
                            placeholder="Añade una lista nueva..."
                            name="lista"
                            id="listID"
                            value={listaCreada}
                            onChange={(event) => setListaCreada(event.target.value)}
                        />
        

                    {error && (
                    <p id="errores" className="text-red-600 text-lg">
                        {error}
                    </p>
                    )}

                    <div className='grid grid-cols-2 gap-3 mt-6'>
                        <button
                            className='bg-Gainsboro hover:bg-MintGreen text-gray-800 font-thin text-lg py-2 rounded-md'
                            type="submit">
                            Aceptar
                        </button>
                        <button
                            className='bg-Gainsboro hover:bg-BurntSienna text-gray-800 font-thin text-lg py-2 rounded-md'
                            onClick={onCancelarListaHandle}>
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