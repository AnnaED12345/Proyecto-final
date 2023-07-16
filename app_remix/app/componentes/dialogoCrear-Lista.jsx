
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
        <dialog className='bg-white p-8 rounded-lg shadow-md'
            id='dialogo-crear-lista' >
             <form className='flex flex-col px-12 sm:px-16 md:px-22 py-2'
             id="formulario" 
             onSubmit={submitLista}>
                <label className='text-xl md:text-2xl text-left pb-4'
                id="cajaIngresar" 
                htmlFor="lista">Añade tu lista:</label>
                
                <input className='border shadow-md rounded-md text-MidnightBlue font-light text-md md:text-lg sm:text-base block w-full p-2 px-8 mb-4'
                type="text" 
                placeholder="Agregar lista..." 
                name="lista" 
                id="listID"
                value={listaCreada}
                onChange={(event) => setListaCreada(event.target.value)} />
                
                {/* <input className=''
                id="btnAnadir" 
                type="submit" 
                value="" /> */}

                <div className='grid grid-cols-2 gap-3 mt-3'>
                    <button className='bg-Gainsboro hover:bg-MintGreen font-thin md:text-lg py-2 rounded-3xl' 
                    onSubmit={submitLista} >Aceptar</button>
                    <button className='bg-Gainsboro hover:bg-BurntSienna font-thin md:text-lg py-2 rounded-3xl'
                    onClick={onCancelarListaHandle}>Cancelar</button>
                </div>
            </form>
            
        
            {error && ( //explicado el operador && abajo
                <p id="errores" style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </dialog>
    ) 
}