import { useState } from "react";

/* Pestaña Login: 
  ESTRUCTURA
- Componente SeleccionaUsuario:
    - Variables definidas
    - Función submitLogin:
        - Petición fetch a la ruta /login con método POST para iniciar sesión
- Return: 
    - Renderiza la pestaña de login con un formulario para que el usuario pueda introducir los datos. 

 * COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
 */

export default function SeleccionaUsuario() {
  const [email, setEmail] = useState(""); //String
  const [password, setPassword] = useState(""); //String
  const [error, setError] = useState(""); //String. Se actualizará con el valor del error.

  async function submitLogin(event) {
    event.preventDefault(); //evita la recarga de la página

    const response = await fetch(`/login`, {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }), //información que recibimos en el body
      headers: {
        "Content-Type": "application/json", //definimos el formato de los datos
      },
    });

    if (response.ok) {
      //si la respuesta es Ok:
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        //si contiene content-type:
        const user = await response.json();
        document.getElementById("username").value = ""; //vaciamos el input del email y la contraseña. En este caso no usamos useState ya que este actualiza el valor en el estado del componente pero no del DOM.
        document.getElementById("password").value = "";
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
      <div className="bg-white py-12 sm:py-16 px-6 sm:px-20 md:px-26 rounded-3xl">
        <h1 className="text-center text-4xl sm:text-5xl font-bold pb-3">
          Bienvenid@
        </h1>
        <h2 className="text-center text-xl sm:text-2xl font-light pb-10">
          ¡Empieza ya insertando tus datos!
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
              className="bg-Gainsboro rounded-3xl font-light block w-full p-2 px-8 mb-4"
              type="text"
              name="username"
              id="username"
              placeholder="email@gmail.com"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label
              className="block mb-4 text-lg sm:text-xl font-light text-MidnightBlue"
              htmlFor="password"
            >
              Contraseña:
            </label>
            <input
              className="bg-Gainsboro rounded-3xl text-MidnightBlue font-light block w-full p-2 px-8 mb-4"
              type="password"
              name="password"
              id="password"
              placeholder="contraseña"
              required=""
              onChange={(event) => setPassword(event.target.value)}
            />

            <p className="text-red-600 text-md mt-4">{error}</p>
          </div>

          <div>
            <button className="w-full text-MidnightBlue bg-MintGreen hover:saturate-50 font-bold rounded-3xl text-sm md:text-lg px-5 py-2.5 my-7 text-center">
              Acceder
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
