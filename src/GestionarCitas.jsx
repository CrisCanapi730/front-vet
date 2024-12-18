import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/GestionarCitas.css';


function GestionarCitas() {
    const [listaCitas, setCitas] = useState([]);
    const [listaMascotas, setListaMascotas] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [editar, setEditar] = useState(false);
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [id_mascota, setIdMascota] = useState("");
    const [id_usuario, setIdUsuario] = useState("");
    const [especie, setEspecie] = useState("");
    const [nivel_urgencia, setNivelUrgencia] = useState("bajo");

    useEffect(() => {
        getCitas();
        getMascotas();
        getUsuarios();
    }, []);

    const getCitas = () => {
        Axios.get("http://localhost:3001/citas").then((response) => {
            setCitas(response.data);
        }).catch((error) => {
            console.error("Error al obtener citas:", error);
        });
    };

    const getMascotas = () => {
        Axios.get("http://localhost:3001/mascotas").then((response) => {
            setListaMascotas(response.data);
        }).catch((error) => {
            console.error("Error al obtener mascotas:", error);
        });
    };

    const getUsuarios = () => {
        Axios.get("http://localhost:3001/usuarios").then((response) => {
            setListaUsuarios(response.data);
        }).catch((error) => {
            console.error("Error al obtener usuarios:", error);
        });
    };

    const editarCitas = (val) => {
        setEditar(true);
        setId(val.id);
        setFecha(val.fecha);
        setHora(val.hora);
        setIdMascota(val.id_mascota);
        setIdUsuario(val.id_usuario);
        setEspecie(val.especie);
        setNivelUrgencia(val.nivel_urgencia);
    };

    const updateCita = () => {
        Axios.put(`http://localhost:3001/updateCitas/${id}`, { // Cambiado a updateCitas
            fecha,
            hora,
            id_mascota,
            id_usuario,
            especie,
            nivel_urgencia
        }).then(() => {
            alert("Cita Actualizada");
            limpiarDatos();
            getCitas();
        }).catch((error) => {
            console.error("Error al actualizar cita:", error);
            alert("Hubo un problema al actualizar la cita.");
        });
    };

    const deleteCita = (id) => {
        Axios.delete(`http://localhost:3001/deleteCitas/${id}`) // Cambiado a deleteCitas
        .then(() => {
            alert("Cita Eliminada");
            getCitas();
        }).catch((error) => {
            console.error("Error al eliminar cita:", error);
            alert("Hubo un problema al eliminar la cita.");
        });
    };

    const limpiarDatos = () => {
        setFecha("");
        setHora("");
        setIdMascota("");
        setIdUsuario("");
        setEspecie("");
        setNivelUrgencia("bajo");
        setEditar(false);
        setId("");
    };

    return (
        <div className='App'>
            <h2>Gestionar Citas</h2>
            <div className="listaCitas">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Mascota</th>
                            <th>Usuario</th>
                            <th>Especie</th>
                            <th>Nivel de urgencia</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaCitas.map((val) => {
                            const mascota = listaMascotas.find(m => m.id === val.id_mascota);
                            const usuario = listaUsuarios.find(u => u.id === val.id_usuario);
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.fecha}</td>
                                    <td>{val.hora}</td>
                                    <td>{mascota ? mascota.nombre : "No especificado"}</td>
                                    <td>{usuario ? usuario.nombre : "No especificado"}</td>
                                    <td>{val.especie}</td>
                                    <td>{val.nivel_urgencia}</td>
                                    <td>
                                        <div>
                                            <button className="btn btn-update" onClick={() => editarCitas(val)}>Actualizar</button>
                                            <button className="btn btn-delete" onClick={() => deleteCita(val.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {editar && (
                <div className='datos'>
                    <h3>Actualizar Cita</h3>
                    <label htmlFor="">Fecha: <input value={fecha} 
                        onChange={(event) => setFecha(event.target.value)}
                        type="date" /></label>

                    <label htmlFor="">Hora: <input value={hora} 
                        onChange={(event) => setHora(event.target.value)}
                        type="time" /></label>

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

                    <label htmlFor="">Especie: 
                        <input value={especie} 
                            onChange={(event) => setEspecie(event.target.value)} 
                            type="text" placeholder="Especie de la mascota" />
                    </label>

                    <label htmlFor="">Nivel de urgencia: 
                        <select value={nivel_urgencia} 
                            onChange={(event) => setNivelUrgencia(event.target.value)}>
                            <option value="bajo">Bajo</option>
                            <option value="medio">Medio</option>
                            <option value="alto">Alto</option>
                        </select>
                    </label>

                    <div>
                        <button className="btn btn-update" onClick={updateCita}>Actualizar</button>
                        <button className="btn btn-delete" onClick={limpiarDatos}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GestionarCitas;