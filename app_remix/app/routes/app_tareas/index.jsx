import { useState } from "react";

/* Pestaña Login: 
  ESTRUCTURA
- Componente SeleccionaUsuario:
    - Variables definidas
    - Función submitLogin:
        - Petición fetch a la ruta /login con método POST
        - Si la respuesta es Ok se redirige el usuario a la pestaña $user_id
- Return: 
    - Renderiza la pestaña de login con un formulario para que el usuario pueda introducir los datos. 
 */


export default function SeleccionaUsuario () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function submitLogin (event) { 
        event.preventDefault();

        const response = await fetch(`/login`, { 
            method: "POST",
            body: JSON.stringify(
                { username: email,
                  password : password}), 
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
      <main className="bg-Gainsboro h-screen flex items-center justify-center ">
        <fieldset className="bg-white py-10 sm:py-16 px-20 sm:px-28 md:px-32 rounded-3xl">
          <h1 className="text-center text-4xl sm:text-5xl font-bold pb-2">
            Bienvenid@
          </h1>
          <h2 className="text-center text-xl sm:text-2xl font-light pb-8">
            Inserta tus datos:
          </h2>
          <form onSubmit={submitLogin}>
            <div>
              <label
                className="block mb-4 text-lg sm:text-xl font-light"
                htmlFor="username"
              >
                Email:
              </label>
              <input
                className="bg-Gainsboro rounded-3xl font-light text-md sm:text-base block w-full p-2 px-8 mb-4"
                type="text"
                name="username"
                placeholder="email@gmail.com"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <fieldset>
              <label
                className="block mb-4 text-lg sm:text-xl font-light text-MidnightBlue"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                className="bg-Gainsboro rounded-3xl text-MidnightBlue font-light text-md sm:text-base block w-full p-2 px-8 mb-4"
                type="password"
                name="password"
                placeholder="contraseña"
                required=""
                onChange={(event) => setPassword(event.target.value)}
              />

              <p className="text-red-600 text-md mt-4">{error}</p>
            </fieldset>

            <div>
              <button className="w-full text-MidnightBlue bg-MintGreen hover:saturate-50 font-bold rounded-3xl text-sm md:text-lg px-5 py-2.5 my-7 text-center">
                Acceder
              </button>
            </div>
          </form>
        </fieldset>
      </main>
    );
}
