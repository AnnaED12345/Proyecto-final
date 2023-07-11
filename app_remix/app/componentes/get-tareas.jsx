
//Componente que renderiza las tareas de cada lista

export default function GetTareas ({listaTareas}) { 

    return (
        <div>
            { listaTareas.length > 0 ? //¿Hay usuario?
            listaTareas.map((tarea) => (
                <ul key={tarea.id}>
                    <li>{tarea.descripcion}</li>
                </ul>
            ))
            : <h3>No tienes ninguna tarea</h3>}            
            <button>Crear Tarea</button>
        </div>
    )
}
