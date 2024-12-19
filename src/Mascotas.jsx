import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/App.css';

function Mascotas() {
    // Estados para Mascotas
    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [edad, setEdad] = useState("");
    const [id_usuario, setIdUsuario] = useState(""); // Se mantiene para el valor seleccionado
    const [editar, setEditar] = useState(false);
    const [listaMascotas, setMascotas] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]); // Nuevo estado para usuarios
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el spinner

    useEffect(() => {
        getMascotas();
        getUsuarios(); // Obtener usuarios al cargar el componente
    }, []);

    // Funciones para mascotas
    const add = () => {
        if (nombre.trim() === "" || especie.trim() === "" || edad.trim() === "" || id_usuario.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        setIsLoading(true);
        Axios.post("https://api-vet-zeta.vercel.app/createMascota", {
            nombre: nombre,
            especie: especie,
            edad: edad,
            id_usuario: id_usuario
        }).then(() => {
            alert("Mascota Registrada");
            limpiarDatos();
            getMascotas();
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const update = () => {
        setIsLoading(true);
        Axios.put("https://api-vet-zeta.vercel.app/updateMascota", {
            id: id,
            nombre: nombre,
            especie: especie,
            edad: edad,
            id_usuario: id_usuario
        }).then(() => {
            alert("Mascota Actualizada");
            limpiarDatos();
            getMascotas();
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const deleteMascota = (id) => {
        setIsLoading(true);
        Axios.delete(`https://api-vet-zeta.vercel.app/deleteMascota/${id}`).then(() => {
            alert("Mascota Eliminada");
            limpiarDatos();
            getMascotas();
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const limpiarDatos = () => {
        setNombre("");
        setEspecie("");
        setEdad("");
        setIdUsuario("");
        setEditar(false);
    }

    const editarMascota = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setEspecie(val.especie);
        setEdad(val.edad);
        setIdUsuario(val.id_usuario); // Mantener el ID del usuario
        setId(val.id);
    }

    const getMascotas = () => {
        setIsLoading(true);
        Axios.get("https://api-vet-zeta.vercel.app/mascotas").then((response) => {
            setMascotas(response.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const getUsuarios = () => {
        setIsLoading(true);
        Axios.get("https://api-vet-zeta.vercel.app/usuarios").then((response) => {
            setListaUsuarios(response.data); // Guardar la lista de usuarios
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className='App'>
            <div className='datos'>
                <label>Nombre: <input value={nombre} 
                    onChange={(event) => setNombre(event.target.value)}
                    type="text" placeholder="Ingresa el nombre de la mascota" /></label>

                <label>Especie: <input value={especie} 
                    onChange={(event) => setEspecie(event.target.value)}
                    type="text" placeholder="Ingresa la especie" /></label>

                <label>Edad: <input value={edad} 
                    onChange={(event) => setEdad(event.target.value)}
                    type="number" placeholder="Ingresa la edad" /></label>

                <label>ID Usuario: 
                    <select value={id_usuario} onChange={(event) => setIdUsuario(event.target.value)} className="id-usuario">
                        <option value="">Selecciona un usuario</option>
                        {listaUsuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} (ID: {usuario.id})
                            </option>
                        ))}
                    </select>
                </label>

                <div>
                    {editar ? (
                        <>
                            <button onClick={update}>Actualizar</button>
                            <button onClick={limpiarDatos}>Cancelar</button>
                        </>
                    ) : (
                        <button onClick={add}>Registrar Mascota</button>
                    )}
                </div>
            </div>

            <div className="listaMascotas">
                {isLoading ? (
                    <div className="spinner"></div> // Spinner mientras carga
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Especie</th>
                                <th>Edad</th>
                                <th>ID Usuario</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaMascotas.map((val) => (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.nombre}</td>
                                    <td>{val.especie}</td>
                                    <td>{val.edad}</td>
                                    <td>{val.id_usuario}</td>
                                    <td>
                                        <div>
                                            <button onClick={() => editarMascota(val)}>Actualizar</button>
                                            <button onClick={() => deleteMascota(val.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Mascotas;
