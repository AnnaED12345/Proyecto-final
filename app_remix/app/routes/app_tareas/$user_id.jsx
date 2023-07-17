import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import CrearTareaFormulario from "../../componentes/crear-tarea";
import GetListas from "../../componentes/get-listas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CrearListaFormulario from "../../componentes/dialogoCrear-Lista";



/* Pestaña app tareas de cada usuario: 
  ESTRUCTURA:
- Componente AppTareas:
    - Variables definidas
    - Función cargarUsuario
        - Petición fetch a la ruta /users/${user_id}/list con método GET para cargar el usuario con sus respectivos datos
    - Función submitLogout
        - Petición GET a la ruta (lougot para cerrar sesión
- Render: 
    - Condicional: ¿Hay usuario?:
        - Header: 
            - h1: Mis listas
            - boton cerrar sesión con un evento onClick a submitLogout 
        - Componente get-Listas --> carga las listas del usuario
    - No hay usuario: 
        - Se muestra un mensaje "Cargando..." 
        */



export default function AppTareas () {
  const { user_id } = useParams();
  const [usuario, setUsuario] = useState();
  const [listas, setListas] = useState();

  async function cargarUsuario() {
    const respuesta = await fetch(`/users/${user_id}/list`);
    const datos = await respuesta.json();
    setUsuario(datos);
    setListas(datos.listas);
  }

  useEffect(() => {
    cargarUsuario();
  }, []);

  async function submitLogout(event) {
    event.preventDefault();

    const response = await fetch(`/logout`);
    if (response.ok) {
      window.location.href = "/app_tareas/";
    } else {
      console.error("Error en el logout");
    }
  }

  return (
    <main className="my-6 md:overflow-y-hidden">
      {usuario ? (
        <section className="mx-10">
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
