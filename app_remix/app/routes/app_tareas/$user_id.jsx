
export default function AppTares () {
    const {user_id} = useParams(); 
    const [usuario, setUsuario] = useState();

    const [listas, setListas] = useState([]);
    const [tareas, setTareas] = useState([]);

    return (
        <div>
            <h1>Mis listas</h1>
        </div>
    )
}
