import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import GetListas from "../../componentes/get-listas";

/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA:
- Componente AppTareas:
    - Variables definidas
    - Función cargarUsuario
        - Petición fetch a la ruta /users/${user_id}/list con método GET para cargar el usuario con sus listas
    - Función submitLogout
        - Petición GET a la ruta /lougot para cerrar sesión
- Render: 
    - Condicional: ¿Hay usuario?:
        - Header: 
            - h1: Mis listas
            - boton cerrar sesión con un evento onClick a submitLogout 
        - Componente get-Listas --> carga las listas del usuario
    - No hay usuario: 
        - Se muestra un mensaje "Cargando..." 

* COMENTARIOS ADICIONALES: 
    - Todas las variables almacenan lo que su propio nombre indica, en caso de que no sea así, se especificará a lo largo del código.
    - Al lado de cada varible se especificará el tipo de dato que alamena. 
*/

export default function AppTareas() {
  const { user_id } = useParams(); //String. Recogemos el id del usuario de los parametros de la ruta
  const [usuario, setUsuario] = useState(); //String. Se actualizará con el usuario una vez se complete la petición fetch
  const [listas, setListas] = useState(); //Array. Contiene id, titulo y usuarioId de la lista. Se actualizará una vez se complete la petición fetch

  async function cargarUsuario() {
    const respuesta = await fetch(`/users/${user_id}/list`);
    const datos = await respuesta.json();
    setUsuario(datos); //actualizamos el valor de usuario
    setListas(datos.listas); //actualizamos el valor de listas
  }

  //Utilizamos useEffect para que la petición se realicé solo una vez
  useEffect(() => {
    cargarUsuario();
  }, []);

  async function submitLogout(event) {
    event.preventDefault(); //evita la recarga de la pagina

    const response = await fetch(`/logout`);
    if (response.ok) {
      window.location.href = "/app_tareas/"; //si la petición ha sido exitosa, redirigimos de vuelta a la pantalla de login
    } else {
      console.error("Error en el logout");
    }
  }

  return (
    <main className="my-6 md:overflow-y-hidden">
      {usuario ? (
        <section className="mx-4 md:mx-10">
          <header className="bg-white flex justify-between">
            <h1 className="self-center ml-5 text-3xl font-bold">Tus listas</h1>
            <button
              className="self-center mt-3 lg:mr-8 text-sm text-SlateGray hover:text-MidnightBlue ml-auto"
              onClick={submitLogout}
            >
              Cerrar Sesión
              <FontAwesomeIcon
                className="ml-3"
                icon={faArrowRightFromBracket}
              />
            </button>
          </header>

          <GetListas usuario={usuario} listas={listas}></GetListas>
        </section>
      ) : (
        <div className="text-SlateGray flex flex-col justify-center items-center h-screen">
          <FontAwesomeIcon
            className="text-3xl animate-spin h-10 w-10 mb-10"
            icon={faSpinner}
          />
          <h1 className="text-4xl font-bold mb-3">Cargando...</h1>
          <h2 className="text-2xl">Porfavor, espere unos segundos.</h2>
        </div>
      )}
    </main>
  );
}
