import { useState } from "react";

/* Pestaña Login: selección de usuarios:
- Función en la que se hace una petición POST a la ruta login 
- Return: 
    - Pestaña Login con un formulario para insertar usuario y contraseña. 
 */


export default function SeleccionaUsuario () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function submitLogin (event) { //cuando se haga un submit --> login:
        event.preventDefault();

        const response = await fetch(`/login`, { //realizamos un fetch a la ruta /login 
            method: "POST",
            body: JSON.stringify(
                { username: email,
                  password : password}), //body: aquí introducimos los datos que el usuario inserta
            headers: {
              "Content-Type": "application/json",
            }
        })
    
    if (response.ok) { 
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) { //si contiene content-type:
          const user = await response.json();
          window.location.href = `/app_tareas/${user.id}`; //se redirige al usuario a su app de tareas mediante el id
        } else {
          setError("La respuesta no contiene datos JSON"); 
        }
      } else {
        setError("Usuario o contraseña incorrectos.");
      }

}

    return (
        <div className="bg-Gainsboro h-screen flex items-center justify-center ">
            <div className="bg-white py-10 sm:py-16 px-16 sm:px-28 md:px-32 mx-auto rounded-3xl">
                    <h1 className="text-center text-4xl sm:text-5xl font-bold text-MidnightBlue pb-2">Bienvenid@</h1>
                    <h2 className="text-center text-xl sm:text-2xl font-light text-MidnightBlue pb-8" >Inserta tus datos:</h2>
                    <form className="space-y-4 sm:space-y-6 " action="#" 
                        onSubmit={submitLogin}>
                    <div>
                        <label className="block mb-4 text-lg sm:text-xl font-light text-MidnightBlue"
                            htmlFor="username">Email:</label>
                    <input className="bg-Gainsboro rounded-3xl text-MidnightBlue font-light text-md sm:text-base block w-full p-2 px-8 mb-4" 
                        type="text" 
                        name="username"
                        placeholder="email@gmail.com"
                        required=""
                        onChange={(event) => setEmail(event.target.value)} /> 
                    </div>

                    <div>
                    <label className="block mb-4 text-lg sm:text-xl font-light text-MidnightBlue"
                        htmlFor="password">Contraseña:</label>
                    <input className="bg-Gainsboro rounded-3xl text-MidnightBlue font-light text-md sm:text-base block w-full p-2 px-8 mb-4" 
                        type="password" 
                        name="password"
                        placeholder="contraseña"
                        required=""
                        onChange={(event) => setPassword(event.target.value)} /> 

                        <p className="text-red-600 text-md mt-4">
                            {error}
                        </p>
                    </div>

                    <div>
                        <button className="w-full text-MidnightBlue bg-MintGreen hover:saturate-50 font-bold rounded-3xl text-sm md:text-lg px-5 py-2.5 my-7 text-center">Acceder</button>
                    </div>
                    </form>
                </div>
        </div>
    )
}
