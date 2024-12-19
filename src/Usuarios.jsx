import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/App.css'; // Asegúrate de que incluya los estilos para el spinner

function Usuarios() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [editar, setEditar] = useState(false);
    const [listaUsuarios, setUsuarios] = useState([]);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsuarios();
    }, []);

    const add = () => {
        if (nombre.trim() === "" || correo.trim() === "" || contrasena.trim() === "" || rol.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        setIsLoading(true);
        Axios.post("https://api-vet-zeta.vercel.app/create", {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        }).then(() => {
            alert("Usuario Registrado");
            limpiarDatos();
            getUsuarios();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const update = () => {
        setIsLoading(true);
        Axios.put("https://api-vet-zeta.vercel.app/update", {
            id: id,
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        }).then(() => {
            getUsuarios();
            alert("Usuario Actualizado");
            limpiarDatos();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const deleteUser = (id) => {
        setIsLoading(true);
        Axios.delete(`https://api-vet-zeta.vercel.app/delete/${id}`).then(() => {
            getUsuarios();
            alert("Usuario ELIMINADO");
            limpiarDatos();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const limpiarDatos = () => {
        setNombre("");
        setCorreo("");
        setContrasena("");
        setEditar(false);
    };

    const editarUsuario = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setCorreo(val.correo);
        setContrasena(val.contrasena);
        setRol(val.rol);
        setId(val.id);
    };

    const getUsuarios = () => {
        setIsLoading(true);
        Axios.get("https://api-vet-zeta.vercel.app/usuarios").then((response) => {
            setUsuarios(response.data);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className='App'>
            <div className='datos'>
                <label>Nombre: <input value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    type="text" placeholder="Ingresa tu nombre" /></label>

                <label>Correo electronico: <input value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    type="text" placeholder="Ingresa tu correo" /></label>

                <label>Contrasena: <input value={contrasena}
                    onChange={(event) => setContrasena(event.target.value)}
                    type="text" placeholder="Ingresa tu contrasena" /></label>

                <label>Rol: <input value={rol}
                    onChange={(event) => setRol(event.target.value)}
                    type="text" placeholder="Ingresa un rol" /></label>

                <div>
                    {editar ? (
                        <>
                            <button onClick={update}>Actualizar</button>
                            <button onClick={limpiarDatos}>Cancelar</button>
                        </>
                    ) : (
                        <button onClick={add}>Registrarse</button>
                    )}
                </div>
            </div>

            <div className="listaUsuarios">
                {isLoading ? (
                    <div className="spinner"></div> // Aquí está el spinner
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Contrasena</th>
                                <th>Rol</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUsuarios.map((val) => (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.nombre}</td>
                                    <td>{val.correo}</td>
                                    <td>{val.contrasena}</td>
                                    <td>{val.rol}</td>
                                    <td>
                                        <div>
                                            <button onClick={() => editarUsuario(val)}>Actualizar</button>
                                            <button onClick={() => deleteUser(val.id)}>Eliminar</button>
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

export default Usuarios;
