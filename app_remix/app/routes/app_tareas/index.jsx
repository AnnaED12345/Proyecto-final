import { useState } from "react";

//Pestaña Login: selección de usuarios:
export default function SeleccionaUsuario () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    console.log(email, password);

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
        if (response.ok) { //si la respuesta es ok
            const user = await response.json();
            console.log(user);
            /* window.location.href = `/app_tareas/${user.id}`;  *///enviamos al usuario a su app de tareas
        } else setError("Usuario o contraseña incorrectos."); //si es incorrecta gestionamos el error
    }

    return (
            <div>
                <h1>Bienvenid@</h1>
                <h2>Inserta tus datos:</h2>
                <form onSubmit={submitLogin}>
                <div>
                    <label htmlFor="username">Usuario:</label>
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
