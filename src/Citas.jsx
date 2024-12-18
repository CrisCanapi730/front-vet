import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/App.css';

function Citas() {
    // Estados para Citas
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [id_mascota, setIdMascota] = useState("");
    const [id_usuario, setIdUsuario] = useState("");
    const [especie, setEspecie] = useState(""); // Estado para la especie de la mascota
    const [nivel_urgencia, setnivel_urgencia] = useState("bajo"); // Estado para el nivel de urgencia, con valor inicial "bajo"
    const [editar, setEditar] = useState(false);
    const [listaMascotas, setListaMascotas] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        getMascotas(); // Obtener mascotas al cargar el componente
        getUsuarios(); // Obtener usuarios al cargar el componente
    }, []);

    // Funciones para citas
    const add = () => {
        if (fecha.trim() === "" || hora.trim() === "" || id_mascota.trim() === "" || id_usuario.trim() === "" || especie.trim() === "" || nivel_urgencia.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        console.log ("Datos", {"fecha":fecha, "hora":hora, "id_mascota": id_mascota, "id_usuario": id_usuario, "especie":especie, "Nivel de urgencia":nivel_urgencia});
        Axios.post("http://localhost:3001/createCitas", {
            fecha: fecha,
            hora: hora,
            id_mascota: id_mascota,
            id_usuario: id_usuario,
            especie: especie, // Agregar especie
            nivel_urgencia: nivel_urgencia // Agregar urgencia
        }).then(() => {
            alert("Cita Registrada");
            limpiarDatos();
        }).catch((error) => {
            console.error("Error al registrar cita:", error);
            alert("Hubo un problema al registrar la cita.");
        });
    };

    const limpiarDatos = () => {
        setFecha("");
        setHora("");
        setIdMascota("");
        setIdUsuario("");
        setEspecie(""); // Limpiar especie
        setnivel_urgencia("bajo"); // Restablecer urgencia a "bajo"
        setEditar(false);
    };

    const editarCitas = (val) => {
        setEditar(true);
        setFecha(val.fecha);
        setHora(val.hora);
        setIdMascota(val.id_mascota);
        setIdUsuario(val.id_usuario);
        setEspecie(val.especie); // Establecer especie
        setnivel_urgencia(val.nivel_urgencia); // Establecer urgencia
        setId(val.id);
    };

    const getMascotas = () => {
        Axios.get("http://localhost:3001/mascotas").then((response) => {
            setListaMascotas(response.data); // Guardar la lista de mascotas
        }).catch((error) => {
            console.error("Error al obtener mascotas:", error);
        });
    };

    const getUsuarios = () => {
        Axios.get("http://localhost:3001/usuarios").then((response) => {
            setListaUsuarios(response.data); // Guardar la lista de usuarios
        }).catch((error) => {
            console.error("Error al obtener usuarios:", error);
        });
    };

    return (
        <div className='App'>
            <div className='datos'>
                <label htmlFor="">Fecha: <input value={fecha} 
                    onChange={(event) => setFecha(event.target.value)}
                    type="date" /></label>

                <label htmlFor="">Hora: <input value={hora} 
                    onChange={(event) => setHora(event.target.value)}
                    type="time" /></label>

                {/* Selección de mascota */}
                <label htmlFor="">Mascota: 
                    <select value={id_mascota} 
                        onChange={(event) => setIdMascota(event.target.value)}>
                        <option value="">Selecciona una mascota</option>
                        {listaMascotas.map(mascota => (
                            <option key={mascota.id} value={mascota.id}>
                                {mascota.nombre} ({mascota.tipo})
                            </option>
                        ))}
                    </select>
                </label>

                {/* Selección de usuario */}
                <label htmlFor="">Usuario: 
                    <select value={id_usuario} 
                        onChange={(event) => setIdUsuario(event.target.value)}>
                        <option value="">Selecciona un usuario</option>
                        {listaUsuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Campo para especie */}
                <label htmlFor="">Especie: 
                    <input value={especie} 
                        onChange={(event) => setEspecie(event.target.value)} 
                        type="text" placeholder="Especie de la mascota" />
                </label>

                {/* Selección de nivel de urgencia */}
                <label htmlFor="">Nivel de urgencia: 
                    <select value={nivel_urgencia} 
                        onChange={(event) => setnivel_urgencia(event.target.value)}>
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                    </select>
                </label>

                <div>
                    {editar ? (
                        <>
                            <button className="btn btn-update" onClick={update}>Actualizar</button>
                            <button className="btn btn-delete" onClick={limpiarDatos}>Cancelar</button>
                        </>
                    ) : (
                        <button className="btn btn-update" onClick={add}>Registrar Cita</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Citas;