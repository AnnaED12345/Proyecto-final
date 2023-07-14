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
            <div>
                <h1 className="text-3xl font-bold underline">Bienvenid@</h1>
                <h2>Inserta tus datos:</h2>
                <form onSubmit={submitLogin}>
                <div>
                    <label htmlFor="username">Email:</label>
                <input 
                    className="texto" 
                    type="text" 
                    name="username"
                    required
                    onChange={(event) => setEmail(event.target.value)} /> 
                </div>

                <div>
                <label htmlFor="password">Contraseña:</label>
                <input 
                    className="texto" 
                    type="password" 
                    name="password"
                    required
                    onChange={(event) => setPassword(event.target.value)} /> 

                    <p id="errores" style={{ color: "red" }}>
                        {error}
                    </p>
                </div>

                <div>
                    <button>Acceder</button>
                </div>
                </form>
            </div>
    )
}
